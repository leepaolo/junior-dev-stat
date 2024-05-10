// CGotJob.tsx
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import { ChartOptions } from "chart.js";
import { IData } from "../models/data"; // Make sure the path is correct

interface CGotJobProps {
  userData: IData[];
}

function CGotJob({ userData }: CGotJobProps) {
  const [jobData, setJobData] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    // Process the passed userData to count job data
    const counts = userData.reduce<{ [key: string]: number }>((acc, item) => {
      const jobField = item.gotJob; // Ensure 'gotJob' is the correct field name in IData
      if (jobField) {
        acc[jobField] = (acc[jobField] || 0) + 1;
      }
      return acc;
    }, {});

    setJobData(counts);
  }, [userData]); // Include userData in dependency array to recalculate when userData changes

  const data = {
    labels: Object.keys(jobData),
    datasets: [
      {
        label: "Jobs Secured",
        data: Object.values(jobData),
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
        hoverOffset: 4,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  return (
    <div>
      {/* <h2>Jobs Secured</h2> */}
      <Doughnut data={data} options={options} />
    </div>
  );
}

export default CGotJob;
