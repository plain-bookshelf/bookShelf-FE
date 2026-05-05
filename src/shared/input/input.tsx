import * as S from "./style"
import type{InputProps}  from "./type"


export default function Input({placeholder, onChange, disabled, value, type}:InputProps){
  return(
    <>
      <S.Input
      type={type} 
      placeholder={placeholder} 
      onChange={onChange} 
      disabled={disabled}
      value={value}
      >

      </S.Input>
    </>
  )
}
