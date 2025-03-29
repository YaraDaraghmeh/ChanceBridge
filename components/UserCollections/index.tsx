import React from 'react'
const UserCollections = () => {
  return (
    <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
    <div className="flex justify-between mb-6">
      <div>
        <div className="flex items-center mb-1">
          <div className="text-2xl font-semibold">2</div>
        </div>
        <div className="text-sm font-medium text-gray-400">Users</div>
      </div>
      <i className="ri-more-fill" />
   
    </div>

    <a
      href="/gebruikers"
      className="text-[#f84525] font-medium text-sm hover:text-red-800"
    >
      View
    </a>
  </div>  )
}

export default UserCollections