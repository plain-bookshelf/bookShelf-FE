import Input from "../../../../shared/input/input";
import * as S from "../style";

interface StepOfficialCodeProps {
  officialCode: string;
  onOfficialCodeChange: (value: string) => void;
}

export default function StepOfficialCode({
  officialCode,
  onOfficialCodeChange,
}: StepOfficialCodeProps) {
  return (
    <S.Field>
      <S.Label>관계자 인증코드</S.Label>
      <Input
        type="text"
        value={officialCode}
        placeholder="관계자 인증코드를 입력해 주세요"
        onChange={(event) => onOfficialCodeChange(event.target.value)}
      />
    </S.Field>
  );
}
