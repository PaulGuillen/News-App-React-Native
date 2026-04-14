import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../domain/models/User';
import { AuthRepositoryImpl } from '../../data/repository/AuthRepositoryImpl';
import { LoginUseCase } from '../../domain/usecases/LoginUseCase';
import { RegisterUseCase } from '../../domain/usecases/RegisterUseCase';
import { LogoutUseCase } from '../../domain/usecases/LogoutUseCase';

const authRepository = new AuthRepositoryImpl();
const loginUseCase = new LoginUseCase(authRepository);
const registerUseCase = new RegisterUseCase(authRepository);
const logoutUseCase = new LogoutUseCase(authRepository);

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  initialized: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  initialized: false,
};

export const loginAction = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      return await loginUseCase.execute(credentials);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const registerAction = createAsyncThunk(
  'auth/register',
  async (credentials: { email: string; password: string; displayName: string }, { rejectWithValue }) => {
    try {
      return await registerUseCase.execute(credentials);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const logoutAction = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logoutUseCase.execute();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const checkAuthAction = createAsyncThunk(
  'auth/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const user = await authRepository.getCurrentUser();
      return user;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
      state.isAuthenticated = action.payload !== null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(registerAction.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(registerAction.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutAction.pending, (state) => { state.loading = true; })
      .addCase(logoutAction.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.initialized = true;
        state.user = action.payload ?? null;
        state.isAuthenticated = action.payload !== null;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.initialized = true;
        state.isAuthenticated = false;
      });
  },
});

export const { clearError, setUser } = authSlice.actions;
export default authSlice.reducer;
