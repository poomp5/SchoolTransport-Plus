"use client";
import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

type Enrolled = { label: string; descriptor: number[] };
type OnBus = { label: string; since: number };

export default function FaceCameraPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [status, setStatus] = useState("Loading models...");
  const [enrolled, setEnrolled] = useState<Enrolled[]>([]);
  const [onBus, setOnBus] = useState<OnBus[]>([]); // รายชื่อ “อยู่บนรถแล้ว”

  // ====== CONFIG ======
  const THRESHOLD = 0.6; // ปรับตามจริง (0.5–0.7)
  const TICK_MS = 350; // รอบการตรวจจับ
  const VIDEO_W = 640; // ขนาดวิดีโอ
  const VIDEO_H = 480;

  // ====== HELPERS ======
  const cosineSim = (a: number[], b: number[]) => {
    let dot = 0,
      na = 0,
      nb = 0;
    for (let i = 0; i < a.length; i++) {
      dot += a[i] * b[i];
      na += a[i] * a[i];
      nb += b[i] * b[i];
    }
    return dot / (Math.sqrt(na) * Math.sqrt(nb));
  };

  const pct = (sim: number) => Math.max(0, Math.min(100, sim * 100));

  const addOnBus = (label: string) => {
    setOnBus((prev) => {
      if (prev.some((p) => p.label === label)) return prev;
      return [...prev, { label, since: Date.now() }];
    });
  };

  const clearOnBus = () => setOnBus([]);

  // ====== INIT ======
  useEffect(() => {
    (async () => {
      // โหลดโมเดล
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      ]);
      // เปิดกล้อง
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: VIDEO_W, height: VIDEO_H },
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await new Promise((res) => {
          videoRef.current!.onloadedmetadata = () => {
            videoRef.current!.play();
            res(null);
          };
        });
      }
      // โหลด embeddings เดิม
      const saved = localStorage.getItem("enrolled_faces");
      if (saved) setEnrolled(JSON.parse(saved));
      setStatus("Camera ready");
    })().catch((e) => setStatus("Error: " + e));
  }, []);

  // ====== LOOP DETECT ======
  useEffect(() => {
    const options = new faceapi.TinyFaceDetectorOptions({
      inputSize: 192,
      scoreThreshold: 0.5,
    });

   const loop = async () => {
     if (!videoRef.current || !canvasRef.current) return;

     const video = videoRef.current;
     const canvas = canvasRef.current;

     // ใช้ขนาดจริงจากกล้อง เพื่อไม่ให้สเกลเพี้ยน
     const vw = video.videoWidth || VIDEO_W;
     const vh = video.videoHeight || VIDEO_H;
     canvas.width = vw;
     canvas.height = vh;

     const ctx = canvas.getContext("2d")!;
     ctx.clearRect(0, 0, canvas.width, canvas.height);

     const detections = await faceapi
       .detectAllFaces(video, options)
       .withFaceLandmarks()
       .withFaceDescriptors();

     if (!detections || detections.length === 0) {
       setStatus("ไม่พบใบหน้า");
       return;
     }

     detections.forEach((det) => {
       const emb = Array.from(det.descriptor);

       // หา best match
       let bestLabel = "Unknown";
       let bestScore = -1;
       for (const e of enrolled) {
         const sim = cosineSim(emb, e.descriptor);
         if (sim > bestScore) {
           bestScore = sim;
           bestLabel = e.label;
         }
       }

       // ===== สำคัญ: กลับพิกัดแกน X ให้ตรงกับวิดีโอที่ถูก flip =====
       const box = det.detection.box;
       const x = canvas.width - box.x - box.width; // <-- ใช้ค่านี้แทน box.x
       const y = box.y;
       const w = box.width;
       const h = box.height;

       // กรอบ
       ctx.lineWidth = 3;
       ctx.strokeStyle = "#22c55e";
       ctx.strokeRect(x, y, w, h);

       // แถบ % บนกรอบ
       const percent = pct(Math.max(0, bestScore));
       const barW = Math.max(0, Math.min(w, (w * percent) / 100));
       ctx.fillStyle = "#22c55e";
       ctx.fillRect(x, Math.max(0, y - 8), barW, 6);
       ctx.fillStyle = "rgba(34,197,94,0.2)";
       ctx.fillRect(x + barW, Math.max(0, y - 8), w - barW, 6);

       // ป้ายข้อความ
       const label =
         bestScore >= THRESHOLD
           ? `${bestLabel} • ${percent.toFixed(0)}%`
           : `Unknown • ${percent.toFixed(0)}%`;
       const padX = 8,
         padY = 6;
       ctx.font = "14px ui-sans-serif, system-ui, -apple-system, Segoe UI";
       const textW = ctx.measureText(label).width;

       ctx.fillStyle = "rgba(0,0,0,0.65)";
       const rectX = x; // <-- ใช้ x ที่ถูก mirror แล้ว
       const rectY = y + h + 6;
       const rectW = textW + padX * 2;
       const rectH = 24;
       ctx.fillRect(rectX, rectY, rectW, rectH);

       ctx.fillStyle = "#fff";
       ctx.fillText(label, rectX + padX, rectY + rectH - padY);

       // อัปเดตสถานะ/ลิสต์
       if (bestScore >= THRESHOLD && bestLabel !== "Unknown") {
         addOnBus(bestLabel);
         setStatus(`พบ: ${bestLabel} (${percent.toFixed(0)}%)`);
       } else {
         setStatus(`Unknown (${percent.toFixed(0)}%)`);
       }
     });
   };
   const timer = setInterval(loop, TICK_MS);
   return () => clearInterval(timer);
  }, [enrolled]);

  return (
    <div className="min-h-screen w-full p-4 flex flex-col items-center gap-4">
      <div className="relative w-full max-w-[720px]">
        <video
          ref={videoRef}
          className="w-full rounded-xl bg-black -scale-x-100" // flip เฉพาะ video
          autoPlay
          muted
          playsInline
        />
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full rounded-xl pointer-events-none" // canvas ไม่ flip
        />
      </div>

      <p className="text-gray-600">{status}</p>

      <div className="w-full max-w-[720px]">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold">รายการขึ้นรถแล้ว</h2>
          <button
            onClick={clearOnBus}
            className="px-3 py-1.5 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm"
          >
            ล้างรายการ
          </button>
        </div>

        {onBus.length === 0 ? (
          <div className="rounded-xl border border-dashed p-6 text-gray-500">
            ยังไม่มีรายการขึ้นรถ
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {onBus.map((p) => (
              <div
                key={p.label}
                className="rounded-2xl border shadow-sm p-4 bg-white hover:shadow-md transition"
              >
                <div className="flex items-center justify-between">
                  <div className="text-lg font-semibold">{p.label}</div>
                  <span className="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-700 border border-green-300 ">
                    ขึ้นรถแล้ว
                  </span>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  ตั้งแต่เวลา {new Date(p.since).toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
