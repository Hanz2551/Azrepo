type Props = {
  width?: number;
  height?: number;
  className?: string;
  onClick?: () => void;
};

export default function IconChevronLeft({
  width = 16,
  height = 16,
  className = '',
  onClick,
}: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      {...(onClick && { onClick })}
    >
      <path
        d="M10 12L6 8L10 4"
        stroke="#18181B"
        strokeWidth="1.33"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
