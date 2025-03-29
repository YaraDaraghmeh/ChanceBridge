



"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Menu from '@/components/Menu';

const Layout =({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)=> {
  const router = useRouter();
  const { state } = useAuth();

  useEffect(() => {
    /*  if (!state.user) {
        router.push('/user/signin');
      }*/
  }, [router]); 

  return (
  <div className='flex '>
   <div className=" left-0 top-0 w-64 h-full-vh bg-[#f8f4f3] p-4 z-50 sidebar-menu transition-transform sticky  ">
   <a href="#" className="flex items-center pb-4 border-b border-b-gray-800">
      <h2 className="font-bold text-2xl">
        {state.user?.username}{" "}
        <span className="bg-[#f84525] text-white px-2 rounded-md">IPSUM</span>
      </h2>
    </a>
    
   <Menu/>
  </div>
  {/* end sidenav */}
{children}
</div>

 
  );
};

export default Layout;