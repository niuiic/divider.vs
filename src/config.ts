import { workspace } from 'vscode'
import { DividerConfig } from './type'

interface Config {
  divider: DividerConfig[]
}

type ConfigFunc = {
  [K in keyof Config]: () => Config[K]
}

export const config: ConfigFunc = {
  divider: () => workspace.getConfiguration().get('divider.divider') as DividerConfig[]
}
