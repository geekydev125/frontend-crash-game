import { useEffect, useState } from 'react';

// Crash factor = (elapsed time) * TIME_TO_FACTOR_RATIO
const TIME_TO_FACTOR_RATIO = 0.5; // 1s = 0.5x
const START_FACTOR = 1;

const Timer = ({ pause, startTimeMs }) => {
  const startTime = new Date(startTimeMs);
  const [elapsed, setElapsed] = useState(startTime.getTime());
  const elapsedSeconds = (elapsed * TIME_TO_FACTOR_RATIO) / 1000 + START_FACTOR;
  const wholePart = Math.trunc(elapsedSeconds);
  const decimalPart =
    Math.trunc((elapsedSeconds - Math.floor(elapsedSeconds)) * 10) * 10;

  useEffect(() => {
    const interval = setInterval(() => {
      if (pause) {
        return;
      }

      setElapsed(e => e + 10);
    }, 10);

    return () => clearInterval(interval);
  }, [pause]);

  return (
    <span>
      {wholePart}.{decimalPart === 0 ? '00' : decimalPart}
    </span>
  );
};

export default Timer;
