import { getTrending, getPopular, getTopRated, getNowPlaying } from '@/lib/tmdb';
import MovieSection from '@/components/movies/MovieSection';
import { Sparkles } from 'lucide-react';

export default async function Home() {
  try {
    // 병렬로 여러 API 호출
    const [trendingData, popularData, topRatedData, nowPlayingData] = await Promise.all([
      getTrending('week'),
      getPopular(),
      getTopRated(),
      getNowPlaying(),
    ]);

    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* 히어로 섹션 */}
        <section className="mb-12 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-8 text-center md:p-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="h-10 w-10 text-yellow-300" />
            <h1 className="text-4xl font-bold text-white md:text-5xl">
              AI 기반 영화 추천
            </h1>
            <Sparkles className="h-10 w-10 text-yellow-300" />
          </div>
          <p className="text-lg text-white/90 md:text-xl">
            당신의 취향에 맞는 완벽한 영화를 찾아드립니다
          </p>
        </section>

        {/* 영화 섹션들 */}
        <MovieSection
          title="🔥 이번 주 트렌딩"
          movies={trendingData.results}
          viewAllLink="/movies?category=trending"
        />

        <MovieSection
          title="⭐ 높은 평점"
          movies={topRatedData.results}
          viewAllLink="/movies?category=top-rated"
        />

        <MovieSection
          title="🎬 현재 상영중"
          movies={nowPlayingData.results}
          viewAllLink="/movies?category=now-playing"
        />

        <MovieSection
          title="🔥 인기 영화"
          movies={popularData.results}
          viewAllLink="/movies?category=popular"
        />
      </div>
    );
  } catch (error) {
    console.error('Error loading home page:', error);
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-red-500/10 p-8 text-center">
          <h2 className="mb-2 text-2xl font-bold text-red-500">오류가 발생했습니다</h2>
          <p className="text-gray-300">
            영화 데이터를 불러오는 중 문제가 발생했습니다.
            <br />
            .env.local 파일에 TMDb API 키가 설정되어 있는지 확인해주세요.
          </p>
        </div>
      </div>
    );
  }
}
