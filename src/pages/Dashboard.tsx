import { useEffect, useState } from "react";
import { IData } from "../models/data";
import { keyMap } from "../models/KeyMap";
import { fetchUserData } from "../api/ApiService";
import CLocations from "../shared/CLocations";

// NORMALIZE data Function!
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeData(originalDataArray: any[]): IData[] {
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
    const fetchData = async () => {
      try {
        const rawData = await fetchUserData();
        const normalizedData = normalizeData(rawData);
        setUserData(normalizedData);
      } catch (error) {
        console.error("Failed to load user data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-slate-300">Dashboard</h1>
      <section className="bg-white">
        <div className="container px-6 py-10 mx-auto ">
          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 sm:grid-cols-2 xl:grid-cols-3 lg:grid-cols-3">
            <div className="w-full">
              <div className="w-full  bg-gray-300 rounded-lg">
                <CLocations />
              </div>
            </div>

            <div className="w-full">
              <div className="w-full h-64 bg-gray-300 rounded-lg">location</div>
            </div>

            <div className="w-full">
              <div className="w-full h-64 bg-gray-300 rounded-lg">
                englishProficiency
              </div>
            </div>
          </div>
        </div>
      </section>
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
