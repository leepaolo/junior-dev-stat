// CEducationLevel.tsx
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import { ChartOptions } from "chart.js";
import { IData } from "../models/data"; // Adjust this path based on where your data model is located

interface CEducationLevelProps {
  userData: IData[];
}

function CEducationLevel({ userData }: CEducationLevelProps) {
  const [educationData, setEducationData] = useState<{ [key: string]: number }>(
    {}
  );

  useEffect(() => {
    const counts = userData.reduce<{ [key: string]: number }>((acc, item) => {
      const level = item.educationLevel; // Ensure 'educationLevel' matches the field in IData
      if (level) {
        acc[level] = (acc[level] || 0) + 1;
      }
      return acc;
    }, {});

    setEducationData(counts);
  }, [userData]); // Include userData in dependency array to recalculate when userData changes

  const data = {
    labels: Object.keys(educationData),
    datasets: [
      {
        label: "Education Levels",
        data: Object.values(educationData),
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
      {/* <h2>Education Level Distribution</h2> */}
      <Pie data={data} options={options} />
    </div>
  );
}

export default CEducationLevel;
