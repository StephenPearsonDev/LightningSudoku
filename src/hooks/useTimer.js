import { useState, useRef, useCallback, useEffect } from 'react';

export default function useTimer(initialTime = 0, autoStart = true) {
  const [time, setTime] = useState(initialTime);
  const [isPaused, setIsPaused] = useState(!autoStart);
  const timerRef = useRef(null);

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTime(prev => prev + 1);
    }, 1000);
    setIsPaused(false);
  }, []);

  const pauseTimer = useCallback(() => {
    clearInterval(timerRef.current);
    setIsPaused(true);
  }, []);

  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current);
    setTime(0);
    if (!isPaused) {
      startTimer();
    }
  }, [isPaused, startTimer]);

  useEffect(() => {
    if (!isPaused) startTimer();
    return () => clearInterval(timerRef.current);
  }, [startTimer, isPaused]);

  return { time, isPaused, startTimer, pauseTimer, resetTimer };
}
