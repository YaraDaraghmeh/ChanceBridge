import { useAuth } from '@/context/AuthContext';
import {
  Bell, BookMarked, BookOpenText, CalendarDays, ClipboardList,
  Home, LogOut, MessageSquare, ScrollText, Users
} from 'lucide-react';
import Link from 'next/link';
import React, { ReactElement } from 'react';

interface List{
  icon:ReactElement,
  name:string,
  href:string
}
const menuByRole :Record<string,List[]> = {
  trainee: [
    { icon: <Home />, name: 'Dashboard', href: '/dashboard/dash' },
    { icon: <BookOpenText />, name: 'Courses', href: '/courses' },
    { icon: <Users />, name: 'Supervisors', href: '/supervisors' },
    { icon: <CalendarDays />, name: 'Timetable', href: '/timeTable' },
    { icon: <ClipboardList />, name: 'Assignments', href: '/assignments' },
    { icon: <BookMarked />, name: 'Certificates', href: '/ceritifactions' },
  ],
  supervisor: [
    { icon: <Home />, name: 'Dashboard', href: '/dashboard/dash' },
    { icon: <Users />, name: 'Trainees', href: '/trainees' },
    { icon: <BookOpenText />, name: 'Courses', href: '/courses' },
    { icon: <ScrollText />, name: 'Activities', href: '/activites' },
    { icon: <BookMarked />, name: 'Certificates', href: '/ceritifactions' },
  ],
  admin: [
    { icon: <Home />, name: 'Dashboard', href: '/dashboard/dash' },
    { icon: <Users />, name: 'All Users', href: '/users' },
    { icon: <BookOpenText />, name: 'Courses', href: '/courses' },
    { icon: <ScrollText />, name: 'Reports', href: '/reports' },
  ],
  company: [
    { icon: <Home />, name: 'Dashboard', href: '/dashboard/dash' },
    { icon: <Users />, name: 'Supervisors', href: '/supervisors' },
    { icon: <BookOpenText />, name: 'Courses', href: '/courses' },
  ],
};

const personalList = [
  { icon: <Bell />, name: 'Notifications', href: '#' },
  { icon: <MessageSquare />, name: 'Messages', href: '#' },
  { icon: <LogOut />, name: 'Logout', href: '#' },
];

const linkClasses = "flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100";

const Menu = () => {
  const { state } = useAuth();
  const role = state.user?.role?.toLowerCase();

  const roleBasedMenu = menuByRole[role as string ] || [];

  return (
    <nav>
      <ul className="mt-4 icon-container">
        <span className="text-gray-400 font-bold capitalize">{role}</span>

        {roleBasedMenu.map((menuItem:List) => (
          <li className="mb-1 group" key={menuItem.name}>
            <Link href={menuItem.href} className={linkClasses}>
              {menuItem.icon}
              <span className="text-sm ml-2">{menuItem.name}</span>
            </Link>
          </li>
        ))}

        <span className="text-gray-900 font-bold mt-4 block">PERSONAL</span>

        {personalList.map((menuItem) => (
          <li className="mb-1 group" key={menuItem.name}>
            <a href={menuItem.href} className={linkClasses}>
              {menuItem.icon}
              <span className="text-sm ml-2">{menuItem.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
