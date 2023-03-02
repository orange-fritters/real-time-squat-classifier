import "./App.css";
import MediaPipe from "./Components/MediaPipe";
import Contents from "./Components/Contents";
import { useState } from "react";
import React from "react";

function App() {
  const [squatCount, setSquatCount] = useState<number>(0);
  const increaseSquatCount = () => {
    setSquatCount(squatCount + 1);
  };
  return (
    <div className="App">
      <MediaPipe increaseSquatCount={increaseSquatCount} />
      <Contents squatCount={squatCount} />
    </div>
  );
}

export default App;
