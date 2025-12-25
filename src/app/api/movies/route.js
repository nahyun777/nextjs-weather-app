import { getPopular, getTrending, getTopRated, getNowPlaying } from '@/lib/tmdb';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || 'popular';
    const page = parseInt(searchParams.get('page') || '1');

    try {
        let data;

        switch (category) {
            case 'trending':
                data = await getTrending('week');
                break;
            case 'top-rated':
                data = await getTopRated(page);
                break;
            case 'now-playing':
                data = await getNowPlaying(page);
                break;
            default:
                data = await getPopular(page);
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch movies' },
            { status: 500 }
        );
    }
}

