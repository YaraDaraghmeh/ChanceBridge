

"use client"

import useFetch from '@/app/hooks/useFetch'
import GlobalLoadingPage from '@/app/loading'
import Table from '@/components/Table'
import React from 'react'

const ceritifactions = () => {
  const {data,error,loading}=useFetch('trainee/ceritifactions')

  return (
<>
{loading?
<GlobalLoadingPage/>:
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-6xl  felx items-center justify-center m-14 mx-32 ">

          <Table isDisplayCheckbox={true} columns={['product name','colors','status','']} bodydatatable={data}/>
          </div>
}
</>

    

      
     


  )
}

export default ceritifactions