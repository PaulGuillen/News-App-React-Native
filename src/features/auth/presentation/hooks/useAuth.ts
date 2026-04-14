import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../shared/hooks';
import { loginAction, registerAction, logoutAction, clearError } from '../state/authSlice';
import { analyticsService } from '../../../../shared/services/analytics/AnalyticsService';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, loading, error } = useAppSelector((state) => state.auth);

  const login = useCallback(
    async (email: string, password: string) => {
      const result = await dispatch(loginAction({ email, password }));
      if (loginAction.fulfilled.match(result)) {
        analyticsService.logEvent({ name: 'login', params: { method: 'email' } });
        analyticsService.setUserId(result.payload.uid);
      }
      return result;
    },
    [dispatch],
  );

  const register = useCallback(
    async (email: string, password: string, displayName: string) => {
      const result = await dispatch(registerAction({ email, password, displayName }));
      if (registerAction.fulfilled.match(result)) {
        analyticsService.logEvent({ name: 'sign_up', params: { method: 'email' } });
      }
      return result;
    },
    [dispatch],
  );

  const logout = useCallback(async () => {
    await dispatch(logoutAction());
    analyticsService.reset();
  }, [dispatch]);

  const dismissError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return { user, isAuthenticated, loading, error, login, register, logout, dismissError };
};
