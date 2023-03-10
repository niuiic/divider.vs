import * as vscode from 'vscode'
import { TreeDataProvider } from './sidebar'
import { resolveDivider } from './divider'
import { cursorToLine } from './cursor'

export const activate = (context: vscode.ExtensionContext) => {
  // command
  vscode.commands.registerCommand('cursorToLine', cursorToLine)

  // tree view
  const treeDataProvider = new TreeDataProvider()
  const tree = vscode.window.createTreeView('divider', {
    treeDataProvider
  })
  context.subscriptions.push(tree)

  // resolve dividers
  resolveDivider()
  const refreshDividers = () => {
    resolveDivider()
    treeDataProvider.refresh()
  }
  context.subscriptions.push(
    vscode.workspace.onDidSaveTextDocument(refreshDividers),
    vscode.window.onDidChangeActiveTextEditor(refreshDividers)
  )
}

export const deactivate = () => {}
