export interface Option {
  color: string
  list: boolean
}

export type Divider = {
  level: number
  text: string
  line: number
} & Option

export type DividerConfig = {
  level: number
  dividerRegex: string
  textRegex: string
} & Option
