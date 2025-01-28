import React, { createContext, useState, useEffect, useCallback, useRef } from "react";
export const TimerContext = createContext();
import useCart from "../zustand/cart";

export const TimerProvider = ({ children }) => {
  const deleteAllCarts = useCart((state)=>state.deleteAllCarts)
  const getCarts = useCart((state) => state.getCarts)
  const carts = useCart((state) => state.state.carts)

  const [remainingTime, setRemainingTime] = useState(15 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [change, setChange] = useState('');
  const intervalRef = useRef(null);

  const handleTimerEnd = useCallback(() => {
    deleteAllCarts()
  }, []);

  const startTimer = useCallback(() => {
    stopTimer(); 

    const startTime = Date.now();
    const endTime = startTime + 15 * 60 * 1000;
    localStorage.setItem("timerEndTime", endTime); 
    setIsRunning(true); 
    setChange(Math.random().toString(36).substring(2, 7));
  }, []);

  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false); 
    setRemainingTime(15 * 60);
    localStorage.removeItem("timerEndTime");
  }, []);

  useEffect(() => {
    const savedEndTime = localStorage.getItem("timerEndTime");

    if (savedEndTime) {
      const currentTime = Date.now();
      const endTime = parseInt(savedEndTime, 10);
      const timeLeft = Math.max((endTime - currentTime) / 1000, 0);
      setRemainingTime(Math.floor(timeLeft));
      setIsRunning(timeLeft > 0); 
    }
  }, [change]);

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          intervalRef.current = null; 
          handleTimerEnd();
          setIsRunning(false);
          localStorage.removeItem("timerEndTime"); 
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null; 
    };
  }, [isRunning, handleTimerEnd]);

  useEffect(()=>{
    getCarts()

    if (carts.length === 0) {
      stopTimer()
    }
  }, [])

  const getProgressPercentage = () => {
    return ((15 * 60 - remainingTime) / (15 * 60)) * 100;
  };

  return (
    <TimerContext.Provider value={{ 
      remainingTime, 
      startTimer, 
      stopTimer, 
      isRunning, 
      getProgressPercentage 
    }}>
      {children}
    </TimerContext.Provider>
  );
};
