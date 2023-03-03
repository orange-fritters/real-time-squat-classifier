import { NormalizedLandmarkList } from "@mediapipe/pose";
/* 0: Right ankle ~ 28 of mediapipe
  1: Right knee ~ 26 of mediapipe
  2: Right hip ~ 24 of mediapipe
  3: Left hip ~ 23 of mediapipe
  4: Left knee ~ 25 of mediapipe
  5: Left ankle ~ 27 of mediapipe
  6: Right wrist ~ 16 of mediapipe
  7: Right elbow ~ 14 of mediapipe
  8: Right shoulder ~ 12 of mediapipe
  9: Left shoulder ~ 11 of mediapipe
  10: Left elbow ~ 13 of mediapipe
  11: Left wrist ~ 15 of mediapipe
  12: Neck ~ middle of 11 and 12
  13: Head top ~ middle of 1 and 4
  14: nose ~ 0 of mediapipe
  15: left_eye ~ 2 of mediapipe
  16: right_eye ~ 5 of mediapipe
  17: left_ear ~ 7 of mediapipe
  18: right_ear ~ 8 of mediapipe */

export const visibilityChecker = (data: NormalizedLandmarkList) => {
  const resultLeft: number[] = [];
  const leftIndexToCheck = [11, 23, 25];
  leftIndexToCheck.forEach((index) => {
    const vis = data[index].visibility;
    resultLeft.push(vis || 0);
  });
  const meanOfResultLeft =
    resultLeft.reduce((a, b) => a + b) / resultLeft.length;

  const resultRight: number[] = [];
  const rightIndexToCheck = [12, 24, 26];
  rightIndexToCheck.forEach((index) => {
    const vis = data[index].visibility;
    resultRight.push(vis || 0);
  });
  const meanOfResultRight =
    resultRight.reduce((a, b) => a + b) / resultRight.length;

  return meanOfResultLeft > 0.9 || meanOfResultRight > 0.9;
};
