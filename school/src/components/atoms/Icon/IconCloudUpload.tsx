type Props = {
  width?: number;
  height?: number;
  className?: string;
  onClick?: () => void;
};

export default function IconCloudUpload({
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
        d="M8.47939 8.66684V14.0002M8.47939 8.66684L5.81273 11.3335M8.47939 8.66684L11.1461 11.3335M3.14606 9.93284C2.65075 9.42679 2.2771 8.81465 2.05342 8.1428C1.82973 7.47095 1.76186 6.75701 1.85497 6.05504C1.94807 5.35308 2.1997 4.68151 2.59079 4.0912C2.98188 3.50089 3.50218 3.00732 4.11228 2.64788C4.72238 2.28843 5.40628 2.07255 6.11217 2.01656C6.81806 1.96058 7.52744 2.06597 8.18657 2.32475C8.8457 2.58353 9.4373 2.98892 9.91655 3.5102C10.3958 4.03149 10.7501 4.655 10.9527 5.33351H12.1461C12.7897 5.33344 13.4164 5.54039 13.9334 5.9238C14.4504 6.30722 14.8304 6.84675 15.0172 7.46271C15.2041 8.07868 15.1878 8.7384 14.9709 9.34443C14.754 9.95045 14.348 10.4707 13.8127 10.8282"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
