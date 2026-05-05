
export interface InputProps{
  type: "password" | "text"
  placeholder: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  value: string
}
