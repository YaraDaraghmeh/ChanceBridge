import trainee from "@/models/trainee";
import { ICours } from "@/types";
import { NextRequest, NextResponse } from "next/server";

// Dummy data (Replace this with data from your database)
const courses :ICours[]= [
  {
    id: '1',
    name:'NextJS development',
    supervisorName: "Dr. Sarah Al-Sharif",
    phone: "056-123-4567",
    rate: 5,
    startDate: "2025-04-01",
    endDate: "2025-06-30",
    status: 'panding'
  },  {
    id: '1',
    supervisorName: "Dr. Sarah Al-Sharif",
    phone: "056-123-4567",
    rate: 5,
    startDate: "2025-04-01",
    endDate: "2025-06-30",
    status: 'panding',
    name:'NextJS development',
  },  {
    id: '1',
    supervisorName: "Dr. Sarah Al-Sharif",
    phone: "056-123-4567",
    rate: 5,
    startDate: "2025-04-01",
    endDate: "2025-06-30",
    status: 'panding',
    name:'NextJS development',
  },  {
    id: '1',
    supervisorName: "Dr. Sarah Al-Sharif",
    phone: "056-123-4567",
    rate: 5,
    startDate: "2025-04-01",
    endDate: "2025-06-30",
    status: 'completed',
    name:'NextJS development',
  }];

 

  export const GET = async (request: NextRequest) => {
    try {
      await connectToDatabase();
      const supervisors = await trainee.find(); // Query all supervisors
  
      return NextResponse.json(
        { results: supervisors },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to fetch supervisors" },
        { status: 500 }
      );
    }
  };
  



  

function connectToDatabase() {
  throw new Error("Function not implemented.");
}


