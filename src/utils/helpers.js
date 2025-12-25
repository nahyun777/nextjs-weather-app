/**
 * 런타임을 시간과 분으로 변환
 * @param {number} minutes - 분 단위 런타임
 * @returns {string} "2시간 30분" 형식
 */
export const formatRuntime = (minutes) => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}시간 ${mins}분` : `${mins}분`;
};

/**
 * 날짜 포맷팅
 * @param {string} dateString - ISO 날짜 문자열
 * @returns {string} "2024년 1월 1일" 형식
 */
export const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

/**
 * 년도만 추출
 * @param {string} dateString - ISO 날짜 문자열
 * @returns {string} "2024" 형식
 */
export const getYear = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).getFullYear();
};

/**
 * 평점을 퍼센트로 변환
 * @param {number} rating - 0-10 사이의 평점
 * @returns {number} 0-100 사이의 퍼센트
 */
export const ratingToPercent = (rating) => {
    return Math.round(rating * 10);
};

/**
 * 평점 색상 클래스 반환
 * @param {number} rating - 0-10 사이의 평점
 * @returns {string} Tailwind 색상 클래스
 */
export const getRatingColor = (rating) => {
    if (rating >= 7) return 'text-green-500';
    if (rating >= 5) return 'text-yellow-500';
    return 'text-red-500';
};

/**
 * 숫자를 축약형으로 변환 (1000 -> 1K)
 * @param {number} num - 숫자
 * @returns {string} 축약된 문자열
 */
export const formatNumber = (num) => {
    if (!num) return '0';
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
};

/**
 * 금액을 포맷팅
 * @param {number} amount - 금액
 * @returns {string} "$1,000,000" 형식
 */
export const formatCurrency = (amount) => {
    if (!amount) return 'N/A';
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
    }).format(amount);
};

/**
 * 배열을 청크로 나누기
 * @param {Array} array - 배열
 * @param {number} size - 청크 크기
 * @returns {Array} 청크 배열
 */
export const chunk = (array, size) => {
    const chunked = [];
    for (let i = 0; i < array.length; i += size) {
        chunked.push(array.slice(i, i + size));
    }
    return chunked;
};

/**
 * 디바운스 함수
 * @param {Function} func - 실행할 함수
 * @param {number} delay - 지연 시간 (ms)
 * @returns {Function} 디바운스된 함수
 */
export const debounce = (func, delay = 300) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
};

