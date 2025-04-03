import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

// Dummy data (Replace this with data from your database)
const supervisors = [{
  profileImage: 'images/people/profile-picture-1.jpeg',
  id: 0,
  name: "",
  email: "",
  phone: ""
},{
  id: 0,
  name: "",
  email: "",
  phone: "",
  profileImage: "images/people/profile-picture-2.jpeg"
},
{
id: 0,
name: "",
email: "",
phone: "",
profileImage: "images/people/profile-picture-3.jpeg"
},
{
id: 0,
name: "",
email: "",
phone: "",
profileImage: "images/people/profile-picture-4.jpeg"
},
{
  id: 0,
  name: "",
  email: "",
  phone: "",
  profileImage: "images/people/profile-picture-5.jpeg"
  },
  {
    id: 0,
    name: "",
    email: "",
    phone: "",
    profileImage: "images/people/profile-picture-6.jpeg"
    }];


export const GET =  (request: NextRequest) => {
       
    return NextResponse.json(
      { results: supervisors },
      { status: 200 }
    );
  }
