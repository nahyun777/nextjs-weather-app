'use client';

import { motion } from 'framer-motion';
import { Film } from 'lucide-react';

export default function Loading({ fullScreen = false }) {
    const containerClass = fullScreen
        ? 'flex min-h-screen items-center justify-center bg-gray-900'
        : 'flex items-center justify-center py-20';

    return (
        <div className={containerClass}>
            <motion.div
                className="flex flex-col items-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <motion.div
                    animate={{
                        rotate: 360,
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        rotate: {
                            duration: 2,
                            repeat: Infinity,
                            ease: 'linear',
                        },
                        scale: {
                            duration: 1,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        },
                    }}
                >
                    <Film className="h-12 w-12 text-blue-500" />
                </motion.div>
                <motion.p
                    className="text-lg font-medium text-gray-300"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                    로딩 중...
                </motion.p>
            </motion.div>
        </div>
    );
}

export function LoadingSkeleton({ count = 8 }) {
    return (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {[...Array(count)].map((_, i) => (
                <div key={i} className="animate-pulse">
                    <div className="aspect-[2/3] rounded-lg bg-gray-700" />
                    <div className="mt-2 space-y-2">
                        <div className="h-4 rounded bg-gray-700" />
                        <div className="h-3 w-2/3 rounded bg-gray-700" />
                    </div>
                </div>
            ))}
        </div>
    );
}

