"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function LandingHero() {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-gray-950 to-black border border-gray-800 shadow-2xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.12),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(168,85,247,0.12),transparent_25%),radial-gradient(circle_at_50%_80%,rgba(236,72,153,0.08),transparent_25%)]" />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "linear-gradient(to bottom, transparent, black, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black, transparent)",
        }}
        aria-hidden
      />

      <div className="relative px-6 py-16 md:px-12 md:py-20 lg:py-24">
        <div className="flex flex-col gap-6 max-w-3xl">
          <div className="inline-flex items-center gap-2 w-fit rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-sm text-blue-100">
            <Sparkles className="h-4 w-4" />
            Interactive learning, visual first
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
            Algorithms Visualizer
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
            Visualize how algorithms work step by step with interactive animations. Explore sorting, searching, and graph concepts with beginner-friendly explanations.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleNavigate("/sorting")}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:-translate-y-0.5 hover:bg-blue-500"
            >
              Explore Sorting Algorithms
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => handleNavigate("/searching")}
              className="inline-flex items-center gap-2 rounded-lg bg-purple-600/80 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition hover:-translate-y-0.5 hover:bg-purple-500"
            >
              Explore Searching Algorithms
              <ArrowRight className="h-4 w-4" />
            </button>
            <Link
              href="/graphs"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-900/80 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-blue-500 hover:text-blue-100"
            >
              Explore Graph Algorithms
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
