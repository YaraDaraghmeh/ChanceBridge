import { IAssignments, ISupervisor } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

// Dummy data (Replace this with data from your database)
const assignments :IAssignments[]= [
  {
    title: "",
    date: "",
    description: "",
    status: "panding"
  },
  {
    title: "",
    date: "",
    description: "",
    status: "panding"
  },{
    title: "",
    date: "",
    description: "",
    status: "panding"
  }
]


export const GET =  (request: NextRequest) => {
    return NextResponse.json(
      { results: assignments },
      { status: 200 }
    );
  }

  

