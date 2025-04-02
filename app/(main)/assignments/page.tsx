import React from 'react'

const page = () => {
  return (

    <div className="container mx-auto p-4">
      {/* Assignments List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="assignment-card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Assignment Title 1
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Due Date: April 10, 2025
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            This is a brief description of the assignment. It will guide the
            student on what is expected and how to approach the task.
          </p>
          <div className="mt-4 flex justify-between items-center">
            <a
              href="#"
              className="text-sm font-medium text-blue-500 hover:text-blue-700 transition-colors"
            >
              View Details
            </a>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Status: In Progress
            </span>
          </div>
        </div>
        {/* Repeat the card structure for each assignment */}
        <div className="assignment-card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Assignment Title 2
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Due Date: April 15, 2025
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            This is another brief description of a different assignment with
            details on how it should be completed.
          </p>
          <div className="mt-4 flex justify-between items-center">
            <a
              href="#"
              className="text-sm font-medium text-blue-500 hover:text-blue-700 transition-colors"
            >
              View Details
            </a>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Status: Pending
            </span>
          </div>
        </div>
        {/* Add more assignments as needed */}
      </div>
    </div>
  
  )
}

export default page
