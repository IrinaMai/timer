import React, { Component } from "react";

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

  onClickStart = () => {
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
      const currentTime = Date.now();
      const diffTime = currentTime - this.state.startTime;
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
  firstClick = 0;
  secondClick = 0;
  // diff = 0;

  onClickWait = () => {
    this.clickCounter += 1;
    if (this.clickCounter === 1) {
      this.firstClick = Date.now();
    } else if (this.clickCounter === 2) {
      this.secondClick = Date.now();
      const diff = this.secondClick - this.firstClick;
      if (diff < 300) {
        clearInterval(this.intervalId);
        this.setState({ isActive: true });
        this.clickCounter = 0;
        this.setState({ pauseLong: Date.now() });
      } else {
        this.clickCounter = 0;
        // this.firstClick = 0;
        // this.secondClick = 0;
        return;
      }
    }
  };

  onClickReset = () => {
    clearInterval(this.intervalId);
    this.setState({
      ...initialState,
      hours: "00",
      minutes: "00",
      seconds: "00",
    });
    this.timeOut();
  };

  render() {
    const { hours, minutes, seconds, isActive } = this.state;
    return (
      <>
        <p>
          {hours}: {minutes}: {seconds}
        </p>
        <button type="button" onClick={this.onClickStart}>
          {isActive ? "Start" : "Stop"}
        </button>

        <button type="button" onClick={this.onClickWait}>
          Wait
        </button>
        <button type="button" onClick={this.onClickReset}>
          Reset
        </button>
      </>
    );
  }
}

export default Timer;
