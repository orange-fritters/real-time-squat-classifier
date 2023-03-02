import { NormalizedLandmarkList } from "@mediapipe/pose";

export const angleCalc = (data: NormalizedLandmarkList) => {
  const neck = [data[11].x, data[11].y, data[11].z];
  const waist = [data[23].x, data[23].y, data[23].z];
  const knee = [data[25].x, data[25].y, data[25].z];

  const dotProduct =
    (neck[0] - waist[0]) * (knee[0] - waist[0]) +
    (neck[1] - waist[1]) * (knee[1] - waist[1]) +
    (neck[2] - waist[2]) * (knee[2] - neck[2]);
  const waistNeckLength = Math.sqrt(
    Math.pow(neck[0] - waist[0], 2) +
      Math.pow(neck[1] - waist[1], 2) +
      Math.pow(neck[2] - waist[2], 2)
  );
  const waistKneeLength = Math.sqrt(
    Math.pow(knee[0] - waist[0], 2) +
      Math.pow(knee[1] - waist[1], 2) +
      Math.pow(knee[2] - waist[2], 2)
  );
  const cos = dotProduct / (waistNeckLength * waistKneeLength);

  return cos;
};
