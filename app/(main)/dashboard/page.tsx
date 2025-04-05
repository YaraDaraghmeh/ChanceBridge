"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import DashProfile from '@/components/DashProfile';

const Dashboard = () => {
  const router = useRouter();
  const { state } = useAuth();

  useEffect(() => {
      if (!state.user) {
        router.push('/user/signin');
      }
  }, [router]); 

  return (
    <>
      {/* {!state.user ? (
        <p>Loading...</p> 
      ) : (
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
      )} */}
      <DashProfile />
    </>
  );
};

export default Dashboard;
