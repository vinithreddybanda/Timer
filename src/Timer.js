import React, { useState, useRef } from 'react';
import './Timer.css';

function Timer() {
    const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
    const [isActive, setIsActive] = useState(false);
    const intervalRef = useRef(null);

    const startTimer = () => {
        if (!isActive) {
            setIsActive(true);
            intervalRef.current = setInterval(() => {
                setTime((prev) => {
                    let { hours, minutes, seconds, milliseconds } = prev;

                    milliseconds += 10;
                    if (milliseconds >= 1000) {
                        milliseconds = 0;
                        seconds += 1;
                    }
                    if (seconds >= 60) {
                        seconds = 0;
                        minutes += 1;
                    }
                    if (minutes >= 60) {
                        minutes = 0;
                        hours += 1;
                    }
                    return { hours, minutes, seconds, milliseconds };
                });
            }, 10);
        }
    };

    const pauseTimer = () => {
        clearInterval(intervalRef.current);
        setIsActive(false);
    };

    const resetTimer = () => {
        clearInterval(intervalRef.current);
        setIsActive(false);
        setTime({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
    };

    const formatTime = (value) => value.toString().padStart(2, '0');

    return (
        <div className="timer-container">
            <h1 className="timer-display">
                {formatTime(time.hours)}:{formatTime(time.minutes)}:{formatTime(time.seconds)}
                <span className="milliseconds">{formatTime(Math.floor(time.milliseconds / 10))}</span>
            </h1>
            <div className="button-group">
                <button onClick={startTimer} disabled={isActive} className="btn">
                    Start
                </button>
                <button onClick={pauseTimer} disabled={!isActive} className="btn">
                    Pause
                </button>
                <button onClick={resetTimer} className="btn">
                    Reset
                </button>
            </div>
        </div>
    );
}

export default Timer;
