import { useState, useEffect } from 'react';

function useTimeCounter() {
  const [time, setTime] = useState(0);
  intervalId = setInterval(() => {
    setTime((prevtime) => prevtime + 1);
  }, 1000);
  return time;
}
