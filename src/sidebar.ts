import * as vscode from 'vscode'

export class TreeNode extends vscode.TreeItem {
  public line: number
  public children: TreeNode[]
  public level: number

  public constructor(args: { line: number; label: string; level: number }) {
    super(args.label)
    this.line = args.line
    this.level = args.level
    this.children = []
  }
}

const treeData = new TreeNode({ line: -1, label: '', level: 0 })

export const updateTreeData = (updateFunc: (root: TreeNode) => void) => {
  updateFunc(treeData)
}

export class TreeDataProvider implements vscode.TreeDataProvider<TreeNode> {
  getTreeItem(element: TreeNode): vscode.TreeItem | Thenable<vscode.TreeItem> {
    return element
  }
  getChildren(element?: TreeNode | undefined): vscode.ProviderResult<TreeNode[]> {
    if (!element) {
      return treeData.children
    } else {
      return element.children
    }
  }
}
