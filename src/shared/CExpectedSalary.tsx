// CExpectedSalary.tsx
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { ChartOptions } from "chart.js";
import { IData } from "../models/data"; // Adjust this path based on your project structure

interface CExpectedSalaryProps {
  userData: IData[];
}

function CExpectedSalary({ userData }: CExpectedSalaryProps) {
  const [salaryData, setSalaryData] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    // Process the passed userData to count expected salary ranges
    const counts = userData.reduce<{ [key: string]: number }>((acc, item) => {
      const salaryRange = item.expectedSalary; // Ensure 'expectedSalary' matches the field in IData
      if (salaryRange) {
        acc[salaryRange] = (acc[salaryRange] || 0) + 1;
      }
      return acc;
    }, {});

    setSalaryData(counts);
  }, [userData]); // Include userData in dependency array to recalculate when userData changes

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
      {/* <h2>Expected Salary Distribution</h2> */}
      <Bar data={data} options={options} />
    </div>
  );
}

export default CExpectedSalary;
