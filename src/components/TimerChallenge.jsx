import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef();
  const dialog = useRef();
  const [timerStarted, setTimerStarted] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);
  const [remainingTime, setRemainingTime] = useState(targetTime);
  const [result, setResult] = useState("lost");

  function handleStart() {
    timer.current = setTimeout(() => {
      setTimerExpired(true);
      setResult("lost");
      setRemainingTime(0);
      dialog.current.open();
    }, targetTime * 1000);
    setTimerStarted(true);
  }

  function handleStop() {
    if (timerStarted && !timerExpired) {
      const remaining = (targetTime * 1000 - (Date.now() - timer.current.start)) / 1000;
      setRemainingTime(remaining.toFixed(2));
      setResult("won");
    }
    clearTimeout(timer.current.id);
    setTimerStarted(false);
    dialog.current.open();
  }

  return (
    <>
      <ResultModal ref={dialog} targetTime={targetTime} result={result} remainingTime={remainingTime} />
      <section className="challenge">
        <h2>{title}</h2>

        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerStarted ? handleStop : handleStart}>
            {timerStarted ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerStarted ? "active" : undefined}>
          {timerStarted ? "Time is running...." : "Timer inactive"}
        </p>
      </section>
    </>
  );
}