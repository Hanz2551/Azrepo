import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import authAPI from '@/libs/api/auth';
import { setToast } from '../global/slice';
import { RootState } from '..';

type TStore = {
  currentUser: TCurrentUser | null;
};

const initialState = (): TStore => ({
  currentUser: null,
});

const slice = createSlice({
  name: 'auth',
  initialState: initialState(),
  reducers: {
    resetStore: () => {
      return initialState();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
  },
});

export const login = createAsyncThunk('auth/login', async (cipher: string, thunkAPI) => {
  try {
    const response = await authAPI.login(cipher);
    return response;
  } catch (error) {
    thunkAPI.dispatch(
      setToast({
        status: 'error',
        message: 'QRコードの読み取りに失敗しました',
      }),
    );
    return thunkAPI.rejectWithValue({});
  }
});

export const { resetStore } = slice.actions;

export const authSelector = (state: RootState) => state.auth;

export const currentUserSelector = createSelector(authSelector, (state) => state.currentUser);

export default slice.reducer;
