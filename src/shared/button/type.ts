export interface ButtonProps{
  disabled: boolean
  context: string
  onClick?: () => void
  type?: "button" | "submit" | undefined
}
