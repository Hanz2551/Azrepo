import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import driverAPI from '@/libs/api/driver';
import { RootState } from '..';
import { TEXT } from '@/utils/constants/text';
import { setToast } from '@/stores/global/slice';
import { TBusNo, TSearchInputs, TStore } from '@/utils/types/driver';
import { format } from 'date-fns';

const initSearchInputs = (): TSearchInputs => ({
  query: '',
  date: new Date(),
  busNumber: null,
});

const initialState = (): TStore => ({
  searchInputs: initSearchInputs(),
  fetching: true,
  driverSchedule: null,
  busesNo: null,
  activeTabIndex: 0,
});

const slice = createSlice({
  name: 'driver',
  initialState: initialState(),
  reducers: {
    resetStore: () => initialState(),

    setSearchInputs: (state, action) => {
      state.searchInputs = {
        ...state.searchInputs,
        ...action.payload,
      };
    },

    setActiveTabIndex: (state, action) => {
      state.activeTabIndex = action.payload;
    },

    resetDriverSchedule: (state) => {
      state.driverSchedule = null;
      state.activeTabIndex = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDriverSchedule.pending, (state) => {
      state.fetching = true;
    });
    builder.addCase(getDriverSchedule.fulfilled, (state, action) => {
      const busesNoNewMonth = action.payload.busesNoNewMonth;
      if (busesNoNewMonth !== undefined) {
        state.busesNo = {
          ...state.busesNo,
          ...busesNoNewMonth,
        };
      }
      if ('busNumber' in action.payload) {
        state.searchInputs = {
          ...state.searchInputs,
          busNumber: action.payload.busNumber
            ? {
                label: action.payload.busNumber.key,
                value: action.payload.busNumber.value,
              }
            : null,
        };
      }
      state.driverSchedule = action.payload.schedule;
      state.activeTabIndex = 0;
      state.fetching = false;
    });
    builder.addCase(getDriverSchedule.rejected, (state) => {
      state.fetching = false;
    });
  },
});

export const getDriverSchedule = createAsyncThunk(
  'driver/getDriverSchedule',
  async (_, thunkAPI) => {
    try {
      const { searchInputs, busesNo } = (thunkAPI.getState() as RootState).driver;
      const month = format(searchInputs.date, 'yyyy-MM');
      let busesNoNewMonth: TBusNo[] = [];
      let busNumber = searchInputs.busNumber?.value;
      const isNewMonth = !busesNo?.[month];
      if (isNewMonth) {
        busesNoNewMonth = await driverAPI.getBusesNo(format(searchInputs.date, 'yyyy-MM'));
        busNumber = busesNoNewMonth?.[0]?.value;
        if (!busNumber) {
          return {
            schedule: null,
            busesNoNewMonth: { [month]: [] },
            busNumber: null,
          };
        }
      }
      const schedule = await driverAPI.getDriverSchedule({
        date: format(searchInputs.date, 'yyyy-MM-dd'),
        ...(searchInputs.query && { query: searchInputs.query }),
        busNumber,
      });
      return {
        schedule,
        ...(isNewMonth && {
          busesNoNewMonth: {
            [month]: busesNoNewMonth?.map((it) => ({ value: it.value, label: it.key })),
          },
          busNumber: busesNoNewMonth?.[0],
        }),
      };
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

const driverSelector = (state: RootState) => state.driver;

export const fetchingSelector = createSelector(driverSelector, (state) => state.fetching);

export const searchInputsSelector = createSelector(driverSelector, (state) => state.searchInputs);

export const busesNoSelector = createSelector(driverSelector, (state) => state.busesNo);

export const activeTabIndexSelector = createSelector(
  driverSelector,
  (state) => state.activeTabIndex,
);

export const driverScheduleSelector = createSelector(
  driverSelector,
  (state) => state.driverSchedule,
);

export const scheduleByTabSelector = createSelector(driverSelector, (state) =>
  !state.driverSchedule ? [] : Object.values(state.driverSchedule)[state.activeTabIndex],
);

export const currentBusDataSelector = createSelector(driverSelector, (state) => {
  if (!state.driverSchedule) return null;
  const [name, list] = Object.entries(state.driverSchedule)[state.activeTabIndex];
  return { name, hasData: !!list?.length };
});

export const { resetStore, setSearchInputs, setActiveTabIndex, resetDriverSchedule } =
  slice.actions;

export default slice.reducer;
