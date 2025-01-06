import Input from '@/components/atoms/Input';
import DatePicker from '@/components/atoms/DatePicker';

import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/stores';
import { useEffect, useMemo, useRef } from 'react';
import _debounce from 'lodash/debounce';
import {
  busesNoSelector,
  getDriverSchedule,
  resetDriverSchedule,
  searchInputsSelector,
  setSearchInputs,
} from '@/stores/driver/slice';
import Select from '@/components/atoms/Select';
import { format, isSameMonth } from 'date-fns';
import DownloadData from './DownloadData';

export default function SearchBar() {
  const dispatch = useAppDispatch();

  const inputQueryRef = useRef<HTMLInputElement>(null);

  const inputs = useSelector(searchInputsSelector);
  const busesNo = useSelector(busesNoSelector);

  const monthParam = useMemo(() => format(inputs.date, 'yyyy-MM'), [inputs.date]);

  const busesOptions = useMemo(() => {
    const busesByMonth = busesNo?.[monthParam];
    return busesByMonth || [];
  }, [monthParam, busesNo]);

  useEffect(() => {
    if (!inputQueryRef.current) return;
    if (inputs.query !== inputQueryRef.current.value) {
      inputQueryRef.current.value = inputs.query || '';
    }
  }, [inputs.query]);

  const handleChange = ({ name, value }: { name: string; value: unknown }) => {
    // if change query but busNumber is empty, just change query, do nothing
    if (name === 'query' && !inputs.busNumber) {
      return dispatch(setSearchInputs({ [name]: value }));
    }

    // if name !== 'date' -> fetch normally
    if (name !== 'date') {
      dispatch(setSearchInputs({ [name]: value }));
      return dispatch(getDriverSchedule());
    }

    // if is same month with current month param filter
    if (isSameMonth(value as Date, inputs.date)) {
      dispatch(setSearchInputs({ [name]: value }));
      return !!busesOptions.length && dispatch(getDriverSchedule());
    }

    // onChange other month with current month param filter
    const month = format(value as Date, 'yyyy-MM');
    const monthHasBeenFetched = !!busesNo?.[month];

    // check month just changed has been fetched before
    // if not, dispatch to fetch new month
    if (!monthHasBeenFetched) {
      dispatch(setSearchInputs({ [name]: value }));
      return dispatch(getDriverSchedule());
    }

    // if month has been fetched, and busesNo of that month has data, reset busNumber to first item
    if (busesNo[month][0]) {
      dispatch(setSearchInputs({ [name]: value, busNumber: busesNo[month][0] }));
      return dispatch(getDriverSchedule());
    }

    // if no data, change date and reset busNumber
    dispatch(setSearchInputs({ [name]: value, busNumber: null }));
    dispatch(resetDriverSchedule());
  };

  const handleChangeQuery = _debounce(
    ({ name, value }: { name: string; value: string }) => {
      handleChange({ name, value: value.trim() });
    },
    1000,
    { trailing: true },
  );

  return (
    <div className="mt-6 flex justify-between flex-wrap">
      <div className="flex flex-wrap gap-2 max-md:w-full max-md:mb-4">
        <Input
          ref={inputQueryRef}
          name="query"
          placeholder="生徒名"
          className="w-[132px] min-[470px]:w-[180px] min-[560px]:w-[200px] md:w-[180px] xl:w-[200px]"
          onChange={handleChangeQuery}
        />

        <DatePicker
          name="date"
          value={inputs.date}
          onChange={handleChange}
          className="w-[132px] min-[470px]:w-[180px] min-[560px]:w-[200px] md:w-[180px] xl:w-[200px]"
        />

        <Select
          name="busNumber"
          className="w-[128px]"
          placeholder=""
          menuWidthClass="!w-[128px]"
          options={busesOptions}
          value={inputs.busNumber}
          onChange={handleChange}
        />
      </div>

      <DownloadData />
    </div>
  );
}
