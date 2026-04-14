import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NewsListScreen } from '../presentation/screens/NewsListScreen';
import { NewsDetailScreen } from '../presentation/screens/NewsDetailScreen';
import { NewsArticle } from '../domain/models/NewsArticle';

export type NewsStackParamList = {
  NewsList: undefined;
  NewsDetail: { articleId: string; article: NewsArticle };
};

const Stack = createNativeStackNavigator<NewsStackParamList>();

export const NewsNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="NewsList" component={NewsListScreen} />
      <Stack.Screen name="NewsDetail" component={NewsDetailScreen} />
    </Stack.Navigator>
  );
};
