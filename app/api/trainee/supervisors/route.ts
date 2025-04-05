import { ISupervisor } from "@/types";
import { NextRequest, NextResponse } from "next/server";

// Dummy data (Replace this with data from your database)
const supervisors :ISupervisor[]= [{
  profileImage: 'images/people/profile-picture-1.jpeg',
  id: 0,
  name: "",
  email: "",
  phone: "",
  rate: 5
},{
  id: 0,
  name: "",
  email: "",
  phone: "",
  profileImage: "images/people/profile-picture-2.jpeg",
  rate: 4
},
{
  id: 0,
  name: "",
  email: "",
  phone: "",
  profileImage: "images/people/profile-picture-3.jpeg",
  rate: 5
},
{
  id: 0,
  name: "",
  email: "",
  phone: "",
  profileImage: "images/people/profile-picture-4.jpeg",
  rate: 4
},
{
  id: 0,
  name: "",
  email: "",
  phone: "",
  profileImage: "images/people/profile-picture-5.jpeg",
  rate: 7
},
  {
    id: 0,
    name: "",
    email: "",
    phone: "",
    profileImage: "images/people/profile-picture-6.jpeg",
    rate: 2
  }];



export const GET =  (request: NextRequest) => {
    return NextResponse.json(
      { results: supervisors },
      { status: 200 }
    );
  }

  

