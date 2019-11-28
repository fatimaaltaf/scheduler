import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    setMode(newMode)
    // setHistory([newMode, ...history.slice(replace ? 1 : 0)])
    if (replace === true) {
      setHistory([newMode, ...history.slice(1)])
    } else {
      setHistory([newMode, ...history])
    }
  }

  function back() {
    if (history.length > 1) {
      const newHistory = history.slice(1)
      setHistory(newHistory)
      setMode(newHistory[0])
    }
  }
  return { mode, transition, back };
}
