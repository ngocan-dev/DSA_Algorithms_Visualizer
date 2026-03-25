import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function TreesPage() {
  return (
    <div className="space-y-6 rounded-2xl border border-dashed border-gray-800 bg-gray-900/50 p-8 text-center">
      <h1 className="text-3xl font-bold">Tree Visualizer</h1>
      <p className="text-gray-400 max-w-2xl mx-auto">
        Tree algorithm visualizations are coming soon. Explore our existing interactive lessons while we grow this section with traversals and balanced tree demos.
      </p>
      <div className="flex justify-center gap-3">
        <Link
          href="/sorting"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:-translate-y-0.5 hover:bg-blue-500"
        >
          Sorting Visualizer
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/graphs"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-800/70 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-purple-400"
        >
          Graph Visualizer
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
