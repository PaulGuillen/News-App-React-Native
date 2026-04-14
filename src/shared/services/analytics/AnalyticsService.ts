import { isDev } from '../../../config/env';

export interface AnalyticsEvent {
  name: string;
  params?: Record<string, unknown>;
}

export interface IAnalyticsService {
  logEvent(event: AnalyticsEvent): void;
  logScreenView(screenName: string): void;
  setUserId(userId: string): void;
  reset(): void;
}

class AnalyticsService implements IAnalyticsService {
  logEvent(event: AnalyticsEvent): void {
    if (isDev) {
      console.log('[Analytics] Event:', event.name, event.params);
    }
    // In production: firebase analytics logEvent(event.name, event.params)
  }

  logScreenView(screenName: string): void {
    if (isDev) {
      console.log('[Analytics] Screen:', screenName);
    }
    // In production: firebase analytics logEvent('screen_view', { screen_name: screenName })
  }

  setUserId(userId: string): void {
    if (isDev) {
      console.log('[Analytics] User ID:', userId);
    }
    // In production: firebase analytics setUserId(userId)
  }

  reset(): void {
    if (isDev) {
      console.log('[Analytics] Reset');
    }
  }
}

export const analyticsService = new AnalyticsService();
