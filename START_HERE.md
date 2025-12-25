# 🎬 MovieAI - 시작하기

## 📌 현재 상태

✅ **Phase 1 완료!** - 기본 기능이 모두 구현되었습니다.

## 🚀 빠른 시작 (3분)

### 1️⃣ TMDb API 키 발급

1. [TMDb 회원가입](https://www.themoviedb.org/signup)
2. [API 설정](https://www.themoviedb.org/settings/api)에서 API 키 발급
3. API 키 복사

### 2️⃣ 환경 변수 설정

프로젝트 루트에 `.env.local` 파일 생성 후:

```env
NEXT_PUBLIC_TMDB_API_KEY=여기에_발급받은_API_키_입력
```

### 3️⃣ 실행

```bash
npm run dev
```

브라우저에서 http://localhost:3000 열기! 🎉

---

## ✨ 구현된 기능

### 🎯 Core Features
- ✅ 영화 검색 및 탐색
- ✅ 트렌딩/인기/평점 높은 영화
- ✅ 영화 상세 정보 (출연진, 제작진, 줄거리)
- ✅ 시청 목록 (Watchlist)
- ✅ 즐겨찾기 (Favorites)

### 🎨 UI/UX
- ✅ 반응형 디자인 (모바일/태블릿/데스크톱)
- ✅ 다크 모드 테마
- ✅ 부드러운 애니메이션 (Framer Motion)
- ✅ 직관적인 네비게이션

### 🛠 기술 스택
- ✅ Next.js 15 (App Router)
- ✅ React 19
- ✅ Tailwind CSS 4
- ✅ Zustand (상태 관리)
- ✅ Framer Motion (애니메이션)
- ✅ TMDb API

---

## 📱 주요 페이지

| 페이지 | URL | 설명 |
|--------|-----|------|
| 홈 | `/` | 트렌딩/인기 영화 |
| 영화 목록 | `/movies` | 카테고리별 영화 탐색 |
| 영화 상세 | `/movies/[id]` | 영화 상세 정보 |
| 검색 | `/search` | 실시간 영화 검색 |
| 시청 목록 | `/watchlist` | 나중에 볼 영화 |
| 즐겨찾기 | `/favorites` | 좋아하는 영화 |
| AI 추천 | `/recommendations` | 준비 중 (Phase 4) |

---

## 📂 프로젝트 구조

```
movie_site/
├── src/
│   ├── app/                    # Next.js Pages
│   │   ├── movies/            
│   │   │   ├── [id]/          # 영화 상세
│   │   │   └── page.js        # 영화 목록
│   │   ├── search/            # 검색
│   │   ├── watchlist/         # 시청 목록
│   │   ├── favorites/         # 즐겨찾기
│   │   └── recommendations/   # AI 추천 (준비중)
│   │
│   ├── components/
│   │   ├── common/            # MovieCard, Loading
│   │   ├── layout/            # Header, Footer
│   │   └── movies/            # MovieGrid, MovieSection
│   │
│   ├── lib/
│   │   └── tmdb.js            # TMDb API 연동
│   │
│   ├── store/
│   │   └── useStore.js        # Zustand 상태 관리
│   │
│   └── utils/
│       └── helpers.js         # 헬퍼 함수
│
├── public/                     # 정적 파일
├── .env.local                  # 환경 변수 (생성 필요!)
├── package.json
├── README.md                   # 전체 프로젝트 문서
├── SETUP.md                    # 상세 설치 가이드
└── QUICKSTART.md               # 빠른 시작 가이드
```

---

## 🎯 다음 단계 (Phase 2-7)

### Phase 2: 사용자 시스템 📅 예정
- [ ] NextAuth.js 인증
- [ ] Google 소셜 로그인
- [ ] 사용자 프로필
- [ ] 데이터베이스 연동 (PostgreSQL/MongoDB)

### Phase 3: 평점 및 리뷰 📅 예정
- [ ] 영화 평점 시스템
- [ ] 리뷰 작성/수정
- [ ] 리뷰 좋아요

### Phase 4: AI 추천 엔진 🤖 예정
- [ ] Python AI 서버 구축
- [ ] 협업 필터링
- [ ] 콘텐츠 기반 필터링
- [ ] 하이브리드 추천

### Phase 5: 고급 기능 ⭐ 예정
- [ ] 감정 기반 추천
- [ ] OpenAI API 통합
- [ ] 추천 이유 설명

---

## 💡 사용 팁

### 시청 목록에 추가
영화 카드에 마우스를 올리면 북마크(📖) 아이콘이 나타납니다.

### 즐겨찾기
하트(❤️) 아이콘을 클릭하여 좋아하는 영화를 저장하세요.

### 실시간 검색
검색 페이지에서 타이핑하면 자동으로 검색됩니다.

### 데이터 저장
현재 시청 목록과 즐겨찾기는 브라우저의 localStorage에 저장됩니다.
Phase 2에서 데이터베이스로 업그레이드 예정입니다.

---

## 🐛 문제 해결

### "영화 데이터를 불러오는 중 문제가 발생했습니다"
1. `.env.local` 파일이 존재하는지 확인
2. `NEXT_PUBLIC_TMDB_API_KEY` 값이 올바른지 확인
3. 개발 서버 재시작: `Ctrl+C` → `npm run dev`

### 이미지가 안 보임
- TMDb API 키가 유효한지 확인
- 인터넷 연결 확인

### 빌드 에러
```bash
# node_modules 삭제 후 재설치
rm -rf node_modules
npm install
```

---

## 📚 문서

- **START_HERE.md** ← 지금 보고 있는 문서
- **QUICKSTART.md** - 3분 빠른 시작
- **SETUP.md** - 상세 설치 및 설정 가이드
- **README.md** - 전체 프로젝트 개요 및 로드맵

---

## 🎉 완성!

프로젝트가 성공적으로 구축되었습니다!

```bash
npm run dev
```

를 실행하고 http://localhost:3000 에서 확인하세요!

**Happy Coding! 🚀**

