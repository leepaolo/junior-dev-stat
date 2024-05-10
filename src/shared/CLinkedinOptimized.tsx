// CLinkedinOptimized.tsx
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import { ChartOptions } from "chart.js";
import { IData } from "../models/data"; // Make sure the path is correct

interface CLinkedinOptimizedProps {
  userData: IData[];
}

function CLinkedinOptimized({ userData }: CLinkedinOptimizedProps) {
  const [optimizationData, setOptimizationData] = useState<{
    [key: string]: number;
  }>({});

  useEffect(() => {
    // Process the passed userData to count LinkedIn optimization activities
    const counts = userData.reduce<{ [key: string]: number }>((acc, item) => {
      const optimizationType = item.linkedinOptimized; // Ensure 'linkedinOptimized' matches the field in IData
      if (optimizationType) {
        acc[optimizationType] = (acc[optimizationType] || 0) + 1;
      }
      return acc;
    }, {});

    setOptimizationData(counts);
  }, [userData]); // Include userData in dependency array to recalculate when userData changes

  const data = {
    labels: Object.keys(optimizationData),
    datasets: [
      {
        label: "LinkedIn Optimizations",
        data: Object.values(optimizationData),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        hoverBackgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
          "rgba(255, 159, 64, 0.8)",
        ],
        borderColor: "rgba(0, 0, 0, 0)", // Transparent border
        borderWidth: 0,
      },
    ],
  };

  const options: ChartOptions<"pie"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        enabled: true,
        mode: "index",
        intersect: false,
      },
    },
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };

  return (
    <div>
      {/* <h2>LinkedIn Optimization Activities</h2> */}
      <Pie data={data} options={options} />
    </div>
  );
}

export default CLinkedinOptimized;
