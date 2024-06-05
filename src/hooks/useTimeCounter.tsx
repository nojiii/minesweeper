import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import dH from '../assets/images/d-.svg';
import d0 from '../assets/images/d0.svg';
import d1 from '../assets/images/d1.svg';
import d2 from '../assets/images/d2.svg';
import d3 from '../assets/images/d3.svg';
import d4 from '../assets/images/d4.svg';
import d5 from '../assets/images/d5.svg';
import d6 from '../assets/images/d6.svg';
import d7 from '../assets/images/d7.svg';
import d8 from '../assets/images/d8.svg';
import d9 from '../assets/images/d9.svg';

export function useTimeCounter() {
  const [time, setTime] = useState(0);
  const intervalId = setInterval(() => {
    setTime((prevTime) => {
      const newTime = prevTime + 1;
      return newTime;
    });
  }, 1000);
  if (time >= 999) {
    return [
      <img src={d9.src} style={{ height: '100%' }} key={uuidv4()} />,
      <img src={d9.src} style={{ height: '100%' }} key={uuidv4()} />,
      <img src={d9.src} style={{ height: '100%' }} key={uuidv4()} />,
    ];
  }
  const result: React.JSX.Element[] = [
    <img src={d0.src} style={{ height: '100%' }} key={uuidv4()} />,
    <img src={d0.src} style={{ height: '100%' }} key={uuidv4()} />,
    <img src={d0.src} style={{ height: '100%' }} key={uuidv4()} />,
  ];
  const ds: React.ImgHTMLAttributes<HTMLImageElement>[] = [d0, d1, d2, d3, d4, d5, d6, d7, d8, d9];
  const nums: string[] = String(time).split('');
  nums.forEach((num) => {
    if (num === '-') {
      result.push(<img src={dH.src} style={{ height: '100%' }} key={uuidv4()} />);
    } else {
      result.push(<img src={ds[parseInt(num)].src} style={{ height: '100%' }} key={uuidv4()} />);
    }
    result.shift();
  });
  return result;
}
