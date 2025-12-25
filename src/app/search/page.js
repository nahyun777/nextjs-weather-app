'use client';

import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { searchMovies } from '@/lib/tmdb';
import MovieGrid from '@/components/movies/MovieGrid';
import { LoadingSkeleton } from '@/components/common/Loading';
import { debounce } from '@/utils/helpers';

export default function SearchPage() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    // 디바운스된 검색 함수
    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            setSearched(false);
            return;
        }

        const debouncedSearch = debounce(async () => {
            setLoading(true);
            try {
                const data = await searchMovies(query);
                setResults(data.results);
                setSearched(true);
            } catch (error) {
                console.error('Search error:', error);
                setResults([]);
            } finally {
                setLoading(false);
            }
        }, 500);

        debouncedSearch();
    }, [query]);

    const handleClear = () => {
        setQuery('');
        setResults([]);
        setSearched(false);
    };

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {/* 검색 섹션 */}
            <div className="mb-12">
                <h1 className="mb-6 text-4xl font-bold text-white">영화 검색</h1>

                {/* 검색 입력 */}
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="영화 제목을 입력하세요..."
                        className="w-full rounded-lg bg-gray-800 py-4 pl-12 pr-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                    />
                    {query && (
                        <button
                            onClick={handleClear}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    )}
                </div>

                {/* 검색 결과 카운트 */}
                {searched && !loading && (
                    <p className="mt-4 text-gray-400">
                        {results.length > 0
                            ? `${results.length}개의 결과를 찾았습니다`
                            : '검색 결과가 없습니다'}
                    </p>
                )}
            </div>

            {/* 검색 결과 */}
            {loading ? (
                <LoadingSkeleton count={12} />
            ) : searched && results.length > 0 ? (
                <MovieGrid movies={results} />
            ) : searched && results.length === 0 ? (
                <div className="py-20 text-center">
                    <p className="text-xl text-gray-400">
                        "{query}"에 대한 검색 결과가 없습니다.
                    </p>
                    <p className="mt-2 text-gray-500">다른 검색어를 시도해보세요.</p>
                </div>
            ) : (
                <div className="py-20 text-center">
                    <Search className="mx-auto mb-4 h-16 w-16 text-gray-600" />
                    <p className="text-xl text-gray-400">영화 제목을 검색해보세요</p>
                    <p className="mt-2 text-gray-500">좋아하는 영화를 찾아드립니다</p>
                </div>
            )}
        </div>
    );
}

