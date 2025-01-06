type Props = {
  width?: number;
  height?: number;
  className?: string;
  onClick?: () => void;
};

export default function IconTriangleAlert({
  width = 24,
  height = 24,
  className = '',
  onClick,
}: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      {...(onClick && { onClick })}
    >
      <path
        d="M12.0001 9.50022V13.5002M12.0001 17.5002H12.0101M21.7301 18.5002L13.7301 4.50022C13.5556 4.19243 13.3027 3.93641 12.997 3.75829C12.6913 3.58017 12.3438 3.48633 11.9901 3.48633C11.6363 3.48633 11.2888 3.58017 10.9831 3.75829C10.6774 3.93641 10.4245 4.19243 10.2501 4.50022L2.25005 18.5002C2.07373 18.8056 1.98128 19.1521 1.98206 19.5047C1.98284 19.8573 2.07683 20.2035 2.2545 20.508C2.43217 20.8126 2.6872 21.0648 2.99375 21.2391C3.30029 21.4133 3.64746 21.5034 4.00005 21.5002H20.0001C20.351 21.4999 20.6956 21.4072 20.9993 21.2315C21.3031 21.0558 21.5553 20.8033 21.7306 20.4993C21.9059 20.1954 21.9981 19.8506 21.998 19.4997C21.9979 19.1488 21.9055 18.8041 21.7301 18.5002Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
