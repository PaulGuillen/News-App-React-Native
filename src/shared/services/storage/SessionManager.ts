import { StorageService } from './StorageService';

const SESSION_KEY = '@news_app_session';
const USER_KEY = '@news_app_user';

export interface SessionData {
  uid: string;
  email: string;
  displayName?: string;
}

export class SessionManager {
  static async saveSession(session: SessionData): Promise<void> {
    await StorageService.set(SESSION_KEY, session);
  }

  static async getSession(): Promise<SessionData | null> {
    return StorageService.get<SessionData>(SESSION_KEY);
  }

  static async clearSession(): Promise<void> {
    await StorageService.remove(SESSION_KEY);
    await StorageService.remove(USER_KEY);
  }

  static async hasSession(): Promise<boolean> {
    const session = await this.getSession();
    return session !== null;
  }
}
