import * as vscode from 'vscode'
import { config } from './config'
import { TreeNode, TreeDataProvider } from './sidebar'
import { Divider } from './type'
import { getCursorPos } from './cursor'
import { Static } from './static'

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
  if (!vscode.window.activeTextEditor) {
    return
  }
  const text = vscode.window.activeTextEditor.document.getText()
  const lines = text.split('\n')
  const dividers = lines.map((line, index) => genDivider(line, index + 1)).filter((v) => v !== undefined) as Divider[]
  Static.dividers = dividers
  highlightDivider(dividers)
  const tree = buildDividerTree(dividers)
  TreeDataProvider.updateTreeData(tree)
}

const inRange = (line: number, range: [number, number]) => line >= range[0] && (line < range[1] || range[1] === -1)

export const updateCurDivider = (): boolean => {
  const cursorPos = getCursorPos()
  if (!cursorPos) {
    return false
  }

  if (inRange(cursorPos.row, Static.curDivider.range)) {
    return false
  }

  let targetIndex = 0
  const dividers = Static.dividers.filter((v) => v.list)
  for (const divider of dividers) {
    if (cursorPos.row < divider.line) {
      break
    }
    targetIndex++
  }
  targetIndex = targetIndex - 1
  if (targetIndex === dividers.length) {
    return false
  }

  Static.curDivider.line = dividers[targetIndex].line
  Static.curDivider.range = [
    dividers[targetIndex].line,
    dividers.length >= targetIndex + 2 ? dividers[targetIndex + 1].line : -1
  ]

  return true
}
