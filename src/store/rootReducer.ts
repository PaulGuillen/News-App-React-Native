import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/presentation/state/authSlice';
import newsReducer from '../features/news/presentation/state/newsSlice';

export const rootReducer = combineReducers({
  auth: authReducer,
  news: newsReducer,
});
