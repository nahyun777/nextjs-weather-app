import axios from 'axios';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

// Axios 인스턴스 생성
const tmdbApi = axios.create({
    baseURL: TMDB_BASE_URL,
    params: {
        api_key: API_KEY,
        language: 'ko-KR', // 한국어 설정
    },
});

// 이미지 URL 생성 헬퍼
export const getImageUrl = (path, size = 'original') => {
    if (!path) return 'https://via.placeholder.com/500x750/1f2937/6b7280?text=No+Image';
    return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

// 포스터 이미지 URL (다양한 크기)
export const getPosterUrl = (path, size = 'w500') => getImageUrl(path, size);

// 배경 이미지 URL
export const getBackdropUrl = (path, size = 'w1280') => getImageUrl(path, size);

// 프로필 이미지 URL
export const getProfileUrl = (path, size = 'w185') => getImageUrl(path, size);

// TMDb API 함수들

/**
 * 트렌딩 영화 가져오기
 * @param {string} timeWindow - 'day' 또는 'week'
 */
export const getTrending = async (timeWindow = 'week') => {
    try {
        const response = await tmdbApi.get(`/trending/movie/${timeWindow}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        throw error;
    }
};

/**
 * 인기 영화 가져오기
 * @param {number} page - 페이지 번호
 */
export const getPopular = async (page = 1) => {
    try {
        const response = await tmdbApi.get('/movie/popular', {
            params: { page },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        throw error;
    }
};

/**
 * 최신 개봉 영화 가져오기
 */
export const getNowPlaying = async (page = 1) => {
    try {
        const response = await tmdbApi.get('/movie/now_playing', {
            params: { page },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching now playing movies:', error);
        throw error;
    }
};

/**
 * 개봉 예정 영화 가져오기
 */
export const getUpcoming = async (page = 1) => {
    try {
        const response = await tmdbApi.get('/movie/upcoming', {
            params: { page },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching upcoming movies:', error);
        throw error;
    }
};

/**
 * 평점 높은 영화 가져오기
 */
export const getTopRated = async (page = 1) => {
    try {
        const response = await tmdbApi.get('/movie/top_rated', {
            params: { page },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching top rated movies:', error);
        throw error;
    }
};

/**
 * 영화 상세 정보 가져오기
 * @param {number} movieId - 영화 ID
 */
export const getMovieDetails = async (movieId) => {
    try {
        const response = await tmdbApi.get(`/movie/${movieId}`, {
            params: {
                append_to_response: 'credits,videos,similar,recommendations,reviews',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching movie details:', error);
        throw error;
    }
};

/**
 * 영화 검색
 * @param {string} query - 검색어
 * @param {number} page - 페이지 번호
 */
export const searchMovies = async (query, page = 1) => {
    try {
        const response = await tmdbApi.get('/search/movie', {
            params: { query, page },
        });
        return response.data;
    } catch (error) {
        console.error('Error searching movies:', error);
        throw error;
    }
};

/**
 * 장르 목록 가져오기
 */
export const getGenres = async () => {
    try {
        const response = await tmdbApi.get('/genre/movie/list');
        return response.data.genres;
    } catch (error) {
        console.error('Error fetching genres:', error);
        throw error;
    }
};

/**
 * 장르별 영화 가져오기
 * @param {number} genreId - 장르 ID
 * @param {number} page - 페이지 번호
 */
export const getMoviesByGenre = async (genreId, page = 1) => {
    try {
        const response = await tmdbApi.get('/discover/movie', {
            params: {
                with_genres: genreId,
                page,
                sort_by: 'popularity.desc',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching movies by genre:', error);
        throw error;
    }
};

/**
 * 유사한 영화 가져오기
 * @param {number} movieId - 영화 ID
 */
export const getSimilarMovies = async (movieId, page = 1) => {
    try {
        const response = await tmdbApi.get(`/movie/${movieId}/similar`, {
            params: { page },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching similar movies:', error);
        throw error;
    }
};

/**
 * 추천 영화 가져오기
 * @param {number} movieId - 영화 ID
 */
export const getRecommendations = async (movieId, page = 1) => {
    try {
        const response = await tmdbApi.get(`/movie/${movieId}/recommendations`, {
            params: { page },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        throw error;
    }
};

export default tmdbApi;

