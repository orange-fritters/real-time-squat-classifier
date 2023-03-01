import React from "react";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import { Pose, Results, VERSION, POSE_CONNECTIONS } from "@mediapipe/pose";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { calculateDistanceMatrix } from "./utils/Calculator";
import { mediaPipeConverter } from "./utils/Converter";
import { Matrix } from "ml-matrix";
import ResNet from "../TFModel/classifier";

const Loading = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  color: white;
`;

const PoseContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  border-radius: 20px;
  background-color: #1e1b1e;
  overflow: clip;
`;

const MediaPipe = () => {
  const [inputVideoReady, setInputVideoReady] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const inputVideoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  const [frame, setFrame] = useState<number[][]>([]);
  const [tempFrame, setTempFrame] = useState<number[]>([]);

  useEffect(() => {
    if (!inputVideoReady) {
      return;
    }
    if (inputVideoRef.current && canvasRef.current) {
      console.log("rendering");
      contextRef.current = canvasRef.current.getContext("2d");
      const constraints = {
        video: { width: { min: 1280 }, height: { min: 720 } },
      };
      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        if (inputVideoRef.current) {
          inputVideoRef.current.srcObject = stream;
        }
        sendToMediaPipe();
      });

      const pose = new Pose({
        locateFile: (file) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/pose@${VERSION}/${file}`,
      });

      pose.setOptions({
        modelComplexity: 1,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      pose.onResults(onResults);

      const sendToMediaPipe = async () => {
        if (inputVideoRef.current) {
          if (!inputVideoRef.current.videoWidth) {
            console.log(inputVideoRef.current.videoWidth);
            requestAnimationFrame(sendToMediaPipe);
          } else {
            await pose.send({ image: inputVideoRef.current });
            requestAnimationFrame(sendToMediaPipe);
          }
        }
      };
    }
  }, [inputVideoReady]);

  const onResults = (results: Results) => {
    if (canvasRef.current && contextRef.current) {
      setLoaded(true);

      contextRef.current.save();
      contextRef.current.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      contextRef.current.drawImage(
        results.image,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );

      if (results.poseLandmarks) {
        const landmarks = results.poseLandmarks;
        drawConnectors(contextRef.current, landmarks, POSE_CONNECTIONS, {
          color: "#00FF00",
          lineWidth: 4,
        });
        drawLandmarks(contextRef.current, landmarks, {
          color: "#FF0000",
          lineWidth: 2,
        });

        const matrix = new Matrix(
          calculateDistanceMatrix(mediaPipeConverter(landmarks))
        )
          .to2DArray()
          .map((row, i) => row.slice(i + 1))
          .flat();

        setTempFrame(matrix);
      }
      contextRef.current.restore();
    }
  };
  useEffect(() => {
    if (tempFrame.length > 0) {
      setFrame((prevFrame) => [...prevFrame, tempFrame].slice(-300));
    }
  }, [tempFrame]);

  useEffect(() => {
    const model = ResNet();
    console.log(model.summary());
  }, []);

  return (
    <PoseContainer>
      <video
        autoPlay
        ref={(el) => {
          inputVideoRef.current = el;
          setInputVideoReady(!!el);
        }}
        style={{
          display: "none",
          transform: "rotateY(180deg)",
          WebkitTransition: "rotateY(180deg)",
        }}
      />
      <canvas
        ref={canvasRef}
        width={canvasRef.current?.width || 1152}
        height={canvasRef.current?.height || 648}
        style={{
          transform: "rotateY(180deg)",
          WebkitTransition: "rotateY(180deg)",
        }}
      />
      {/* <canvas ref={canvasRef} /> */}
      {!loaded && (
        <Loading>
          <div className="spinner"></div>
          <div className="message">Loading</div>
        </Loading>
      )}
    </PoseContainer>
  );
};

export default MediaPipe;
