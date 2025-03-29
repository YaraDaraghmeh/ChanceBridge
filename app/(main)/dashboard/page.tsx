"use client";
import TitleOfSection from '@/components/TitleOfSection';
import UserCollections from '@/components/UserCollections';
import React from 'react'

const userCollections = [{}, {}, {}]
const userCertifications=[{},{},{},{}]
const titlesOfTable=[{},{},{},{}]
const userActivites=[{},{}]
const userJops=[{},{},{}]
const assignmentsUser=[{},{},{}]

const page = () => {
  return (
    <main className="w-full md:w-[calc(100%-256px)]  bg-gray-200 min-h-screen transition-all main">

      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {
            userCollections.map(col =>
              <UserCollections />
            )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="p-6 relative flex flex-col min-w-0 mb-4 lg:mb-0 break-words bg-gray-50 dark:bg-gray-800 w-full shadow-lg rounded">
                <div className="relative w-full max-w-full flex-grow flex-1">
                <TitleOfSection/>
              <div className="block w-full overflow-x-auto">
                <table className="items-center w-full bg-transparent border-collapse">
                  <thead>
                    <tr>
                      {titlesOfTable.map(title=>
                            <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Role
                          </th>
                      )}
                  
            
                    </tr>
                  </thead>
                  <tbody>
                 {userCertifications.map(cert=> 
                       <tr className="text-gray-700 dark:text-gray-100">
                      <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                        Administrator
                      </th>
                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        1
                      </td>
                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <div className="flex items-center">
                          <span className="mr-2">70%</span>
                          <div className="relative w-full">
                            <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
                              <div
                                style={{ width: "70%" }}
                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                              />
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>)}

            
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
           <TitleOfSection/>
            <div className="overflow-hidden">
              <table className="w-full min-w-[540px]">
                <tbody>
                  {userActivites.map(act=>
                        <tr>
                        <td className="py-2 px-4 border-b border-b-gray-50">
                          <div className="flex items-center">
                            <a
                              href="#"
                              className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                            >
                              Lorem Ipsum
                            </a>
                          </div>
                        </td>
                        <td className="py-2 px-4 border-b border-b-gray-50">
                          <span className="text-[13px] font-medium text-gray-400">
                            02-02-2024
                          </span>
                        </td>
                        <td className="py-2 px-4 border-b border-b-gray-50">
                          <span className="text-[13px] font-medium text-gray-400">
                            17.45
                          </span>
                        </td>
                        <td className="py-2 px-4 border-b border-b-gray-50">
                          <div className="dropdown">
                            <button
                              type="button"
                              className="dropdown-toggle text-gray-400 hover:text-gray-600 text-sm w-6 h-6 rounded flex items-center justify-center bg-gray-50"
                            >
                              <i className="ri-more-2-fill" />
                            </button>
                            <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                              <li>
                                <a
                                  href="#"
                                  className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                                >
                                  Profile
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                                >
                                  Settings
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                                >
                                  Logout
                                </a>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                  )}
              

            
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md lg:col-span-2">
            <TitleOfSection/>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
               {userJops.map(jop=>
                    <div className="rounded-md border border-dashed border-gray-200 p-4">
                    <div className="flex items-center mb-0.5">
                      <div className="text-xl font-semibold">10</div>
                      <span className="p-1 rounded text-[12px] font-semibold bg-blue-500/10 text-blue-500 leading-none ml-1">
                        $80
                      </span>
                    </div>
                    <span className="text-gray-400 text-sm">Active</span>
                  </div>
               )}
            </div>
            <div>
              <canvas id="order-chart" />
            </div>
          </div>
          <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
        <TitleOfSection/>
            <div className="overflow-x-auto ">
              <table className="w-full min-w-[460px]">
                <thead>
                  <tr>
                    {titlesOfTable.map(title=>
                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">
                      Earning
                    </th>)}
                  </tr>
                </thead>
                <tbody>
                    {assignmentsUser.map(ass=>
                    <tr>
                             <td className="py-2 px-4 border-b border-b-gray-50">
                             <div className="flex items-center">
                               <img
                                 src="https://placehold.co/32x32"
                                 alt=""
                                 className="w-8 h-8 rounded object-cover block"
                               />
                               <a
                                 href="#"
                                 className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                               >
                                 Create landing page
                               </a>
                             </div>
                           </td>
                           </tr>
                    )}
             
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* End Content */}
    </main>
  )
}

export default page






/*
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const Dashboard = () => {
  const router = useRouter();
  const { state } = useAuth();
 


  return (
    <>
 {!state.user ? (
        <p>Loading...</p> 
      ) : (
       <>
        <div>
          <h1>Dashboard</h1>
          <p>Welcome to the dashboard!</p>
          <div>
            <p><strong>Name:</strong> {state.user.username}</p>
            <p><strong>Email:</strong> {state.user.email}</p>
            <p><strong>Role:</strong> {state.user.role}</p>
            {state.user.googlePhotoUrl && (
                <div>
                    <img 
                        src={state.user.googlePhotoUrl} 
                        alt="User Photo" 
                        style={{ width: '50px', borderRadius: '50%' }} 
                    />
                </div>
            )}
        </div>
        </div>
        </>
      )}
    </> )}

    export default Dashboard;*/