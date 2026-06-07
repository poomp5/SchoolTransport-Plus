"use client";

import { FormEvent, useState } from "react";
import { Link } from "@/i18n/navigation";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "สมัครไม่สำเร็จ");
      }

      // Auto sign-in after successful signup
      const signInResult = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl: "/",
      });

      if (signInResult?.error) {
        throw new Error("เข้าสู่ระบบอัตโนมัติไม่สำเร็จ");
      }

      router.push(signInResult?.url || "/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "เกิดข้อผิดพลาด");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-100 p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold text-gray-900">สมัครสมาชิก</h1>
          <p className="text-sm text-gray-500">สร้างบัญชีใหม่เพื่อใช้งานระบบ</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">ชื่อ (ไม่บังคับ)</label>
            <input
              type="text"
              className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="เช่น ครูสมชาย"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">อีเมล</label>
            <input
              type="email"
              className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">รหัสผ่าน (อย่างน้อย 6 ตัว)</label>
            <input
              type="password"
              className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
            />
          </div>

          {error && (
            <p className="text-sm text-rose-600 bg-rose-50 border border-rose-100 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#8B0000] text-white py-3 font-semibold shadow-lg shadow-rose-200/60 hover:bg-[#750000] transition-colors disabled:opacity-60"
          >
            {loading ? "กำลังสมัคร..." : "สมัครสมาชิก"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          มีบัญชีแล้ว?{" "}
          <Link href="/signin" className="text-rose-600 font-semibold hover:underline">
            เข้าสู่ระบบ
          </Link>
        </p>
      </div>
    </div>
  );
}
