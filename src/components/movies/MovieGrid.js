'use client';

import MovieCard from '@/components/common/MovieCard';

export default function MovieGrid({ movies, title }) {
    if (!movies || movies.length === 0) {
        return (
            <div className="py-20 text-center">
                <p className="text-gray-400">영화가 없습니다.</p>
            </div>
        );
    }

    return (
        <div>
            {title && (
                <h2 className="mb-6 text-2xl font-bold text-white">{title}</h2>
            )}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {movies.map((movie, index) => (
                    <MovieCard key={movie.id} movie={movie} index={index} />
                ))}
            </div>
        </div>
    );
}

