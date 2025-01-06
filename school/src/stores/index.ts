import { Action, ThunkAction, combineReducers, configureStore } from '@reduxjs/toolkit';

import authReducer from './auth/slice';
import topReducer from './bus/slice';
import globalReducer from './global/slice';
import notificationReducer from './notification/slice';
import busReducer from './bus/slice';
import driverReducer from './driver/slice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: combineReducers({
    auth: authReducer,
    top: topReducer,
    global: globalReducer,
    notification: notificationReducer,
    bus: busReducer,
    driver: driverReducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
