"use client";

import { useEffect, useRef, useState } from "react";
import { Activity, Clock, Radio, Plus, Trash2 } from "lucide-react";
import AdminSidebar from "@/components/admin-sidebar";

type Latest = { uid: string; label: string; id?: string };

type LogEntry = {
  uid: string;
  label: string;
  id?: string;
  timestamp: Date;
};

type SavedCard = {
  uid: string;
  id: string;
  label: string;
  addedAt: string;
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
  const [activeTab, setActiveTab] = useState<"log" | "add">("log");
  const [latest, setLatest] = useState<Latest>({
    uid: "—",
    label: "กำลังโหลด...",
    id: "",
  });
  const [log, setLog] = useState<LogEntry[]>([]);
  const [now, setNow] = useState(new Date());
  const [studentId, setStudentId] = useState("");
  const [customName, setCustomName] = useState("");
  const [cards, setCards] = useState<SavedCard[]>([]);
  const [status, setStatus] = useState("");
  const lastKeyRef = useRef<string>("");

  useEffect(() => {
    const tick = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("rfid_cards");
    if (stored) {
      try {
        setCards(JSON.parse(stored));
      } catch {
        // ignore corrupted data
      }
    }
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

  const persistCards = (next: SavedCard[]) => {
    setCards(next);
    localStorage.setItem("rfid_cards", JSON.stringify(next));
  };

  const handleAddCard = () => {
    if (!latest.uid || latest.uid === "—") {
      setStatus("โปรดแตะบัตรบนเครื่องก่อน");
      return;
    }

    const trimmedId = studentId.trim();
    const trimmedLabel = customName.trim();
    if (!trimmedId && !trimmedLabel) {
      setStatus("กรอกเลขประจำตัว 5 หลัก หรือชื่อ/หมายเหตุอย่างใดอย่างหนึ่ง");
      return;
    }

    const entry: SavedCard = {
      uid: latest.uid,
      id: trimmedId || "—",
      label: trimmedLabel || latest.label || "ไม่ระบุชื่อ",
      addedAt: new Date().toISOString(),
    };

    const next = [entry, ...cards].slice(0, 80);
    persistCards(next);
    setStudentId("");
    setCustomName("");
    setStatus("บันทึกบัตรในเครื่องเรียบร้อย กำลังซิงก์ฐานข้อมูล...");

    // Try to persist to the database (best effort).
    fetch("/api/cards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        uid: entry.uid,
        label: entry.label,
        stuId: entry.id === "—" ? "" : entry.id,
      }),
    })
      .then(async (res) => {
        if (res.ok) {
          setStatus("บันทึกบัตรเรียบร้อย (ซิงก์ฐานข้อมูลแล้ว)");
          return;
        }
        const data = await res.json().catch(() => ({}));
        setStatus(
          data?.error
            ? `ซิงก์ฐานข้อมูลไม่สำเร็จ: ${data.error}`
            : "ซิงก์ฐานข้อมูลไม่สำเร็จ",
        );
      })
      .catch(() => {
        setStatus("ซิงก์ฐานข้อมูลไม่สำเร็จ: ตรวจสอบการเชื่อมต่อหรือ DATABASE_URL");
      });
  };

  const handleRemoveCard = (idx: number) => {
    const next = cards.filter((_, i) => i !== idx);
    persistCards(next);
  };

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
              <h1 className="text-4xl font-semibold">RFID</h1>
              <p className="text-sm text-gray-600">
                อัปเดตทุก ~0.7 วินาที | แตะบัตรแล้วเพิ่มเลขประจำตัว 5 หลักได้ที่แท็บ “เพิ่มบัตร”
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:items-end">
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
              <div className="flex rounded-full border border-gray-200 bg-white p-1 text-sm font-medium shadow-sm">
                <button
                  onClick={() => setActiveTab("log")}
                  className={`px-4 py-2 rounded-full transition ${
                    activeTab === "log"
                      ? "bg-[#8B0000] text-white shadow-sm"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  รายการแตะบัตร
                </button>
                <button
                  onClick={() => setActiveTab("add")}
                  className={`px-4 py-2 rounded-full transition ${
                    activeTab === "add"
                      ? "bg-[#8B0000] text-white shadow-sm"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  เพิ่มบัตร
                </button>
              </div>
            </div>
          </header>

          {activeTab === "log" ? (
            <>
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
                        {latest.id && latest.id.length === 5 ? latest.id : "00000"}
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
                  <span className="text-xs text-gray-500">แสดงสูงสุด 60 รายการ</span>
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
                                {entry.id && entry.id.length === 5 ? entry.id : entry.uid}
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
            </>
          ) : (
            <section className="rounded-3xl border border-gray-200 bg-white shadow-md">
              <div className="grid grid-cols-1 lg:grid-cols-[1.1fr,0.9fr] gap-8 p-6 md:p-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-semibold text-gray-900">เพิ่มบัตรใหม่</h2>
                      <p className="text-sm text-gray-600">
                        แตะบัตรที่เครื่อง อ่าน UID อัตโนมัติ แล้วกรอกเลขประจำตัว 5 หลักหรือชื่อ
                      </p>
                    </div>
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#8B0000] text-white font-bold">
                      NEW
                    </span>
                  </div>

                  <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">UID ล่าสุดที่อ่านได้</p>
                        <p className="text-xl font-semibold text-gray-900 break-all">
                          {latest.uid !== "—" ? latest.uid : "รอการแตะบัตร..."}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">{latest.label || "—"}</p>
                      </div>
                      <div className="text-xs text-gray-500 text-right">
                        ระบบดึงค่าจาก /api/ping อัตโนมัติ
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-gray-700">เลขประจำตัวนักเรียน 5 หลัก</label>
                      <input
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        maxLength={10}
                        placeholder="เช่น 27200"
                        className="w-full rounded-lg border px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-700">ชื่อ / หมายเหตุ (ถ้ามี)</label>
                      <input
                        value={customName}
                        onChange={(e) => setCustomName(e.target.value)}
                        placeholder="เช่น ด.ช.ธีรภัทร หรือ Bus A"
                        className="w-full rounded-lg border px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleAddCard}
                      className="inline-flex items-center gap-2 rounded-lg bg-[#8B0000] px-4 py-2 text-white font-medium hover:bg-[#6B0000] transition"
                    >
                      <Plus className="h-4 w-4" />
                      เพิ่มบัตรนี้
                    </button>
                    {status && <span className="text-sm text-gray-700">{status}</span>}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">บัตรที่บันทึกล่าสุด</h3>
                    <span className="text-xs text-gray-500">เก็บบนเบราว์เซอร์ สูงสุด 80 ใบ</span>
                  </div>
                  {cards.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-6 text-center text-gray-500">
                      ยังไม่มีการเพิ่มบัตร
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
                      {cards.map((card, idx) => (
                        <div
                          key={`${card.uid}-${idx}`}
                          className="flex items-start justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm"
                        >
                          <div>
                            <div className="text-sm font-semibold text-gray-900">{card.label}</div>
                            <div className="text-xs text-gray-600">UID: {card.uid}</div>
                            <div className="text-xs text-gray-600">ID: {card.id}</div>
                            <div className="text-[11px] text-gray-400">
                              บันทึกเมื่อ {new Date(card.addedAt).toLocaleString("th-TH")}
                            </div>
                          </div>
                          <button
                            onClick={() => handleRemoveCard(idx)}
                            className="text-red-600 hover:text-red-700"
                            title="ลบรายการนี้"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
