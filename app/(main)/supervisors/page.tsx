"use client";
import { useState, useEffect } from "react";
import GlobalLoadingPage from "@/app/loading";
import SupervisorCard from "@/components/SupervisorCard.tsx";
import useFetch from "@/app/hooks/useFetch";
import { ISupervisor } from "@/types";
import { useTheme } from "@/context/ThemeContext";
import PaginationControls from "@/components/CoursesPage/components/PaginationControls";

const SupervisorPage = () => {
  const { data, error, loading } = useFetch("user/supervisors");
  const { theme } = useTheme();
  const [currentPage, setCurrentPage] = useState(1);

  // Number of items to show per page
  const itemsPerPage = 3;

  // Total pages based on the length of data
  const totalPages = Math.ceil(data?.length / itemsPerPage);

  // Slice the data to show only items of the current page
  const paginatedData = data?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to the top when changing pages
    document.getElementById("courses-section")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="min-h-screen p-6 w-full">
      <h2 className="text-xl font-bold text-center mb-6">My Supervisors</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {loading ? (
          <GlobalLoadingPage />
        ) : (
          paginatedData?.map((supervisor: ISupervisor) => (
            <SupervisorCard key={supervisor.id} {...supervisor} />
          ))
        )}
      </div>

      {/* Pagination */}
      {!loading && data?.length > 0 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          theme={theme}
        />
      )}
    </div>
  );
};

export default SupervisorPage;
