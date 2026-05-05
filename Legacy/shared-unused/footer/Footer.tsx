import * as S from "./style";

type DeveloperGroup = [string, ...string[]];

function Footer() {
  const developer: DeveloperGroup[] = [
    ["Frontend", "이선우", "조연재"],
    ["Backend", "김민수"],
    ["Ai Developer", "이시우", "박지훈", "김리건"],
    ["Design", "박시윤"],
  ];

  return (
    <S.Container>
      <S.Lien />
      <S.Content>
        <S.DeveloperContainer>
          {developer.map((group) => (
            <S.DepartmentBox key={group[0]}>
              {group.map((member) => (
                <S.Text key={`${group[0]}-${member}`}>{member}</S.Text>
              ))}
            </S.DepartmentBox>
          ))}
        </S.DeveloperContainer>
        <S.ImgBox>
          <a href="https://github.com/plain-bookshelf" target="_blank" rel="noopener noreferrer">
            <img src={footerBookShelf} alt="bookshelf github" />
          </a>
          <a href="https://github.com/plain-bookshelf" target="_blank" rel="noopener noreferrer">
            <img src={footerGithub} alt="github" />
          </a>
        </S.ImgBox>
      </S.Content>
    </S.Container>
  );
}

export default Footer;

