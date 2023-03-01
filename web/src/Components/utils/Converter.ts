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

export const mediaPipeConverter = (data: NormalizedLandmarkList) => {
  const result: number[][] = [];
  const neck = [
    (data[11].x + data[12].x) / 2,
    (data[11].y + data[12].y) / 2,
    (data[11].z + data[12].z) / 2,
  ];
  const head = [
    (data[1].x + data[4].x) / 2,
    (data[1].y + data[4].y) / 2,
    (data[1].z + data[4].z) / 2,
  ];
  result.push([data[28].x, data[28].y, data[28].z]);
  result.push([data[26].x, data[26].y, data[26].z]);
  result.push([data[24].x, data[24].y, data[24].z]);
  result.push([data[23].x, data[23].y, data[23].z]);
  result.push([data[25].x, data[25].y, data[25].z]);
  result.push([data[27].x, data[27].y, data[27].z]);
  result.push([data[16].x, data[16].y, data[16].z]);
  result.push([data[14].x, data[14].y, data[14].z]);
  result.push([data[12].x, data[12].y, data[12].z]);
  result.push([data[11].x, data[11].y, data[11].z]);
  result.push([data[13].x, data[13].y, data[13].z]);
  result.push([data[15].x, data[15].y, data[15].z]);
  result.push(neck);
  result.push(head);
  result.push([data[0].x, data[0].y, data[0].z]);
  result.push([data[2].x, data[2].y, data[2].z]);
  result.push([data[5].x, data[5].y, data[5].z]);
  result.push([data[7].x, data[7].y, data[7].z]);
  result.push([data[8].x, data[8].y, data[8].z]);

  return result;
};
