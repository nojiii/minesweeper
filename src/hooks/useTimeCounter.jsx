import { useState, useEffect } from 'react';

export function useTimeCounter() {
  const [time, setTime] = useState(0);
  const intervalId = setInterval(() => {
    setTime((prevtime) => prevtime + 1);
  }, 1000);
  return time;
}
