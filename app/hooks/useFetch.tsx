import React, { useEffect, useState } from 'react'

const useFetch = (partOfUrl:string) => {
    const [responseObject,setResponseObject]= useState({data:[],loading:false,error:''})


    useEffect(() => {
        setResponseObject({...responseObject,loading:true})
        fetch(`/api/${partOfUrl}`) // API call to get supervisors
          .then((res) => res.json())
          .then((data) => {
            setResponseObject({...responseObject,data:data.results,loading:false})})
          .catch((err) => setResponseObject({...responseObject,error:'happen some problem'}));
      }, []);
    
  return responseObject  
}

export default useFetch