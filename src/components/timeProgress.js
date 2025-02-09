import React, { useContext, useEffect } from "react";
import { TimerContext } from "./timerContext";
import useCart from "../zustand/cart";


const Countdown = () => {
  const { remainingTime, isRunning, getProgressPercentage } = useContext(TimerContext);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
      <>
        {
            isRunning && <div className="timer-fix-footer" >
              <div className="w-100 position-relative h-100" style={{ backgroundColor: "#e0e0e0" }}>
                <p className="time-text text-theme-bot">{formatTime(remainingTime)}</p>
                <div
                    style={{
                      width: `${getProgressPercentage()}%`,
                      height: "100%",
                      backgroundColor: "#0B904F",
                      transition: "width 1s ease-in-out"
                    }}
                />
              </div>
            </div>
        }
      </>

  );
};

export default Countdown;
