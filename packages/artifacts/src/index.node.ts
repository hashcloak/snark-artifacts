export { download, maybeDownload } from './download/download'
export * from './index.shared'
import maybeGetSnarkArtifacts, {
  BatchingCircuitType,
  getCompiledBatchCircuitWithPath,
  getCompiledNoirCircuitWithPath,
  maybeGetBatchVkPath,
} from './download/index.node'
import { maybeGetCompiledNoirCircuit, maybeGetNoirVk } from './download/index.node'
export {
  BatchingCircuitType,
  getCompiledBatchCircuitWithPath,
  getCompiledNoirCircuitWithPath,
  maybeGetBatchVkPath,
  maybeGetCompiledNoirCircuit,
  maybeGetNoirVk,
  maybeGetSnarkArtifacts,
}
