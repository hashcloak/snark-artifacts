export * from './index.shared'
import maybeGetSnarkArtifacts from './download/index.browser'
import { maybeGetCompiledNoirCircuit } from './download/index.browser'
export { maybeGetCompiledNoirCircuit, maybeGetSnarkArtifacts }
