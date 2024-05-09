// CLanguagesToLearn.tsx
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { ChartOptions } from "chart.js";
import { IData } from "../models/data"; // Adjust this path based on your project structure

interface CLanguagesToLearnProps {
  userData: IData[];
}

function CLanguagesToLearn({ userData }: CLanguagesToLearnProps) {
  const [languageData, setLanguageData] = useState<{ [key: string]: number }>(
    {}
  );

  useEffect(() => {
    const languageCounts = parseAndCountLanguages(userData);
    const topFiveLanguages = getTopLanguages(languageCounts, 5); // Assuming you want the top 5
    setLanguageData(topFiveLanguages);
  }, [userData]); // Update when userData changes

  const parseAndCountLanguages = (data: IData[]): { [key: string]: number } => {
    const counts: { [key: string]: number } = {};
    data.forEach((entry) => {
      if (
        entry.languagesToLearn &&
        typeof entry.languagesToLearn === "string"
      ) {
        const languages = entry.languagesToLearn
          .split(", ")
          .map((lang) => lang.trim());
        languages.forEach((language) => {
          counts[language] = (counts[language] || 0) + 1;
        });
      }
    });
    return counts;
  };

  const getTopLanguages = (
    languageCounts: { [key: string]: number },
    limit: number
  ) => {
    return Object.entries(languageCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .reduce((acc: { [key: string]: number }, [lang, count]) => {
        acc[lang] = count;
        return acc;
      }, {});
  };

  const data = {
    labels: Object.keys(languageData),
    datasets: [
      {
        label: "Top Languages to Learn",
        data: Object.values(languageData),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
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
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      {/* <h2>Top Languages People Want to Learn</h2> */}
      <Bar data={data} options={options} />
    </div>
  );
}

export default CLanguagesToLearn;
