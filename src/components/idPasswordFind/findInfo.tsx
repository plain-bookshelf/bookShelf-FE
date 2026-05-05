import { PageWrapper } from "../../layouts/pageWrapper"

import * as S from "./style"
import arrorw from "../../assets/arrowBack.svg"
import { useNavigate } from "react-router-dom"

export function FindInfo (){

  const navigate = useNavigate()

    const IdButton = () => {
    navigate("/idFind")
  }

    const PasswordButton = () => {
    navigate("/checkEmailPwReset")
  }

  return(
    <>
      <PageWrapper>
        <S.FindContainer>
          <S.FindContent>
            <S.FindTitleContent>
              <S.FindTitle>아이디 또는 비밀번호를 잊으셨나요?</S.FindTitle>
              <S.SubtitleContent>
                <S.Subtitle>아래로 이동해서 책마루의 아이디와 비밀번호를 찾을 수 있어요</S.Subtitle>
                <S.Subtitle>책마루에 등록된 정보로 아이디를 찾을 수 있습니다.</S.Subtitle>
              </S.SubtitleContent>
            </S.FindTitleContent>
            <S.FindSelectContainer>
              <S.FindIdPasswordSelectContent>
                <S.FindSelectContent>
                  <S.FindTextContent>
                    <S.FindSelectTitle>아이디 찾으러 가기</S.FindSelectTitle>
                    <S.FindSelectText>이메일 인증을 통해 계정을 찾습니다.</S.FindSelectText>
                  </S.FindTextContent>
                    <S.Arrow src={arrorw} onClick={IdButton}></S.Arrow>
                </S.FindSelectContent>
                <S.FindSelectContent>
                  <S.FindTextContent>
                    <S.FindSelectTitle>비밀번호 재설정</S.FindSelectTitle>
                    <S.FindSelectText>이메일 인증을 통해 비밀번호 재설정을 합니다.</S.FindSelectText>
                  </S.FindTextContent>
                    <S.Arrow src={arrorw} onClick={PasswordButton}></S.Arrow>
                </S.FindSelectContent>
              </S.FindIdPasswordSelectContent>
              <S.FindFooter>
                <S.FindFooterTextContent>
                  <S.FindFooterText>계정을 찾기 전에 꼭 확인해 주세요!</S.FindFooterText>
                  <ul>
                    <S.FindFooterListItem>기존에 사용하던 계정이 없다면 아이디 찾을 수 없으며 회원가<br/>입을 해주시길 부탁드립니다</S.FindFooterListItem>
                  </ul>
                </S.FindFooterTextContent>
              </S.FindFooter>
            </S.FindSelectContainer>
          </S.FindContent>
        </S.FindContainer>
      </PageWrapper>
    </>
  )
}

export default FindInfo;