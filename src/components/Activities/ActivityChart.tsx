import React, { useState, useEffect, useMemo } from "react";

const App = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-sans bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <div className="w-full max-w-4xl mx-auto">
        <ActivityChart />
      </div>
    </div>
  );
};

// --- Helper function to generate dynamic data ---
const generateChartData = (timeframe) => {
  const today = new Date();
  const data = [];

  const randomValue = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  if (timeframe === "weekly") {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      data.push({
        label: days[date.getDay()],
        diet: randomValue(40, 95),
        workout: randomValue(30, 90),
      });
    }
  } else if (timeframe === "monthly") {
    const weeks = ["Week 1", "Week 2", "Week 3", "Week 4"];
    for (let i = 0; i < 4; i++) {
      data.push({
        label: weeks[i],
        diet: randomValue(50, 90),
        workout: randomValue(40, 85),
      });
    }
  } else if (timeframe === "yearly") {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    for (let i = 0; i < 12; i++) {
      data.push({
        label: months[i],
        diet: randomValue(60, 85),
        workout: randomValue(55, 80),
      });
    }
  }
  return data;
};

const ActivityChart = () => {
  const [timeframe, setTimeframe] = useState("weekly");
  const [chartData, setChartData] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setChartData(generateChartData(timeframe));
    setHoveredIndex(null);
  }, [timeframe]);

  const handleTimeframeChange = (e) => {
    setTimeframe(e.target.value);
  };

  // --- SVG and Chart Dimensions ---
  const SVG_WIDTH = 600;
  const SVG_HEIGHT = 250;
  const PADDING = { top: 20, right: 20, bottom: 40, left: 30 };
  const CHART_WIDTH = SVG_WIDTH - PADDING.left - PADDING.right;
  const CHART_HEIGHT = SVG_HEIGHT - PADDING.top - PADDING.bottom;
  const MAX_Y = 100;

  const { dietPath, workoutPath, dietAreaPath, workoutAreaPath } = useMemo(() => {
    if (chartData.length === 0) return {};

    const getCoords = (value, index) => ({
      x: PADDING.left + (index / (chartData.length - 1)) * CHART_WIDTH,
      y: PADDING.top + CHART_HEIGHT - (value / MAX_Y) * CHART_HEIGHT,
    });

    const dietPoints = chartData.map((d, i) => getCoords(d.diet, i));
    const workoutPoints = chartData.map((d, i) => getCoords(d.workout, i));

    const linePath = (points) =>
      "M" + points.map((p) => `${p.x},${p.y}`).join(" L ");

    const areaPath = (points) => {
      const path = linePath(points);
      const firstPoint = points[0];
      const lastPoint = points[points.length - 1];
      return `${path} L ${lastPoint.x},${CHART_HEIGHT + PADDING.top} L ${firstPoint.x},${CHART_HEIGHT + PADDING.top} Z`;
    };

    return {
      dietPath: linePath(dietPoints),
      workoutPath: linePath(workoutPoints),
      dietAreaPath: areaPath(dietPoints),
      workoutAreaPath: areaPath(workoutPoints),
    };
  }, [chartData]);

  const handleMouseMove = (event) => {
    const svgRect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - svgRect.left;
    const index = Math.round(
      ((x - PADDING.left) / CHART_WIDTH) * (chartData.length - 1)
    );

    if (index >= 0 && index < chartData.length) {
      setHoveredIndex(index);
      const pointX =
        PADDING.left + (index / (chartData.length - 1)) * CHART_WIDTH;
      const dietY =
        PADDING.top +
        CHART_HEIGHT -
        (chartData[index].diet / MAX_Y) * CHART_HEIGHT;
      const workoutY =
        PADDING.top +
        CHART_HEIGHT -
        (chartData[index].workout / MAX_Y) * CHART_HEIGHT;
      setTooltipPosition({ x: pointX, y: (dietY + workoutY) / 2 });
    }
  };

  const handleMouseLeave = () => setHoveredIndex(null);

  const hoveredDataPoint = hoveredIndex !== null ? chartData[hoveredIndex] : null;

  return (
    <div className="rounded-2xl p-6 shadow-2xl bg-white dark:bg-gray-800 transition-colors duration-500">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Activity Statistics
        </h3>
        <select
          value={timeframe}
          onChange={handleTimeframeChange}
          className="text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      {/* Legend */}
      <div className="flex items-center space-x-6 mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-sm text-gray-600 dark:text-gray-300">Diet</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
          <span className="text-sm text-gray-600 dark:text-gray-300">Workout</span>
        </div>
      </div>

      {/* Chart */}
      <div className="relative">
        {/* Tooltip */}
        <div
          className="absolute bg-gray-900 text-white p-3 rounded-lg shadow-xl pointer-events-none transition-all duration-200"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            transform: `translate(-50%, -120%)`,
            opacity: hoveredIndex !== null ? 1 : 0,
            visibility: hoveredIndex !== null ? "visible" : "hidden",
          }}
        >
          {hoveredDataPoint && (
            <>
              <p className="font-bold text-center mb-2">
                {hoveredDataPoint.label}
              </p>
              <div className="flex items-center justify-between text-sm space-x-4">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  <span>
                    Diet: <strong>{hoveredDataPoint.diet}</strong>
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-pink-500 rounded-full mr-2"></span>
                  <span>
                    Workout: <strong>{hoveredDataPoint.workout}</strong>
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        <svg
          className="w-full"
          viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {[0, 25, 50, 75, 100].map((y) => {
            const yPos =
              PADDING.top + CHART_HEIGHT - (y / MAX_Y) * CHART_HEIGHT;
            return (
              <g key={y}>
                <line
                  x1={PADDING.left}
                  y1={yPos}
                  x2={SVG_WIDTH - PADDING.right}
                  y2={yPos}
                  stroke="currentColor"
                  className="text-gray-300 dark:text-gray-600"
                  strokeWidth="1"
                  strokeDasharray="3,3"
                />
                <text
                  x={PADDING.left - 8}
                  y={yPos + 4}
                  textAnchor="end"
                  className="fill-gray-500 dark:fill-gray-400"
                  fontSize="10"
                >
                  {y}
                </text>
              </g>
            );
          })}

          {/* Gradients */}
          <defs>
            <linearGradient id="dietGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="workoutGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EC4899" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#EC4899" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Paths */}
          {chartData.length > 0 && (
            <>
              <path d={dietAreaPath} fill="url(#dietGradient)" />
              <path
                d={dietPath}
                fill="none"
                stroke="#3B82F6"
                strokeWidth="2.5"
              />
              <path d={workoutAreaPath} fill="url(#workoutGradient)" />
              <path
                d={workoutPath}
                fill="none"
                stroke="#EC4899"
                strokeWidth="2.5"
              />
            </>
          )}

          {/* Data points */}
          {chartData.map((d, i) => {
            const dietY =
              PADDING.top + CHART_HEIGHT - (d.diet / MAX_Y) * CHART_HEIGHT;
            const workoutY =
              PADDING.top + CHART_HEIGHT - (d.workout / MAX_Y) * CHART_HEIGHT;
            const x =
              PADDING.left + (i / (chartData.length - 1)) * CHART_WIDTH;

            return (
              <g key={i}>
                <circle
                  cx={x}
                  cy={dietY}
                  r={hoveredIndex === i ? 7 : 4}
                  fill="#3B82F6"
                  className="transition-all duration-200"
                />
                <circle
                  cx={x}
                  cy={workoutY}
                  r={hoveredIndex === i ? 7 : 4}
                  fill="#EC4899"
                  className="transition-all duration-200"
                />
              </g>
            );
          })}

          {/* X-axis labels */}
          {chartData.map((d, i) => (
            <text
              key={i}
              x={PADDING.left + (i / (chartData.length - 1)) * CHART_WIDTH}
              y={SVG_HEIGHT - PADDING.bottom + 20}
              textAnchor="middle"
              className="fill-gray-600 dark:fill-gray-400"
              fontSize="12"
            >
              {d.label}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
};

export default App;
