import * as S from "../userInfo/style";
import logoImg from "../../../assets/logeImg.svg";
import { useUser } from "../../contexts/UserContext";

export function UserInfo() {
  const { user } = useUser();
  const name = user.name || "wjddlfnd";

  return (
    <S.UserInfo>
      <S.TitleContainer>
        <img src={logoImg} width={46} height={46} />
        <S.TextContent>
          <S.UserName>{name}</S.UserName>
          <S.subText>Admin Panel</S.subText>
        </S.TextContent>
      </S.TitleContainer>
    </S.UserInfo>
  );
}
