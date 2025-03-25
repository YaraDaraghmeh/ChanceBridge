'use client';

import React, { useState, useEffect } from 'react';
import { Button, Navbar, TextInput, Avatar, Dropdown } from "flowbite-react";
import Link from "next/link";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext"; 
import { useAuth } from "@/context/AuthContext";  

interface IProps {
  href: string;
  children: React.ReactNode;
}

const NavLink = ({ href, children }: IProps) => (
  <Link href={href} className="text-gray-700 dark:text-white hover:text-blue-500">
    {children}
  </Link>
);

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { state, dispatch } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
      dispatch({ type: 'LOGOUT' });
      router.push('/user/signin');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const isLoggedIn = state.user !== null;

  return (
    <Navbar className="border-b-2 bg-white dark:bg-gray-900 shadow-md">
      <Link href="/" className="self-center text-xl font-semibold dark:text-white">
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          Training
        </span> Management
      </Link>

      <form className="hidden lg:block">
        <TextInput type="text" placeholder="Search..." rightIcon={AiOutlineSearch} />
      </form>

      <Button className="w-12 h-10 lg:hidden" color="gray" pill>
        <AiOutlineSearch />
      </Button>

      <div className="flex gap-3 items-center md:order-2">
        <Button className="w-12 h-10 hidden sm:inline" color="gray" pill onClick={toggleTheme}>
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </Button>

       { isLoggedIn ? (
          <Dropdown arrowIcon={false} inline label={<Avatar alt="user" img={state.user?.googlePhotoUrl} rounded />}>
            <Dropdown.Header>
              <span className="block text-sm font-semibold">@{state.user?.username}</span>
              <span className="block text-sm text-gray-500">{state.user?.email}</span>
            </Dropdown.Header>
            <Dropdown.Item as={Link} href="/dashboard?tab=profile">Profile</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item as={Link} href="/dashboard?tab=dash">Dashboard</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link href="/user/signin">
            <Button gradientDuoTone="purpleToBlue" outline>Sign In</Button>
          </Link>
        )}

        <Navbar.Toggle />
      </div>

      <Navbar.Collapse>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/about">About</NavLink>
        <NavLink href="/support">Support</NavLink>
      </Navbar.Collapse>
    </Navbar>
  );
}
