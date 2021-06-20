import React from "react";
import {
  timerWrapper,
  btnWrapper,
  timerBtn,
  timer,
} from "./TimerClock.module.css";

const TimerClock = ({
  hours,
  minutes,
  seconds,
  isActive,
  hndlClick,
  hdlWait,
  hndlReset,
}) => {
  const onClickStart = (e) => {
    hndlClick(e);
  };
  const onClickWait = (e) => {
    hdlWait(e);
  };
  const onClickReset = (e) => {
    hndlReset(e);
  };



  return (
    <>
      <div className={timerWrapper}>
        <p className={timer}>
          {hours}: {minutes}: {seconds}
        </p>
      </div>
      <div className={btnWrapper}>
        <button type="button" onClick={onClickStart} className={timerBtn}>
          {isActive ? "Start" : "Stop"}
        </button>

        <button type="button" onClick={onClickWait} className={timerBtn}>
          Wait
        </button>
        <button type="button" onClick={onClickReset} className={timerBtn}>
          Reset
        </button>
      </div>
    </>
  );
};

export default TimerClock;
