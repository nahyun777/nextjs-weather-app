'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, Heart, Bookmark } from 'lucide-react';
import { motion } from 'framer-motion';
import { getPosterUrl } from '@/lib/tmdb';
import { getYear, ratingToPercent } from '@/utils/helpers';
import { useStore } from '@/store/useStore';

export default function MovieCard({ movie, index = 0 }) {
    const { addToWatchlist, removeFromWatchlist, isInWatchlist, addToFavorites, removeFromFavorites, isInFavorites } = useStore();

    const inWatchlist = isInWatchlist(movie.id);
    const inFavorites = isInFavorites(movie.id);

    const handleWatchlistToggle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (inWatchlist) {
            removeFromWatchlist(movie.id);
        } else {
            addToWatchlist(movie);
        }
    };

    const handleFavoriteToggle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (inFavorites) {
            removeFromFavorites(movie.id);
        } else {
            addToFavorites(movie);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="group relative"
        >
            <Link href={`/movies/${movie.id}`}>
                <div className="relative overflow-hidden rounded-lg bg-gray-800 shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl">
                    {/* 포스터 이미지 */}
                    <div className="relative aspect-[2/3] w-full">
                        <Image
                            src={getPosterUrl(movie.poster_path)}
                            alt={movie.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />

                        {/* 호버 오버레이 */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                        {/* 평점 배지 */}
                        <div className="absolute top-2 left-2 flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 backdrop-blur-sm">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs font-semibold text-white">
                                {movie.vote_average?.toFixed(1) || 'N/A'}
                            </span>
                        </div>

                        {/* 액션 버튼들 */}
                        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <button
                                onClick={handleWatchlistToggle}
                                className={`rounded-full p-2 backdrop-blur-sm transition-colors ${inWatchlist ? 'bg-blue-500/90 text-white' : 'bg-black/70 text-white hover:bg-blue-500/90'
                                    }`}
                                title={inWatchlist ? '시청 목록에서 제거' : '시청 목록에 추가'}
                            >
                                <Bookmark className={`h-4 w-4 ${inWatchlist ? 'fill-white' : ''}`} />
                            </button>
                            <button
                                onClick={handleFavoriteToggle}
                                className={`rounded-full p-2 backdrop-blur-sm transition-colors ${inFavorites ? 'bg-red-500/90 text-white' : 'bg-black/70 text-white hover:bg-red-500/90'
                                    }`}
                                title={inFavorites ? '즐겨찾기에서 제거' : '즐겨찾기에 추가'}
                            >
                                <Heart className={`h-4 w-4 ${inFavorites ? 'fill-white' : ''}`} />
                            </button>
                        </div>

                        {/* 호버 시 보이는 정보 */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <p className="line-clamp-3 text-xs text-white">
                                {movie.overview || '설명이 없습니다.'}
                            </p>
                        </div>
                    </div>

                    {/* 영화 정보 */}
                    <div className="p-3">
                        <h3 className="mb-1 line-clamp-1 font-semibold text-white group-hover:text-blue-400">
                            {movie.title}
                        </h3>
                        <p className="text-sm text-gray-400">
                            {getYear(movie.release_date)}
                        </p>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

