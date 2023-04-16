import { workspace } from 'vscode'
import { DividerConfig } from './type'

interface Config {
  divider: DividerConfig[]
  iconPath: string
  markCurrentDivider: boolean
}

type ConfigFunc = {
  [K in keyof Config]: () => Config[K]
}

export const config: ConfigFunc = {
  divider: () => workspace.getConfiguration().get('divider.divider') as DividerConfig[],
  iconPath: () => workspace.getConfiguration().get('divider.iconPath') as string,
  markCurrentDivider: () => workspace.getConfiguration().get('divider.markCurrentDivider') as boolean
}
