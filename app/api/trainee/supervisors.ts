import { NextApiRequest, NextApiResponse } from "next";

// Dummy data (Replace this with data from your database)
const supervisors = [{
  profileImage: 'images/people/profile-picture-3.jpeg',
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
}];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.status(200).json(supervisors);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
