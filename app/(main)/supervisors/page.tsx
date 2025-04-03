"use client"
import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import GlobalLoadingPage from "@/app/loading";
import { Isupervisor } from "@/types";
import SupervisorCard from "@/components/SupervisorCard.tsx";



const SupervisorPage = () => {
  const [supervisors, setSupervisors] =  useState<Isupervisor[]>([]);
   console.log(supervisors)
  useEffect(() => {
    fetch("/api/trainee/supervisors") // API call to get supervisors
      .then((res) => res.json())
      .then((data) => {console.log(data)
        setSupervisors(data.results);})
      .catch((err) => console.error("Error fetching supervisors:", err));
  }, []);

     
  return (
    <div className="min-h-screen bg-gray-100 p-6 w-full">
      <h2 className="text-xl font-bold text-center text-gray-800 mb-6  ">
        My Supervisors
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {supervisors.length?  supervisors.map((supervisor) => (<SupervisorCard {...supervisor}/>

     
        )):<GlobalLoadingPage/>}
      
      </div>
   
    </div>
  );
};

export default SupervisorPage;
