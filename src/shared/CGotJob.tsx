import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import { ChartOptions } from "chart.js";
import { fetchUserData } from "../api/ApiService"; // Adjust the path as needed
import { normalizeData } from "../services/Normalize"; // Adjust the path as needed

function CGotJob() {
  const [jobData, setJobData] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawData = await fetchUserData(); // Your API call to fetch job data
        const normalizedData = normalizeData(rawData); // Assuming this normalizes raw data appropriately
        const counts = normalizedData.reduce<{ [key: string]: number }>(
          (acc, item) => {
            const jobField = item.gotJob;
            if (jobField) {
              acc[jobField] = (acc[jobField] || 0) + 1;
            }
            return acc;
          },
          {}
        );
        setJobData(counts);
      } catch (error) {
        console.error("Failed to load job data:", error);
      }
    };

    fetchData();
  }, []);

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
      <h2>Jobs Secured</h2>
      <Doughnut data={data} options={options} />
    </div>
  );
}

export default CGotJob;
