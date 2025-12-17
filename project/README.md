# Algorithm Visualizer

An interactive, educational web application built with Next.js that visualizes fundamental computer science algorithms through smooth animations. Learn how sorting, searching, and graph traversal algorithms work step-by-step.

## Features

### Sorting Algorithms
- **Bubble Sort** - Watch elements bubble to their correct positions
- **Insertion Sort** - See how elements are inserted into sorted positions
- **Merge Sort** - Visualize the divide-and-conquer approach

### Searching Algorithms
- **Linear Search** - Sequential search through arrays
- **Binary Search** - Efficient search in sorted arrays

### Graph Algorithms
- **Breadth-First Search (BFS)** - Level-by-level graph traversal
- **Depth-First Search (DFS)** - Explore as deep as possible before backtracking

## Key Features

- **Step-by-Step Visualization** - Control playback with play, pause, and reset
- **Adjustable Speed** - Choose between slow, normal, and fast animation speeds
- **Interactive Controls** - Generate random data, adjust array sizes, and customize inputs
- **Algorithm Information** - View time/space complexity and detailed descriptions
- **Color-Coded States** - Clear visual indicators for different algorithm states
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Dark Mode** - Beautiful dark theme optimized for learning

## Tech Stack

- **Framework**: Next.js 13 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
/app
  ├── layout.tsx          # Root layout with header
  ├── page.tsx            # Sorting algorithms page
  ├── searching/          # Searching algorithms page
  └── graphs/             # Graph algorithms page

/algorithms
  ├── sorting/
  │   ├── bubbleSort.ts   # Bubble sort implementation
  │   ├── insertionSort.ts # Insertion sort implementation
  │   └── mergeSort.ts    # Merge sort implementation
  ├── searching/
  │   ├── linearSearch.ts # Linear search implementation
  │   └── binarySearch.ts # Binary search implementation
  └── graphs/
      ├── bfs.ts          # BFS implementation
      └── dfs.ts          # DFS implementation

/components
  ├── Header.tsx          # Navigation header
  ├── ControlPanel.tsx    # Play/pause/reset controls
  ├── AlgorithmSelector.tsx # Algorithm dropdown
  ├── SpeedSlider.tsx     # Speed control slider
  ├── AlgorithmInfo.tsx   # Algorithm details card
  ├── ColorLegend.tsx     # Visual state legend
  └── visualizers/
      ├── ArrayBars.tsx   # Sorting visualization
      ├── SearchVisualizer.tsx # Search visualization
      └── GraphCanvas.tsx # Graph visualization

/types
  └── index.ts            # TypeScript type definitions

/utils
  ├── arrayGenerator.ts   # Array generation utilities
  └── graphGenerator.ts   # Graph generation utilities
```

## How It Works

### Algorithm Implementation Pattern

Each algorithm is implemented as an **async generator function** that yields steps:

```typescript
export async function* bubbleSort(array: number[]): AsyncGenerator<SortingStep> {
  const arr = [...array];

  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      // Yield a step showing comparison
      yield {
        array: [...arr],
        comparingIndices: [j, j + 1],
      };

      // Perform swap if needed
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

        // Yield a step showing swap
        yield {
          array: [...arr],
          swappingIndices: [j, j + 1],
        };
      }
    }
  }
}
```

### Animation Flow

1. User clicks "Start"
2. Generator is created with the current array
3. Animation loop calls `generator.next()` repeatedly
4. Each step updates the visualization
5. Speed control determines delay between steps
6. Animation completes when generator is done

## Extending the Project

### Adding a New Sorting Algorithm

1. **Create the algorithm file** in `/algorithms/sorting/`:

```typescript
// quickSort.ts
import { SortingStep, AlgorithmInfo } from '@/types';

export async function* quickSort(array: number[]): AsyncGenerator<SortingStep> {
  // Implementation here
  yield { array: [...array], comparingIndices: [i, j] };
}

export const quickSortInfo: AlgorithmInfo = {
  name: 'Quick Sort',
  timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)' },
  spaceComplexity: 'O(log n)',
  description: 'Quick Sort is a divide-and-conquer algorithm...',
};
```

2. **Import it in the page** (`app/page.tsx`):

```typescript
import { quickSort, quickSortInfo } from '@/algorithms/sorting/quickSort';

const ALGORITHMS = [
  // ... existing algorithms
  { value: 'quick', label: 'Quick Sort' },
];

const ALGORITHM_INFO = {
  // ... existing info
  quick: quickSortInfo,
};
```

3. **Add to the switch statement**:

```typescript
case 'quick':
  return quickSort(arr);
```

### Adding a New Graph Algorithm

Follow the same pattern in `/algorithms/graphs/` and update the graphs page.

### Customizing Visualizations

All visualization components are in `/components/visualizers/`. Modify these to change:
- Colors and styling
- Animation transitions
- Layout and sizing
- Visual effects

### Adding New Pages

Create a new directory in `/app/` and add a `page.tsx` file. Update the navigation in `components/Header.tsx`.

## Algorithm Complexity Reference

| Algorithm | Best | Average | Worst | Space |
|-----------|------|---------|-------|-------|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) |
| Linear Search | O(1) | O(n) | O(n) | O(1) |
| Binary Search | O(1) | O(log n) | O(log n) | O(1) |
| BFS | O(V+E) | O(V+E) | O(V+E) | O(V) |
| DFS | O(V+E) | O(V+E) | O(V+E) | O(V) |

## Educational Use

This visualizer is designed for:
- Computer Science students learning algorithms
- Coding interview preparation
- Teaching algorithm concepts
- Understanding algorithm behavior and performance

## Color Legend

- **Blue**: Default/unsorted state
- **Yellow**: Currently comparing or searching
- **Red**: Swapping elements
- **Green**: Sorted or found
- **Orange**: Current node in graph traversal
- **Gray**: Eliminated from search space

## Performance Notes

- Array sizes are limited to 100 elements for optimal visualization
- Graph size is limited to maintain readable visualizations
- Animation speed can be adjusted for different learning paces
- All algorithms run client-side in the browser

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

This project is open source and available for educational purposes.

## Contributing

To contribute:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Acknowledgments

Inspired by VisuAlgo and other algorithm visualization tools that make computer science education more accessible and engaging.
