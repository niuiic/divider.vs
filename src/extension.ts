import * as vscode from 'vscode'
import { TreeDataProvider } from './sidebar'
import { resolveDivider, updateCurDivider } from './divider'
import { cursorToLine } from './cursor'
import { config } from './config'

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
  const updateCurDividerOnTree = () => {
    config.markCurrentDivider() && updateCurDivider() && treeDataProvider.refresh()
  }
  updateCurDividerOnTree()
  context.subscriptions.push(
    vscode.workspace.onDidSaveTextDocument(refreshDividers),
    vscode.window.onDidChangeTextEditorSelection(updateCurDividerOnTree),
    vscode.window.onDidChangeActiveTextEditor(refreshDividers)
  )
}

export const deactivate = () => {}
