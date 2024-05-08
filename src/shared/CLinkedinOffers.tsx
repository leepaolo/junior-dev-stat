import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import { ChartOptions } from "chart.js";
import { fetchUserData } from "../api/ApiService"; // Adjust the path as needed
import { normalizeData } from "../services/Normalize"; // Adjust the path as needed

function CLinkedinOffers() {
  const [offerData, setOfferData] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawData = await fetchUserData(); // Your API call to fetch LinkedIn offer data
        const normalizedData = normalizeData(rawData); // Assuming normalization adjusts data as needed
        const counts = normalizedData.reduce<{ [key: string]: number }>(
          (acc, item) => {
            const offerType = item.linkedinOffers; // Assuming 'offerType' is the field
            if (offerType) {
              acc[offerType] = (acc[offerType] || 0) + 1;
            }
            return acc;
          },
          {}
        );
        setOfferData(counts);
      } catch (error) {
        console.error("Failed to load LinkedIn offer data:", error);
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: Object.keys(offerData),
    datasets: [
      {
        label: "LinkedIn Offers",
        data: Object.values(offerData),
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
        // Removed the border color and width for seamless slices
        borderColor: "rgba(0, 0, 0, 0)", // Setting to transparent
        borderWidth: 0,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
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
      <h2>LinkedIn Job Offers</h2>
      <Doughnut data={data} options={options} />
    </div>
  );
}

export default CLinkedinOffers;
