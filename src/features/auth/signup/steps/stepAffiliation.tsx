import Input from "../../../../shared/input/input";
import * as S from "../style";

interface StepAffiliationProps {
  affiliationName: string;
  onAffiliationNameChange: (value: string) => void;
}

export default function StepAffiliation({
  affiliationName,
  onAffiliationNameChange,
}: StepAffiliationProps) {
  return (
    <S.Field>
      <S.Label>소속 도서관</S.Label>
      <Input
        type="text"
        value={affiliationName}
        placeholder="소속 도서관을 입력해 주세요"
        onChange={(event) => onAffiliationNameChange(event.target.value)}
      />
    </S.Field>
  );
}
