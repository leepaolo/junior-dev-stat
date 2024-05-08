// CLocations.tsx
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import { ChartOptions } from "chart.js";
import { fetchUserData } from "../api/ApiService"; // Adjust the path as needed
import { normalizeData } from "../services/Normalize";

function CLocations() {
  const [locationData, setLocationData] = useState<{ [key: string]: number }>(
    {}
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawData = await fetchUserData();
        const normalizedData = normalizeData(rawData);
        // Explicitly type the initial value of the accumulator
        const counts = normalizedData.reduce<{ [key: string]: number }>(
          (acc, item) => {
            if (item.location) {
              // Check if the location exists to ensure type safety
              const location: string = item.location;
              acc[location] = (acc[location] || 0) + 1;
            }
            return acc;
          },
          {}
        );
        setLocationData(counts);
      } catch (error) {
        console.error("Failed to load location data:", error);
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: Object.keys(locationData),
    datasets: [
      {
        label: "Location Count",
        data: Object.values(locationData),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)", // pastel red
          "rgba(54, 162, 235, 0.6)", // pastel blue
          "rgba(255, 206, 86, 0.6)", // pastel yellow
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"pie"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const, // Ensuring the value is treated as a literal type
      },
    },
  };

  return (
    <div>
      <h2>Location Distribution</h2>
      <Pie data={data} options={options} />
    </div>
  );
}

export default CLocations;
