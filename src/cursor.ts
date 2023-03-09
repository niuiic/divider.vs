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
