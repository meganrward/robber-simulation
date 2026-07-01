/**
 * Runs one robber vs mine timestep simulation.
 * @returns {{
 *   logs: string[],
 *   chartData: { time: number, robber: number, mine: number }[],
 *   explosion: { time: number, position: number } | null
 * }}
 */
export function runRobberSimulation() {
  const logs = [];
  const chartData = [];
  const robberStartPosition = Math.floor(Math.random() * 10);
  const robberSpeed = Math.floor(Math.random() * 10) + 1;
  logs.push(`The robber starts at position ${robberStartPosition}`);
  logs.push(`The robber moves at speed ${robberSpeed}`);

  /** Set when robber position equals mine position for that timestep. */
  let explosion = null;
  // Cantor index for (9,10) is 200 — need time horizon past that for worst-case hits.
  const totalHours = 221;

  for (let time = 0; time < totalHours; time++) {
    const robberPosition = robberStartPosition + robberSpeed * time;
    // Cantor inverse: hour t maps to (i,j) ∈ ℕ²; mine at i + j·t equals robber a + b·t iff (i,j) = (a,b).
    const mineExplodingPosition = ((t) => {
      const w = Math.floor((Math.sqrt(8 * t + 1) - 1) / 2);
      const tri = (w * (w + 1)) / 2;
      const j = t - tri;
      return w - j + j * t;
    })(time);

    chartData.push({
      time,
      robber: robberPosition,
      mine: mineExplodingPosition,
    });

    logs.push(
      `The mine explodes at position ${mineExplodingPosition} and the robber is at position ${robberPosition} at time ${time}`
    );

    if (robberPosition === mineExplodingPosition) {
      logs.push(`The robber has been exploded at time ${time}`);
      explosion = { time, position: robberPosition };
      break;
    }
  }

  return { logs, chartData, explosion, totalHours };
}
