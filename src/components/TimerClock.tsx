import React from "react";
import s from "./TimerClock.module.css";

const TimerClock = ({
  hours,
  minutes,
  seconds,
  isActive,
  hndlClick,
  hdlWait,
  hndlReset,
}) => {
  const onClickStart = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    hndlClick(e);
  };
  const onClickWait = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    hdlWait(e);
  };
  const onClickReset = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    hndlReset(e);
  };



  return (
    <>
      <div className={s.timerWrapper}>
        <p className={s.timer}>
          {hours}: {minutes}: {seconds}
        </p>
      </div>
      <div className={s.btnWrapper}>
        <button type="button" onClick={onClickStart} className={s.timerBtn}>
          {isActive ? "Start" : "Stop"}
        </button>
        <button type="button" onClick={onClickWait} className={s.timerBtn}>
          Wait
        </button>
        <button type="button" onClick={onClickReset} className={s.timerBtn}>
          Reset
        </button>
      </div>
    </>
  );
};

export default TimerClock
