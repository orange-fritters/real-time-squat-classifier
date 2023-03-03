import "./App.css";
import MediaPipe from "./Components/MediaPipe";
import Contents from "./Components/Contents";

import React from "react";
import { useState } from "react";

import { labelConvert } from "./Components/utils/labelToStringConverter";

function App() {
  const [squatCount, setSquatCount] = useState<number>(0);
  const [squatResults, setSquatResults] = useState<string[]>([]);

  const increaseSquatCount = () => {
    setSquatCount(squatCount + 1);
  };

  const handleReset = () => {
    setSquatCount(0);
    setSquatResults([]);
  };

  const handleSquatResult = (
    result: "0" | "1" | "2" | "3" | "4" | "5" | "6"
  ) => {
    setSquatResults([labelConvert[result], ...squatResults]);
  };

  return (
    <div className="App">
      <MediaPipe
        increaseSquatCount={increaseSquatCount}
        handleSquatResult={handleSquatResult}
      />
      <Contents
        squatCount={squatCount}
        squatResults={squatResults}
        handleReset={handleReset}
      />
    </div>
  );
}

export default App;
