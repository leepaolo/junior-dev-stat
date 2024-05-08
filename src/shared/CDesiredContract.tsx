import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { ChartOptions } from "chart.js";
import { fetchUserData } from "../api/ApiService"; // Adjust the path as needed
import { normalizeData } from "../services/Normalize"; // Adjust the path as needed

function CDesiredContract() {
  const [contractData, setContractData] = useState<{ [key: string]: number }>(
    {}
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawData = await fetchUserData(); // API call to fetch contract data
        const normalizedData = normalizeData(rawData); // Normalize the data
        const counts = normalizedData.reduce<{ [key: string]: number }>(
          (acc, item) => {
            const contractType = item.desiredContract; // Assuming 'contractType' is the field
            if (contractType) {
              acc[contractType] = (acc[contractType] || 0) + 1;
            }
            return acc;
          },
          {}
        );
        setContractData(counts);
      } catch (error) {
        console.error("Failed to load desired contract data:", error);
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: Object.keys(contractData),
    datasets: [
      {
        label: "Desired Contract Types",
        data: Object.values(contractData),
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
      <h2>Desired Contract Types Distribution</h2>
      <Bar data={data} options={options} />
    </div>
  );
}

export default CDesiredContract;
