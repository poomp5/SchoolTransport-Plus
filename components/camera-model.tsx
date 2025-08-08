"use client";

import { useEffect, useRef, useState } from "react";
import * as blazeface from "@tensorflow-models/blazeface";
import "@tensorflow/tfjs";

interface CameraModalProps {
  onClose: () => void;
}

export default function CameraModal({ onClose }: CameraModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const modelRef = useRef<blazeface.BlazeFaceModel | null>(null);
  const animationRef = useRef<number | null>(null);
  const [faceCount, setFaceCount] = useState(0);

  useEffect(() => {
    blazeface.load().then((model) => {
      modelRef.current = model;
    });
  }, []);

  useEffect(() => {
    const startCamera = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;

        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
          detectFaces();
        };
      }
    };

    const detectFaces = async () => {
      if (
        videoRef.current &&
        canvasRef.current &&
        modelRef.current &&
        videoRef.current.readyState === 4
      ) {
        const predictions = await modelRef.current.estimateFaces(
          videoRef.current,
          false
        );
        setFaceCount(predictions.length);

        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;

        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        predictions.forEach((face) => {
         let x = 0,
           y = 0,
           width = 0,
           height = 0;

         if (Array.isArray(face.topLeft)) {
           x = face.topLeft[0];
           y = face.topLeft[1];
           width =
             (face.bottomRight as [number, number])[0] -
             (face.topLeft as [number, number])[0];
           height =
             (face.bottomRight as [number, number])[1] -
             (face.topLeft as [number, number])[1];
         } else if (face.topLeft instanceof Float32Array) {
           x = face.topLeft[0];
           y = face.topLeft[1];
           width =
             (face.bottomRight as [number, number])[0] -
             (face.topLeft as unknown as [number, number])[0];
           height =
             (face.bottomRight as [number, number])[1] -
             (face.topLeft as unknown as [number, number])[1];
         }

          ctx.strokeStyle = "#FF5722";
          ctx.lineWidth = 2;
          ctx.strokeRect(x, y, width, height);

          ctx.fillStyle = "#FF5722";
          ctx.font = "14px sans-serif";
          ctx.fillText("face", x, y - 4);
        });
      }

      animationRef.current = requestAnimationFrame(detectFaces);
    };

    startCamera();
    

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      const videoElement = videoRef.current;
      const localVideoElement = videoElement; // Copy ref value to a local variable
      if (localVideoElement?.srcObject) {
        (localVideoElement.srcObject as MediaStream)
          .getTracks()
          .forEach((t) => t.stop());
      }
    };
    
  }, []);

  

  const handleSnapshot = () => {
    const video = videoRef.current;
    const overlay = canvasRef.current;
    if (!video || !overlay) return;

    const snapshotCanvas = document.createElement("canvas");
    snapshotCanvas.width = video.videoWidth;
    snapshotCanvas.height = video.videoHeight;
    const ctx = snapshotCanvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, snapshotCanvas.width, snapshotCanvas.height);
    ctx.drawImage(overlay, 0, 0, snapshotCanvas.width, snapshotCanvas.height);

    const dataUrl = snapshotCanvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `face-snapshot-${new Date().toISOString()}.png`;
    a.click();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="relative bg-white p-4 rounded-xl shadow-lg w-full max-w-2xl">
        <h2 className="text-lg font-bold text-gray-800 mb-2">
          กล้องตรวจจับใบหน้า
        </h2>

        <p className="text-sm text-gray-600 mb-2">
          ตรวจพบใบหน้า:{" "}
          <span className="font-bold text-blue-600">{faceCount}</span> คน
        </p>

        <div className="relative w-full rounded-md overflow-hidden">
          <video ref={videoRef} className="w-full rounded-md" />
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
          />
        </div>

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handleSnapshot}
            className="px-4 py-2 bg-red-800 text-white text-sm rounded-lg hover:bg-red-700"
          >
            ถ่ายภาพ
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white text-sm rounded-lg hover:bg-gray-500"
          >
            ✖ ปิด
          </button>
        </div>
      </div>
    </div>
  );
}
