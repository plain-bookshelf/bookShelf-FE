import * as S from "./style"
import type { ButtonProps } from "./type"


export default function Button({disabled, context, onClick, type}: ButtonProps){
  return(
    <>
      <S.Button disabled={disabled} onClick={onClick} type={type}>
        {context}
      </S.Button>
    </>
  )
} 
