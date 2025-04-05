"use client"

import useFetch from '@/app/hooks/useFetch'
import GlobalLoadingPage from '@/app/loading'
import Table from '@/components/Table'
import { ICours } from '@/types'
import { BadgeCheck } from 'lucide-react'
import React from 'react'
import ReactStars from 'react-stars'

const courses = () => {
  const {data,error,loading}=useFetch('trainee/courses')
console.log(data)
  return (
<>
{loading?
<GlobalLoadingPage/>:
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-8xl  felx items-center justify-center m-14 mx-32 ">

          <Table actionsTable={{
            view:()=>{},
            edit:()=>{},
            delete:()=>{}
          }}
           isDisplayCheckbox={true} columns={['name','supervisorName','phone','rate','status']} bodydatatable={data.map((item:ICours)=>({...item,
            rate:<ReactStars/>,
            status: <BadgeCheck size={20} color={`${item.status === 'completed' ? 'green' : item.status === 'panding' ? 'yellow' : 'red'}`} />
          }))}
          />
          </div>
}
</>

    

      
     


  )
}

export default courses