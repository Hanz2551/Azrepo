import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import topAPI from '@/libs/api/top';
import { TTopStore } from '@/utils/types/top';
import { RootState } from '..';

const initialState = (): TTopStore => ({
  data: null,
  reading: false,
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
    builder.addCase(getTopData.pending, (state) => {
      state.reading = true;
    });
    builder.addCase(getTopData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.reading = false;
    });
    builder.addCase(getTopData.rejected, (state) => {
      state.reading = false;
    });
  },
});

export const { resetStore } = slice.actions;

export const getTopData = createAsyncThunk('top/getTopData', async (_, thunkAPI) => {
  try {
    const response = await topAPI.getTopData();
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue((error as Error).message);
  }
});

const topSelector = (state: RootState) => state.top;

export const topDataSelector = createSelector(topSelector, (state) => state.data);

export const readingSelector = createSelector(topSelector, (state) => state.reading);

export default slice.reducer;
