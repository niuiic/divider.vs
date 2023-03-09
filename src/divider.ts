import * as vscode from 'vscode'
import { config } from './config'
import { TreeNode, TreeDataProvider } from './sidebar'
import { Divider } from './type'

const decorationTypes: vscode.TextEditorDecorationType[] = []

const highlightDivider = (dividers: Divider[]) => {
  // clear prev highlights
  decorationTypes.forEach((v) => {
    v.dispose()
  })
  decorationTypes.length = 0

  dividers.forEach((v) => {
    const decorationType = vscode.window.createTextEditorDecorationType({
      isWholeLine: true,
      color: v.color
    })
    decorationTypes.push(decorationType)
    vscode.window.activeTextEditor?.setDecorations(decorationType, [
      {
        range: new vscode.Range(new vscode.Position(v.line - 1, 1), new vscode.Position(v.line - 1, 1))
      }
    ])
  })
}

const buildDividerTree = (dividers: Divider[]): TreeNode => {
  const rootNode = new TreeNode({
    label: '',
    line: -1,
    level: 0
  })

  const nodes = dividers
    .filter((v) => v.list)
    .map(
      (v) =>
        new TreeNode({
          label: v.text,
          line: v.line,
          level: v.level
        })
    )

  nodes.forEach((node, index) => {
    if (node.level === 1) {
      rootNode.children.push(node)
    } else {
      for (let i = index - 1; i >= 0; i--) {
        const prevNode = nodes[i]
        if (prevNode.level === node.level - 1) {
          prevNode.children.push(node)
          prevNode.collapsibleState = 2
          break
        }
      }
    }
  })

  return rootNode
}

const genDivider = (line: string, lineNum: number): Divider | undefined => {
  for (const dividerConfig of config.divider()) {
    if (new RegExp(dividerConfig.dividerRegex).test(line)) {
      const text = line.match(new RegExp(dividerConfig.textRegex))

      return {
        level: dividerConfig.level,
        text: text ? text[1] : '',
        line: lineNum,
        color: dividerConfig.color,
        list: dividerConfig.list
      }
    }
  }
}

export const resolveDivider = () => {
  if (vscode.workspace.textDocuments.length === 0) {
    return
  }
  const text = vscode.workspace.textDocuments[0].getText()
  const lines = text.split('\n')
  const dividers = lines.map((line, index) => genDivider(line, index + 1)).filter((v) => v !== undefined) as Divider[]
  highlightDivider(dividers)
  const tree = buildDividerTree(dividers)
  TreeDataProvider.updateTreeData(tree)
}
