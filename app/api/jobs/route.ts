import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/mongodb'; 
import User from '@/models/User';
import Job, { IJob } from '@/models/Job';
import { Types } from 'mongoose';

interface JwtPayload {
  id: string;
  email: string;
  role: string;
  username?: string;
}

export async function POST(request: NextRequest) {
  try {
    // 1. Connect to Database
    await dbConnect();

    // 2. Get Authorization Header
    const authorization = request.headers.get('Authorization');
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Authentication required.' }, { status: 401 });
    }
    const token = authorization.split(' ')[1];

    // 3. Verify JWT Token
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      console.error("JWT_SECRET is not defined in environment variables.");
      return NextResponse.json({ message: 'Server configuration error.' }, { status: 500 });
    }

    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    } catch (error) {
      console.error("Token verification failed:", error);
      return NextResponse.json({ message: 'Invalid or expired token.' }, { status: 401 });
    }

    // 4. Find User using the 'id' from the decoded token
    const user = await User.findById(decoded.id).select('+role +jobs');

    // 5. Authorization Check: User exists and has the 'company' role
    if (!user) {
      return NextResponse.json({ message: 'User associated with token not found.' }, { status: 404 });
    }
    if (user.role !== 'company') {
      return NextResponse.json({ message: 'Forbidden: Only companies can create jobs.' }, { status: 403 });
    }

    // 6. Get Job Data from Request Body
    const body = await request.json();

    // 7. Basic Validation for Job Data
    if (!body.title || !body.description) {
      return NextResponse.json({ message: 'Job title and description are required.' }, { status: 400 });
    }
    const validRequirements = Array.isArray(body.requirements)
      ? body.requirements.filter((req): req is string => typeof req === 'string' && req.trim() !== '')
      : [];
    const validResponsibilities = Array.isArray(body.responsibilities)
      ? body.responsibilities.filter((resp): resp is string => typeof resp === 'string' && resp.trim() !== '')
      : [];
     const validBenefits = Array.isArray(body.benefits)
      ? body.benefits.filter((ben): ben is string => typeof ben === 'string' && ben.trim() !== '')
      : [];


    // 8. Create New Job Document (تضمين الحقول الجديدة)
    const newJobData: Partial<IJob> = {
        title: body.title,
        description: body.description,
        extendedDescription: body.extendedDescription,
        requirements: validRequirements,
        responsibilities: validResponsibilities,
        benefits: validBenefits,
        company: user._id,
        location: body.location,
        featured: body.featured,
        type: body.type,
        experience: body.experience,
        salary: body.salary,
        deadline: body.deadline ? new Date(body.deadline) : undefined,
        startDate: body.startDate,
    };

    const newJob = new Job(newJobData);

    // 9. Save the New Job
    const savedJob: IJob = await newJob.save();

    // 10. Update the User's 'jobs' array
    if (user.jobs && !user.jobs.some((jobId: Types.ObjectId) => jobId.equals(savedJob._id))) {
        user.jobs.push(savedJob._id);
        await user.save();
    } else if (!user.jobs) {
        user.jobs = [savedJob._id];
        await user.save();
    }

    // 11. Success Response
    return NextResponse.json({ message: 'Job created successfully!', job: savedJob }, { status: 201 });

  } catch (error: any) {
    console.error("Error in POST /api/jobs:", error);
    if (error.name === 'ValidationError') {
      return NextResponse.json({ message: `Validation Error: ${error.message}` }, { status: 400 });
    }
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}


export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const locationFilter = searchParams.get('location');
    const typeFilter = searchParams.get('type');
    const query: any = { isActive: true };
    if (locationFilter) query.location = { $regex: locationFilter, $options: 'i' };
    if (typeFilter) query.type = typeFilter;

    const jobs = await Job.find({ isActive: true })
                         .populate({
                            path: 'company',
                            select: 'username googlePhotoUrl email' 
                         })
                         .sort({ featured: -1, postedDate: -1 }); 

    return NextResponse.json({ jobs }, { status: 200 });

  } catch (error: any) {
    console.error("Error in GET /api/jobs:", error);
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}