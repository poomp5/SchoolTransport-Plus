"use client";
import { useEffect, useRef, useState, useMemo } from "react";
import { Link } from "@/i18n/navigation";
import * as faceapi from "face-api.js";
import AdminSidebar from "@/components/admin-sidebar";
import { Plus, Save, Trash2, ArrowUp, ArrowDown, Camera } from "lucide-react";

type Enrolled = { label: string; descriptor: number[] };

export default function FaceEnrollPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState("Loading models...");
  const [name, setName] = useState("");
  const [enrolled, setEnrolled] = useState<Enrolled[]>([]);

  useEffect(() => {
    let stream: MediaStream | null = null;
    (async () => {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      ]);

      stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => videoRef.current?.play();
      }

      const saved = localStorage.getItem("enrolled_faces");
      if (saved) setEnrolled(JSON.parse(saved));
      setStatus("พร้อมบันทึกใบหน้า");
    })().catch((e) => setStatus("Error: " + e));

    return () => {
      if (stream) stream.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const options = useMemo(() => {
    return new faceapi.TinyFaceDetectorOptions({
      inputSize: 192,
      scoreThreshold: 0.5,
    });
  }, []);

  // วาดกรอบรอบใบหน้า
  // วาดกรอบรอบใบหน้า
  useEffect(() => {
    const run = async () => {
      if (!videoRef.current || !canvasRef.current) return;

      const detections = await faceapi
        .detectAllFaces(videoRef.current, options)
        .withFaceLandmarks();

      // ทำให้ขนาด canvas match กับ video ปัจจุบัน
      const dims = faceapi.matchDimensions(
        canvasRef.current,
        videoRef.current,
        true
      );
      const resized = faceapi.resizeResults(detections, dims);

      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) return;

      // เคลียร์ก่อนวาดใหม่ทุกเฟรม
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      // เพราะคุณใส่ class -scale-x-100 ทั้ง video และ canvas
      // กรอบจะทาบพอดีแล้ว ไม่ต้องกลับด้วย ctx อีก
      faceapi.draw.drawDetections(canvasRef.current, resized);
      faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);
    };

    const timer = setInterval(run, 200);
    return () => clearInterval(timer);
  }, [options]); // options stable จาก useMemo แล้ว

  // --- Enroll ใบหน้าใหม่ ---
  const handleEnroll = async () => {
    if (!videoRef.current) return;
    setStatus("กำลังตรวจจับใบหน้า...");
    const result = await faceapi
      .detectSingleFace(videoRef.current, options)
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!result) {
      setStatus("ไม่พบใบหน้า ลองขยับเข้าใกล้/หันหน้าเข้ากล้อง");
      return;
    }

    const emb = Array.from(result.descriptor);
    const label = (name || `ผู้ใช้ ${enrolled.length + 1}`).trim();
    const next = [...enrolled, { label, descriptor: emb }];
    setEnrolled(next);
    localStorage.setItem("enrolled_faces", JSON.stringify(next));
    setStatus(`บันทึกสำเร็จ: ${label}`);
    setName("");
  };

  // --- จัดการรายการ: ลบ/เลื่อนขึ้น/เลื่อนลง ---
  const save = (list: Enrolled[]) => {
    setEnrolled(list);
    localStorage.setItem("enrolled_faces", JSON.stringify(list));
  };

  const removeAt = (idx: number) => {
    const next = enrolled.filter((_, i) => i !== idx);
    save(next);
  };

  const moveUp = (idx: number) => {
    if (idx === 0) return;
    const next = [...enrolled];
    [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
    save(next);
  };

  const moveDown = (idx: number) => {
    if (idx === enrolled.length - 1) return;
    const next = [...enrolled];
    [next[idx + 1], next[idx]] = [next[idx], next[idx + 1]];
    save(next);
  };

  const handleClearAll = () => {
    localStorage.removeItem("enrolled_faces");
    setEnrolled([]);
    setStatus("ลบข้อมูลที่บันทึกไว้ทั้งหมดแล้ว");
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <div className="flex-1 lg:ml-64 bg-gray-50">
        {/* Header */}
        <div className="px-4 sm:px-6 pt-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                บันทึกใบหน้า (Enroll)
              </h1>
              <p className="text-sm text-gray-500 mt-1">{status}</p>
            </div>
            <Link href="/admin/camera" className="shrink-0">
              <button className="inline-flex items-center gap-2 rounded-lg bg-white border px-3 py-2 text-sm hover:bg-gray-50 shadow-sm">
                <Camera className="w-4 h-4" />
                แสดงภาพรวม
              </button>
            </Link>
          </div>
        </div>

        {/* Content grid */}
        <div className="px-4 sm:px-6 pb-8">
          <div
            className="
              grid grid-cols-1 gap-4 lg:gap-6
              lg:grid-cols-[minmax(0,1.6fr),minmax(320px,1fr)]
              max-w-7xl mx-auto
            "
          >
            {/* LEFT: Camera card */}
            <div className="rounded-2xl bg-white shadow-sm border">
              <div className="p-4 sm:p-5 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-800">
                    กล้องถ่ายใบหน้า
                  </h2>
                  <span className="text-xs px-2 py-1 rounded-full bg-green-50 text-green-700 border border-green-200">
                    พร้อมใช้งาน
                  </span>
                </div>
              </div>

              <div className="p-4 sm:p-5">
                {/* กล้อง + แคนวาส (flip เฉพาะ video) */}
                <div className="relative w-full rounded-xl overflow-hidden border">
                  <video
                    ref={videoRef}
                    className="-scale-x-100 w-full bg-black"
                    autoPlay
                    muted
                    playsInline
                  />
                  <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full pointer-events-none -scale-x-100"
                  />
                </div>
                {/* Enroll row */}
                <div className="mt-4 flex flex-col sm:flex-row gap-2">
                  <div className="flex-1">
                    <label className="block text-sm text-gray-600 mb-1">
                      ชื่อผู้ใช้
                    </label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="ใส่ชื่อ (ถ้าไม่ใส่ ระบบจะตั้งเป็น ผู้ใช้ 1, 2, ...)"
                      className="w-full border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-gray-200"
                    />
                  </div>
                  <button
                    onClick={handleEnroll}
                    className="inline-flex items-center justify-center mt-6 gap-2 px-4 py-2 h-10 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-800"
                  >
                    <Save className="w-4 h-4" />
                    บันทึกใบหน้า
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT: Enrolled list (sticky on desktop) */}
            <aside className="lg:sticky lg:top-6 self-start">
              <div className="rounded-2xl bg-white shadow-sm border">
                <div className="p-4 sm:p-5 border-b flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      รายการที่บันทึกไว้
                    </h3>
                    <p className="text-xs text-gray-500">
                      ทั้งหมด {enrolled.length} รายการ
                    </p>
                  </div>
                  <button
                    onClick={handleClearAll}
                    className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    ลบทั้งหมด
                  </button>
                </div>

                <div className="p-3 sm:p-4">
                  {enrolled.length === 0 ? (
                    <div className="rounded-xl border border-dashed p-6 text-gray-500 bg-gray-50">
                      ยังไม่มีข้อมูลผู้ใช้ที่บันทึกไว้
                    </div>
                  ) : (
                    <ul
                      className="space-y-2 max-h-[50vh] overflow-y-auto pr-1"
                      style={{ scrollbarWidth: "thin" }}
                    >
                      {enrolled.map((e, i) => (
                        <li
                          key={i}
                          className="bg-white rounded-xl border shadow-xs p-3"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex-1">
                              <div className="text-sm font-semibold text-gray-800">
                                {e.label}
                              </div>
                              <div className="text-[11px] text-gray-500">
                                #{i + 1}
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => moveUp(i)}
                                className="px-2 py-1 text-xs rounded-lg border bg-white hover:bg-gray-50"
                                title="ย้ายขึ้น"
                              >
                                <ArrowUp className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => moveDown(i)}
                                className="px-2 py-1 text-xs rounded-lg border bg-white hover:bg-gray-50"
                                title="ย้ายลง"
                              >
                                <ArrowDown className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => removeAt(i)}
                                className="px-2 py-1 text-xs rounded-lg bg-red-50 text-red-700 border border-red-200 hover:bg-red-100"
                                title="ลบรายการนี้"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* เสริมลิงก์เพิ่มข้อมูล/ไปหน้าอื่นได้ */}
              <div className="mt-3 hidden lg:block">
                <Link href="/admin/enroll">
                  <button className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 hover:bg-green-700 text-white py-2.5 px-4">
                    <Plus className="w-4 h-4" />
                    เพิ่มข้อมูลใหม่
                  </button>
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
