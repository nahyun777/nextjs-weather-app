# 🚀 빠른 시작

## ⚡ 3분 안에 시작하기

### 1단계: TMDb API 키 발급 (2분)

1. [TMDb 회원가입](https://www.themoviedb.org/signup) 
2. 로그인 후 [API 설정 페이지](https://www.themoviedb.org/settings/api)로 이동
3. "API 키 요청" 클릭
4. 간단한 정보 입력 후 API 키 발급

### 2단계: 환경 변수 설정 (30초)

프로젝트 루트에 `.env.local` 파일 생성:

```bash
# Windows
copy nul .env.local

# Mac/Linux
touch .env.local
```

`.env.local` 파일에 다음 내용 추가:

```env
NEXT_PUBLIC_TMDB_API_KEY=여기에_발급받은_API_키_붙여넣기
```

### 3단계: 실행 (30초)

```bash
npm run dev
```

브라우저에서 http://localhost:3000 열기!

---

## 🎉 완료!

이제 다음 기능을 사용할 수 있습니다:

- ✅ 영화 검색
- ✅ 트렌딩/인기/평점 높은 영화 탐색
- ✅ 영화 상세 정보 확인
- ✅ 시청 목록에 추가
- ✅ 즐겨찾기 저장

---

## 📱 주요 페이지

- **홈**: http://localhost:3000
- **영화 목록**: http://localhost:3000/movies
- **검색**: http://localhost:3000/search
- **시청 목록**: http://localhost:3000/watchlist
- **즐겨찾기**: http://localhost:3000/favorites

---

## ⚠️ 문제 해결

### "영화 데이터를 불러오는 중 문제가 발생했습니다"
➡️ `.env.local` 파일에 API 키가 올바르게 설정되었는지 확인
➡️ 개발 서버 재시작: `Ctrl+C` 후 `npm run dev`

### 이미지가 안 보임
➡️ TMDb API 키가 유효한지 확인
➡️ 인터넷 연결 확인

---

## 🎨 사용 팁

1. **시청 목록**: 영화 카드에 마우스를 올리면 북마크 아이콘이 나타납니다
2. **즐겨찾기**: 하트 아이콘을 클릭하여 좋아하는 영화를 저장하세요
3. **검색**: 실시간으로 영화를 검색할 수 있습니다
4. **반응형**: 모바일에서도 완벽하게 작동합니다

---

자세한 설명은 `SETUP.md`를 참고하세요!

