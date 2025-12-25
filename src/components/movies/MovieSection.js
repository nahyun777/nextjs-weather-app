'use client';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import MovieCard from '@/components/common/MovieCard';

export default function MovieSection({ title, movies, viewAllLink }) {
    if (!movies || movies.length === 0) {
        return null;
    }

    return (
        <section className="mb-12">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white md:text-3xl">{title}</h2>
                {viewAllLink && (
                    <Link
                        href={viewAllLink}
                        className="flex items-center gap-1 text-sm font-medium text-blue-400 hover:text-blue-300"
                    >
                        전체 보기
                        <ChevronRight className="h-4 w-4" />
                    </Link>
                )}
            </div>

            <div className="relative">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                    {movies.slice(0, 12).map((movie, index) => (
                        <MovieCard key={movie.id} movie={movie} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

