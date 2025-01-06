import Button from '@/components/atoms/Button';
import { currentBusDataSelector, searchInputsSelector } from '@/stores/driver/slice';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import driverAPI from '@/libs/api/driver';
import { format } from 'date-fns';
import PageLoader from '@/components/atoms/PageLoader';
import { useAppDispatch } from '@/stores';
import { setToast } from '@/stores/global/slice';
import { TEXT } from '@/utils/constants/text';
import IconCloudDownload from '@/assets/icons/icon_cloud_download.svg';

export default function DownloadCSV() {
  const dispatch = useAppDispatch();

  const inputs = useSelector(searchInputsSelector);
  const currentBusData = useSelector(currentBusDataSelector);

  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const blob = await driverAPI.downloadData({
        date: format(inputs.date, 'yyyy-MM-dd'),
        query: inputs.query,
        busNumber: inputs.busNumber?.value || '',
        busName: currentBusData?.name || '',
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${format(inputs.date, 'yyyyMMdd')}_${inputs.busNumber?.value}_${currentBusData?.name}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      dispatch(
        setToast({
          status: 'error',
          message: TEXT.errors.somethingError,
        }),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <PageLoader />}
      <Button icon={IconCloudDownload} disabled={!currentBusData?.hasData} onClick={handleDownload}>
        ダウンロード
      </Button>
    </>
  );
}
