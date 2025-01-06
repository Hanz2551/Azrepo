import { TSendStatus } from '@/utils/types/notification';
import { useMemo } from 'react';

export default function NotificationSendStatus({ status }: { status: TSendStatus }) {
  const data = useMemo(() => {
    switch (status) {
      case 'not_send':
        return {
          bgColor: 'bg-sky-blue-50',
          iconColor: 'bg-primary',
          text: '予約済',
          textColor: 'text-sky-blue-900',
        };
      case 'in_progress':
        return {
          bgColor: 'bg-leaf-green-50',
          iconColor: 'bg-success',
          text: '配信中',
          textColor: 'text-[#112a09]',
        };
      case 'end':
        return {
          bgColor: 'bg-regent-gray-100',
          iconColor: 'bg-regent-gray-600',
          text: '配信終了',
          textColor: 'text-color-text',
        };
    }
  }, [status]);

  return (
    <div
      className={`whitespace-nowrap rounded-[8px] pl-[4px] pr-[8px] py-1 inline-flex items-center gap-1 ${data.bgColor}`}
    >
      <div className="w-[16px] h-[16px] p-1">
        <div className={`w-[8px] h-[8px] rounded-full ${data.iconColor}`} />
      </div>
      <span className={`text-one-line14 font-bold ${data.textColor}`}>{data.text}</span>
    </div>
  );
}
