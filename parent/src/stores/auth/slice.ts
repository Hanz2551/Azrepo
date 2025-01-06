import { TAuthStore, TFormInputsLogin } from '@/utils/types/auth';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authAPI from '@/libs/api/auth';
import { setAuthStorage } from '@/utils/helpers/auth';
// import { RootState } from '..';

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
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
  },
});

export const { resetStore } = slice.actions;

export const login = createAsyncThunk('auth/login', async (body: TFormInputsLogin, thunkAPI) => {
  try {
    const response = await authAPI.login(body);
    setAuthStorage(response);
    return { id: response.id };
  } catch (error) {
    return thunkAPI.rejectWithValue((error as Error).message);
  }
});

// const authSelector = (state: RootState) => state.auth;

export default slice.reducer;
