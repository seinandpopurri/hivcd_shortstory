# 커뮤니케이션 디자인: 짧은 이야기

학생들의 짧은 이야기를 전시하는 웹 애플리케이션입니다.

## 기능

- 학생들의 글을 카드 형태로 표시
- 학생 카드 클릭 시 확장되어 글 내용 표시
- 태그별로 필터링 가능 (오전/오후반, 카테고리 A/B/C 키워드)
- 여러 태그 동시 선택 시 모든 태그를 포함하는 학생만 표시

## 개발 환경 설정

1. 패키지 설치:

```bash
npm install
```

2. 개발 서버 실행:

```bash
npm run dev
```

3. 브라우저에서 `http://localhost:3000` 접속

## 빌드 및 배포

프로덕션 빌드:

```bash
npm run build
```

정적 사이트 생성:

```bash
npm run build
```

## 프로젝트 구조

- `src/app/`: Next.js 애플리케이션 코드
- `src/components/`: 재사용 가능한 컴포넌트
- `src/data/`: 학생 데이터 및 타입 정의
- `public/`: 정적 파일 (이미지 등)

## 작성자

Made by Sein Hong 