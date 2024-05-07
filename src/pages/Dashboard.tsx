import { useEffect, useState } from "react";
import { IData } from "../models/data";
import { keyMap } from "../models/KeyMap";

// NORMALIZE data Function!
function normalizeData(originalDataArray: never[]): IData[] {
  return originalDataArray.map((originalData) => {
    const result: Partial<IData> = {};
    Object.keys(originalData).forEach((key) => {
      const newKey = keyMap[key as keyof typeof keyMap];
      if (newKey) {
        result[newKey as keyof IData] = originalData[key];
      }
    });
    return result as IData;
  });
}

function Dashboard() {
  const [userData, setUserData] = useState<IData[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://script.googleusercontent.com/macros/echo?user_content_key=mlPoA54TWr6gO7-2W6QPF2HYWR9ZTpNOrqaFnL9RKse9EcRLSMLnUaCTKwka9kE2fYCp68DwhRAeYLwj0hxUf_q4E21j5_L9m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnH0OeD4X8d22QejNQiFKZSjS4qN13ofUJ-XzRNLocrAZtPoYXcf8rMUHzA16cle0JVuv27DCw97l2NqdDsTz-KG8mzDTCqnGIg&lib=M18bObiq9KnLXlDngnknKagBx2wiTu6LV"
      );
      const data = await response.json();
      console.log("Raw API data:", data); // Log the raw data for debugging
      const normalizedData = normalizeData(data);
      setUserData(normalizedData);
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-slate-300">Dashboard</h1>
      {userData.map((data) => (
        <div key={data.timestamp}>
          <h2>{data.timestamp}</h2>
          <p>
            {data.name} lives in {data.location} and speaks{" "}
            {data.englishProficiency}
          </p>
        </div>
      ))}
      {userData ? (
        <pre>{JSON.stringify(userData, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Dashboard;
