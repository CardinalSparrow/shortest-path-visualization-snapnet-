import React from "react";

interface ControlsProps {
  rows: number;
  cols: number;
  setRows: (rows: number) => void;
  setCols: (cols: number) => void;
  onFindPath: () => void;
}

const Controls: React.FC<ControlsProps> = ({
  rows,
  cols,
  setRows,
  setCols,
  onFindPath,
}) => {
  return (
    <div className="mb-8 flex items-center gap-12 justify-between">
      <div className="flex gap-12">
        <div className="flex flex-col items-center gap-4">
          <p> Number of Rows</p>
          <input
            type="number"
            value={rows}
            onChange={(e) => setRows(Number(e.target.value))}
            placeholder="Rows"
            className="border p-2 w-24"
          />{" "}
        </div>

        <div className="flex flex-col items-center gap-4">
          <p>Number of Columns</p>
          <input
            type="number"
            value={cols}
            onChange={(e) => setCols(Number(e.target.value))}
            placeholder="Columns"
            className="border p-2 w-24"
          />
        </div>
      </div>

      <button
        onClick={onFindPath}
        className="text-white p-2 bg-green-500  text-center rounded-xl hover:bg-white hover:text-green-500 border-green-500 border"
      >
        Find Path
      </button>
    </div>
  );
};

export default Controls;
