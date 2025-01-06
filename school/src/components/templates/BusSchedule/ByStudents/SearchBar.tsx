import Input from '@/components/atoms/Input';
import DatePicker from '@/components/atoms/DatePicker';
import {
  getStudentsSchedule,
  resetSearchInputs,
  searchInputsSelector,
  setSearchInputs,
  studentsScheduleCountSelector,
} from '@/stores/bus/slice';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/stores';
import DropdownFilter from '@/components/molecules/DropdownFilter';
import { GOING_OPTIONS_FILTER, RETURNING_OPTIONS_FILTER } from '@/utils/constants/bus';
import { useEffect, useMemo, useRef } from 'react';
import _debounce from 'lodash/debounce';
import Button from '@/components/atoms/Button';
import { GRADE_OPTIONS } from '@/utils/constants/global';

export default function SearchBar() {
  const dispatch = useAppDispatch();

  const inputQueryRef = useRef<HTMLInputElement>(null);

  const count = useSelector(studentsScheduleCountSelector);

  const gradesNumber = useMemo(() => {
    if (!count?.grades) return [];
    return Object.values(count.grades);
  }, [count]);

  const inputs = useSelector(searchInputsSelector);

  useEffect(() => {
    if (!inputQueryRef.current) return;
    if (inputs.query !== inputQueryRef.current.value) {
      inputQueryRef.current.value = inputs.query || '';
    }
  }, [inputs.query]);

  const handleChange = ({ name, value }: { name: string; value: unknown }) => {
    dispatch(setSearchInputs({ [name]: value }));
    dispatch(getStudentsSchedule());
  };

  const handleChangeQuery = _debounce(
    ({ name, value }: { name: string; value: string }) => {
      handleChange({ name, value: value.trim() });
    },
    1000,
    { trailing: true },
  );

  const handleResetSearch = () => {
    dispatch(resetSearchInputs());
    dispatch(getStudentsSchedule());
  };

  return (
    <div className="mt-6 flex gap-2">
      <Input
        ref={inputQueryRef}
        name="query"
        placeholder="生徒名"
        className="w-[180px] lg:w-[200px]"
        onChange={handleChangeQuery}
      />

      <DatePicker
        name="date"
        value={inputs.date}
        onChange={handleChange}
        className="w-[180px] lg:w-[200px]"
      />

      <DropdownFilter
        name="grade"
        btnLabel="学年"
        options={GRADE_OPTIONS}
        numbers={gradesNumber}
        filterValue={inputs.grade}
        onChange={handleChange}
      />

      <DropdownFilter
        name="going"
        btnLabel="登校"
        options={GOING_OPTIONS_FILTER}
        numbers={[count?.going.use || 0, count?.going.notUse || 0, count?.going.unregistered || 0]}
        filterValue={inputs.going}
        onChange={handleChange}
      />

      <DropdownFilter
        name="returning"
        btnLabel="下校"
        placement={{ tablet: 'right' }}
        options={RETURNING_OPTIONS_FILTER}
        numbers={[
          count?.returning.use || 0,
          count?.returning.notUse || 0,
          count?.returning.unregistered || 0,
        ]}
        filterValue={inputs.returning}
        onChange={handleChange}
      />

      <Button
        variant="link"
        className="h-[40px] focus:bg-regent-gray-50"
        onClick={handleResetSearch}
      >
        クリア
      </Button>
    </div>
  );
}
