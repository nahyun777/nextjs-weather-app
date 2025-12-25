'use client';

import { useStore } from '@/store/useStore';
import MovieGrid from '@/components/movies/MovieGrid';
import { Heart } from 'lucide-react';
import Link from 'next/link';

export default function FavoritesPage() {
    const favorites = useStore((state) => state.favorites);

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-center gap-3">
                <Heart className="h-8 w-8 fill-red-500 text-red-500" />
                <h1 className="text-4xl font-bold text-white">즐겨찾기</h1>
            </div>

            {favorites.length > 0 ? (
                <>
                    <p className="mb-6 text-gray-400">
                        {favorites.length}개의 영화를 즐겨찾기했습니다
                    </p>
                    <MovieGrid movies={favorites} />
                </>
            ) : (
                <div className="py-20 text-center">
                    <Heart className="mx-auto mb-4 h-16 w-16 text-gray-600" />
                    <p className="mb-2 text-xl text-gray-400">즐겨찾기가 비어있습니다</p>
                    <p className="mb-6 text-gray-500">좋아하는 영화를 즐겨찾기에 추가하세요</p>
                    <Link
                        href="/movies"
                        className="inline-block rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white hover:bg-blue-600"
                    >
                        영화 둘러보기
                    </Link>
                </div>
            )}
        </div>
    );
}

