import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import notificationAPI from '@/libs/api/notification';
import { TBodySetting, TEditNotification, TStore } from '@/utils/types/notification';
import { RootState } from '@/stores';
import { setToast } from '@/stores/global/slice';
import { TEXT } from '@/utils/constants/text';
import { getSendStatus } from '@/utils/helpers/notification';

const initialState = (): TStore => ({
  writing: false,
  notifications: null,
  notification: null,
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
    builder.addCase(getNotifications.fulfilled, (state, action) => {
      state.notifications = action.payload;
    });

    builder.addCase(getNotification.fulfilled, (state, action) => {
      state.notification = action.payload;
    });

    builder.addCase(createNotification.pending, (state) => {
      state.writing = true;
    });
    builder.addCase(createNotification.fulfilled, (state) => {
      state.writing = false;
    });
    builder.addCase(createNotification.rejected, (state) => {
      state.writing = false;
    });

    builder.addCase(editNotification.pending, (state) => {
      state.writing = true;
    });
    builder.addCase(editNotification.fulfilled, (state) => {
      state.writing = false;
    });
    builder.addCase(editNotification.rejected, (state) => {
      state.writing = false;
    });
  },
});

export const { resetStore } = slice.actions;

export const getNotifications = createAsyncThunk(
  'notification/getNotifications',
  async (_, thunkAPI) => {
    try {
      const response = await notificationAPI.getNotifications();
      if (!response?.length) return [];
      return response.map((it) => ({
        ...it,
        sendStatus: getSendStatus(it.startAt, it.endAt),
      }));
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

export const createNotification = createAsyncThunk(
  'notification/createNotification',
  async (body: TBodySetting, thunkAPI) => {
    try {
      const response = await notificationAPI.createNotification(body);
      thunkAPI.dispatch(
        setToast({
          status: 'success',
          message: '変更内容が保存されました',
        }),
      );
      return response;
    } catch (error) {
      thunkAPI.dispatch(
        setToast({
          status: 'error',
          message: 'エラーが発生しました',
        }),
      );
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  },
);

export const editNotification = createAsyncThunk(
  'notification/editNotification',
  async (params: TEditNotification, thunkAPI) => {
    try {
      const response = await notificationAPI.editNotification(params);
      thunkAPI.dispatch(
        setToast({
          status: 'success',
          message: '変更内容が保存されました',
        }),
      );
      return response;
    } catch (error) {
      thunkAPI.dispatch(
        setToast({
          status: 'error',
          message: TEXT.errors.somethingError,
        }),
      );
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  },
);

export const deleteNotification = createAsyncThunk(
  'notification/deleteNotification',
  async (id: number, thunkAPI) => {
    try {
      const response = await notificationAPI.deleteNotification(id);
      thunkAPI.dispatch(getNotifications());
      thunkAPI.dispatch(
        setToast({
          status: 'success',
          message: '配信メッセージを削除しました',
        }),
      );
      return response;
    } catch (error) {
      thunkAPI.dispatch(
        setToast({
          status: 'error',
          message: TEXT.errors.somethingError,
        }),
      );
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  },
);

const notificationSelector = (state: RootState) => state.notification;

export const notificationsSelector = createSelector(
  notificationSelector,
  (state) => state.notifications,
);

export const notificationDetailSelector = createSelector(
  notificationSelector,
  (state) => state.notification,
);

export const writingSelector = createSelector(notificationSelector, (state) => state.writing);

export default slice.reducer;
