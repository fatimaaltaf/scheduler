import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    setHistory(prev =>
      replace ? [...prev.slice(0, prev.length - 1), mode] : [...prev, mode]
    );
  }

  function back() {
    if (history.length < 2) return;
    setHistory(prev => [...prev.slice(0, history.length - 1)]);
  }

  return { mode: history[history.length - 1], transition, back };
}


// export default function useVisualMode(initial) {
//   const [mode, setMode] = useState(initial);
//   const [history, setHistory] = useState([initial]);

//   function transition(newMode, replace = false) {
//     setMode(newMode);
//     // setHistory([newMode, ...history.slice(replace ? 1 : 0)])
//     if (replace === true) {
//       setHistory([newMode, ...history.slice(1)]);
//     } else {
//       setHistory([newMode, ...history]);
//     }
//   }

//   function back() {
//     let newHistory = [...history];
//     if (newHistory.length > 1) {
//       newHistory.splice(0,1);
//       setHistory(newHistory);
//       setMode(newHistory[0]);
//     }
//   }
//   return { mode, transition, back };
// }
