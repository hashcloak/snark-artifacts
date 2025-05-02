import { CompiledCircuit } from '@noir-lang/noir_js'
import fs from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { Project } from '../projects'
import { maybeDownload } from './download'
import _maybeGetSnarkArtifacts from './index.browser'
import { maybeGetCompiledNoirCircuit as _maybeGetCompiledNoirCircuit } from './index.browser'
import type { SnarkArtifacts } from './types'

const extractEndPath = (url: string) => url.split('pse.dev/')[1]

/**
 * Downloads SNARK artifacts (`wasm` and `zkey`) files if not already present in OS tmp folder.
 * @example
 * ```ts
 * {
 *   wasm: "/tmp/@zk-kit/semaphore-artifacts@latest/semaphore-3.wasm",
 *   zkey: "/tmp/@zk-kit/semaphore-artifacts@latest/semaphore-3.zkey" .
 * }
 * ```
 * @returns {@link SnarkArtifacts}
 */
export default async function maybeGetSnarkArtifacts(
  ...pars: Parameters<typeof _maybeGetSnarkArtifacts>
): Promise<SnarkArtifacts> {
  const urls = await _maybeGetSnarkArtifacts(...pars)

  const outputPath = `${tmpdir()}/snark-artifacts/${extractEndPath(urls.wasm)}`

  const [wasm, zkey] = await Promise.all([
    maybeDownload(urls.wasm, outputPath),
    maybeDownload(urls.zkey, outputPath.replace(/.wasm$/, '.zkey')),
  ])

  return {
    wasm,
    zkey,
  }
}

/**
 * Download the compiled Noir circuit file, if it isn't already present in the OS tmp folder
 * @param project The project type, this should be Semaphore Noir
 * @param merkleTreeDepth The merkleTreeDepth for wich the circuit should be returned
 * @returns the compiled Noir circuit
 */
export async function maybeGetCompiledNoirCircuit(
  project: Project,
  merkleTreeDepth: number,
): Promise<CompiledCircuit> {
  if (project !== Project.SEMAPHORE_NOIR)
    throw new Error(`Unsupported project '${project}'`)

  const SEMAPHORE_NOIR_BASE_URL = 'https://hashcloak.github.io/noir-artifacts-host'
  const url = `${SEMAPHORE_NOIR_BASE_URL}/semaphore-noir-${merkleTreeDepth}.json`

  const outputPath = `${tmpdir()}/snark-artifacts/semaphore-noir-${merkleTreeDepth}.json`
  await maybeDownload(url, outputPath)

  const json = await fs.readFile(outputPath, 'utf-8')
  return JSON.parse(json) as CompiledCircuit
}
