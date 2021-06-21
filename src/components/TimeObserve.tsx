import React, { useState } from "react";
import TimerClock from './TimerClock.tsx';
  

import { fromEvent,  interval} from 'rxjs';
import { takeUntil, reduce} from 'rxjs/operators';


type TState = {
  hours: string,
  minutes: string,
  seconds: string
}
  
const initialState:TState = {
  hours: "HH",
  minutes: "MM",
  seconds: "SS"
}

const zeroState: TState = {
  hours: String(0).padStart(2, "0"),
  minutes: String(0).padStart(2, "0"),
  seconds: String(0).padStart(2, "0"),
}

const TimeObserve = () => {

  const [state, setState] = useState({ ...initialState });
  const [intervalId, setIntervalId] = useState(null);
  const [isActive, setActive] = useState(true);


  //================== START TIMER ================================
  const startTimer = (stateTime: number = 1) => {
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
  const hndlClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    
    if (isActive) {
      setActive(false);
      if (isNaN(Number(state.seconds))) {
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
  const hndlReset = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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

  const hdlWait = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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