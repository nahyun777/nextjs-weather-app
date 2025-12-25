import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 전역 상태 관리
export const useStore = create(
    persist(
        (set, get) => ({
            // 사용자 정보 (향후 인증 구현 시 사용)
            user: null,
            setUser: (user) => set({ user }),
            clearUser: () => set({ user: null }),

            // 시청 목록 (Watchlist)
            watchlist: [],
            addToWatchlist: (movie) => {
                const { watchlist } = get();
                if (!watchlist.find((m) => m.id === movie.id)) {
                    set({ watchlist: [...watchlist, movie] });
                }
            },
            removeFromWatchlist: (movieId) => {
                const { watchlist } = get();
                set({ watchlist: watchlist.filter((m) => m.id !== movieId) });
            },
            isInWatchlist: (movieId) => {
                const { watchlist } = get();
                return watchlist.some((m) => m.id === movieId);
            },

            // 즐겨찾기
            favorites: [],
            addToFavorites: (movie) => {
                const { favorites } = get();
                if (!favorites.find((m) => m.id === movie.id)) {
                    set({ favorites: [...favorites, movie] });
                }
            },
            removeFromFavorites: (movieId) => {
                const { favorites } = get();
                set({ favorites: favorites.filter((m) => m.id !== movieId) });
            },
            isInFavorites: (movieId) => {
                const { favorites } = get();
                return favorites.some((m) => m.id === movieId);
            },

            // 최근 본 영화
            recentlyViewed: [],
            addToRecentlyViewed: (movie) => {
                const { recentlyViewed } = get();
                const filtered = recentlyViewed.filter((m) => m.id !== movie.id);
                set({ recentlyViewed: [movie, ...filtered].slice(0, 20) }); // 최대 20개까지 저장
            },

            // 사용자 평점 (로컬 저장용)
            userRatings: {},
            setUserRating: (movieId, rating) => {
                const { userRatings } = get();
                set({ userRatings: { ...userRatings, [movieId]: rating } });
            },
            getUserRating: (movieId) => {
                const { userRatings } = get();
                return userRatings[movieId] || null;
            },

            // 테마 (다크모드)
            theme: 'dark',
            toggleTheme: () => {
                const { theme } = get();
                set({ theme: theme === 'dark' ? 'light' : 'dark' });
            },
            setTheme: (theme) => set({ theme }),
        }),
        {
            name: 'movie-site-storage', // localStorage 키 이름
            partialize: (state) => ({
                watchlist: state.watchlist,
                favorites: state.favorites,
                recentlyViewed: state.recentlyViewed,
                userRatings: state.userRatings,
                theme: state.theme,
            }),
        }
    )
);

export default useStore;

