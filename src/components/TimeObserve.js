import React, { useState } from "react";
import TimerClock from "./TimerClock";

import {  of, fromEvent,  interval, timer, range } from 'rxjs';
import { map, tap, take, scan, takeUntil, reduce} from 'rxjs/operators';
import { wait } from "@testing-library/react";



const initialState = {
  hours: "HH",
  minutes: "MM",
  seconds: "SS"
}

const zeroState = {
  hours: String(0).padStart(2, "0"),
  minutes: String(0).padStart(2, "0"),
  seconds: String(0).padStart(2, "0"),
}

const TimeObserve = () => {

  const [state, setState] = useState({ ...initialState });
  const [intervalId, setIntervalId] = useState(null);
  const [isActive, setActive] = useState(true);


  //================== START TIMER ================================
  const startTimer = (stateTime = 1) => {
    setIntervalId( interval( 1000)
    .subscribe(
      (time) => {
            setState({
              hours: String(
                Math.floor(((time+stateTime) % (60 * 60 * 24)) / ( 60 * 60))
              ).padStart(2, "0"),
              minutes: String(
                Math.floor(((time+stateTime )% ( 60 * 60)) / ( 60))
              ).padStart(2, "0"),
              seconds: String(Math.floor((time+stateTime)% (60)) ).padStart(2, "0"),
            })
          }
      ))

  }

//=========================== START / STOP =========================================
  const hndlClick = (e) => {
    e.preventDefault()
    if (isActive) {
      setActive(false);
      if (isNaN(state.seconds)) {
        setState({ ...zeroState })
        startTimer()
      } else {
        startTimer(Number(state.hours) * 60 * 60 + Number(state.minutes) * 60 + Number(state.seconds) +1)
      }
      
    } else {
      intervalId.unsubscribe()
      setActive(true);
      setState({ ...initialState })
      setIntervalId(null)
    }

  }
  
  //=========================== RESET =========================================
  const hndlReset = (e) => {
    e.preventDefault();
    if (!isActive) {
      intervalId.unsubscribe()
      setState({...zeroState})
      startTimer()
    } else {
      return
    }

  }

  //=========================== DBL WEIGHT =========================================
  const wait = () => {
    intervalId.unsubscribe()
    setActive(true)
    }

  const hdlWait = (e) => {
    e.preventDefault();
    if (!isActive) {
      fromEvent(document, 'click')
        .pipe(
          takeUntil(interval(300)),
          reduce((acc, i) => acc.concat(i), [])
      )
        .subscribe(x => { x.length >= 2 && wait() });
    } else {return}
  }

 



    return (
      <TimerClock
        hours={state.hours}
        minutes={state.minutes}
        seconds={state.seconds}
        isActive={isActive}
        hndlClick={hndlClick}
        hndlReset={hndlReset}
        hdlWait={hdlWait}
    
      />
    );


}

export default TimeObserve;