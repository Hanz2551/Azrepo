import { cn } from '@/utils/helpers/tailwind';

type Props = {
  textClassName: string;
  wrapperClassName?: string;
  text: string;
  transcription: {
    indexes: [number, number];
    text: string;
  };
};

export default function TextWithTranscription({
  text,
  wrapperClassName,
  textClassName,
  transcription,
}: Props) {
  const textArray = text.split('');
  return (
    <span className={cn('pt-[22px]', textClassName, wrapperClassName)}>
      {textArray.slice(0, transcription.indexes[0]).map((char) => char)}
      <span className={cn('relative', textClassName)}>
        <span className="absolute left-[50%] bottom-[calc(100%_+_4px)] translate-x-[-50%] whitespace-nowrap text-[16px] leading-[18px] text-color-text">
          {transcription.text}
        </span>
        {textArray
          .slice(transcription.indexes[0], transcription.indexes[1] + 1)
          .map((char) => char)}
      </span>
      {textArray.slice(transcription.indexes[1] + 1).map((char) => char)}
    </span>
  );
}
