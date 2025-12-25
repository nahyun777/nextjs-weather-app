'use client';

import { Film, Github, Heart } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="border-t border-gray-800 bg-gray-900 pb-20 md:pb-0">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {/* 로고 및 설명 */}
                    <div>
                        <div className="flex items-center gap-2 text-xl font-bold">
                            <Film className="h-6 w-6 text-blue-500" />
                            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                                MovieAI
                            </span>
                        </div>
                        <p className="mt-2 text-sm text-gray-400">
                            AI 기반 영화 추천 플랫폼
                            <br />
                            당신의 취향에 맞는 완벽한 영화를 찾아드립니다.
                        </p>
                    </div>

                    {/* 링크 */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold text-white">탐색</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/" className="text-gray-400 hover:text-blue-400">
                                    홈
                                </Link>
                            </li>
                            <li>
                                <Link href="/movies" className="text-gray-400 hover:text-blue-400">
                                    영화 목록
                                </Link>
                            </li>
                            <li>
                                <Link href="/recommendations" className="text-gray-400 hover:text-blue-400">
                                    AI 추천
                                </Link>
                            </li>
                            <li>
                                <Link href="/search" className="text-gray-400 hover:text-blue-400">
                                    검색
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* 정보 */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold text-white">정보</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>데이터 제공: TMDb API</li>
                            <li>개발: Next.js 15 + React 19</li>
                            <li className="flex items-center gap-1">
                                Made with <Heart className="h-4 w-4 fill-red-500 text-red-500" /> and AI
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 border-t border-gray-800 pt-6 text-center">
                    <p className="text-sm text-gray-400">
                        © {new Date().getFullYear()} MovieAI. All rights reserved.
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                        This product uses the TMDb API but is not endorsed or certified by TMDb.
                    </p>
                </div>
            </div>
        </footer>
    );
}

