import { Capacitor } from '@capacitor/core';
import { Plugins } from '@capacitor/core';
const { Device } = Plugins;

// Import SecureStoragePlugin
import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';

// Kiểm tra nền tảng
const isMobile = Capacitor.getPlatform() !== 'web';

// Hàm để lưu dữ liệu
export const saveData = async (key: string, value: string) => {
    if (isMobile) {
        try {
            await SecureStoragePlugin.set({ key, value });
        } catch (error) {
            console.error('Error saving to secure storage:', error);
        }
    } else {
        try {
            localStorage.setItem(key, value);
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    }
};

// Hàm để lấy dữ liệu
export const getData = async (key: string) => {
    if (isMobile) {
        try {
            const { value } = await SecureStoragePlugin.get({ key });
            return value;
        } catch (error) {
            console.error('Error getting from secure storage:', error);
            return null;
        }
    } else {
        try {
            return localStorage.getItem(key);
        } catch (error) {
            console.error('Error getting from localStorage:', error);
            return null;
        }
    }
};

// Hàm để xóa dữ liệu
export const removeData = async (key: string) => {
    if (isMobile) {
        try {
            await SecureStoragePlugin.remove({ key });
        } catch (error) {
            console.error('Error removing from secure storage:', error);
        }
    } else {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Error removing from localStorage:', error);
        }
    }
};
