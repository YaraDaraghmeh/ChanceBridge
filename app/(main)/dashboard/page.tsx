"use client";
import ApexChart from '@/components/chart';
import Table from '@/components/Table';
import TitleOfSection from '@/components/TitleOfSection';
import UserCollections from '@/components/UserCollections';
import { BadgeCheck, BookMarked, BookOpenText, ClipboardList, ScrollText, Users } from 'lucide-react';
import React, { useEffect } from 'react'
import ReactStars from 'react-stars';

const userCollections = [{
  icon: <Users />,
  name: 'supervisors',
  href: '',
  numpers: 6
}, {
  icon: <ScrollText />,
  name: 'activties',
  href: '',
  numpers: 9
},
{
  icon: <BookMarked />,
  name: 'ceritifactions',
  href: '',
  numpers: 5
}]
const userJops = [{}, {}, {}]

const numberOfAppoforDay = [0, 0, 4, 0, 6, 0, 0]


const page = () => {
//const {data} = useFetch('/trainee')
/*useEffect(()=>{
  API_PRO.get('/trainee').then((res:any)=>res.json()).then(res=>console.log(res))
},[])*/
  useEffect(()=>{
    //  API_PRO.get('/trainee').then(res=>console.log(res))
 fetch('/api/user',{method:'get',headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}` 
   }
}).then(res=>res.json()).then(res=>console.log(res))
    },[])

  
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
              <TitleOfSection title='certifications' icon={<BookMarked />} />
              <div className="block w-full overflow-x-auto">


                <Table

                  isDisplayCheckbox={false}

                  columns={['role', 'supervisor', 'graduationDate', 'rate']}
                  bodydatatable={[{
                    role: 'frontend devloperment||ReactJs',
                    supervisor: 'hadeelalwadia',
                    graduationDate: '20/3/2021',
                    rate: <ReactStars count={5} color1='yellow' />,
                  }, {
                    role: 'frontend devloperment||ReactJs',
                    supervisor: 'hadeelalwadia',
                    graduationDate: '20/3/2021',
                    rate: <ReactStars count={5} color1='yellow' />,
                  }, {
                    role: 'frontend devloperment||ReactJs',
                    supervisor: 'hadeelalwadia',
                    graduationDate: '20/3/2021',
                    rate: <ReactStars count={5} color1='yellow' />,
                  }]} />

              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
            <TitleOfSection title={'activites'} icon={<ScrollText />} />
            <div className="overflow-hidden">

              <Table

                isDisplayCheckbox={false}

                columns={['role', 'startDate', 'endDate', 'status']}
                bodydatatable={[{ status: 'completed' }, { status: 'panding' }, { status: 'confirmed' }].map(data => ({
                  ...data,
                  status: <BadgeCheck size={20} color={`${data.status === 'completed' ? 'green' : data.status === 'panding' ? 'yellow' : 'red'}`} />

                }))} />
            </div>
          </div>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md lg:col-span-2">
            <TitleOfSection title={'courses'} icon={<BookOpenText
            />} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              {userJops.map(jop =>
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
            <ApexChart data={numberOfAppoforDay} />

          </div>

          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
            <TitleOfSection title={'assignments'} icon={<ClipboardList />} />
            <div className="overflow-x-auto ">
    
              <Table

                isDisplayCheckbox={false}

                columns={['nameAssignments','supervisor', 'startDate', 'endDate', 'status']}
                bodydatatable={[{name:'create auth pages', status: 'completed' }, { status: 'panding' }, { status: 'confirmed' }].map(data => ({
                  nameAssignments:<div className='flex'><img src='https://placehold.co/32x32'/>{data.name}</div>,
                  ...data,
                  status: <BadgeCheck size={20} color={`${data.status === 'completed' ? 'green' : data.status === 'panding' ? 'yellow' : 'red'}`} />

                }))} />

            </div>
          </div>
        </div>

      </div>
      {/* End Content */}
    </main>
  )
}


export default page

