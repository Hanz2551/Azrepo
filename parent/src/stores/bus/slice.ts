import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import busAPI from '@/libs/api/bus';
import { RootState } from '..';
import {
  TBusStore,
  TParamsGetStudentSchedule,
  TSchedule,
  TScheduleSettingMode,
  TScheduleSettingStep,
  TSelectedMonth,
} from '@/utils/types/bus';
import { format } from 'date-fns';
import { getDaysInMonth } from '@/utils/helpers/dateTime';
import { getReturningBus, setToast } from '@/stores/global/slice';

const initialState = (): TBusStore => ({
  yearMonth: {
    year: +format(new Date(), 'yyyy'),
    month: +format(new Date(), 'MM'),
  },
  students: null,
  selectedStudentId: null,
  fetchingStudents: true,
  fetchingStudentSchedule: false,
  studentSchedule: null,
  scheduleSettingMode: null,
  scheduleSettingStep: 'input',
});

const slice = createSlice({
  name: 'bus',
  initialState: initialState(),
  reducers: {
    resetStore: () => {
      return initialState();
    },

    setYearMonth: (state, action: PayloadAction<Partial<TSelectedMonth>>) => {
      state.yearMonth = {
        ...state.yearMonth,
        ...action.payload,
      };
      // set to null to run useEffect refetch schedule in ViewContainer
      state.studentSchedule = null;
    },

    setSelectedStudentId: (state, action: PayloadAction<number>) => {
      state.selectedStudentId = action.payload;
      state.studentSchedule = null; // set to null to run useEffect refetch schedule in ViewContainer
    },

    setScheduleSettingMode: (state, action: PayloadAction<TScheduleSettingMode>) => {
      state.scheduleSettingMode = action.payload;
    },

    setScheduleSettingStep: (state, action: PayloadAction<TScheduleSettingStep>) => {
      state.scheduleSettingStep = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getStudents.pending, (state) => {
      state.fetchingStudents = true;
    });
    builder.addCase(getStudents.fulfilled, (state, action) => {
      state.students = action.payload;
      state.selectedStudentId = action.payload[0]?.id || null;
      state.fetchingStudents = false;
    });
    builder.addCase(getStudents.rejected, (state) => {
      state.fetchingStudents = false;
    });

    builder.addCase(getStudentSchedule.pending, (state) => {
      state.fetchingStudentSchedule = true;
      state.studentSchedule = null;
    });
    builder.addCase(getStudentSchedule.fulfilled, (state, action) => {
      state.studentSchedule = action.payload;
      state.fetchingStudentSchedule = false;
    });
    builder.addCase(getStudentSchedule.rejected, (state) => {
      state.fetchingStudentSchedule = false;
    });

    builder.addCase(settingSchedule.fulfilled, (state) => {
      state.scheduleSettingMode = null;
      state.scheduleSettingStep = 'input';
      state.studentSchedule = null;
    });
  },
});

export const getStudents = createAsyncThunk('bus/getStudents', async (_, thunkAPI) => {
  try {
    const response = await busAPI.getStudents();
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue((error as Error).message);
  }
});

export const getStudentSchedule = createAsyncThunk(
  'bus/getStudentSchedule',
  async (_, thunkAPI) => {
    try {
      const { yearMonth, selectedStudentId } = (thunkAPI.getState() as RootState).bus;
      if (!selectedStudentId) return thunkAPI.rejectWithValue(null);
      const finalParams = {} as TParamsGetStudentSchedule;
      const month = `${yearMonth.year}-${yearMonth.month}`;
      finalParams.studentId = selectedStudentId!;
      finalParams.month = month;
      const response = await busAPI.getStudentSchedule(finalParams);
      thunkAPI.dispatch(getReturningBus(month));
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  },
);

export const settingSchedule = createAsyncThunk(
  'bus/settingSchedule',
  async (schedule: TSchedule[], thunkAPI) => {
    try {
      const { yearMonth, selectedStudentId } = (thunkAPI.getState() as RootState).bus;
      const response = await busAPI.settingSchedule({
        id: selectedStudentId!,
        month: `${yearMonth.year}-${yearMonth.month}`,
        schedule,
      });
      thunkAPI.dispatch(
        setToast({
          status: 'success',
          message: '申請内容が保存されました',
        }),
      );
      return response;
    } catch (error) {
      thunkAPI.dispatch(
        setToast({
          status: 'error',
          message: '申請内容が保存できませんでした',
        }),
      );
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  },
);

const busSelector = (state: RootState) => state.bus;

export const yearMonthSelector = createSelector(busSelector, (state) => state.yearMonth);

export const daysInMonthSelector = createSelector(yearMonthSelector, (yearMonth) =>
  getDaysInMonth(yearMonth.year, yearMonth.month),
);

export const selectedStudentIdSelector = createSelector(
  busSelector,
  (state) => state.selectedStudentId,
);

export const studentsSelector = createSelector(busSelector, (state) => state.students);

export const fetchingStudentsSelector = createSelector(
  busSelector,
  (state) => state.fetchingStudents,
);

export const fetchingStudentScheduleSelector = createSelector(
  busSelector,
  (state) => state.fetchingStudentSchedule,
);

export const studentScheduleSelector = createSelector(
  busSelector,
  (state) => state.studentSchedule,
);

export const scheduleSettingModeSelector = createSelector(
  busSelector,
  (state) => state.scheduleSettingMode,
);

export const scheduleSettingStepSelector = createSelector(
  busSelector,
  (state) => state.scheduleSettingStep,
);

export const {
  resetStore,
  setYearMonth,
  setSelectedStudentId,
  setScheduleSettingMode,
  setScheduleSettingStep,
} = slice.actions;

export default slice.reducer;
