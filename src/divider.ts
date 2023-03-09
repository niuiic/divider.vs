import * as vscode from 'vscode'
import { config } from './config'
import { TreeNode, updateTreeData } from './sidebar'
import { Divider } from './type'

const highlightDivider = (_dividers: Divider[]) => {}

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
  for (const textDocument of vscode.workspace.textDocuments) {
    const text = textDocument.getText()
    const lines = text.split('\n')
    const dividers = lines.map((line, index) => genDivider(line, index)).filter((v) => v !== undefined) as Divider[]
    highlightDivider(dividers)
    const tree = buildDividerTree(dividers)
    updateTreeData((root) => (root.children = tree.children))
  }
}
