export const bfs = (
  rows: number,
  cols: number,
  start: [number, number] | null,
  end: [number, number] | null,
  callback: (path: [number, number][], visited: [number, number][]) => void
) => {
  if (!start || !end) return;

  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  let queue: [[number, number]] = [start];
  let parentMap: Record<string, [number, number] | null> = {};
  let visitedNodes: [number, number][] = [];
  let visitedSet = new Set<string>();

  parentMap[start.toString()] = null;
  visitedSet.add(start.toString());

  while (queue.length) {
    let [x, y] = queue.shift()!;
    visitedNodes.push([x, y]);

    if (x === end[0] && y === end[1]) {
      callback(reconstructPath(parentMap, end), visitedNodes);
      return;
    }

    for (let [dx, dy] of directions) {
      let newX = x + dx,
        newY = y + dy;
      if (newX >= 0 && newX < rows && newY >= 0 && newY < cols) {
        let key = [newX, newY].toString();
        if (!visitedSet.has(key)) {
          queue.push([newX, newY]);
          visitedSet.add(key);
          parentMap[key] = [x, y];
        }
      }
    }
  }
  callback([], visitedNodes);
};

const reconstructPath = (
  parentMap: Record<string, [number, number] | null>,
  end: [number, number]
) => {
  let path: [number, number][] = [];
  let current: [number, number] | null = end;

  while (current) {
    path.push(current);
    current = parentMap[current.toString()] || null;
  }
  return path.reverse();
};
