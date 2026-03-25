import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ReactNode } from "react";

type AlgorithmCategoryCardProps = {
  title: string;
  description: string;
  points: string[];
  href: string;
  preview: ReactNode;
};

export default function AlgorithmCategoryCard({
  title,
  description,
  points,
  href,
  preview,
}: AlgorithmCategoryCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/70 p-6 shadow-lg transition duration-200 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-blue-500/20"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/0 to-blue-500/5 opacity-0 transition duration-300 group-hover:opacity-100" aria-hidden />
      <div className="relative flex items-center justify-between">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-blue-300 transition group-hover:bg-blue-600/20 group-hover:text-blue-100">
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>

      <div className="relative flex h-28 items-center justify-center overflow-hidden rounded-xl bg-gray-950/70 ring-1 ring-gray-800">
        {preview}
      </div>

      <div className="relative text-sm text-gray-300">
        <div className="flex flex-wrap gap-2">
          {points.map((point) => (
            <span
              key={point}
              className="rounded-full border border-gray-800 bg-gray-800/60 px-3 py-1 text-xs text-gray-300 transition group-hover:border-blue-500/40 group-hover:text-blue-50"
            >
              {point}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
