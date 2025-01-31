"use client";

import { useEffect, useState } from "react";

type Props = {
  onComplete: () => void;
  seconds?: number;
};

const Timer = (props: Props) => {
  // State
  const [seconds, setSeconds] = useState(props?.seconds ?? 30);

  // UseEffect to set the timer
  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
      } else {
        clearInterval(timer);
        props?.onComplete?.();
      }
    }, 1000);

    // Clear the timer on component unmount
    return () => clearInterval(timer);

    // eslint-disable-next-line
  }, [props.onComplete, seconds]);

  // Return JSX
  return (
    <div className="timer flex justify-between items-baseline">
      {seconds < 10 ? `0:0${seconds}` : `0:${seconds}`}s
    </div>
  );
};

export default Timer;
