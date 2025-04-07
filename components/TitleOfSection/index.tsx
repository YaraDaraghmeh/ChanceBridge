import React, { ReactElement } from 'react'
interface Ititle{
  title:string,
  icon:ReactElement
}
const TitleOfSection = ({title,icon}:Ititle) => {
  return (
    <div className="flex justify-between mb-4 items-start">
    <div className="font-medium">{title}
    </div>
    
    {icon}
  </div>
  )
}

export default TitleOfSection
