import { useEffect, useRef, useState } from "react";

import { ProgressCircle } from "./styles";

interface Props {
  size: number;
  strokeWidth: number;
  circleOneStroke: string;
  circleTwoStroke: string;
  progress: number;
  text: string;
  Icon: any;
}

const ProgressCircleBar: React.FC<Props> = (props) => {
  const [offset, setOffset] = useState(0);
  const circleRef = useRef(null);
  const {
    size,
    progress,
    strokeWidth,
    circleOneStroke,
    circleTwoStroke,
    Icon,
    text,
  } = props;

  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const progressOffset = ((100 - progress) / 100) * circumference;
    setOffset(progressOffset);

    circleRef.current.style = "transition: stroke-dashoffset 850ms ease-in-out";
  }, [setOffset, progress, circumference, offset]);

  return (
    <ProgressCircle>
      <div className="flex items-center justify-center">
        <svg className="svg" width={size} height={size}>
          <circle
            className="svg-circle-bg"
            stroke={circleOneStroke}
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
          />
          <circle
            className="svg-circle"
            ref={circleRef}
            stroke={circleTwoStroke}
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>

        <span className="content">
          {text} <br />
          {Icon && <Icon width={50} />}
        </span>
      </div>
    </ProgressCircle>
  );
};

export default ProgressCircleBar;
