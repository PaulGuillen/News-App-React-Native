import AsyncStorage from '@react-native-async-storage/async-storage';

export class StorageService {
  static async set<T>(key: string, value: T): Promise<void> {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  }

  static async get<T>(key: string): Promise<T | null> {
    const item = await AsyncStorage.getItem(key);
    return item ? JSON.parse(item) as T : null;
  }

  static async remove(key: string): Promise<void> {
    await AsyncStorage.removeItem(key);
  }

  static async clear(): Promise<void> {
    await AsyncStorage.clear();
  }
}
