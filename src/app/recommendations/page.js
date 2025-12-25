'use client';

import { Sparkles, TrendingUp, Star, Heart } from 'lucide-react';
import Link from 'next/link';

export default function RecommendationsPage() {
    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-center gap-3">
                <Sparkles className="h-8 w-8 text-yellow-400" />
                <h1 className="text-4xl font-bold text-white">AI 영화 추천</h1>
            </div>

            <div className="mb-12 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 p-8 text-center">
                <Sparkles className="mx-auto mb-4 h-16 w-16 text-yellow-300" />
                <h2 className="mb-2 text-3xl font-bold text-white">AI 추천 기능 준비 중</h2>
                <p className="text-lg text-white/90">
                    Phase 4에서 구현될 예정입니다
                </p>
            </div>

            {/* 추천 기능 소개 */}
            <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-lg bg-gray-800 p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/20">
                        <TrendingUp className="h-6 w-6 text-blue-400" />
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-white">협업 필터링</h3>
                    <p className="text-gray-400">
                        비슷한 취향을 가진 사용자들이 좋아하는 영화를 추천해드립니다.
                    </p>
                </div>

                <div className="rounded-lg bg-gray-800 p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/20">
                        <Star className="h-6 w-6 text-purple-400" />
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-white">콘텐츠 기반</h3>
                    <p className="text-gray-400">
                        영화의 장르, 감독, 배우 등을 분석하여 유사한 작품을 찾아드립니다.
                    </p>
                </div>

                <div className="rounded-lg bg-gray-800 p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-pink-500/20">
                        <Heart className="h-6 w-6 text-pink-400" />
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-white">감정 기반</h3>
                    <p className="text-gray-400">
                        현재 기분에 맞는 완벽한 영화를 AI가 추천해드립니다.
                    </p>
                </div>
            </div>

            <div className="mt-12 text-center">
                <p className="mb-4 text-gray-400">
                    지금은 영화를 탐색하고 즐겨찾기에 추가해보세요
                </p>
                <Link
                    href="/movies"
                    className="inline-block rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white hover:bg-blue-600"
                >
                    영화 둘러보기
                </Link>
            </div>
        </div>
    );
}

