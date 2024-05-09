// CLinkedinOffers.tsx
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import { ChartOptions } from "chart.js";
import { IData } from "../models/data"; // Adjust this path based on your project structure

interface CLinkedinOffersProps {
  userData: IData[];
}

function CLinkedinOffers({ userData }: CLinkedinOffersProps) {
  const [offerData, setOfferData] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    // Process the passed userData to count LinkedIn offers
    const counts = userData.reduce<{ [key: string]: number }>((acc, item) => {
      const offerType = item.linkedinOffers; // Ensure 'linkedinOffers' matches the field in IData
      if (offerType) {
        acc[offerType] = (acc[offerType] || 0) + 1;
      }
      return acc;
    }, {});

    setOfferData(counts);
  }, [userData]); // Include userData in dependency array to recalculate when userData changes

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
        borderColor: "rgba(0, 0, 0, 0)", // Transparent border
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
      {/* <h2>LinkedIn Job Offers</h2> */}
      <Doughnut data={data} options={options} />
    </div>
  );
}

export default CLinkedinOffers;
