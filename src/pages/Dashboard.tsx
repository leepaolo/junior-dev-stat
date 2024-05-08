import { useEffect, useState } from "react";
import { IData } from "../models/data";

import { normalizeData } from "../services/Normalize";
import { fetchUserData } from "../api/ApiService";
import CLocations from "../shared/CLocations";
import CEnglishProficiency from "../shared/CenglishProficiency";
import CDeveloperType from "../shared/CDeveloperType";
import CAttendedCourse from "../shared/CAttendedCourse";
import CRecommendCourse from "../shared/CRecommendCourse";
import CGotJob from "../shared/CGotJob";
import CLinkedinOffers from "../shared/CLinkedinOffers";
import CLinkedinOptimized from "../shared/CLinkedinOptimized";

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
          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3">
            <div className="w-full">
              <div className="w-full  bg-gray-300 rounded-lg">
                <p className="text-xl">Dove vivi?</p>
                <CLocations />
              </div>
            </div>

            <div className="w-full">
              <div className="w-full  bg-gray-300 rounded-lg">
                <p className="text-xl">Parli e scrivi Inglese?</p>
                <CEnglishProficiency />
              </div>
            </div>

            <div className="w-full">
              <div className="w-full bg-gray-300 rounded-lg">
                <p className="text-xl">Sei un developer....?</p>
                <CDeveloperType />
              </div>
            </div>

            <div className="w-full">
              <div className="w-full bg-gray-300 rounded-lg">
                <p className="text-xl">Il tuo percorso da developer?</p>
                <CAttendedCourse />
              </div>
            </div>

            <div className="w-full">
              <div className="w-full bg-gray-300 rounded-lg">
                <p className="text-xl">Consigli il tuo percorso?</p>
                <CRecommendCourse />
              </div>
            </div>
            <div className="w-full">
              <div className="w-full bg-gray-300 rounded-lg">
                <p className="text-xl">Hai trovato lavoro?</p>
                <CGotJob />
              </div>
            </div>

            <div className="w-full">
              <div className="w-full bg-gray-300 rounded-lg">
                <p className="text-xl">Proposte di lavoro su Linkedin?</p>
                <CLinkedinOffers />
              </div>
            </div>

            <div className="w-full">
              <div className="w-full bg-gray-300 rounded-lg">
                <p className="text-xl">Il tuo Linkedin è ottimizzato bene?</p>
                <CLinkedinOptimized />
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
