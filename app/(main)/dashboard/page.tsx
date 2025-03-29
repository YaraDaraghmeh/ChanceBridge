"use client";
import ImageSlider from '@/components/ImageSlider';
import TitleOfSection from '@/components/TitleOfSection';
import UserCollections from '@/components/UserCollections';
import { BadgeCheck, Book, BookMarked, BookOpenText, ClipboardList, ScrollText, Users } from 'lucide-react';
import React from 'react'
import ReactStars from 'react-stars';
const listsOfAssignments:string[]=['nameAssignment','supervisor','startData','endData','status']
const userCollections = [{
  icon:<Users/>,
  name:'supervisors',
  href:'',
  numpers:6
},{
  icon:<ScrollText/>,
  name:'activties',
  href:'',
  numpers:9
},
{
  icon:<BookMarked/>,
  name:'ceritifactions',
  href:'',
  numpers:5 
}]
const userCertifications=[{
  role:'NextJs Boodcap',
  supervisor:'hadeel alwadia',
  graduationDate:'2/3/2024',
  rate:4

},{
  role:'NextJs Boodcap',
  supervisor:'hadeel alwadia',
  graduationDate:'2/3/2024',
  rate:4
},{
  role:'NextJs Boodcap',
  supervisor:'hadeel alwadia',
  graduationDate:'2/3/2024',
  rate:4
},{
  role:'NextJs Boodcap',
  supervisor:'hadeel alwadia',
  graduationDate:'2/3/2024',
  rate:4
}]
const listsOfTable=['role','supervisor','graduation','rate']
const userActivites=[{
  name:'creating landing page with Nextjs',
  startData:'2-3-2013',
  endData:'4-5-2010',
  status:'panding'
},{
  name:'creating landing page with Nextjs',
  startData:'2-3-2013',
  endData:'4-5-2010',
  status:'completed'
},
{
  name:'creating landing page with Nextjs',
  startData:'2-3-2013',
  endData:'4-5-2010',
  status:'inProgress'
}]
const userJops=[{},{},{}]
const assignmentsUser=[{
  name:'create auth form with mongodb',
  supervisor:'hadeelalwadia',
  startDate:'22-4-2019',
  endDate:'23-4-2020',
  status:'panding'
},{
  name:'create auth form with mongodb',
  supervisor:'hadeelalwadia',
  startDate:'22-4-2019',
  endDate:'23-4-2020',
  status:'panding'
},{
  name:'create auth form with mongodb',
  supervisor:'hadeelalwadia',
  startDate:'22-4-2019',
  endDate:'23-4-2020',
  status:'panding'
}]


const page = () => {
  return (
    <main className="w-full md:w-[calc(100%-256px)] bg-gray-50 dark:bg-gray-800 min-h-screen transition-all main">

      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {
            userCollections.map(col =>
              <UserCollections {...col} />
            )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="p-6 relative flex flex-col min-w-0 mb-4 lg:mb-0 break-words bg-gray-50 dark:bg-gray-800 w-full shadow-lg rounded">
                <div className="relative w-full max-w-full flex-grow flex-1">
                <TitleOfSection title='certifications' icon={<BookMarked/>}/>
              <div className="block w-full overflow-x-auto">
                <table className="items-center w-full bg-transparent border-collapse">
                  <thead>
                    <tr>
                      {listsOfTable.map(list=>
                            <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            {list}
                          </th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                 {userCertifications.map(certifiction=> 
                       <tr className="text-gray-700 dark:text-gray-100">
                      <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                         {certifiction.role}
                      </th>
                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {certifiction.supervisor}
                      </td>
                  
                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {certifiction.graduationDate}
                      </td>
                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <ReactStars
                      
        count={5} // Number of stars
        value={certifiction.rate} // Current rating
        size={24} // Size of the stars
        color2={'#ffd700'} // Color of filled stars
      />                      </td>
                    </tr>
                  )}

            
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
           <TitleOfSection title={'activites'} icon={<ScrollText/>}/>
            <div className="overflow-hidden">
              <table className="w-full min-w-[540px]">
                <tbody>
                  {userActivites.map(activity=>
                        <tr>
                        <td className="py-2 px-4 border-b border-b-gray-50">
                          <div className="flex items-center">
                            <a
                              href="#"
                              className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                            >

                              {activity.name}
                            </a>
                          </div>
                        </td>
                        <td className="py-2 px-4 border-b border-b-gray-50">
                          <span className="text-[13px] font-medium text-gray-400">
                            {activity.startData}
                          </span>
                        </td>
                        <td className="py-2 px-4 border-b border-b-gray-50">
                          <span className="text-[13px] font-medium text-gray-400">
                            {activity.endData}
                          </span>
                        </td>
                        <td className="py-2 px-4 border-b border-b-gray-50">
                          <BadgeCheck size={20} color={`${activity.status==='completed'?'green':activity.status==='panding'?'yellow':'red'}`}/>
                        </td>
</tr>
                  )}
              

            
                </tbody>
              </table>
            </div>
          </div>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md lg:col-span-2">
            <TitleOfSection title={'courses'} icon={<BookOpenText
            />}/>

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
          <ImageSlider/>

          </div>

          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
          <TitleOfSection title={'assignments'} icon={<ClipboardList/>}/>
            <div className="overflow-x-auto ">
              <table className="w-full min-w-[460px]">
                <thead>
                  <tr>
                    {listsOfAssignments.map(title=>
                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">
                      {title}
                    </th>)}
                  </tr>
                </thead>
                <tbody>
                    {assignmentsUser.map(assignment=>

                    <tr className='text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate '>
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
                                {assignment.name}
                               </a>
                             </div>
                           </td>
                           <td className='text-center' >
                            {assignment.supervisor}
                           </td>
                           <td className='text-center'>
                            {assignment.startDate}
                           </td>
                           <td className='text-center'>
                            {assignment.endDate}
                           </td>
                           <td >
                           <BadgeCheck className=' px-reight'  size={20} color={`${assignment.status==='completed'?'green':assignment.status==='panding'?'yellow':'red'}`}/>
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