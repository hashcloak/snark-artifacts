export { download, maybeDownload } from './download/download'
export * from './index.shared'
import maybeGetSnarkArtifacts from './download/index.node'
import { maybeGetCompiledNoirCircuit } from './download/index.node'
export { maybeGetCompiledNoirCircuit, maybeGetSnarkArtifacts }
