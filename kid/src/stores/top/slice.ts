import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import topAPI from '@/libs/api/top';
import { setToast } from '../global/slice';
import { TEXT } from '@/utils/constants/text';
import { RootState } from '..';
import { TTopData } from '@/utils/types/top';

type TStore = {
  data: TTopData | null;
};

const initialState = (): TStore => ({
  data: null,
});

const slice = createSlice({
  name: 'top',
  initialState: initialState(),
  reducers: {
    resetStore: () => {
      return initialState();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTopData.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export const getTopData = createAsyncThunk('top/getTopData', async (_, thunkAPI) => {
  try {
    const response = await topAPI.getTopData();
    return response;
  } catch (error) {
    thunkAPI.dispatch(
      setToast({
        status: 'error',
        message: TEXT.errors.somethingError,
      }),
    );
    return thunkAPI.rejectWithValue({});
  }
});

export const { resetStore } = slice.actions;

export const topSelector = (state: RootState) => state.top;

export const dataSelector = createSelector(topSelector, (state) => state.data);

export default slice.reducer;
