import distanceMatrix from "ml-distance-matrix";
import { euclidean } from "ml-distance-euclidean";

export const calculateDistanceMatrix = (data: number[][]) => {
  const matrix = distanceMatrix(data, euclidean);
  return matrix;
};
