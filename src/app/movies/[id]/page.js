import Image from 'next/image';
import Link from 'next/link';
import { Star, Clock, Calendar, Heart, Bookmark, Play, ChevronLeft } from 'lucide-react';
import { getMovieDetails, getBackdropUrl, getPosterUrl, getProfileUrl } from '@/lib/tmdb';
import { formatRuntime, formatDate, formatCurrency } from '@/utils/helpers';
import MovieSection from '@/components/movies/MovieSection';

export default async function MovieDetailPage({ params }) {
    try {
        const movie = await getMovieDetails(params.id);

        return (
            <div className="min-h-screen">
                {/* 배경 이미지와 그라데이션 오버레이 */}
                <div className="relative">
                    <div className="absolute inset-0 h-[600px]">
                        <Image
                            src={getBackdropUrl(movie.backdrop_path)}
                            alt={movie.title}
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-gray-900/40" />
                    </div>

                    {/* 영화 상세 정보 */}
                    <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                        {/* 뒤로가기 버튼 */}
                        <Link
                            href="/movies"
                            className="mb-4 inline-flex items-center gap-2 text-gray-300 hover:text-white"
                        >
                            <ChevronLeft className="h-5 w-5" />
                            목록으로 돌아가기
                        </Link>

                        <div className="flex flex-col gap-8 pt-20 md:flex-row">
                            {/* 포스터 */}
                            <div className="flex-shrink-0">
                                <div className="relative h-[450px] w-[300px] overflow-hidden rounded-lg shadow-2xl">
                                    <Image
                                        src={getPosterUrl(movie.poster_path)}
                                        alt={movie.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>

                            {/* 정보 */}
                            <div className="flex-1">
                                <h1 className="mb-2 text-4xl font-bold text-white md:text-5xl">
                                    {movie.title}
                                </h1>
                                {movie.original_title !== movie.title && (
                                    <p className="mb-4 text-xl text-gray-400">{movie.original_title}</p>
                                )}

                                {/* 메타 정보 */}
                                <div className="mb-6 flex flex-wrap items-center gap-4 text-gray-300">
                                    <div className="flex items-center gap-1">
                                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                        <span className="text-lg font-semibold">
                                            {movie.vote_average?.toFixed(1)}
                                        </span>
                                        <span className="text-sm text-gray-400">
                                            ({movie.vote_count?.toLocaleString()} 투표)
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-5 w-5" />
                                        {formatDate(movie.release_date)}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-5 w-5" />
                                        {formatRuntime(movie.runtime)}
                                    </div>
                                </div>

                                {/* 장르 */}
                                <div className="mb-6 flex flex-wrap gap-2">
                                    {movie.genres?.map((genre) => (
                                        <span
                                            key={genre.id}
                                            className="rounded-full bg-blue-500/20 px-3 py-1 text-sm text-blue-300"
                                        >
                                            {genre.name}
                                        </span>
                                    ))}
                                </div>

                                {/* 액션 버튼 */}
                                <div className="mb-6 flex flex-wrap gap-3">
                                    <button className="flex items-center gap-2 rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white hover:bg-blue-600">
                                        <Play className="h-5 w-5" />
                                        예고편 보기
                                    </button>
                                    <button className="flex items-center gap-2 rounded-lg bg-gray-800 px-4 py-3 text-white hover:bg-gray-700">
                                        <Bookmark className="h-5 w-5" />
                                    </button>
                                    <button className="flex items-center gap-2 rounded-lg bg-gray-800 px-4 py-3 text-white hover:bg-gray-700">
                                        <Heart className="h-5 w-5" />
                                    </button>
                                </div>

                                {/* 태그라인 */}
                                {movie.tagline && (
                                    <p className="mb-4 italic text-gray-400">"{movie.tagline}"</p>
                                )}

                                {/* 줄거리 */}
                                <div className="mb-6">
                                    <h2 className="mb-2 text-2xl font-bold text-white">줄거리</h2>
                                    <p className="leading-relaxed text-gray-300">{movie.overview}</p>
                                </div>

                                {/* 추가 정보 */}
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    {movie.budget > 0 && (
                                        <div>
                                            <span className="text-gray-400">제작비:</span>{' '}
                                            <span className="text-white">{formatCurrency(movie.budget)}</span>
                                        </div>
                                    )}
                                    {movie.revenue > 0 && (
                                        <div>
                                            <span className="text-gray-400">수익:</span>{' '}
                                            <span className="text-white">{formatCurrency(movie.revenue)}</span>
                                        </div>
                                    )}
                                    {movie.production_countries?.[0] && (
                                        <div>
                                            <span className="text-gray-400">제작 국가:</span>{' '}
                                            <span className="text-white">
                                                {movie.production_countries.map((c) => c.name).join(', ')}
                                            </span>
                                        </div>
                                    )}
                                    {movie.spoken_languages?.[0] && (
                                        <div>
                                            <span className="text-gray-400">언어:</span>{' '}
                                            <span className="text-white">
                                                {movie.spoken_languages.map((l) => l.korean_name || l.english_name).join(', ')}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 출연진 */}
                {movie.credits?.cast && movie.credits.cast.length > 0 && (
                    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                        <h2 className="mb-6 text-2xl font-bold text-white">출연진</h2>
                        <div className="flex gap-4 overflow-x-auto pb-4">
                            {movie.credits.cast.slice(0, 10).map((person) => (
                                <div
                                    key={person.id}
                                    className="flex-shrink-0 w-32 text-center"
                                >
                                    <div className="relative mb-2 h-32 w-32 overflow-hidden rounded-lg bg-gray-800">
                                        {person.profile_path ? (
                                            <Image
                                                src={getProfileUrl(person.profile_path)}
                                                alt={person.name}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center text-gray-500">
                                                No Image
                                            </div>
                                        )}
                                    </div>
                                    <p className="mb-1 text-sm font-semibold text-white">{person.name}</p>
                                    <p className="text-xs text-gray-400">{person.character}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 제작진 */}
                {movie.credits?.crew && movie.credits.crew.length > 0 && (
                    <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
                        <h2 className="mb-6 text-2xl font-bold text-white">주요 제작진</h2>
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                            {movie.credits.crew
                                .filter((person) => ['Director', 'Producer', 'Writer', 'Screenplay'].includes(person.job))
                                .slice(0, 8)
                                .map((person, index) => (
                                    <div key={index} className="text-sm">
                                        <p className="font-semibold text-white">{person.name}</p>
                                        <p className="text-gray-400">{person.job}</p>
                                    </div>
                                ))}
                        </div>
                    </div>
                )}

                {/* 유사한 영화 */}
                {movie.similar?.results && movie.similar.results.length > 0 && (
                    <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
                        <MovieSection title="비슷한 영화" movies={movie.similar.results} />
                    </div>
                )}

                {/* 추천 영화 */}
                {movie.recommendations?.results && movie.recommendations.results.length > 0 && (
                    <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
                        <MovieSection title="추천 영화" movies={movie.recommendations.results} />
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('Error loading movie details:', error);
        return (
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="rounded-lg bg-red-500/10 p-8 text-center">
                    <h2 className="mb-2 text-2xl font-bold text-red-500">영화를 찾을 수 없습니다</h2>
                    <p className="text-gray-300">요청하신 영화 정보를 불러올 수 없습니다.</p>
                    <Link href="/movies" className="mt-4 inline-block text-blue-400 hover:text-blue-300">
                        영화 목록으로 돌아가기
                    </Link>
                </div>
            </div>
        );
    }
}

