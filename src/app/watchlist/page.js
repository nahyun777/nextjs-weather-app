'use client';

import { useStore } from '@/store/useStore';
import MovieGrid from '@/components/movies/MovieGrid';
import { Bookmark } from 'lucide-react';
import Link from 'next/link';

export default function WatchlistPage() {
    const watchlist = useStore((state) => state.watchlist);

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-center gap-3">
                <Bookmark className="h-8 w-8 text-blue-500" />
                <h1 className="text-4xl font-bold text-white">시청 목록</h1>
            </div>

            {watchlist.length > 0 ? (
                <>
                    <p className="mb-6 text-gray-400">
                        {watchlist.length}개의 영화가 시청 목록에 있습니다
                    </p>
                    <MovieGrid movies={watchlist} />
                </>
            ) : (
                <div className="py-20 text-center">
                    <Bookmark className="mx-auto mb-4 h-16 w-16 text-gray-600" />
                    <p className="mb-2 text-xl text-gray-400">시청 목록이 비어있습니다</p>
                    <p className="mb-6 text-gray-500">영화를 추가하여 나중에 볼 영화를 관리하세요</p>
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

