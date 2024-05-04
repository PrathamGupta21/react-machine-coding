import './style.css';
import { useState, useEffect } from 'react';

function Countdown() {
  const [isStart, setIsStart] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const [timerId, setTimerId] = useState(0);

  useEffect(() => {
    let tid;
    if (isStart) {
      tid = setInterval(() => {
        runTimer(seconds, minutes, hours, tid);
      }, 1000);
      setTimerId(tid);
    }

    return () => {
      clearInterval(tid);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStart, hours, minutes, seconds]);

  const handleStart = () => {
    if (hours === 0 && minutes === 0 && seconds === 0) {
      alert('Please provide some value for the timer.');
      return;
    } else {
      setIsStart(true);
    }
  };

  const handleResume = () => {
    setIsPaused(false);
    runTimer(seconds, minutes, hours);
  };

  const handlePause = () => {
    setIsPaused(true);
    clearInterval(timerId);
  };

  const handleReset = () => {
    setIsStart(false);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    clearInterval(timerId);
  };

  const runTimer = (sec, min, hr, tid) => {
    if (sec > 0) {
      setSeconds((s) => s - 1);
    } else if (min > 0) {
      setMinutes((m) => m - 1);
      setSeconds(59);
    } else if (hr > 0) {
      setHours((h) => h - 1);
      setMinutes(59);
      setSeconds(59);
    }

    if (sec === 0 && min === 0 && hr === 0) {
      handleReset();
      alert('Timer is finished');
      clearInterval(tid);
      return;
    }
  };

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : `${time}`;
  };

  return (
    <>
      <h1>Countdown Timer</h1>
      {isStart ? (
        <div>
          <div className='timer-box'>
            <div>{formatTime(hours)}</div>
            <span>:</span>
            <div>{formatTime(minutes)}</div>
            <span>:</span>
            <div>{formatTime(seconds)}</div>
          </div>

          <div>
            {isPaused ? (
              <button onClick={handleResume} className='timer-button'>
                Resume
              </button>
            ) : (
              <button onClick={handlePause} className='timer-button'>
                Pause
              </button>
            )}
            <button className='timer-button' onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className='input-box'>
            <input
              id='hours'
              type='number'
              onChange={(e) =>
                setHours(Math.max(0, Math.min(23, parseInt(e.target.value))))
              }
              placeholder='HH'
            />
            <input
              id='minutes'
              type='number'
              onChange={(e) =>
                setMinutes(Math.max(0, Math.min(59, parseInt(e.target.value))))
              }
              placeholder='MM'
            />
            <input
              id='seconds'
              type='number'
              onChange={(e) =>
                setSeconds(Math.max(0, Math.min(59, parseInt(e.target.value))))
              }
              placeholder='SS'
            />
          </div>
          <button onClick={handleStart} className='timer-button'>
            Start
          </button>
        </div>
      )}
    </>
  );
}

export default Countdown;
