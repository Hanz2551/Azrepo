import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import busAPI from '@/libs/api/bus';
import { TEditDateScheduleBody, TSearchInputs, TStore } from '@/utils/types/bus';
import { RootState } from '..';
import { TEXT } from '@/utils/constants/text';
import { getReturningBus, setToast } from '@/stores/global/slice';
import { format } from 'date-fns';

const initSearchInputs = () => ({
  query: undefined,
  date: new Date(),
  grade: undefined,
  going: undefined,
  returning: undefined,
});

const initialState = (): TStore => ({
  studentsSchedule: null,
  studentsScheduleCount: null,
  fetchingStudentsSchedule: true,
  searchInputs: initSearchInputs(),
  selectedMonth: null,
  studentSchedule: null,
  fetchingStudentSchedule: true,
});

const slice = createSlice({
  name: 'bus',
  initialState: initialState(),
  reducers: {
    /**
     * not reset selectedMonth, use when redirect from list students to student detail
     */
    resetStoreWhenLeaveStudentList: (state) => {
      state.studentsSchedule = null;
      state.studentsScheduleCount = null;
      state.fetchingStudentsSchedule = true;
      state.searchInputs = initSearchInputs();
      state.studentSchedule = null;
      state.fetchingStudentSchedule = true;
    },

    resetStore: () => initialState(),

    setSearchInputs: (state, action: PayloadAction<Partial<TSearchInputs>>) => {
      state.searchInputs = {
        ...state.searchInputs,
        ...action.payload,
      };
    },

    resetSearchInputs: (state) => {
      state.searchInputs = initSearchInputs();
    },

    setSelectedMonth: (state) => {
      state.selectedMonth = format(state.searchInputs.date, 'yyyy-MM');
    },

    resetSelectedMonth: (state) => {
      state.selectedMonth = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getStudentsSchedule.pending, (state) => {
      state.fetchingStudentsSchedule = true;
    });
    builder.addCase(getStudentsSchedule.fulfilled, (state, action) => {
      state.studentsSchedule = action.payload.students;
      state.studentsScheduleCount = action.payload.aggCount;
      state.fetchingStudentsSchedule = false;
    });
    builder.addCase(getStudentsSchedule.rejected, (state) => {
      state.fetchingStudentsSchedule = false;
    });

    builder.addCase(getStudentSchedule.pending, (state) => {
      state.fetchingStudentSchedule = true;
    });
    builder.addCase(getStudentSchedule.fulfilled, (state, action) => {
      state.studentSchedule = action.payload;
      state.fetchingStudentSchedule = false;
    });
    builder.addCase(getStudentSchedule.rejected, (state) => {
      state.fetchingStudentSchedule = false;
    });
  },
});

export const getStudentsSchedule = createAsyncThunk(
  'bus/getStudentsSchedule',
  async (_, thunkAPI) => {
    try {
      const { searchInputs } = (thunkAPI.getState() as RootState).bus;
      const params = {
        date: format(searchInputs.date, 'yyyy-MM-dd'),
        ...(searchInputs.grade && { grade: searchInputs.grade.join(',') }),
        ...(searchInputs.going && { going: searchInputs.going.join(',') }),
        ...(searchInputs.returning && { returning: searchInputs.returning.join(',') }),
        query: searchInputs.query,
      };
      const response = await busAPI.getStudentsSchedule(params);
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

export const getStudentSchedule = createAsyncThunk(
  'bus/getStudentSchedule',
  async (studentId: number, thunkAPI) => {
    try {
      const { selectedMonth } = (thunkAPI.getState() as RootState).bus;
      if (!selectedMonth) throw new Error();
      const response = await busAPI.getStudentSchedule({
        id: studentId,
        month: selectedMonth,
      });
      thunkAPI.dispatch(getReturningBus(selectedMonth));
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

export const editStudentDateSchedule = createAsyncThunk(
  'bus/editStudentDateSchedule',
  async (payload: TEditDateScheduleBody, thunkAPI) => {
    try {
      const response = await busAPI.editStudentDateSchedule(payload);
      thunkAPI.dispatch(
        setToast({
          status: 'success',
          message: '変更内容を保存しました',
        }),
      );
      thunkAPI.dispatch(getStudentSchedule(payload.studentId));
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

const busSelector = (state: RootState) => state.bus;

export const studentsScheduleSelector = createSelector(
  busSelector,
  (state) => state.studentsSchedule,
);

export const fetchingStudentsScheduleSelector = createSelector(
  busSelector,
  (state) => state.fetchingStudentsSchedule,
);

export const searchInputsSelector = createSelector(busSelector, (state) => state.searchInputs);

export const studentScheduleSelector = createSelector(
  busSelector,
  (state) => state.studentSchedule,
);

export const studentsScheduleCountSelector = createSelector(
  busSelector,
  (state) => state.studentsScheduleCount,
);

export const fetchingStudentScheduleSelector = createSelector(
  busSelector,
  (state) => state.fetchingStudentSchedule,
);

export const {
  resetStore,
  setSearchInputs,
  resetSearchInputs,
  setSelectedMonth,
  resetStoreWhenLeaveStudentList,
} = slice.actions;

export default slice.reducer;
