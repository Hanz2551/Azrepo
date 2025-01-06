import { useAppDispatch } from '@/stores';
import { dataSelector, getTopData, resetStore } from '@/stores/top/slice';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ImageBus01 from '@/assets/images/bus_01.png';
import Button from '@/components/atoms/Button';
import Link from 'next/link';
import { ROUTES } from '@/utils/constants/routes';
import PageLoader from '@/components/atoms/PageLoader';
import TextWithTranscription from './TextWithTranscription';
import { cn } from '@/utils/helpers/tailwind';

export default function Top() {
  const dispatch = useAppDispatch();

  const data = useSelector(dataSelector);

  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    dispatch(getTopData())
      .unwrap()
      .finally(() => setFetching(false));

    return () => {
      dispatch(resetStore());
    };
  }, []); // eslint-disable-line

  if (fetching) return <PageLoader />;

  if (!data) return null;

  return (
    <>
      <div className="min-h-[calc(100dvh_-_210px)] px-[50px] pt-[160px]">
        <div
          className={cn(
            'bg-white rounded-[16px] flex flex-col justify-center items-center px-6',
            data.hasSchedule ? 'py-[80px]' : 'pt-[80px] pb-[120px]',
          )}
        >
          <h1 className="leading-[1] font-medium">
            <span className="text-[56px]">{data.studentName}</span>
            <span className="ml-2 text-[32px]">さん</span>
          </h1>

          <div className="text-center my-[100px]">
            {data.hasSchedule ? (
              <img src={ImageBus01.src} alt="image bus" className="block mx-auto" />
            ) : (
              <div className="h-[24px]" />
            )}

            <div className="mt-2 text-center">
              <TextWithTranscription
                text="帰りのバスは"
                textClassName="inline-block text-[32px] leading-[35px] font-medium"
                transcription={{ indexes: [0, 0], text: 'かえ' }}
              />
            </div>

            <p className="font-medium inline-flex items-baseline mt-4">
              {data.hasSchedule ? (
                <>
                  <span className="font-lato inline-block text-[72px] leading-[72px] text-sky-blue-400">
                    {data.scheduleInfo.busNumber}
                  </span>
                  <TextWithTranscription
                    text="号車"
                    textClassName="inline-block text-[72px] leading-[72px]"
                    wrapperClassName="text-sky-blue-400"
                    transcription={{ indexes: [0, 1], text: 'ごうしゃ' }}
                  />
                  <span className="inline-block text-[32px] leading-[35px] ml-2">です</span>
                </>
              ) : (
                <>
                  <TextWithTranscription
                    text="使わない"
                    textClassName="inline-block text-[72px] leading-[72px]"
                    wrapperClassName="text-sky-blue-400"
                    transcription={{ indexes: [0, 0], text: 'つか' }}
                  />
                  <TextWithTranscription
                    text="予定だよ！"
                    textClassName="inline-block text-[32px] leading-[35px]"
                    wrapperClassName="ml-2"
                    transcription={{ indexes: [0, 1], text: 'よてい' }}
                  />
                </>
              )}
            </p>
          </div>

          {data.hasSchedule ? (
            <p className="font-medium inline-flex items-baseline">
              <span className="inline-block text-[72px] leading-[72px] text-sky-blue-400">
                {data.scheduleInfo.startAt}
              </span>
              <TextWithTranscription
                text="に出発するよ！"
                textClassName="inline-block text-[32px] leading-[35px]"
                wrapperClassName="ml-4"
                transcription={{ indexes: [1, 2], text: 'しゅっぱつ' }}
              />
            </p>
          ) : (
            <p className="font-medium">
              <TextWithTranscription
                text="車に"
                textClassName="inline-block text-[32px] leading-[35px]"
                transcription={{ indexes: [0, 0], text: 'くるま' }}
              />
              <TextWithTranscription
                text="気をつけて"
                textClassName="inline-block text-[32px] leading-[35px]"
                transcription={{ indexes: [0, 0], text: 'き' }}
              />
              <TextWithTranscription
                text="帰ってきてね！"
                textClassName="inline-block text-[32px] leading-[35px]"
                transcription={{ indexes: [0, 0], text: 'かえ' }}
              />
            </p>
          )}
        </div>
      </div>

      <div className="h-[210px] flex items-center justify-center">
        <Link href={ROUTES.LOGIN}>
          <Button className="h-[84px] text-[36px] w-[320px] rounded-full">もどる</Button>
        </Link>
      </div>
    </>
  );
}
