import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { ChartOptions } from "chart.js";
import { fetchUserData } from "../api/ApiService";
import { normalizeData } from "../services/Normalize";

function CKnownLanguages() {
  const [languageData, setLanguageData] = useState<{
    [language: string]: number;
  }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawData = await fetchUserData();
        console.log("Raw Data:", rawData);
        const normalizedData = normalizeData(rawData);
        console.log("Normalized Data:", normalizedData);
        const counts = normalizedData.reduce<{ [language: string]: number }>(
          (acc, item) => {
            if (Array.isArray(item.knownLanguages)) {
              item.knownLanguages.forEach((language: string) => {
                if (language) {
                  acc[language] = (acc[language] || 0) + 1;
                }
              });
            }
            return acc;
          },
          {}
        );
        console.log("Language Counts:", counts);
        setLanguageData(counts);
      } catch (error) {
        console.error("Failed to load language data:", error);
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: Object.keys(languageData),
    datasets: [
      {
        label: "Number of Developers",
        data: Object.values(languageData),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
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
    indexAxis: "y",
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Count",
        },
        beginAtZero: true,
      },
      y: {
        title: {
          display: true,
          text: "Languages",
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div>
      <h2>Programming Language Distribution</h2>
      <Bar data={data} options={options} />
    </div>
  );
}

export default CKnownLanguages;
