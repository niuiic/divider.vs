import * as vscode from 'vscode'

export const cursorToLine = (line: number) => {
  if (line < 1) {
    return
  }

  const editor = vscode.window.activeTextEditor
  if (editor) {
    const range = editor.document.lineAt(line - 1).range
    editor.selection = new vscode.Selection(range.start, range.end)
    editor.revealRange(range)
  }
}

export const getCursorPos = (): undefined | { row: number; col: number } => {
  const editor = vscode.window.activeTextEditor
  if (!editor?.selection.isEmpty) {
    return
  }
  return {
    row: editor.selection.active.line + 1,
    col: editor.selection.active.character
  }
}
