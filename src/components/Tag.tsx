import React from 'react';

type TagProps = {
  text: string;
  category: 'class' | 'categoryA' | 'categoryB' | 'categoryC';
  isActive: boolean;
  onClick: (event?: React.MouseEvent) => void;
};

const Tag: React.FC<TagProps> = ({ text, category, isActive, onClick }) => {
  // 특정 태그 텍스트에 고정된 색상 인덱스 할당
  const getTagIndex = (tagText: string, category: string) => {
    // 카테고리와 텍스트를 함께 고려한 고정 인덱스 할당
    const fixedIndices: Record<string, Record<string, number>> = {
      'class': {
        'A.M.': 1,      // 노란계열 (1번 인덱스로 설정)
        'P.M.': 2,      // 하늘계열 (2번 인덱스로 설정)
      },
      'categoryA': {
        '잠자다': 3,     // 하늘색 (3번 인덱스로 설정)
        '흔들리다': 4,
        '곤충': 5,
        '미끌미끌': 6,
        '파닥파닥': 7,
        '돌': 8,
        '괴물': 9,
        '책': 10,
        '나무': 1,
        '춤추다': 2,
      },
      'categoryB': {
        '자르다': 5,
        '꿈': 6,
        '잇다': 7,
        '부서지다': 3,
        '쿵': 4,
        '사람': 8,
        '느릿느릿': 9,
        '뒤집히다': 10,
        '늦다': 1,
        '과일': 2,
      },
      'categoryC': {
        '집': 8,
        '매듭': 9,
        '모이다': 3,
        '대화하다': 4,
        '벽': 5,
        '소리': 6,
        '와글와글': 7,
        '태양': 10,
        '물': 1,
        '덩어리': 2,
      }
    };
    
    if (fixedIndices[category] && fixedIndices[category][tagText] !== undefined) {
      return fixedIndices[category][tagText];
    }
    
    // 고정된 인덱스가 없는 경우 해시 계산
    let hash = 0;
    for (let i = 0; i < tagText.length; i++) {
      hash = ((hash << 5) - hash) + tagText.charCodeAt(i);
      hash |= 0; // 32비트 정수로 변환
    }
    // 양수로 변환 후 클래스 당 최대 색상 수(10)로 모듈로 연산
    return Math.abs(hash) % 10 + 1;
  };
  
  // 태그 텍스트에 따른 인덱스
  const tagIndex = getTagIndex(text, category);
  
  // 카테고리에 따른 클래스 설정
  const bgColorClass = `bg-${category} tag-index-${tagIndex}`;
  
  // 클릭 시 크기 변화 없이 색상만 변경되도록 스타일 조정
  const style = {
    width: 'auto', // 너비 자동 조정
    transition: 'filter 0.2s' // 필터 효과만 전환 애니메이션 적용
  };

  return (
    <div
      className={`tag dashed-border ${bgColorClass} ${isActive ? 'active' : ''}`}
      onClick={onClick}
      data-tag-text={text}
      style={style}
    >
      {text}
    </div>
  );
};

export default Tag; 