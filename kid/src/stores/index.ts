import { Action, ThunkAction, combineReducers, configureStore } from '@reduxjs/toolkit';

import { useDispatch } from 'react-redux';
import authReducer from './auth/slice';
import globalReducer from './global/slice';
import topReducer from './top/slice';

export const store = configureStore({
  reducer: combineReducers({
    auth: authReducer,
    global: globalReducer,
    top: topReducer,
  }),
  devTools: true,
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
