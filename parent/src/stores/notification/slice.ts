import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import notificationAPI from '@/libs/api/notification';
import { TNotificationStore } from '@/utils/types/notification';
import { RootState } from '..';

const initialState = (): TNotificationStore => ({
  list: null,
  detail: null,
  reading: false,
});

const slice = createSlice({
  name: 'notification',
  initialState: initialState(),
  reducers: {
    resetStore: () => {
      return initialState();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getListNotifications.fulfilled, (state, action) => {
      state.list = action.payload;
      state.reading = false;
    });

    builder.addCase(getNotification.fulfilled, (state, action) => {
      state.detail = action.payload;
    });
  },
});

export const { resetStore } = slice.actions;

export const getListNotifications = createAsyncThunk(
  'notification/getListNotifications',
  async (_, thunkAPI) => {
    try {
      const response = await notificationAPI.getListNotifications();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  },
);

export const getNotification = createAsyncThunk(
  'notification/getNotification',
  async (id: number, thunkAPI) => {
    try {
      const response = await notificationAPI.getNotification(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  },
);

const topSelector = (state: RootState) => state.notification;

export const listSelector = createSelector(topSelector, (state) => state.list);

export const detailSelector = createSelector(topSelector, (state) => state.detail);

export const readingSelector = createSelector(topSelector, (state) => state.reading);

export default slice.reducer;
