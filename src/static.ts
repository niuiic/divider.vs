import { Divider } from './type'

export class Static {
  static dividers: Divider[] = []
  static curDivider: {
    line: number
    range: [number, number]
  } = {
    line: 0,
    range: [0, 0]
  }
}
