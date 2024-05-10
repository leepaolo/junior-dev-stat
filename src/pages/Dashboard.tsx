// Dashboard.jsx
import { useEffect, useState } from "react";
import { fetchUserData } from "../api/ApiService";
import { normalizeData } from "../services/Normalize";
import CLocations from "../shared/CLocations";
import CEnglishProficiency from "../shared/CEnglishProficiency";
import CEducationLevel from "../shared/CEducationLevel";
import CAttendedCourse from "../shared/CAttendedCourse";
import CRecommendCourse from "../shared/CRecommendCourse";
import CGotJob from "../shared/CGotJob";
import CLinkedinOffers from "../shared/CLinkedinOffers";
import CLinkedinOptimized from "../shared/CLinkedinOptimized";
import CDeveloperType from "../shared/CDeveloperType";
import CExpectedSalary from "../shared/CExpectedSalary";
import CDesiredContract from "../shared/CDesiredContract";
import CKnownLanguages from "../shared/CKnownLanguages";
import CLanguagesToLearn from "../shared/CLanguagesToLearn";
import { IData } from "../models/data";

function Dashboard() {
  const [userData, setUserData] = useState<IData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawData = await fetchUserData();
        const normalizedData = normalizeData(rawData);
        setUserData(normalizedData); // Now TypeScript knows normalizedData is IData[]
      } catch (error) {
        console.error("Failed to load user data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <section className="bg-white">
        <div className="container px-6 py-10 mx-auto">
          {" "}
          <h1 className=" text-4xl font-semibold text-slate-800">
            Cosa hanno in comune i JUNIORS Italiani?
          </h1>
          <p className="text-2xl  text-slate-600 mb-4">
            Attravero questa dahsboard puoi farti un'idea sul profilo "Tipo" dei
            Juniors Italiani. Le statistiche sono aggiornate ogni volta che un
            nuovo sondaggio viene inviato. Al sondaggio hanno partecipato{" "}
            <span className="font-medium  text-slate-800">
              {userData.length}{" "}
            </span>
            Juniors!
          </p>
          <p className="text-2xl  text-slate-600">
            Se non l'hai ancora fatto,{" "}
            <a
              className="text-blue-800 underline"
              href="https://bit.ly/JUNIOR-Dev"
            >
              PARTECITA AL SONDAGGIO!
            </a>{" "}
          </p>
        </div>
      </section>
      {userData.length > 0 ? (
        <>
          <section className="bg-white">
            <div className="container px-6 py-10 mx-auto">
              <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3">
                <div className=" flex flex-col items-center w-full  rounded-lg p-4">
                  <CLocations userData={userData} />
                  <p className="text-xl mt-4">Dove vivi?</p>
                </div>

                <div className=" flex flex-col items-center w-full  rounded-lg p-4">
                  <CEnglishProficiency userData={userData} />
                  <p className="text-xl mt-4">Inglese scritto e parlato</p>
                </div>

                <div className=" flex flex-col items-center w-full  rounded-lg p-4">
                  <CEducationLevel userData={userData} />
                  <p className="text-xl mt-4">Titolo di studio?</p>
                </div>
                <div className=" flex flex-col items-center w-full  rounded-lg p-4">
                  <CAttendedCourse userData={userData} />
                  <p className="text-xl mt-4">Il tuo percorso da developer?</p>
                </div>
                <div className=" flex flex-col items-center w-full  rounded-lg p-4">
                  <CRecommendCourse userData={userData} />
                  <p className="text-xl mt-4">Consigli il tuo percorso</p>
                </div>
                <div className=" flex flex-col items-center w-full  rounded-lg p-4">
                  <CGotJob userData={userData} />
                  <p className="text-xl mt-4">Hai trovato lavoro</p>
                </div>
                <div className=" flex flex-col items-center w-full  rounded-lg p-4">
                  <CLinkedinOffers userData={userData} />
                  <p className="text-xl mt-4">Proposte di lavoro su Linkedin</p>
                </div>
                <div className=" flex flex-col items-center w-full  rounded-lg p-4">
                  <CLinkedinOptimized userData={userData} />
                  <p className="text-xl mt-4">Ottimizzazione Linkedin </p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white">
            <div className="container px-6 py-10 mx-auto">
              <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 sm:grid-cols-2 xl:grid-cols-3 lg:grid-cols-3">
                <div className="w-full flex flex-col items-center">
                  <div className=" w-full rounded-lg">
                    <CDeveloperType userData={userData} />
                  </div>
                  <p className="text-xl mt-4">Categoria developer</p>
                </div>

                <div className="w-full flex flex-col items-center">
                  <div className=" w-full rounded-lg">
                    <CExpectedSalary userData={userData} />
                  </div>
                  <p className="text-xl mt-4">RAL Junior desiderata</p>
                </div>

                <div className="w-full flex flex-col items-center">
                  <div className=" w-full rounded-lg">
                    <CDesiredContract userData={userData} />
                  </div>
                  <p className="text-xl mt-4">Tipo di contratto desiderato</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white mb-4">
            <div className="container px-6 py-10 mx-auto ">
              <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 sm:grid-cols-2 xl:grid-cols-2 lg:grid-cols-3">
                <div className="w-full flex flex-col items-center">
                  <div className=" w-full rounded-lg">
                    <CKnownLanguages userData={userData} />
                  </div>
                  <p className="text-xl mt-4">Top 5 Stack più conosciuti</p>
                </div>

                <div className="w-full flex flex-col items-center">
                  <div className=" w-full rounded-lg">
                    <CLanguagesToLearn userData={userData} />
                  </div>
                  <p className="text-xl mt-4">Top 5 Stack da imparare</p>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <p>Loading...</p>
      )}

      <section className="bg-white mb-4">
        <div className="container px-6 py-10 mx-auto">
          {" "}
          <h1 className=" text-4xl font-semibold text-slate-800">
            Let's keep in touch!
          </h1>
          <p className="text-2xl  text-slate-600 mb-4">
            Se hai domande oppure hai bisogno d'aiuto, seguimi su{" "}
            <a
              className="text-blue-800 underline"
              href="https://www.linkedin.com/in/angelinipaolo/"
            >
              LINKEDIN
            </a>{" "}
          </p>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
