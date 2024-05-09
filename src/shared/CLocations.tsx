// CLocations.tsx
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import { ChartOptions } from "chart.js";
import { IData } from "../models/data";

interface CLocationsProps {
  userData: IData[]; // Assuming 'userData' is an array of 'IData'
}

function CLocations({ userData }: CLocationsProps) {
  const [locationData, setLocationData] = useState<{ [key: string]: number }>(
    {}
  );

  useEffect(() => {
    // Process the passed userData to count locations
    const counts = userData.reduce<{ [key: string]: number }>((acc, item) => {
      if (item.location) {
        const location: string = item.location;
        acc[location] = (acc[location] || 0) + 1;
      }
      return acc;
    }, {});

    setLocationData(counts);
  }, [userData]); // Dependency on userData ensures this effect runs when userData changes

  const data = {
    labels: Object.keys(locationData),
    datasets: [
      {
        label: "Location Count",
        data: Object.values(locationData),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"pie"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  return (
    <div>
      {/* <h2>Location Distribution</h2> */}
      <Pie data={data} options={options} />
    </div>
  );
}

export default CLocations;
