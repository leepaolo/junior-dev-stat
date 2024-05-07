import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import { ChartOptions } from "chart.js/auto";

import { IData } from "../models/data";
import { keyMap } from "../models/KeyMap";
import { fetchUserData } from "../api/ApiService";

function CLocations() {
  const data = {
    labels: ["Nord Italia", "Centro Italia", "Sud Italia"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)", // pastel red
          "rgba(54, 162, 235, 0.6)", // pastel blue
          "rgba(255, 206, 86, 0.6)", // pastel yellow
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
        position: "top" as const, // Ensuring the value is treated as a literal type
      },
    },
  };

  return (
    <div>
      <h2>Location Distribution</h2>
      <Pie data={data} options={options} />
    </div>
  );
}

export default CLocations;
