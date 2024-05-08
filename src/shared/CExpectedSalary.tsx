import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { ChartOptions } from "chart.js";
import { fetchUserData } from "../api/ApiService"; // Adjust the path as needed
import { normalizeData } from "../services/Normalize"; // Adjust the path as needed

function CExpectedSalary() {
  const [salaryData, setSalaryData] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawData = await fetchUserData(); // API call to fetch salary data
        const normalizedData = normalizeData(rawData); // Normalize the data
        const counts = normalizedData.reduce<{ [key: string]: number }>(
          (acc, item) => {
            const salaryRange = item.expectedSalary; // Assuming 'salaryRange' is the field
            if (salaryRange) {
              acc[salaryRange] = (acc[salaryRange] || 0) + 1;
            }
            return acc;
          },
          {}
        );
        setSalaryData(counts);
      } catch (error) {
        console.error("Failed to load expected salary data:", error);
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: Object.keys(salaryData),
    datasets: [
      {
        label: "Expected Salary",
        data: Object.values(salaryData),
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
      <h2>Expected Salary Distribution</h2>
      <Bar data={data} options={options} />
    </div>
  );
}

export default CExpectedSalary;
