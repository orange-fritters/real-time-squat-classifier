import React from "react";
import styled from "styled-components";
import { useState } from "react";

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

const SquatResultContainer = styled.div`
  width: 100%;
  margin-top: 30px;
  margin-bottom: 10x;

  gap: 30px;
  overflow-y: scroll;
`;

const ResultBackground = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;

  color: white;
  font-size: 2rem;

  background-color: #ffc03c;
  border-radius: 20px;

  margin-bottom: 30px;
`;

interface ContentsProps {
  squatCount: number;
}

const Contents = ({ squatCount }: ContentsProps) => {
  const [wrongCount, setWrongCount] = useState(1);
  const [squatResult, setSquatResult] = useState<string[]>([
    "GOOD",
    "GOOD",
    "GOOD",
    "BAD",
    "GOOD",
    "GOOD",
    "GOOD",
    "GOOD",
    "BAD",
    "GOOD",
  ]);

  return (
    <ContentsContainer>
      <CountsContainer>
        <TitleContainer>Counts</TitleContainer>
        <TitleContainer>Wrongs</TitleContainer>
        <NumberContainer color="#00C39A">{squatCount}+</NumberContainer>
        <NumberContainer color="#FE6D79">{wrongCount}</NumberContainer>
      </CountsContainer>
      <SquatResultContainer>
        {squatResult.map((result, index) => (
          <ResultBackground key={index}>{result}</ResultBackground>
        ))}
      </SquatResultContainer>
    </ContentsContainer>
  );
};

export default Contents;
