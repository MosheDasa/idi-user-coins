// api.ts
import axios from 'axios';

export interface UserData {
  name: string;
  lng: string;
}

export async function fetchUserData(): Promise<UserData | null> {
  try {
    const res = await axios.get('https://jsonplaceholder.typicode.com/users');
    const data = res.data;

    if (Array.isArray(data) && data.length > 0) {
      return {
        name: data[0].name,
        lng: data[0].address.geo.lng,
      };
    }

    return null;
  } catch (error) {
    console.error('שגיאה בבקשת API:', error);
    return null;
  }
}
