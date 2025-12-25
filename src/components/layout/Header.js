'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Film, Search, Home, Compass, Heart, Bookmark, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header() {
    const pathname = usePathname();

    const navItems = [
        { href: '/', label: '홈', icon: Home },
        { href: '/movies', label: '영화', icon: Compass },
        { href: '/search', label: '검색', icon: Search },
        { href: '/recommendations', label: 'AI 추천', icon: Sparkles },
        { href: '/watchlist', label: '시청 목록', icon: Bookmark },
        { href: '/favorites', label: '즐겨찾기', icon: Heart },
    ];

    return (
        <header className="sticky top-0 z-50 border-b border-gray-800 bg-gray-900/95 backdrop-blur-sm">
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* 로고 */}
                    <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
                        <Film className="h-8 w-8 text-blue-500" />
                        <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                            MovieAI
                        </span>
                    </Link>

                    {/* 네비게이션 - 데스크톱 */}
                    <div className="hidden items-center gap-1 md:flex">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="relative px-3 py-2 text-sm font-medium transition-colors hover:text-blue-400"
                                >
                                    <div className="flex items-center gap-2">
                                        <Icon className="h-4 w-4" />
                                        <span className={isActive ? 'text-blue-400' : 'text-gray-300'}>
                                            {item.label}
                                        </span>
                                    </div>
                                    {isActive && (
                                        <motion.div
                                            layoutId="navbar-indicator"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    {/* 네비게이션 - 모바일 (간소화) */}
                    <div className="flex items-center gap-4 md:hidden">
                        <Link href="/search">
                            <Search className="h-6 w-6 text-gray-300 hover:text-blue-400" />
                        </Link>
                    </div>
                </div>

                {/* 모바일 네비게이션 - 하단 고정 */}
                <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-800 bg-gray-900 md:hidden">
                    <div className="grid grid-cols-5 gap-1 px-2 py-2">
                        {navItems.slice(0, 5).map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="flex flex-col items-center justify-center gap-1 rounded-lg px-2 py-2 transition-colors hover:bg-gray-800"
                                >
                                    <Icon className={`h-5 w-5 ${isActive ? 'text-blue-400' : 'text-gray-400'}`} />
                                    <span className={`text-xs ${isActive ? 'text-blue-400' : 'text-gray-400'}`}>
                                        {item.label}
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </nav>
        </header>
    );
}

