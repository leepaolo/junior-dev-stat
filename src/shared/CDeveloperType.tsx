// CDeveloperType.tsx

import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { ChartOptions } from "chart.js";
import { fetchUserData } from "../api/ApiService"; // Adjust path as needed
import { normalizeData } from "../services/Normalize"; // Adjust path as needed
import { useEffect, useState } from "react";

function CDeveloperType() {
  const [developerData, setDeveloperData] = useState<{
    [type: string]: number;
  }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawData = await fetchUserData();
        const normalizedData = normalizeData(rawData);
        const counts = normalizedData.reduce<{ [type: string]: number }>(
          (acc, item) => {
            const type = item.developerType; // Assuming there's a field named 'developerType'
            if (type) {
              acc[type] = (acc[type] || 0) + 1;
            }
            return acc;
          },
          {}
        );
        setDeveloperData(counts);
      } catch (error) {
        console.error("Failed to load developer type data:", error);
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: Object.keys(developerData),
    datasets: [
      {
        label: "Number of Developers",
        data: Object.values(developerData),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)", // pastel red
          "rgba(54, 162, 235, 0.6)", // pastel blue
          "rgba(255, 206, 86, 0.6)", // pastel yellow
          "rgba(75, 192, 192, 0.6)", // pastel green
          "rgba(153, 102, 255, 0.6)", // pastel purple
          "rgba(255, 159, 64, 0.6)", // pastel orange
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Developer Types",
        },
      },
      y: {
        title: {
          display: true,
          text: "Count",
        },
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  return (
    <div>
      <h2>Developer Type Distribution</h2>
      <Bar data={data} options={options} />
    </div>
  );
}

export default CDeveloperType;
