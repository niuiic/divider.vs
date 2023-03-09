import * as vscode from 'vscode'
import { TreeDataProvider } from './sidebar'
import { resolveDivider } from './divider'

export const activate = (context: vscode.ExtensionContext) => {
  resolveDivider()

  const tree = vscode.window.createTreeView('divider', {
    treeDataProvider: new TreeDataProvider()
  })

  context.subscriptions.push(tree)
}

export const deactivate = () => {}
