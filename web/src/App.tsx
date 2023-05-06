import "./App.css";
import MediaPipe from "./Components/MediaPipe";
import Contents from "./Components/Contents";

import styled, { keyframes } from "styled-components";
import React from "react";
import { useState } from "react";

import { labelConvert } from "./Components/utils/LabelToStringConverter";

function App() {
  const [squatCount, setSquatCount] = useState<number>(0);
  const [squatResults, setSquatResults] = useState<string[]>([]);
  const [visibility, setVisibility] = useState<boolean>(false);

  const increaseSquatCount = () => {
    setSquatCount(squatCount + 1);
  };

  const handleReset = () => {
    setSquatCount(0);
    setSquatResults([]);
  };

  const handleVisibility = (result: boolean) => {
    setVisibility(result);
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
        handleVisibility={handleVisibility}
      />
      <Contents
        squatCount={squatCount}
        squatResults={squatResults}
        handleReset={handleReset}
      />
      {!visibility && (
        <VisibilityContainer>POSE NOT DETECTED</VisibilityContainer>
      )}
    </div>
  );
}

export default App;

// blinking animation for visibility
const Animation = keyframes`
  0% {
    opacity: 0.8;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 0.8;
  }
`;

const VisibilityContainer = styled.div`
  display: flex;
  position: absolute;
  background-color: #e51e23;
  align-items: center;
  justify-content: center;
  border-radius: 20px;

  top: 10%;
  left: 30%;
  opacity: 0.5;
  transform: translate(-50%, -50%);

  width: 40%;
  height: 10%;
  color: white;
  font-size: 3rem;
  font-weight: 600;
  animation: ${Animation} 1.5s infinite;
`;
