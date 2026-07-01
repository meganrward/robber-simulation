import { useState, useCallback, useMemo } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceDot,
} from "recharts";
import "./App.css";
import { runRobberSimulation } from "./simulation";

function App() {
  const [logs, setLogs] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [explosion, setExplosion] = useState(null);
  const [hasRun, setHasRun] = useState(false);
  const [totalHours, setTotalHours] = useState(0);
  const handleRun = useCallback(() => {
    const { logs: nextLogs, chartData: nextChart, explosion: hit, totalHours } =
      runRobberSimulation();
    setLogs(nextLogs);
    setChartData(nextChart);
    setExplosion(hit);
    setTotalHours(totalHours);
    setHasRun(true);
  }, []);

  const robberPoints = useMemo(
    () => chartData.map((d) => ({ x: d.time, y: d.robber })),
    [chartData]
  );
  const minePoints = useMemo(
    () => chartData.map((d) => ({ x: d.time, y: d.mine })),
    [chartData]
  );

  return (
    <div className="app">
      <header className="app-header">
        <h1>Robber simulation</h1>
        <p className="app-lead">
          Each run picks new random start, speeds, and mine curve. Logs and
          chart update together.
        </p>
        <button type="button" className="run-btn" onClick={handleRun}>
          Run simulation
        </button>

        {hasRun && explosion != null && (
          <div className="outcome outcome--exploded" role="alert">
            <span className="outcome__badge">Explosion</span>
            <p className="outcome__text">
              The robber was hit at <strong>time {explosion.time}</strong>, position{" "}
              <strong>{explosion.position}</strong>. That timestep is marked on the
              chart.
            </p>
          </div>
        )}
        {hasRun && explosion == null && (
          <div className="outcome outcome--safe" role="status">
            <span className="outcome__badge outcome__badge--muted">Clear</span>
            <p className="outcome__text">
              No collision in {totalHours} hours — the robber made it through this run.
            </p>
          </div>
        )}
      </header>

      <main className="app-main">
        <section className="panel panel-logs" aria-labelledby="logs-heading">
          <h2 id="logs-heading">Logs</h2>
          {!hasRun ? (
            <p className="placeholder">Press the button to run a simulation.</p>
          ) : (
            <ol className="log-list">
              {logs.map((line, i) => {
                const isExplosionLine = /robber has been exploded/i.test(line);
                return (
                  <li
                    key={i}
                    className={isExplosionLine ? "log-list__explosion" : undefined}
                  >
                    {line}
                  </li>
                );
              })}
            </ol>
          )}
        </section>

        <section className="panel panel-chart" aria-labelledby="chart-heading">
          <h2 id="chart-heading">Positions over time</h2>
          {!hasRun ? (
            <p className="placeholder">Chart appears after you run.</p>
          ) : (
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height={360}>
                <ScatterChart
                  margin={{ top: 8, right: 16, left: 8, bottom: 8 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    type="number"
                    dataKey="x"
                    name="Time"
                    domain={["dataMin", "dataMax"]}
                    label={{
                      value: "Time",
                      position: "insideBottom",
                      offset: -4,
                    }}
                  />
                  <YAxis
                    type="number"
                    dataKey="y"
                    name="Position"
                    label={{
                      value: "Position",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <ZAxis range={[44, 44]} />
                  <Tooltip
                    cursor={{ strokeDasharray: "3 3" }}
                    formatter={(value, name) => [value, name]}
                    labelFormatter={(label) => `Time: ${label}`}
                  />
                  <Legend />
                  {explosion != null && (
                    <>
                      <ReferenceLine
                        x={explosion.time}
                        stroke="#b91c1c"
                        strokeWidth={2}
                        strokeDasharray="6 4"
                        isFront
                        label={{
                          value: "Hit",
                          position: "insideTopLeft",
                          fill: "#b91c1c",
                          fontSize: 12,
                          fontWeight: 700,
                        }}
                      />
                      <ReferenceDot
                        x={explosion.time}
                        y={explosion.position}
                        r={12}
                        fill="#f97316"
                        stroke="#7f1d1d"
                        strokeWidth={2}
                        isFront
                      />
                    </>
                  )}
                  <Scatter
                    name="Robber"
                    data={robberPoints}
                    fill="#2563eb"
                    shape="cross"
                    isAnimationActive={false}
                  />
                  <Scatter
                    name="Mine (bomb)"
                    data={minePoints}
                    fill="#dc2626"
                    shape="cross"
                    isAnimationActive={false}
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
