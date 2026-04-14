import Constants from 'expo-constants';

interface Environment {
  environment: 'development' | 'production';
  newsApiKey: string;
  firebaseApiKey: string;
  firebaseAuthDomain: string;
  firebaseProjectId: string;
  firebaseStorageBucket: string;
  firebaseMessagingSenderId: string;
  firebaseAppId: string;
}

const extra = Constants.expoConfig?.extra ?? {};

export const ENV: Environment = {
  environment: extra.environment ?? 'development',
  newsApiKey: extra.newsApiKey ?? '',
  firebaseApiKey: extra.firebaseApiKey ?? '',
  firebaseAuthDomain: extra.firebaseAuthDomain ?? '',
  firebaseProjectId: extra.firebaseProjectId ?? '',
  firebaseStorageBucket: extra.firebaseStorageBucket ?? '',
  firebaseMessagingSenderId: extra.firebaseMessagingSenderId ?? '',
  firebaseAppId: extra.firebaseAppId ?? '',
};

export const isDev = ENV.environment === 'development';
