import { TAuthStore, TFormInputsLogin } from '@/utils/types/auth';
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import authAPI from '@/libs/api/auth';
import { setAuthStorage } from '@/utils/helpers/auth';
import { RootState } from '..';

const initialState = (): TAuthStore => ({
  currentUser: null,
});

const slice = createSlice({
  name: 'auth',
  initialState: initialState(),
  reducers: {
    resetStore: () => {
      return initialState();
    },

    initCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
  },
});

export const { resetStore, initCurrentUser } = slice.actions;

export const login = createAsyncThunk('auth/login', async (body: TFormInputsLogin, thunkAPI) => {
  try {
    const response = await authAPI.login(body);
    setAuthStorage(response);
    return {
      id: response.id,
      username: response.username,
      userType: response.userType,
      loginId: response.loginId,
    };
  } catch (error) {
    return thunkAPI.rejectWithValue((error as Error).message);
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await authAPI.logout();
    return true;
  } catch (error) {
    return thunkAPI.rejectWithValue((error as Error).message);
  }
});

const authSelector = (state: RootState) => state.auth;

export const currentUserSelector = createSelector(authSelector, (state) => state.currentUser);

export default slice.reducer;
