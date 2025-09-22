// import React from 'react';

// const WeightChart = () => {
//   const data = [
//     { month: 'Nov', weight: 100 },
//     { month: 'Nov', weight: 95 },
//     { month: 'Dec', weight: 97 },
//     { month: 'Jan', weight: 85 },
//     { month: 'Jan', weight: 80 },
//     { month: 'Feb', weight: 82 },
//     { month: 'Mar', weight: 78 },
//     { month: 'Mar', weight: 85 },
//     { month: 'Apr', weight: 80 },
//     { month: 'May', weight: 78 },
//     { month: 'May', weight: 75 },
//     { month: 'Jun', weight: 73 },
//     { month: 'Jul', weight: 72 },
//     { month: 'Jul', weight: 70 },
//     { month: 'Aug', weight: 68 },
//     { month: 'Sep', weight: 65 },
//   ];

//   const maxWeight = 120;
//   const minWeight = 0;

//   return (
//     <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
//       <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Weight Journey</h3>
      
//       {/* Weight scale indicators */}
//       <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
//         <span>120 KG</span>
//         <span>100 KG</span>
//         <span>80 KG</span>
//         <span>60 KG</span>
//         <span>40 KG</span>
//         <span>20 KG</span>
//         <span>0 KG</span>
//       </div>
      
//       <div className="relative h-48 mb-4">
//         <svg className="w-full h-full" viewBox="0 0 800 200">
//           <defs>
//             <linearGradient id="weightGradient" x1="0%" y1="0%" x2="0%" y2="100%">
//               <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3"/>
//               <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0"/>
//             </linearGradient>
//           </defs>
          
//           {/* Grid lines */}
//           {[0, 20, 40, 60, 80, 100, 120].map((weight) => (
//             <line
//               key={weight}
//               x1="0"
//               y1={200 - (weight / maxWeight) * 200}
//               x2="800"
//               y2={200 - (weight / maxWeight) * 200}
//               stroke="#e5e7eb"
//               strokeWidth="1"
//               opacity="0.5"
//             />
//           ))}

//           {/* Weight line and area */}
//           <path
//             d={`M 0 ${200 - (data[0].weight / maxWeight) * 200} ${data.map((d, i) => `L ${(i * 800) / (data.length - 1)} ${200 - (d.weight / maxWeight) * 200}`).join(' ')} L 800 200 L 0 200 Z`}
//             fill="url(#weightGradient)"
//           />
          
//           <path
//             d={`M 0 ${200 - (data[0].weight / maxWeight) * 200} ${data.map((d, i) => `L ${(i * 800) / (data.length - 1)} ${200 - (d.weight / maxWeight) * 200}`).join(' ')}`}
//             fill="none"
//             stroke="#8B5CF6"
//             strokeWidth="3"
//           />

//           {/* Data points */}
//           {data.map((d, i) => (
//             <circle
//               key={i}
//               cx={(i * 800) / (data.length - 1)}
//               cy={200 - (d.weight / maxWeight) * 200}
//               r="4"
//               fill="#8B5CF6"
//               className="hover:r-6 transition-all duration-200 cursor-pointer"
//             />
//           ))}
//         </svg>
//       </div>

//       {/* Month labels */}
//       <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
//         {['Nov', 'Nov', 'Dec', 'Jan', 'Jan', 'Feb', 'Mar', 'Mar', 'Apr', 'May', 'May', 'Jun', 'Jul', 'Jul', 'Aug', 'Sep'].map((month, i) => (
//           <span key={i} className={i % 2 === 0 ? 'opacity-100' : 'opacity-0'}>{month}</span>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default WeightChart;

import React, { useState, useMemo } from "react";

const WeightChart = () => {
  const data = [
    { month: "Nov", weight: 100 },
    { month: "Nov", weight: 95 },
    { month: "Dec", weight: 97 },
    { month: "Jan", weight: 85 },
    { month: "Jan", weight: 80 },
    { month: "Feb", weight: 82 },
    { month: "Mar", weight: 78 },
    { month: "Mar", weight: 85 },
    { month: "Apr", weight: 80 },
    { month: "May", weight: 78 },
    { month: "May", weight: 75 },
    { month: "Jun", weight: 73 },
    { month: "Jul", weight: 72 },
    { month: "Jul", weight: 70 },
    { month: "Aug", weight: 68 },
    { month: "Sep", weight: 65 },
  ];

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  // --- Chart Dimensions ---
  const SVG_WIDTH = 800;
  const SVG_HEIGHT = 250;
  const PADDING = { top: 20, right: 20, bottom: 40, left: 40 };
  const CHART_WIDTH = SVG_WIDTH - PADDING.left - PADDING.right;
  const CHART_HEIGHT = SVG_HEIGHT - PADDING.top - PADDING.bottom;
  const MAX_Y = 120;

  // --- Path Calculation ---
  const { linePath, areaPath, points } = useMemo(() => {
    if (data.length === 0) return { linePath: "", areaPath: "", points: [] };

    const getCoords = (value: number, index: number) => ({
      x: PADDING.left + (index / (data.length - 1)) * CHART_WIDTH,
      y: PADDING.top + CHART_HEIGHT - (value / MAX_Y) * CHART_HEIGHT,
    });

    const pts = data.map((d, i) => getCoords(d.weight, i));
    const path = "M" + pts.map((p) => `${p.x},${p.y}`).join(" L ");
    const area =
      path +
      ` L ${pts[pts.length - 1].x},${CHART_HEIGHT + PADDING.top} L ${pts[0].x},${
        CHART_HEIGHT + PADDING.top
      } Z`;

    return { linePath: path, areaPath: area, points: pts };
  }, [data]);

  // --- Hover Logic ---
  const handleMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
    const svgRect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - svgRect.left;

    const index = Math.round(
      ((x - PADDING.left) / CHART_WIDTH) * (data.length - 1)
    );

    if (index >= 0 && index < data.length) {
      setHoveredIndex(index);
      const { x: px, y: py } = points[index];
      setTooltipPosition({ x: px, y: py });
    }
  };

  const handleMouseLeave = () => setHoveredIndex(null);

  const hoveredData = hoveredIndex !== null ? data[hoveredIndex] : null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Weight Journey
      </h3>

      <div className="relative">
        {/* Tooltip */}
        <div
          className="absolute bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg pointer-events-none transition-all duration-200 text-sm"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            transform: "translate(-50%, -120%)",
            opacity: hoveredIndex !== null ? 1 : 0,
            visibility: hoveredIndex !== null ? "visible" : "hidden",
          }}
        >
          {hoveredData && (
            <p>
              <strong>{hoveredData.month}:</strong> {hoveredData.weight} KG
            </p>
          )}
        </div>

        <svg
          className="w-full"
          viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Y-axis grid */}
          {[0, 20, 40, 60, 80, 100, 120].map((y) => {
            const yPos =
              PADDING.top + CHART_HEIGHT - (y / MAX_Y) * CHART_HEIGHT;
            return (
              <g key={y}>
                <line
                  x1={PADDING.left}
                  y1={yPos}
                  x2={SVG_WIDTH - PADDING.right}
                  y2={yPos}
                  stroke="#e5e7eb"
                  strokeWidth="1"
                  strokeDasharray="3,3"
                />
                <text
                  x={PADDING.left - 10}
                  y={yPos + 4}
                  textAnchor="end"
                  fill="#6b7280"
                  fontSize="10"
                >
                  {y}
                </text>
              </g>
            );
          })}

          {/* Gradient */}
          <defs>
            <linearGradient id="weightGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Area + Line */}
          <path d={areaPath} fill="url(#weightGradient)" />
          <path
            d={linePath}
            fill="none"
            stroke="#8B5CF6"
            strokeWidth="2.5"
          />

          {/* Data points */}
          {points.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={hoveredIndex === i ? 6 : 4}
              fill="#8B5CF6"
              strokeWidth="2"
              className="transition-all duration-200"
            />
          ))}

          {/* X-axis labels */}
          {data.map((d, i) => (
            <text
              key={i}
              x={PADDING.left + (i / (data.length - 1)) * CHART_WIDTH}
              y={SVG_HEIGHT - PADDING.bottom + 20}
              textAnchor="middle"
              fill="#6b7280"
              fontSize="12"
            >
              {d.month}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
};

export default WeightChart;
