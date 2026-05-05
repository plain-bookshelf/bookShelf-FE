import * as S from "./style"
import footerBookShelf from "../../assets/footerBookShelf.png"
import footerGithub from "../../assets/footerGithub.png"

function Footer() {
  const developer = [["Frontend", "이선우", "조연재"], ["Backend", "김민수"], ["Ai Developer", "이시우", "정지오", "김리건"], ["Desgin", "정일웅"]];

  return (
    <>
      <S.Container>
        <S.Lien />
        <S.Content>
          <S.DeveloperContainer>
            {developer.map((e: any) => (
              <S.DepartmentBox>
                {e.map((e: string) => (
                  <S.Text>{e}</S.Text>
                ))}
              </S.DepartmentBox>
            ))}
          </S.DeveloperContainer>
          <S.ImgBox>
            {/*아래 주소 새로 만들 플레인 웹사이트 url로 바꿔야 함*/}
            <a href="https://github.com/plain-bookshelf" target="_blank" rel="noopener noreferrer">
              <img src={footerBookShelf} />            
            </a>
            <a href="https://github.com/plain-bookshelf" target="_blank" rel="noopener noreferrer">
              <img src={footerGithub} />            
            </a>
          </S.ImgBox>
        </S.Content>
      </S.Container>
    </>
  )
}

export default Footer;