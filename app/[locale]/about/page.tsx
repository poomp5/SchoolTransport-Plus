import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import {
  Radio,
  MapPin,
  Bell,
  LayoutDashboard,
  BarChart3,
  ArrowLeft,
  Leaf,
  Target,
  AlertTriangle,
  Cpu,
  Layers,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "@/components/language-switcher";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: `${t("title")} — ${t("subtitle")}` };
}

const featureIcons = [Radio, MapPin, Bell, LayoutDashboard, BarChart3];

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AboutContent />;
}

function AboutContent() {
  const t = useTranslations("about");
  const nav = useTranslations("nav");

  const introList = t.raw("introList") as string[];
  const problemList = t.raw("problemList") as string[];
  const caseStudyList = t.raw("caseStudyList") as string[];
  const objectivesList = t.raw("objectivesList") as string[];
  const features = t.raw("features") as { name: string; desc: string }[];
  const techGroups = t.raw("techGroups") as { group: string; items: string[] }[];
  const resultsScale = t.raw("resultsScale") as string[];
  const performance = t.raw("performance") as { metric: string; value: string }[];
  const impact = t.raw("impact") as { label: string; value: string }[];
  const scalabilityList = t.raw("scalabilityList") as string[];
  const conclusionList = t.raw("conclusionList") as string[];
  const team = t.raw("team") as string[];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 text-gray-900">
      <div className="container mx-auto px-4 py-10 md:py-14 pb-24">
        {/* Top bar */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            {nav("brand")}
          </Link>
          <LanguageSwitcher />
        </div>

        {/* Hero */}
        <header className="mb-12 max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-2 text-sm font-medium text-rose-700">
            {t("kicker")}
          </span>
          <h1 className="mt-4 text-4xl md:text-5xl font-semibold leading-tight">
            {t("title")}
          </h1>
          <p className="mt-2 text-xl text-gray-600">{t("subtitle")}</p>
          <p className="mt-5 text-gray-600 leading-relaxed">{t("lead")}</p>
          <a
            href={t("prototypeUrl")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#8B0000] px-5 py-3 font-semibold text-white shadow-lg shadow-rose-200/60 transition-colors hover:bg-[#750000]"
          >
            {t("prototype")}
            <ExternalLink className="h-4 w-4" />
          </a>
        </header>

        {/* Introduction */}
        <Section title={t("introTitle")}>
          <p className="text-gray-600 leading-relaxed">{t("introBody")}</p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {introList.map((item) => (
              <Bullet key={item}>{item}</Bullet>
            ))}
          </ul>
          <p className="mt-4 text-gray-600 leading-relaxed">{t("introGoal")}</p>
        </Section>

        {/* Problem */}
        <Section title={t("problemTitle")} icon={<AlertTriangle className="h-5 w-5" />}>
          <p className="text-gray-600">{t("problemIntro")}</p>
          <ul className="mt-3 space-y-2">
            {problemList.map((item) => (
              <Bullet key={item}>{item}</Bullet>
            ))}
          </ul>
          <div className="mt-6 rounded-2xl border border-rose-100 bg-rose-50/60 p-5">
            <p className="font-semibold text-rose-800">{t("caseStudyTitle")}</p>
            <ul className="mt-2 space-y-1 text-sm text-rose-900/80">
              {caseStudyList.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </Section>

        {/* Objectives */}
        <Section title={t("objectivesTitle")} icon={<Target className="h-5 w-5" />}>
          <ol className="grid gap-3 sm:grid-cols-2">
            {objectivesList.map((item, i) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-4"
              >
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#8B0000] text-sm font-bold text-white">
                  {i + 1}
                </span>
                <span className="text-sm text-gray-700">{item}</span>
              </li>
            ))}
          </ol>
        </Section>

        {/* Features */}
        <Section title={t("featuresTitle")} icon={<Layers className="h-5 w-5" />}>
          <div className="grid gap-4 md:grid-cols-2">
            {features.map((f, i) => {
              const Icon = featureIcons[i] ?? Layers;
              return (
                <div
                  key={f.name}
                  className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
                >
                  <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-rose-100 text-rose-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="font-semibold text-gray-900">{f.name}</p>
                  <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </Section>

        {/* Tech stack */}
        <Section title={t("techTitle")} icon={<Cpu className="h-5 w-5" />}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {techGroups.map((g) => (
              <div
                key={g.group}
                className="rounded-2xl border border-gray-100 bg-white p-5"
              >
                <p className="text-sm font-semibold text-[#8B0000]">{g.group}</p>
                <ul className="mt-2 space-y-1 text-sm text-gray-600">
                  {g.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* Results */}
        <Section title={t("resultsTitle")} icon={<BarChart3 className="h-5 w-5" />}>
          <ul className="mb-6 flex flex-wrap gap-2">
            {resultsScale.map((item) => (
              <li
                key={item}
                className="rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-700"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="mb-3 font-semibold text-gray-900">{t("performanceTitle")}</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {performance.map((p) => (
              <div
                key={p.metric}
                className="rounded-2xl border border-gray-100 bg-white p-4 text-center"
              >
                <p className="text-2xl font-bold text-[#8B0000]">{p.value}</p>
                <p className="mt-1 text-xs text-gray-500">{p.metric}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Environmental impact */}
        <Section title={t("impactTitle")} icon={<Leaf className="h-5 w-5" />}>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {impact.map((m) => (
              <div
                key={m.label}
                className="rounded-2xl bg-gradient-to-br from-emerald-600 to-green-700 p-4 text-white"
              >
                <p className="text-lg font-bold">{m.value}</p>
                <p className="mt-1 text-xs text-emerald-50">{m.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 rounded-xl bg-gray-50 p-4 text-sm text-gray-600 leading-relaxed">
            {t("impactModel")}
          </p>
        </Section>

        {/* Scalability */}
        <Section title={t("scalabilityTitle")}>
          <ul className="flex flex-wrap gap-2">
            {scalabilityList.map((item) => (
              <li
                key={item}
                className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700"
              >
                {item}
              </li>
            ))}
          </ul>
        </Section>

        {/* Conclusion */}
        <Section title={t("conclusionTitle")}>
          <p className="text-gray-600 leading-relaxed">{t("conclusionBody")}</p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {conclusionList.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                {item}
              </li>
            ))}
          </ul>
        </Section>

        {/* Team */}
        <div className="mt-12 grid gap-4 rounded-3xl bg-[#0f172a] p-8 text-white sm:grid-cols-2">
          <div>
            <p className="text-sm text-gray-400">{t("teamTitle")}</p>
            <ul className="mt-2 space-y-1 text-lg font-semibold">
              {team.map((member) => (
                <li key={member}>{member}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm text-gray-400">{t("advisorTitle")}</p>
            <p className="mt-2 text-lg font-semibold">{t("advisor")}</p>
          </div>
          <p className="sm:col-span-2 mt-2 border-t border-white/10 pt-4 text-center text-sm italic text-gray-300">
            {t("motto")}
          </p>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-12">
      <h2 className="mb-4 flex items-center gap-2 text-2xl font-semibold text-gray-900">
        {icon && (
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-rose-100 text-rose-700">
            {icon}
          </span>
        )}
        {title}
      </h2>
      {children}
    </section>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-sm text-gray-700">
      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#8B0000]" />
      {children}
    </li>
  );
}
