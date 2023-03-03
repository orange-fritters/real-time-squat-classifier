import React from "react";
import styled, { keyframes } from "styled-components";

const ContentsContainer = styled.div`
  display: grid;
  grid-template-rows: minmax(0, 1fr) minmax(0, 1.5fr);
  grid-template-columns: minmax(0, 1fr);
  flex-direction: column;
  width: 100%;
  height: 95vh;
`;

const CountsContainer = styled.div`
  flex: 1;
  display: grid;
  grid-template-rows: minmax(0, 1fr) minmax(0, 4fr);
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  grid-gap: 30px;
  width: 100%;
  height: 100%;
`;

const TitleContainer = styled.div`
  background-color: #8325fd;
  border-radius: 10px;
  color: white;
  font-size: 2rem;
  font-weight: 500;

  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const NumberContainer = styled.span<{ color: string }>`
  background-color: ${(props) => props.color};
  border-radius: 20px;
  color: white;
  font-size: 7rem;
  font-weight: 700;

  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const ResetContainer = styled.span<{ color: string }>`
  background-color: ${(props) => props.color};
  border-radius: 20px;
  color: white;
  font-size: 7rem;
  font-weight: 700;

  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  &:hover {
    cursor: pointer;
  }

  &:active {
    transform: scale(0.9);
  }
`;

const slideInFromRight = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
`;

const slideDownFromTop = keyframes`
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
`;

const SquatResultContainer = styled.div`
  width: 100%;
  margin-top: 30px;
  margin-bottom: 10x;

  gap: 30px;
  overflow-y: scroll;
  overflow-x: hidden;

  & > div:not(:first-child) {
    animation: ${slideDownFromTop} 0.5s ease-in-out;
  }

  & > div:first-child {
    animation: ${slideInFromRight} 0.5s ease-in-out;
  }
`;

const ResultBackground = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;

  color: black;
  font-weight: 600;
  font-size: 2rem;

  background-color: ${(props) => props.color};
  border-radius: 20px;

  margin-bottom: 30px;
`;

interface ContentsProps {
  squatCount: number;
  squatResults: string[];
  handleReset: () => void;
}

const Contents = ({ squatCount, squatResults, handleReset }: ContentsProps) => {
  return (
    <ContentsContainer>
      <CountsContainer>
        <TitleContainer>Counts</TitleContainer>
        <TitleContainer>Reset</TitleContainer>
        <NumberContainer color="#00C39A">{squatCount}+</NumberContainer>
        <ResetContainer color="#FE6D79" onClick={handleReset}>
          ↻
        </ResetContainer>
      </CountsContainer>
      <SquatResultContainer>
        {squatResults.map((result, index) =>
          result === "Good" ? (
            <ResultBackground
              key={squatResults.length - index}
              color={"#ffc03c"}>
              {squatResults.length - index} {result}
            </ResultBackground>
          ) : (
            <ResultBackground
              key={squatResults.length - index}
              color={"#f4403d"}>
              {squatResults.length - index} {result}
            </ResultBackground>
          )
        )}
      </SquatResultContainer>
    </ContentsContainer>
  );
};

export default Contents;
