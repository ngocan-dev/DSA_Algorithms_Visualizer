import AlgorithmCategoryCard from "./AlgorithmCategoryCard";

function SortingPreview() {
  return (
    <div className="flex w-full max-w-md items-end gap-1 px-6">
      {[24, 48, 32, 72, 56, 40, 64].map((height, index) => (
        <div
          key={`${height}-${index}`}
          className="w-full rounded-md bg-gradient-to-t from-blue-900 via-blue-700 to-blue-400"
          style={{ height: `${height}px` }}
        />
      ))}
    </div>
  );
}

function SearchingPreview() {
  return (
    <div className="flex items-center gap-2 px-4 text-sm font-mono text-blue-100">
      {[8, 16, 23, 42, 56, 72].map((value, index) => (
        <div
          key={value}
          className={`relative flex h-12 w-12 items-center justify-center rounded-lg border border-gray-700/80 bg-gray-900/80 ${
            index === 2 ? "ring-2 ring-blue-500/70" : ""
          }`}
        >
          {index === 3 && (
            <span className="absolute -top-5 text-[10px] uppercase tracking-[0.2em] text-green-300">
              Target
            </span>
          )}
          <span>{value}</span>
          {index === 2 && (
            <span className="absolute -bottom-5 text-[10px] text-blue-200">Pointer</span>
          )}
        </div>
      ))}
    </div>
  );
}

function GraphPreview() {
  const nodes = [
    { x: 30, y: 80, color: "#3b82f6" },
    { x: 90, y: 40, color: "#22d3ee" },
    { x: 60, y: 30, color: "#22d3ee" },
    { x: 150, y: 70, color: "#a855f7" },
    { x: 170, y: 40, color: "#22d3ee" },
  ];

  return (
    <div className="relative h-full w-full max-w-md px-6">
      <div className="absolute inset-0 animate-pulse rounded-xl bg-gradient-to-br from-purple-500/10 via-blue-500/5 to-transparent" />
      <svg viewBox="0 0 200 120" className="relative h-full w-full" aria-hidden>
        <g stroke="#60a5fa" strokeWidth="2" strokeOpacity="0.6" fill="none">
          <line x1="30" y1="80" x2="90" y2="40" />
          <line x1="90" y1="40" x2="150" y2="70" />
          <line x1="30" y1="80" x2="60" y2="30" />
          <line x1="60" y1="30" x2="150" y2="70" />
          <line x1="90" y1="40" x2="170" y2="40" />
        </g>
        {nodes.map((node) => (
          <circle
            key={`${node.x}-${node.y}`}
            cx={node.x}
            cy={node.y}
            r="10"
            fill={node.color}
            opacity={0.85}
          />
        ))}
      </svg>
    </div>
  );
}

function TreePreview() {
  return (
    <div className="flex w-full max-w-md flex-col items-center gap-2 text-blue-100">
      <div className="flex items-center gap-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 shadow-inner">A</div>
      </div>
      <div className="flex items-center gap-10">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 shadow-inner">B</div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 shadow-inner">C</div>
      </div>
      <div className="flex items-center gap-6">
        {["D", "E", "F", "G"].map((label) => (
          <div
            key={label}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 bg-gray-900 shadow-inner"
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LandingSections() {
  const categories = [
    {
      title: "Sorting Algorithms",
      description: "Compare how Bubble, Merge, and Insertion Sort organize data visually.",
      href: "/sorting",
      points: ["Bubble Sort", "Merge Sort", "Insertion Sort"],
      preview: <SortingPreview />,
    },
    {
      title: "Searching Algorithms",
      description: "See how Linear and Binary Search scan arrays to find target values.",
      href: "/searching",
      points: ["Linear Search", "Binary Search"],
      preview: <SearchingPreview />,
    },
    {
      title: "Graph Algorithms",
      description: "Watch BFS and DFS explore weighted graphs step by step.",
      href: "/graphs",
      points: ["Weighted Graphs", "BFS", "DFS"],
      preview: <GraphPreview />,
    },
    {
      title: "Tree Algorithms",
      description: "Understand traversals and hierarchical relationships with node visualizations.",
      href: "/trees",
      points: ["Traversals", "Balanced Trees", "Hierarchy"],
      preview: <TreePreview />,
    },
  ];

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold">Explore Algorithm Families</h2>
        <p className="mt-2 max-w-2xl text-gray-400">
          Choose a category to jump directly into interactive visualizations. Each page focuses on clear explanations and step-by-step animations.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {categories.map((category) => (
          <AlgorithmCategoryCard key={category.title} {...category} />
        ))}
      </div>
    </section>
  );
}
