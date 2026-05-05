import * as S from "./style"
import type { ReactNode } from "react"

export interface AuthCardProps{
  children: ReactNode
  width?: string
  maxWidth?: string
  minHeight?: string
}

export interface AuthSectionProps{
  children: ReactNode
}

function AuthCard({children, width ="", maxWidth="", minHeight=""}: AuthCardProps){
  return(
    <>
      <S.Card $width={width} $maxWidth={maxWidth} $minHeight={minHeight}>{children}</S.Card>
    </>
  )
} 


export function Split({children}: AuthSectionProps){
  return(
    <>
      <S.Spilt>{children}</S.Spilt>
    </>
  )
} 


export function Left({children}: AuthSectionProps){
  return(
    <>
      <S.Left>{children}</S.Left>
    </>
  )
} 


export function Right({children}: AuthSectionProps){
  return(
    <>
      <S.Right>{children}</S.Right>
    </>
  )
} 

export function Body({children}: AuthSectionProps){
  return(
    <>
      <S.Body>{children}</S.Body>
    </>
  )
} 

AuthCard.Split = Split
AuthCard.Left = Left
AuthCard.Right = Right
AuthCard.Body = Body

export default AuthCard
