import { useEffect } from "react";

function Timer({ dispatch, timeRemaining }) {
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (timeRemaining > 0) {
        dispatch({ type: "tick" });
      } else {
        dispatch({ type: "tok" });
      }
    }, 1000);

    // Cleanup interval when the component unmounts or when dispatch or timeRemaining changes
    return () => clearInterval(intervalId);
  }, [dispatch, timeRemaining]); // Added 'timeRemaining' as a dependency

  return <div className="timer">{timeRemaining}</div>;
}

export default Timer;
