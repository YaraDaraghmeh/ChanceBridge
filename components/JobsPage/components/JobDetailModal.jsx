import { useRef, useEffect } from 'react';
import styles from '../styles/JobsPage.module.css';

const JobDetailModal = ({ job, isOpen, onClose, theme }) => {
  const modalRef = useRef(null);
  
  useEffect(() => {
    // Handle escape key press
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    // Handle click outside modal
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.removeEventListener('mousedown', handleClickOutside);
      // Restore body scroll when modal is closed
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  // Theme classes
  const backdropClass = theme === 'dark' 
    ? 'bg-black/70' 
    : 'bg-black/50';
  
  const modalClass = theme === 'dark' 
    ? 'bg-gray-800 text-gray-200' 
    : 'bg-white text-gray-800';
  
  const sectionClass = theme === 'dark' 
    ? 'bg-gray-900/50' 
    : 'bg-gray-50';
  
  return (
    <div className={`${styles.modalBackdrop} fixed inset-0 z-50 flex items-center justify-center ${backdropClass}`}>
      <div 
        ref={modalRef}
        className={`${styles.modalContent} ${modalClass} w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl`}
      >
        {/* Header */}
        <div className="relative p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-lg overflow-hidden border dark:border-gray-700 mr-4">
                <img src={job.logo} alt={`${job.company} logo`} className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{job.title}</h2>
                <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{job.company}</p>
                <div className="flex items-center mt-2 space-x-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    theme === 'dark' 
                      ? 'bg-indigo-900/50 text-indigo-400' 
                      : 'bg-indigo-100 text-indigo-800'
                  }`}>
                    {job.type}
                  </span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    theme === 'dark' 
                      ? 'bg-green-900/50 text-green-400' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {job.experience}
                  </span>
                </div>
              </div>
            </div>
            <button 
              onClick={onClose} 
              className={`p-2 rounded-full ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              aria-label="Close"
            >
              <ion-icon name="close-outline" class="text-2xl"></ion-icon>
            </button>
          </div>
        </div>
        
        {/* Job Details */}
        <div className="p-6">
          {/* Overview */}
          <div className={`${sectionClass} p-4 rounded-lg mb-6`}>
            <h3 className="text-lg font-semibold mb-3">Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <ion-icon name="location-outline" class={`text-xl mr-2 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`}></ion-icon>
                <div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Location</p>
                  <p>{job.location}</p>
                </div>
              </div>
              <div className="flex items-center">
                <ion-icon name="cash-outline" class={`text-xl mr-2 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}></ion-icon>
                <div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Salary</p>
                  <p>{job.salary}</p>
                </div>
              </div>
              <div className="flex items-center">
                <ion-icon name="time-outline" class={`text-xl mr-2 ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`}></ion-icon>
                <div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Apply By</p>
                  <p>{new Date(job.deadline).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
              </div>
              <div className="flex items-center">
                <ion-icon name="calendar-outline" class={`text-xl mr-2 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}></ion-icon>
                <div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Start Date</p>
                  <p>{job.startDate || 'Immediate'}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Description</h3>
            <p className="mb-4">{job.description}</p>
            <p className="whitespace-pre-line">{job.extendedDescription}</p>
          </div>
          
          {/* Requirements */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Requirements</h3>
            <ul className="list-disc pl-5 space-y-2">
              {job.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>
          
          {/* Responsibilities */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Responsibilities</h3>
            <ul className="list-disc pl-5 space-y-2">
              {job.responsibilities.map((resp, index) => (
                <li key={index}>{resp}</li>
              ))}
            </ul>
          </div>
          
          {/* Benefits */}
          {job.benefits && job.benefits.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Benefits</h3>
              <ul className="list-disc pl-5 space-y-2">
                {job.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        {/* Apply Button */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-sm">
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>Posted: </span>
                {new Date(job.postedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <p className="text-sm">
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>Applications: </span>
                {job.applications}+ candidates
              </p>
            </div>
            
            <div className={styles.applyButtonWrapper}>
              <button className={`${styles.applyButton} px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-all duration-300 flex items-center`}>
                Apply Now
                <ion-icon name="arrow-forward-outline" class="ml-2"></ion-icon>
              </button>
              <button className={`${styles.saveButton} ml-3 px-4 py-3 ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} rounded-lg transition-colors duration-300`} title="Save Job">
                <ion-icon name="bookmark-outline"></ion-icon>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailModal;