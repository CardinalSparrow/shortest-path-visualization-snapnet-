import React from "react";

interface GridProps {
  rows: number;
  cols: number;
  start: [number, number] | null;
  end: [number, number] | null;
  path: [number, number][];
  visited: [number, number][];
  onCellClick: (row: number, col: number) => void;
}

const Grid: React.FC<GridProps> = ({
  rows,
  cols,
  start,
  end,
  path,
  visited,
  onCellClick,
}) => {
  return (
    <div
      className="grid"
      style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 30px)` }}
    >
      {Array.from({ length: rows }, (_, rIdx) =>
        Array.from({ length: cols }, (_, cIdx) => {
          const isStart = start?.[0] === rIdx && start?.[1] === cIdx;
          const isEnd = end?.[0] === rIdx && end?.[1] === cIdx;
          const isPath = path.some(([px, py]) => px === rIdx && py === cIdx);
          const isVisited = visited.some(
            ([vx, vy]) => vx === rIdx && vy === cIdx
          );

          return (
            <div
              key={`${rIdx}-${cIdx}`}
              onClick={() => onCellClick(rIdx, cIdx)}
              className={`w-8 h-8 border border-white flex items-center justify-center cursor-pointer transition
                ${
                  isStart
                    ? "bg-green-500"
                    : isEnd
                    ? "bg-red-500"
                    : isPath
                    ? "bg-yellow-500 animate-bounce"
                    : isVisited
                    ? "bg-blue-300"
                    : "bg-gray-200"
                }`}
            />
          );
        })
      )}
    </div>
  );
};

export default Grid;
