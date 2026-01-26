"use client";

import { useEffect, useRef, useState } from "react";
import { Activity, Clock, Radio } from "lucide-react";
import AdminSidebar from "@/components/admin-sidebar";

type Latest = { uid: string; label: string; id?: string };

type LogEntry = {
  uid: string;
  label: string;
  id?: string;
  timestamp: Date;
};

const formatTime = (date: Date) =>
  date.toLocaleTimeString("th-TH", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

const formatDate = (date: Date) =>
  date.toLocaleDateString("th-TH", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default function Page() {
  const [latest, setLatest] = useState<Latest>({
    uid: "—",
    label: "กำลังโหลด...",
    id: "",
  });
  const [log, setLog] = useState<LogEntry[]>([]);
  const [now, setNow] = useState(new Date());
  const lastKeyRef = useRef<string>("");

  useEffect(() => {
    const tick = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await fetch("/api/ping");
        if (!res.ok) return;
        const data: Latest = await res.json();
        const key = `${data.uid}-${data.label}-${data.id ?? ""}`;

        setLatest(data);
        if (key && key !== lastKeyRef.current) {
          lastKeyRef.current = key;
          setLog((prev) =>
            [{ ...data, timestamp: new Date() }, ...prev].slice(0, 60),
          );
        }
      } catch (err) {
        console.error("Fetch ping failed", err);
      }
    };

    const interval = setInterval(fetchLatest, 700);
    fetchLatest();
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900">
      <AdminSidebar />
      <main className="flex-1 lg:ml-64">
        <div className="mx-auto max-w-6xl px-4 py-10 space-y-8">
          <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-red-700 flex items-center gap-2 font-medium">
                <Activity className="h-4 w-4" />
                Live Check-in Monitor
              </p>
              <h1 className="text-4xl font-semibold">
                บันทึกการแตะบัตรย้อนหลัง
              </h1>
              <p className="text-sm text-gray-600">
                อัปเดตทุก ~0.7 วินาที
              </p>
            </div>
            <div className="rounded-2xl bg-white border border-gray-200 px-4 py-3 shadow-sm">
              <div className="text-xs uppercase text-red-700 font-semibold">
                เวลาปัจจุบัน
              </div>
              <div className="text-lg font-medium text-gray-800">
                {formatDate(now)}
              </div>
              <div className="text-3xl font-mono text-gray-900">
                {formatTime(now)}
              </div>
            </div>
          </header>

          <section className="rounded-3xl border border-gray-200 bg-white shadow-lg">
            <div className="flex flex-col gap-6 p-6 md:p-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#8B0000] text-white font-bold">
                    LIVE
                  </span>
                  <div>
                    <p className="text-sm text-gray-600">สถานะล่าสุด</p>
                    <p className="text-2xl font-semibold leading-tight text-gray-900">
                      {latest.label}
                      {latest.id ? ` (${latest.id})` : ""}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Radio className="h-4 w-4 text-red-600" />
                  อัปเดตอัตโนมัติทุก 700 มิลลิวินาที
                </div>
              </div>
              <div className="rounded-2xl bg-gray-50 border border-gray-200 p-6 flex flex-col gap-3">
                <div className="flex items-baseline gap-3">
                  <span className="text-sm uppercase text-gray-500 font-semibold">
                    Student ID
                  </span>
                  <span className="text-4xl font-mono text-gray-900">
                    {latest.id && latest.id.length === 5 ? latest.id : "27200"}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  ถ้าข้อมูลไม่ขยับ แสดงว่าไม่มีการแตะใหม่ในช่วงเวลาใกล้เคียง
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-gray-200 bg-white shadow-md">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Clock className="h-4 w-4 text-red-600" />
                <span>ประวัติย้อนหลัง (ล่าสุดอยู่บนสุด)</span>
              </div>
              <span className="text-xs text-gray-500">
                แสดงสูงสุด 60 รายการ
              </span>
            </div>
            <div className="max-h-[520px] overflow-y-auto px-4 py-2">
              {log.length === 0 ? (
                <div className="py-10 text-center text-gray-500">
                  ยังไม่มีการแตะบัตรในรอบนี้
                </div>
              ) : (
                <ol className="relative border-l border-gray-200 ml-4">
                  {log.map((entry, idx) => (
                    <li
                      key={`${entry.uid}-${entry.timestamp.getTime()}-${idx}`}
                      className="mb-6 ml-4"
                    >
                      <div className="absolute -left-[9px] mt-1 h-3 w-3 rounded-full bg-red-500 shadow-[0_0_0_4px_rgba(185,28,28,0.2)]" />
                      <div className="flex flex-col gap-1 rounded-xl bg-gray-50 px-4 py-3 border border-gray-200">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-lg font-semibold text-gray-900">
                            {entry.label}
                            {entry.id ? ` (${entry.id})` : ""}
                          </p>
                          <span className="text-xs font-mono text-red-600">
                            {formatTime(entry.timestamp)}
                          </span>
                        </div>
                        <div className="text-sm text-gray-700 flex items-center gap-2">
                          <span className="font-mono text-gray-900">
                            {entry.id && entry.id.length === 5
                              ? entry.id
                              : entry.uid}
                          </span>
                          <span className="text-gray-400">•</span>
                          <span>{formatDate(entry.timestamp)}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
