# 🎬 AI 기반 영화 추천 웹사이트

## 📋 프로젝트 개요
사용자의 취향을 AI가 분석하여 맞춤형 영화를 추천해주는 스마트 영화 추천 플랫폼입니다. 
머신러닝 알고리즘과 최신 웹 기술을 활용하여 개인화된 영화 추천 경험을 제공합니다.

## ✨ 주요 기능

### 1. AI 영화 추천 시스템
- **개인화된 추천**: 사용자의 시청 기록, 평점, 선호 장르 분석
- **감정 기반 추천**: 현재 기분에 맞는 영화 추천
- **유사 영화 추천**: 좋아하는 영화와 비슷한 작품 찾기
- **협업 필터링**: 비슷한 취향의 사용자들이 선호하는 영화 추천

### 2. 영화 검색 및 탐색
- **고급 검색**: 장르, 년도, 평점, 언어 등 다양한 필터
- **실시간 검색**: 자동완성 기능
- **트렌딩 영화**: 인기 상승 중인 영화 목록
- **카테고리별 탐색**: 장르, 테마별 영화 컬렉션

### 3. 사용자 기능
- **로그인**: 소셜 로그인 지원 (Google)
- **프로필 관리**: 선호 장르, 취향 설정
- **시청 목록**: 보고 싶은 영화, 본 영화 관리
- **평점 및 리뷰**: 영화 평가 및 리뷰 작성
- **친구 기능**: 친구 추가 및 추천 공유

### 4. 영화 정보
- **상세 정보**: 줄거리, 출연진, 감독, 제작 정보
- **예고편 재생**: YouTube 통합
- **리뷰 및 평점**: 사용자 및 평론가 리뷰
- **관련 콘텐츠**: 비하인드 영상, 포스터, 스틸컷

### 5. 커뮤니티
- **토론 게시판**: 영화별 토론 공간
- **추천 공유**: 자신의 추천 목록 공유
- **랭킹 시스템**: 인기 리뷰어, 추천 정확도

## 🛠 기술 스택

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Language**: JavaScript/TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand / React Context
- **Data Fetching**: SWR / React Query
- **Animation**: Framer Motion

### Backend & API
- **Backend**: Next.js API Routes / Node.js
- **Database**: PostgreSQL / MongoDB
- **ORM**: Prisma / Mongoose
- **Authentication**: NextAuth.js
- **File Storage**: Cloudinary / AWS S3

### AI/ML
- **추천 엔진**: Python (Flask/FastAPI)
- **ML Libraries**: 
  - scikit-learn (협업 필터링, 콘텐츠 기반 필터링)
  - TensorFlow/PyTorch (딥러닝 추천)
  - pandas, numpy (데이터 처리)
- **자연어 처리**: OpenAI API (감정 분석, 리뷰 요약)

### 외부 API
- **The Movie Database (TMDb) API**: 영화 정보, 포스터, 메타데이터
- **OpenAI API**: AI 기반 분석 및 추천
- **YouTube API**: 예고편 재생

### DevOps
- **Hosting**: Vercel / AWS
- **Database Hosting**: Supabase / MongoDB Atlas
- **AI Service**: Google Cloud / AWS Lambda
- **CI/CD**: GitHub Actions
- **Monitoring**: Vercel Analytics, Sentry

## 📁 프로젝트 구조

```
movie_site/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (auth)/              # 인증 관련 페이지
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (main)/              # 메인 페이지들
│   │   │   ├── page.js          # 홈
│   │   │   ├── movies/          # 영화 목록/상세
│   │   │   ├── recommendations/ # 추천 페이지
│   │   │   ├── search/          # 검색
│   │   │   └── profile/         # 프로필
│   │   ├── api/                 # API Routes
│   │   │   ├── auth/
│   │   │   ├── movies/
│   │   │   ├── recommendations/
│   │   │   └── users/
│   │   ├── layout.js
│   │   └── globals.css
│   ├── components/              # React 컴포넌트
│   │   ├── common/              # 공통 컴포넌트
│   │   ├── movies/              # 영화 관련
│   │   ├── recommendations/     # 추천 관련
│   │   └── layout/              # 레이아웃
│   ├── lib/                     # 유틸리티, 설정
│   │   ├── db.js               # 데이터베이스 연결
│   │   ├── tmdb.js             # TMDb API
│   │   ├── ai.js               # AI 서비스 연동
│   │   └── auth.js             # 인증 설정
│   ├── hooks/                   # Custom React Hooks
│   ├── store/                   # 상태 관리
│   └── utils/                   # 헬퍼 함수
├── ai_engine/                   # AI 추천 엔진 (Python)
│   ├── app.py                  # Flask/FastAPI 서버
│   ├── models/                 # ML 모델
│   │   ├── collaborative.py
│   │   ├── content_based.py
│   │   └── hybrid.py
│   ├── data/                   # 데이터셋
│   └── requirements.txt
├── public/                      # 정적 파일
├── prisma/                      # Prisma 스키마
│   └── schema.prisma
├── .env.local                   # 환경 변수
├── next.config.mjs
├── tailwind.config.js
└── package.json
```

## 🗄 데이터베이스 스키마

### Users
- id, email, password, name, avatar
- preferences (선호 장르, 배우, 감독)
- createdAt, updatedAt

### Movies
- id, tmdb_id, title, overview, genres
- release_date, rating, poster_path
- cast, director, runtime

### UserMovies (시청 기록)
- id, user_id, movie_id
- watched, watchlist, favorite
- user_rating, review
- watched_date

### Recommendations
- id, user_id, movie_id
- recommendation_type (ai, similar, trending)
- score, reason
- createdAt

### Reviews
- id, user_id, movie_id
- rating, content
- likes, createdAt

## 🚀 개발 로드맵

### Phase 1: 기본 구조 (1-2주)
- [ ] Next.js 프로젝트 셋업 및 기본 레이아웃
- [ ] TMDb API 연동
- [ ] 영화 목록 및 상세 페이지
- [ ] 기본 검색 기능
- [ ] 반응형 디자인 구현

### Phase 2: 사용자 시스템 (1-2주)
- [ ] NextAuth.js 인증 구현
- [ ] 회원가입/로그인 페이지
- [ ] 소셜 로그인 (Google, GitHub)
- [ ] 사용자 프로필 관리
- [ ] 시청 목록 (Watchlist) 기능

### Phase 3: 평점 및 리뷰 (1주)
- [ ] 영화 평점 시스템
- [ ] 리뷰 작성 및 수정
- [ ] 리뷰 좋아요 기능
- [ ] 사용자 활동 피드

### Phase 4: AI 추천 엔진 (2-3주)
- [ ] Python Flask/FastAPI 서버 구축
- [ ] 협업 필터링 모델 개발
- [ ] 콘텐츠 기반 필터링 모델
- [ ] 하이브리드 추천 시스템
- [ ] Next.js와 AI 엔진 연동
- [ ] 개인화된 추천 페이지

### Phase 5: 고급 기능 (2주)
- [ ] 감정 기반 추천
- [ ] OpenAI API 활용한 스마트 추천
- [ ] 유사 영화 추천
- [ ] 트렌딩 알고리즘
- [ ] 추천 이유 설명 기능

### Phase 6: 커뮤니티 (1-2주)
- [ ] 토론 게시판
- [ ] 친구 시스템
- [ ] 추천 공유 기능
- [ ] 알림 시스템

### Phase 7: 최적화 및 배포 (1주)
- [ ] 성능 최적화 (이미지, 코드 스플리팅)
- [ ] SEO 최적화
- [ ] PWA 기능 추가
- [ ] Vercel 배포
- [ ] 모니터링 설정

## 🔧 설치 및 실행

### 사전 요구사항
- Node.js 18+
- Python 3.9+ (AI 엔진용)
- PostgreSQL / MongoDB
- TMDb API Key

### 설치

```bash
# 1. 저장소 클론
git clone <repository-url>
cd movie_site

# 2. 의존성 설치
npm install

# 3. 환경 변수 설정
cp .env.example .env.local
# .env.local 파일에 API 키 입력

# 4. 데이터베이스 설정
npx prisma migrate dev

# 5. 개발 서버 실행
npm run dev
```

### AI 엔진 실행

```bash
cd ai_engine
pip install -r requirements.txt
python app.py
```

### 환경 변수

```env
# Database
DATABASE_URL="postgresql://..."

# TMDb API
TMDB_API_KEY="your_tmdb_api_key"
TMDB_ACCESS_TOKEN="your_access_token"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_secret"

# OAuth
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
GITHUB_ID="..."
GITHUB_SECRET="..."

# OpenAI
OPENAI_API_KEY="your_openai_key"

# AI Engine
AI_ENGINE_URL="http://localhost:5000"
```

## 📊 AI 추천 알고리즘

### 1. 협업 필터링 (Collaborative Filtering)
- User-based: 비슷한 취향의 사용자들이 좋아한 영화 추천
- Item-based: 비슷한 특성을 가진 영화 추천
- Matrix Factorization (SVD, ALS)

### 2. 콘텐츠 기반 필터링 (Content-Based)
- 장르, 감독, 배우, 키워드 분석
- TF-IDF를 활용한 줄거리 유사도 계산
- 코사인 유사도 측정

### 3. 하이브리드 시스템
- 협업 필터링 + 콘텐츠 기반 결합
- 가중 평균 또는 메타 학습 활용
- Cold Start 문제 해결

### 4. 딥러닝 기반 추천
- Neural Collaborative Filtering
- 사용자/영화 임베딩 학습
- 컨텍스트 정보 활용 (시간, 기분 등)

## 🎨 UI/UX 설계 원칙

- **직관적인 네비게이션**: 명확한 메뉴 구조
- **빠른 로딩**: 이미지 최적화, 레이지 로딩
- **아름다운 비주얼**: 영화 포스터 중심의 그리드 레이아웃
- **부드러운 애니메이션**: Framer Motion 활용
- **다크 모드**: 영화 감상에 적합한 다크 테마
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 대응

## 🔒 보안 고려사항

- **인증**: JWT 토큰, secure HTTP-only 쿠키
- **비밀번호**: bcrypt 해싱
- **API 보호**: Rate limiting, CORS 설정
- **XSS/CSRF 방지**: Next.js 기본 보호 + 추가 검증
- **환경 변수**: 민감한 정보는 .env에 분리

## 📈 성능 최적화

- **이미지 최적화**: Next.js Image 컴포넌트
- **코드 스플리팅**: 동적 import
- **캐싱**: SWR/React Query 활용
- **CDN**: Vercel Edge Network
- **데이터베이스**: 인덱싱, 쿼리 최적화

## 🤝 기여 방법

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 라이선스

This project is licensed under the MIT License.

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 등록해주세요.

---

**Made with ❤️ and AI**
