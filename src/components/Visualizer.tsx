import React, { useState, useEffect } from "react";
import Controls from "./Controls";
import Grid from "./Grid";
import { bfs } from "./Pathfinding";

const Visualizer: React.FC = () => {
  const [rows, setRows] = useState(10);
  const [cols, setCols] = useState(10);
  const [start, setStart] = useState<[number, number] | null>(null);
  const [end, setEnd] = useState<[number, number] | null>(null);
  const [path, setPath] = useState<[number, number][]>([]);
  const [visited, setVisited] = useState<[number, number][]>([]);

  useEffect(() => {
    resetGrid();
  }, [rows, cols]);

  const handleCellClick = (row: number, col: number) => {
    if (!start) {
      setStart([row, col]);
    } else if (!end) {
      setEnd([row, col]);
    }
  };

  const findPath = () => {
    if (!start || !end) {
      alert("Please select both a start and end point!");
      return;
    }

    bfs(rows, cols, start, end, (newPath, visitedNodes) => {
      setVisited(visitedNodes);
      setPath(newPath);
    });
  };

  const resetGrid = () => {
    setStart(null);
    setEnd(null);
    setPath([]);
    setVisited([]);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl text-red-500 font-bold mb-4">
        Shortest Path Visualizer Using BFS
      </h1>
      <Controls
        rows={rows}
        cols={cols}
        setRows={setRows}
        setCols={setCols}
        onFindPath={findPath}
      />
      <Grid
        rows={rows}
        cols={cols}
        start={start}
        end={end}
        path={path}
        visited={visited}
        onCellClick={handleCellClick}
      />
      <button
        onClick={resetGrid}
        className="mt-4 px-4 py-2 rounded bg-gray-500 hover:bg-gray-600 text-white"
      >
        Reset Grid
      </button>
    </div>
  );
};

export default Visualizer;
