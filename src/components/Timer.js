import React, { Component } from "react";
import {TimerClock} from "./TimerClock";
import { Observable } from 'rxjs';



const initialState = {
  hours: "HH",
  minutes: "MM",
  seconds: "SS",
  startTime: null,
  isActive: true,
  pauseLong: 0,
};

class Timer extends Component {
  state = { ...initialState };

  intervalId = null;
  clickCounter = 0;
  firstClick = 0;
  secondClick = 0;

  hndlClick = () => {
    if (!this.state.isActive) {
      clearInterval(this.intervalId);
      this.setState({ ...initialState });
      return;
    } else {
      this.timeOut();
    }
  };

  timeOut = () => {
    if (isNaN(Number(this.state.seconds))) {
      this.setState({ isActive: false, startTime: Date.now() });
    } else {
      this.setState((prev) => ({
        isActive: false,
        startTime: prev.startTime + (Date.now() - this.state.pauseLong),
      }));
    }
    this.intervalId = setInterval(() => {
      const diffTime = Date.now() - this.state.startTime;
      this.updateTimer(diffTime);
    }, 1000);
  };

  updateTimer = (time) => {
    this.setState({
      hours: String(
        Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      ).padStart(2, "0"),
      minutes: String(
        Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))
      ).padStart(2, "0"),
      seconds: String(Math.floor((time % (1000 * 60)) / 1000)).padStart(2, "0"),
    });
  };

  hdlWait = (e) => {
    this.clickCounter +=1

     const timer = new Observable(observer => {

      setTimeout(() => {
        observer.next(this.clickCounter)
        observer.complete()
       }, 300);
      
 
    });

    
    const subscription = timer.subscribe({
      next: value => {
        if (value < 2) {
          return
        };
          this.setState({
          isActive: true,
          pauseLong: Date.now(),
          });
          console.log("true", value)
        },

      complete: () => this.clickCounter = 0
  })

 

  // setTimeout(() => subscription.unsubscribe(), 1000);
  }


    // this.clickCounter += 1;
    // if (this.clickCounter === 1) {
    //   this.firstClick = Date.now();
    // } else if (this.clickCounter === 2) {
    //   this.secondClick = Date.now();
    //   const diff = this.secondClick - this.firstClick;
    //   if (diff < 300) {
    //     clearInterval(this.intervalId);
    //     this.setState({
    //       isActive: true,
    //       pauseLong: Date.now(),
    //     });
    //     this.clickCounter = 0;
    //   } else {
    //     this.clickCounter = 0;
    //     return;
    //   }
    // }
 

  hndlReset = () => {
    if (this.state.isActive) {
      return;
    } else {
      clearInterval(this.intervalId);
      this.setState({
        ...initialState,
        hours: "00",
        minutes: "00",
        seconds: "00",
      });
      this.timeOut();
    }
  };

  render() {
    const { hours, minutes, seconds, isActive } = this.state;
    return (
      <TimerClock
        hours={hours}
        minutes={minutes}
        seconds={seconds}
        isActive={isActive}
        hndlClick={this.hndlClick}
        hndlReset={this.hndlReset}
        hdlWait={this.hdlWait}
      />
    );
  }
}

export default Timer;
