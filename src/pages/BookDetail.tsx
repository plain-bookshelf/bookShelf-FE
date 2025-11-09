import { useState } from 'react';
import BookInfoSection from '../components/bookDetail/bookInfoSection';
import CollectionTable from '../components/bookDetail/collectionTable';
import * as S from '../components/bookDetail/style';
import type { BookDetailData } from '../types/bookTypes';
import ReviewSection from '../components/comment/ReviewSection'


// Mock Data (이미지 디자인 기반)
const mockBookData: BookDetailData = {
  title: '회색 인간',
  coverImage: '회색_인간_표지_경로.png', // 실제 이미지 경로로 대체 필요
  author: '김동식 지음',
  publisher: '요다',
  pubYear: 2017,
  registrationId: 'EM0020789',
  releaseDate: '2025/04/15',
  summary: `‘오늘의 유머’ 공포게시판에서 많은 이들의 호응을 얻었던  ‘김동식의 소설집’. 작가는 10년 동안 공장에서 노동하면서 머릿속으로 수없이 떠올렸던 이야기들을 거의 매일 게시판에올렸다. ‘김동식 소설집’은 그렇게 써내려간 300편의 짧은 소설 가운데 66편을 추려 묶은 것이다.`,
  categories: ['한국소설'],
  collection: [
    { id: 'EM00018181', library: '대덕소프트웨어마이스터고등학교', status: '대출중', dueDate: '2025-08-09', callNumber: '813.7 ㄱ25 ㅎ c.3' },
    { id: 'EM00018182', library: '대덕소프트웨어마이스터고등학교', status: '대출가능', dueDate: "2025-08-09", callNumber: '813.7 ㄱ25 ㅎ c.3' },
    { id: 'EM00018183', library: '대덕소프트웨어마이스터고등학교', status: '대출중', dueDate: '2025-08-09', callNumber: '813.7 ㄱ25 ㅎ c.4' },
    { id: 'EM00018184', library: '대덕소프트웨어마이스터고등학교', status: '대출중', dueDate: '2025-08-09', callNumber: '813.7 ㄱ25 ㅎ c.5' },
  ],
};

export default function BookDetail() {
  const [activeTab, setActiveTab] = useState<'collection' | 'review'>('collection');

  // 대출/예약 버튼 클릭 핸들러 (실제 로직은 API 호출이 필요)
  const handleAction = (action: 'loan' | 'reserve', itemId: string) => {
    alert(`[${action === 'loan' ? '대출' : '예약'}] 요청: 등록번호 ${itemId}`);
    // 실제 구현: 여기서 서버에 요청을 보내고 상태를 업데이트합니다.
  };

  return (
    <>
      <S.DetailPageWrapper>
        <BookInfoSection book={mockBookData} />
          
        <S.Divider />

        {/* 탭 네비게이션 */}
        <S.TabContainer>
          <S.DetailTabs>
            <S.TabButton 
              $isActive={activeTab === 'collection'}
              onClick={() => setActiveTab('collection')}>
              소장정보
            </S.TabButton>
            <S.TabButton 
              $isActive={activeTab === 'review'}
              onClick={() => setActiveTab('review')}>
              리뷰
            </S.TabButton>
          </S.DetailTabs>
        </S.TabContainer>

        {/* 탭 콘텐츠 */}
        {activeTab === 'collection' && (
          <CollectionTable 
            items={mockBookData.collection} 
            onAction={handleAction} 
          />
        )}
          
        {activeTab === 'review' && (
          <ReviewSection/>
        )}
      </S.DetailPageWrapper>
    </>
  )
}