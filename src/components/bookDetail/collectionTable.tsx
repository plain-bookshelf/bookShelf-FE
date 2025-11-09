import React from 'react';
import * as S from './style';
import type { CollectionItem } from '../../types/bookTypes';

interface CollectionTableProps {
  items: CollectionItem[];
  // 실제 서비스에서는 대출/예약 API 호출 함수가 전달됨
  onAction: (action: 'loan' | 'reserve', itemId: string) => void;
}

const CollectionTable: React.FC<CollectionTableProps> = ({ items, onAction }) => {
  return (
    <S.CollectionContainer>
      <S.LibraryTable>
        <S.TableHead>
          <tr>
            <th>도서관</th>
            <th>등록번호</th>
            <th>상태</th>
            <th>청구기호/반납예정일</th>
            <th>도서대출</th>
            <th>도서예약</th>
          </tr>
        </S.TableHead>
        <S.TableBody>
          {items.map((item) => {
            const isLoaned = item.status === '대출중';
            const loanButtonType = isLoaned ? 'disabled' : 'primary';
            const reserveButtonType = isLoaned ? 'secondary' : 'disabled';
            
            return (
              <tr key={item.id}>
                <td>{item.library}</td>
                <td>{item.id}</td>
                <S.StatusCell $status={item.status}>
                  {item.status}
                </S.StatusCell>
                <td>{isLoaned ? item.dueDate : item.callNumber}</td>
                <td>
                  <S.ActionButton 
                    $type={loanButtonType}
                    disabled={isLoaned}
                    onClick={() => !isLoaned && onAction('loan', item.id)}>
                    대출하기
                  </S.ActionButton>
                </td>
                <td>
                  <S.ActionButton 
                    $type={reserveButtonType}
                    disabled={!isLoaned}
                    onClick={() => isLoaned && onAction('reserve', item.id)}>
                    대출예약
                  </S.ActionButton>
                </td>
              </tr>
            );
          })}
        </S.TableBody>
      </S.LibraryTable>
    </S.CollectionContainer>
  );
};

export default CollectionTable;