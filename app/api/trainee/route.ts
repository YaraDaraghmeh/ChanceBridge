import { NextRequest, NextResponse } from "next/server";

const traineeCollections={

      Certifications:[{
        role:'NextJs Boodcap',
        supervisor:'hadeel alwadia',
        graduationDate:'2/3/2024',
        rate:4
      
      },{
        role:'NextJs Boodcap',
        supervisor:'hadeel alwadia',
        graduationDate:'2/3/2024',
        rate:4
      },{
        role:'NextJs Boodcap',
        supervisor:'hadeel alwadia',
        graduationDate:'2/3/2024',
        rate:4
      },{
        role:'NextJs Boodcap',
        supervisor:'hadeel alwadia',
        graduationDate:'2/3/2024',
        rate:4
      }],
      activites:[{
        name:'creating landing page with Nextjs',
        startData:'2-3-2013',
        endData:'4-5-2010',
        status:'panding'
      },{
        name:'creating landing page with Nextjs',
        startData:'2-3-2013',
        endData:'4-5-2010',
        status:'completed'
      },
      {
        name:'creating landing page with Nextjs',
        startData:'2-3-2013',
        endData:'4-5-2010',
        status:'inProgress'
      }],
      assignments:[{
        name:'create auth form with mongodb',
        supervisor:'hadeelalwadia',
        startDate:'22-4-2019',
        endDate:'23-4-2020',
        status:'panding'
      },{
        name:'create auth form with mongodb',
        supervisor:'hadeelalwadia',
        startDate:'22-4-2019',
        endDate:'23-4-2020',
        status:'panding'
      },{
        name:'create auth form with mongodb',
        supervisor:'hadeelalwadia',
        startDate:'22-4-2019',
        endDate:'23-4-2020',
        status:'panding'
      }]
      
    }

  
  const listsOfTable=['role','supervisor','graduation','rate']
  
export const GET =  (request: NextRequest) => {
    return NextResponse.json(
      { results: traineeCollections },
      { status: 200 }
    );
  }

  

