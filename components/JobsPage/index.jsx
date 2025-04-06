"use client";

import { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import JobBanner from './components/JobBanner';
import JobSearch from './components/JobSearch';
import JobFilter from './components/JobFilter';
import JobCard from './components/JobCard';
import JobDetailModal from './components/JobDetailModal';
import { mockJobs } from './utils/mockData';
import { filterJobs } from './utils/jobFilters';
import styles from './styles/JobsPage.module.css';

const JobsPage = () => {
  const { theme } = useTheme();
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    location: '',
    type: '',
    experience: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;

 
  useEffect(() => {
  
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        
        setTimeout(() => {
          setJobs(mockJobs);
          setFilteredJobs(mockJobs);
          setIsLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  
  useEffect(() => {
    setFilteredJobs(filterJobs(jobs, filters));
    setCurrentPage(1); 
  }, [jobs, filters]);

  
  const handleSearch = (search) => {
    setFilters(prev => ({ ...prev, search }));
  };

  
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

 
  const handleJobClick = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  
  const handleCloseModal = () => {
    setShowModal(false);
  };

 
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  
  const bgClass = theme === 'dark' ? 'bg-[rgb(16,23,42)]' : 'bg-gray-50';
  const textClass = theme === 'dark' ? 'text-gray-200' : 'text-gray-800';
  const containerClass = theme === 'dark' ? 'bg-[rgb(22,30,50)]' : 'bg-white';
  
 
  const categories = [...new Set(jobs.map(job => job.category))];
  const locations = [...new Set(jobs.map(job => job.location))];
  const jobTypes = [...new Set(jobs.map(job => job.type))];
  const experienceLevels = [...new Set(jobs.map(job => job.experience))];

  return (
    <div className={`${bgClass} min-h-screen transition-colors duration-300`}>
      
      <JobBanner />
      
      
      <div className="container mx-auto px-4 py-12">
        <div className={`${containerClass} rounded-xl p-6 shadow-lg transition-all duration-300`}>
         
          <div className="mb-8">
            <JobSearch onSearch={handleSearch} theme={theme} />
            <div className="mt-6">
              <JobFilter 
                categories={categories}
                locations={locations}
                jobTypes={jobTypes}
                experienceLevels={experienceLevels}
                filters={filters}
                onFilterChange={handleFilterChange}
                theme={theme}
              />
            </div>
          </div>
          
          {/* Job Listings */}
          <div className="mb-8">
            <h2 className={`text-2xl font-bold mb-6 ${textClass}`}>
              {isLoading 
                ? 'Loading opportunities...' 
                : filteredJobs.length === 0 
                  ? 'No opportunities found' 
                  : `Showing ${filteredJobs.length} opportunities`}
            </h2>
            
            {isLoading ? (
             
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg p-6 animate-pulse h-64`}
                  >
                    <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'} h-4 w-3/4 mb-4 rounded`}></div>
                    <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'} h-3 w-1/2 mb-3 rounded`}></div>
                    <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'} h-3 w-1/3 mb-6 rounded`}></div>
                    <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'} h-20 w-full mb-4 rounded`}></div>
                    <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'} h-8 w-full rounded`}></div>
                  </div>
                ))}
              </div>
            ) : filteredJobs.length === 0 ? (
              
              <div className={`${styles.emptyState} text-center py-12`}>
                <ion-icon name="search-outline" class={`text-6xl ${theme === 'dark' ? 'text-gray-700' : 'text-gray-300'}`}></ion-icon>
                <p className={`mt-4 text-xl ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  No jobs match your search criteria. Try adjusting your filters.
                </p>
                <button 
                  onClick={() => setFilters({ search: '', category: '', location: '', type: '', experience: '' })}
                  className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
             
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentJobs.map(job => (
                  <JobCard 
                    key={job.id} 
                    job={job} 
                    onClick={() => handleJobClick(job)} 
                    theme={theme}
                  />
                ))}
              </div>
            )}
          </div>
          
         
          {filteredJobs.length > 0 && !isLoading && (
            <div className="flex justify-center">
              <nav className="inline-flex">
                <button 
                  onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-l-lg ${currentPage === 1 
                    ? `${theme === 'dark' ? 'bg-gray-800 text-gray-600' : 'bg-gray-200 text-gray-400'}` 
                    : `${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'} hover:bg-indigo-600 hover:text-white`
                  } transition duration-300`}
                >
                  <ion-icon name="chevron-back-outline"></ion-icon>
                </button>
                
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={`px-3 py-1 ${currentPage === i + 1 
                      ? 'bg-indigo-600 text-white' 
                      : `${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'} hover:bg-indigo-600 hover:text-white`
                    } transition duration-300`}
                  >
                    {i + 1}
                  </button>
                ))}
                
                <button 
                  onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-r-lg ${currentPage === totalPages 
                    ? `${theme === 'dark' ? 'bg-gray-800 text-gray-600' : 'bg-gray-200 text-gray-400'}` 
                    : `${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'} hover:bg-indigo-600 hover:text-white`
                  } transition duration-300`}
                >
                  <ion-icon name="chevron-forward-outline"></ion-icon>
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>
      
      
      {selectedJob && (
        <JobDetailModal 
          job={selectedJob} 
          isOpen={showModal} 
          onClose={handleCloseModal} 
          theme={theme}
        />
      )}
    </div>
  );
};

export default JobsPage;