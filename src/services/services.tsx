// serve.ts
import axios, { AxiosRequestConfig } from 'axios';

const API_URL = 'https://eclo-production.up.railway.app/api/';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Thêm interceptor để tự động thêm token vào header
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Hàm để thực hiện GET yêu cầu
const fetchData = async (url: string): Promise<any> => {
  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 404) {
        return [];
      }
      else if (error.response && error.response.status === 401) {
        window.location.href = '/login';
      }
      else {
        console.error('Error fetching data:', error.message);
        throw error;
      }
      
    }
    throw new Error('An unexpected error occurred');
  }
};

// Hàm để thực hiện POST yêu cầu nếu cần
const postData = async (url: string, data: any): Promise<any> => {
  try {
    const response = await axiosInstance.post(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
const deleteData = async (url: string): Promise<any> => {
  try {
    const response = await axiosInstance.delete(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};
const putData = async (url: string): Promise<any> => {
  try {
    const response = await axiosInstance.put(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Định nghĩa các hàm API
export const getChapters = () => fetchData('chapters');
export const getBook = () => fetchData('books');
export const getTafsirs = () => fetchData('tafsirs');
export const getVerse = (id: String) => fetchData(`verses/${id}`);
export const getBookmarkedVersesByChapter = (id: String) => fetchData(`chapters/${id}/bookmarked-verses`);
export const bookmarks = (verseId: string) => postData(`bookmarks`, { verse_id: verseId });
export const deleteBookmarks = (verseId: string) => deleteData(`bookmarks/${verseId}`);
export const getVerses = () => fetchData(`verses`);
export const getVersesIdchapter = (id: String) => fetchData(`verses/chapter/${id}`);
export const getChaptersIdbook = (id: String) => fetchData(`chapters/book/${id}`);
export const getChaptersId = (id: String) => fetchData(`chapters/${id}`);
export const getTafsirsIdverse = (id: String) => fetchData(`verses/${id}/selected-tafsirs`);
export const updateTafsir = (id: Number) => putData(`tafsirs/${id}/select`);


