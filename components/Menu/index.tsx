import { useAuth } from '@/context/AuthContext';
import { Bell, BookMarked, BookOpenText, CalendarDays, ClipboardList, Home, LogOut, MessageSquare, ScrollText, Users } from 'lucide-react'
import Link from 'next/link';
import React from 'react'
const userListMenu=[ {
  
  icon:<Home />,
  name:'dashboard',
  href:'/dashboard/dash'


},
  {
  
    icon:<BookOpenText />,
    name:'courses',
    href:'/courses'

  
},
{
  icon:<Users/>,
  name:'supervisors',
  href:'/supervisors'
},{
  icon:<ScrollText/>,
  name:'activties',
  href:'/activites'
},
{
  icon:<BookMarked/>,
  name:'ceritifactions',
  href:'/ceritifactions'
},
{

  icon:<CalendarDays/>,
  name:'timeTable',
  href:'/timeTable'
},
{
  icon:<ClipboardList/>,
  name:'assignments',
  href:'/assignments'
},
]
const personalListMenu=[{
  icon:<Bell/>,
  name:'notifications ',
  href:''
},{
  icon:<MessageSquare/>,
  name:'messages ',
  href:''
},{
  icon:<LogOut/>,
  name:'logout',
  href:''
}]
const Menu = () => {
  const { state } = useAuth();

  return (
    <nav>
    <ul className="mt-4 icon-container ">
      <span className="text-gray-400  font-bold">
        {state.user?.role}
      </span>
      {
      userListMenu.map(
     itemOfMenu=> <li className="mb-1 group" key={itemOfMenu.name}>
     <Link
       href={itemOfMenu.href}
       className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
     >
       {itemOfMenu.icon}
       <span className="text-sm">{itemOfMenu.name}</span>
     </Link>
   </li>
      )}
      {state.user?.role==='supervisor'&&<li className="mb-1 group">
     <Link
       href={'/trainees'}
       className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
     >
       {<Users/>}
       <span className="text-sm">trainees</span>
     </Link>
   </li>}
   

   
     
      <span className="text-gray-400 font-bold">PERSONAL</span>

      {personalListMenu.map(
     itemOfMenu=> <li className="mb-1 group">
     <a
       href={itemOfMenu.href}
       className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
     >
       {itemOfMenu.icon}
       <span className="text-sm">{itemOfMenu.name}</span>
     </a>
   </li>
      )}
   
    </ul>
    </nav>  )
}

export default Menu