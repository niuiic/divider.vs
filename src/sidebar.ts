import * as vscode from 'vscode'
import { Static } from './static'
import { config } from './config'

export class TreeNode extends vscode.TreeItem {
  public line: number
  public children: TreeNode[]
  public level: number

  public constructor(args: { line: number; label: string; level: number }) {
    super(args.label)
    this.line = args.line
    this.level = args.level
    this.children = []
    this.command = {
      command: 'cursorToLine',
      title: 'move to divider',
      arguments: [args.line]
    }
  }
}

export class TreeDataProvider implements vscode.TreeDataProvider<TreeNode> {
  private static treeData = new TreeNode({ line: -1, label: '', level: 0 })
  public static updateTreeData = (root: TreeNode) => {
    TreeDataProvider.treeData.children = root.children
  }

  getTreeItem(element: TreeNode): vscode.TreeItem | Thenable<vscode.TreeItem> {
    return {
      ...element,
      iconPath: Static.curDivider.line === element.line ? config.iconPath() : undefined
    }
  }
  getChildren(element?: TreeNode | undefined): vscode.ProviderResult<TreeNode[]> {
    if (!element) {
      return TreeDataProvider.treeData.children
    } else {
      return element.children
    }
  }

  private onDidChangeTreeDataEmitter = new vscode.EventEmitter<void>()
  onDidChangeTreeData = this.onDidChangeTreeDataEmitter.event
  refresh() {
    this.onDidChangeTreeDataEmitter.fire()
  }
}
