import { TGlobalStore } from '@/utils/types/global';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';

const initialState = (): TGlobalStore => ({
  toast: null,
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
});

export const { resetStore, setToast } = slice.actions;

const globalSelector = (state: RootState) => state.global;

export const toastSelector = createSelector(globalSelector, (state) => state.toast);

export default slice.reducer;
