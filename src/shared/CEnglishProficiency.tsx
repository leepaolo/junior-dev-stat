// CEnglishProficiency.tsx
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import { ChartOptions } from "chart.js";
import { fetchUserData } from "../api/ApiService"; // Adjust the path as needed
import { normalizeData } from "../services/Normalize"; // Adjust the path as needed

function CEnglishProficiency() {
  const [proficiencyData, setProficiencyData] = useState<{
    [level: string]: number;
  }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawData = await fetchUserData();
        const normalizedData = normalizeData(rawData);
        const counts = normalizedData.reduce<{ [level: string]: number }>(
          (acc, item) => {
            const proficiency = item.englishProficiency; // Assuming the field is named 'englishProficiency'
            if (proficiency) {
              acc[proficiency] = (acc[proficiency] || 0) + 1;
            }
            return acc;
          },
          {}
        );
        setProficiencyData(counts);
      } catch (error) {
        console.error("Failed to load English proficiency data:", error);
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: Object.keys(proficiencyData),
    datasets: [
      {
        label: "English Proficiency Levels",
        data: Object.values(proficiencyData),
        backgroundColor: [
          "rgba(153, 102, 255, 0.6)", // pastel purple
          "rgba(255, 159, 64, 0.6)", // pastel orange
          "rgba(75, 192, 192, 0.6)", // pastel green
        ],
        borderColor: [
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"pie"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  return (
    <div>
      <h2>English Proficiency Distribution</h2>
      <Pie data={data} options={options} />
    </div>
  );
}

export default CEnglishProficiency;
