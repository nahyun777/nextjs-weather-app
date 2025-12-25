import { getPopular, getTrending, getTopRated, getNowPlaying, getUpcoming } from '@/lib/tmdb';
import MovieGrid from '@/components/movies/MovieGrid';

export default async function MoviesPage({ searchParams }) {
    const category = searchParams?.category || 'popular';

    let moviesData;
    let title;

    try {
        switch (category) {
            case 'trending':
                moviesData = await getTrending('week');
                title = '🔥 트렌딩 영화';
                break;
            case 'top-rated':
                moviesData = await getTopRated();
                title = '⭐ 높은 평점 영화';
                break;
            case 'now-playing':
                moviesData = await getNowPlaying();
                title = '🎬 현재 상영중';
                break;
            case 'upcoming':
                moviesData = await getUpcoming();
                title = '🎭 개봉 예정';
                break;
            default:
                moviesData = await getPopular();
                title = '🔥 인기 영화';
        }

        return (
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* 카테고리 필터 */}
                <div className="mb-8 flex flex-wrap gap-2">
                    {[
                        { key: 'popular', label: '인기' },
                        { key: 'trending', label: '트렌딩' },
                        { key: 'top-rated', label: '높은 평점' },
                        { key: 'now-playing', label: '현재 상영중' },
                        { key: 'upcoming', label: '개봉 예정' },
                    ].map((cat) => (
                        <a
                            key={cat.key}
                            href={`/movies?category=${cat.key}`}
                            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${category === cat.key
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                }`}
                        >
                            {cat.label}
                        </a>
                    ))}
                </div>

                <MovieGrid movies={moviesData.results} title={title} />
            </div>
        );
    } catch (error) {
        console.error('Error loading movies:', error);
        return (
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="rounded-lg bg-red-500/10 p-8 text-center">
                    <h2 className="mb-2 text-2xl font-bold text-red-500">오류가 발생했습니다</h2>
                    <p className="text-gray-300">영화 데이터를 불러오는 중 문제가 발생했습니다.</p>
                </div>
            </div>
        );
    }
}

