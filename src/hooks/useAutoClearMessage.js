import { useState, useEffect, useCallback, useRef } from 'react';

export default function useAutoClearMessage(duration = 3000) {
  const [message, setMessage] = useState('');
  const timeoutRef = useRef(null);

  const updateMessage = useCallback((newMessage) => {
    setMessage(newMessage);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (newMessage) {
      timeoutRef.current = setTimeout(() => {
        setMessage('');
      }, duration);
    }
  }, [duration]);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return [message, updateMessage];
}
