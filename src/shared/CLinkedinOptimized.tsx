import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import { ChartOptions } from "chart.js";
import { fetchUserData } from "../api/ApiService"; // Adjust the path as needed
import { normalizeData } from "../services/Normalize"; // Adjust the path as needed

function CLinkedinOptimized() {
  const [optimizationData, setOptimizationData] = useState<{
    [key: string]: number;
  }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawData = await fetchUserData(); // API call to fetch optimization data
        const normalizedData = normalizeData(rawData); // Normalize the data
        const counts = normalizedData.reduce<{ [key: string]: number }>(
          (acc, item) => {
            const optimizationType = item.linkedinOptimized; // Assuming 'optimizationType' is the field
            if (optimizationType) {
              acc[optimizationType] = (acc[optimizationType] || 0) + 1;
            }
            return acc;
          },
          {}
        );
        setOptimizationData(counts);
      } catch (error) {
        console.error("Failed to load LinkedIn optimization data:", error);
      }
    };

    fetchData();
  }, []);

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
        borderColor: "rgba(0, 0, 0, 0)", // Setting border color to transparent
        borderWidth: 0, // No border width
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
      <h2>LinkedIn Optimization Activities</h2>
      <Pie data={data} options={options} />
    </div>
  );
}

export default CLinkedinOptimized;
