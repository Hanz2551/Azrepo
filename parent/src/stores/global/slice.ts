import { TGlobalStore } from '@/utils/types/global';
import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import busAPI from '@/libs/api/bus';

const initialState = (): TGlobalStore => ({
  toast: null,
  returningBus: null,
});

const slice = createSlice({
  name: 'global',
  initialState: initialState(),
  reducers: {
    resetStore: () => {
      return initialState();
    },

    setToast: (state, action: PayloadAction<TGlobalStore['toast']>) => {
      state.toast = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getReturningBus.fulfilled, (state, action) => {
      state.returningBus = {
        ...state.returningBus,
        ...action.payload,
      };
    });
  },
});

export const getReturningBus = createAsyncThunk(
  'global/getReturningBus',
  async (month: string, thunkAPI) => {
    try {
      const { returningBus } = (thunkAPI.getState() as RootState).global;
      if (!returningBus?.[month]) {
        const response = await busAPI.getReturningBus(month);
        return { [month]: response };
      }
      return thunkAPI.rejectWithValue(null);
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  },
);

export const { resetStore, setToast } = slice.actions;

const globalSelector = (state: RootState) => state.global;

export const toastSelector = createSelector(globalSelector, (state) => state.toast);

export const returningBusSelector = createSelector(globalSelector, (state) => state.returningBus);

export default slice.reducer;
