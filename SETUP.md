# 빠른 시작 가이드

## 1. 의존성 설치

프로젝트를 클론한 후 의존성을 설치합니다:

```bash
npm install
```

## 2. TMDb API 키 발급

1. [The Movie Database (TMDb)](https://www.themoviedb.org/) 웹사이트에 가입합니다
2. 계정 설정 > API > API 키 요청
3. API 키를 받습니다 (무료)

## 3. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가합니다:

```env
# TMDb API 키 (필수)
NEXT_PUBLIC_TMDB_API_KEY=여기에_발급받은_API_키_입력

# 나머지는 향후 구현 시 사용
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_here
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
OPENAI_API_KEY=your_openai_key_here
AI_ENGINE_URL=http://localhost:5000
```

**중요:** `NEXT_PUBLIC_TMDB_API_KEY`에 발급받은 API 키를 입력해야 합니다!

## 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인합니다.

## 5. 빌드 및 프로덕션 실행

```bash
# 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

## 현재 구현된 기능 (Phase 1)

✅ **완료된 기능:**
- ✅ Next.js 프로젝트 셋업 및 기본 레이아웃
- ✅ TMDb API 연동
- ✅ 영화 목록 및 상세 페이지
- ✅ 기본 검색 기능
- ✅ 반응형 디자인 구현
- ✅ 시청 목록 (Watchlist) 기능
- ✅ 즐겨찾기 기능
- ✅ 로컬 상태 관리 (Zustand)
- ✅ 다크 모드 테마

## 향후 구현 예정 (Phase 2-7)

🔜 **Phase 2: 사용자 시스템**
- NextAuth.js 인증 구현
- Google 소셜 로그인
- 사용자 프로필 관리
- 데이터베이스 연동

🔜 **Phase 3: 평점 및 리뷰**
- 영화 평점 시스템
- 리뷰 작성 및 수정
- 리뷰 좋아요 기능

🔜 **Phase 4: AI 추천 엔진**
- Python Flask/FastAPI 서버 구축
- 협업 필터링 모델
- 콘텐츠 기반 필터링
- 하이브리드 추천 시스템

## 문제 해결

### API 키 오류
- `.env.local` 파일에 `NEXT_PUBLIC_TMDB_API_KEY`가 올바르게 설정되었는지 확인
- 환경 변수 변경 후 개발 서버 재시작 필요

### 영화 이미지가 안 보임
- TMDb API 키가 올바른지 확인
- 인터넷 연결 확인

### 시청 목록/즐겨찾기가 사라짐
- 현재는 브라우저 localStorage에 저장됩니다
- 브라우저 캐시를 지우면 데이터가 삭제됩니다
- Phase 2에서 데이터베이스 연동 예정

## 기술 스택

- **Framework:** Next.js 15 (App Router)
- **React:** 19.1.0
- **Styling:** Tailwind CSS 4
- **State:** Zustand
- **Animation:** Framer Motion
- **HTTP Client:** Axios
- **Data Fetching:** SWR
- **Icons:** Lucide React

## 프로젝트 구조

```
movie_site/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── movies/            # 영화 목록/상세
│   │   ├── search/            # 검색
│   │   ├── watchlist/         # 시청 목록
│   │   ├── favorites/         # 즐겨찾기
│   │   ├── recommendations/   # AI 추천 (준비중)
│   │   ├── layout.js
│   │   └── page.js
│   ├── components/
│   │   ├── common/            # MovieCard, Loading
│   │   ├── layout/            # Header, Footer
│   │   └── movies/            # MovieGrid, MovieSection
│   ├── lib/
│   │   └── tmdb.js            # TMDb API
│   ├── store/
│   │   └── useStore.js        # Zustand 상태 관리
│   └── utils/
│       └── helpers.js         # 헬퍼 함수
├── public/
├── .env.local                  # 환경 변수 (생성 필요)
├── package.json
└── README.md
```

## 도움이 필요하신가요?

프로젝트에 대한 문의사항이 있으시면 이슈를 등록해주세요!

