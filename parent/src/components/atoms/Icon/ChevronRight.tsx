type Props = {
  width?: number;
  height?: number;
};

export default function IconChevronRight({ width = 16, height = 16 }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M6 12L10 8L6 4"
        stroke="#18181B"
        strokeWidth="1.33"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
