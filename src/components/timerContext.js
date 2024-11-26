import React, { createContext, useState, useEffect, useCallback } from "react";
import useCart from "../zustand/cart";

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [remainingTime, setRemainingTime] = useState(15 * 60); // Default to 15 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [change, setChange] = useState('')

  // Function to handle notifications when the timer ends
  const handleTimerEnd = useCallback(() => {
    alert("Time is up!"); // Replace with your notification logic
  }, []);

  // Start the timer and save the end time in localStorage
  const startTimer = useCallback(() => {
    const startTime = Date.now();
    const endTime = startTime + 15 * 60 * 1000; // Add 15 minutes in milliseconds
    localStorage.setItem("timerEndTime", endTime); // Save end time in localStorage
    setIsRunning(true); // Set the timer as running
    setChange(Math.random().toString(36).substring(2, 7))
  }, []);

  // Load the saved end time from localStorage and calculate the remaining time
  useEffect(() => {
    const savedEndTime = localStorage.getItem("timerEndTime");
    if (savedEndTime) {
      const currentTime = Date.now();
      const endTime = parseInt(savedEndTime, 10);
      const timeLeft = Math.max((endTime - currentTime) / 1000, 0); // Calculate remaining time in seconds
      setRemainingTime(Math.floor(timeLeft)); // Set the remaining time
      setIsRunning(timeLeft > 0); // If timeLeft is greater than 0, the timer is still running
    }
  }, [change]);

  // Countdown logic: Decrease remaining time every second
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleTimerEnd(); // Trigger notification when time ends
          setIsRunning(false);
          localStorage.removeItem("timerEndTime"); // Clear the end time from localStorage
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, handleTimerEnd]);

  // Calculate the progress percentage (how much time has passed)
  const getProgressPercentage = () => {
    return ((15 * 60 - remainingTime) / (15 * 60)) * 100;
  };

  return (
    <TimerContext.Provider value={{ remainingTime, startTimer, isRunning, getProgressPercentage }}>
      {children}
    </TimerContext.Provider>
  );
};
