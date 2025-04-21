export { download, maybeDownload } from './download/download'
export * from './index.shared'
import maybeGetSnarkArtifacts from './download/index.node'
import { maybeGetCompiledNoirCircuit, maybeGetNoirVk } from './download/index.node'
export { maybeGetCompiledNoirCircuit, maybeGetNoirVk, maybeGetSnarkArtifacts }
