import axios from 'axios';

export interface UserData {
  name: string;
  lng: string;
}

const API_CONFIG = {
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
};

const api = axios.create(API_CONFIG);

export async function fetchUserData(): Promise<UserData | null> {
  try {
    const response = await api.get('/users');
    const data = response.data;

    if (!Array.isArray(data) || data.length === 0) {
      console.warn('לא נמצאו נתוני משתמש');
      return null;
    }

    const user = data[0];
    if (!user?.name || !user?.address?.geo?.lng) {
      console.warn('חסרים נתונים נדרשים במשתמש');
      return null;
    }

    return {
      name: user.name,
      lng: user.address.geo.lng,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('שגיאת API:', error.message);
      if (error.response) {
        console.error('סטטוס:', error.response.status);
        console.error('נתונים:', error.response.data);
      }
    } else {
      console.error('שגיאה לא ידועה:', error);
    }
    return null;
  }
}