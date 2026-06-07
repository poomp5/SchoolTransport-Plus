"use client";

import { useLocale } from "next-intl";
import { useTransition } from "react";
import { Languages } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";

export default function LanguageSwitcher({
  className = "",
}: {
  className?: string;
}) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const switchTo = (next: "en" | "th") => {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <div
      className={`inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white p-0.5 text-xs font-semibold ${className}`}
    >
      <Languages className="ml-1.5 h-3.5 w-3.5 text-gray-400" />
      {(["en", "th"] as const).map((lng) => (
        <button
          key={lng}
          type="button"
          disabled={isPending}
          onClick={() => switchTo(lng)}
          className={`rounded-full px-2.5 py-1 uppercase transition-colors ${
            locale === lng
              ? "bg-[#8B0000] text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          {lng}
        </button>
      ))}
    </div>
  );
}
