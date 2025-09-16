  // import { connectDB } from "@/lib/db";
// import User from "@/models/User"; 
// import { NextRequest, NextResponse } from "next/server";
// import { verifyClerkJWT } from "@/lib/auth";

// export async function GET(req:NextRequest) {
//     await connectDB();
//     const {userId}= await verifyClerkJWT(req);
//     if(!userId){
//         return NextResponse.json({error:"unauthorized"},{status:401})
//     }
//     const user=await User.findOne({clerkId:userId});
//     if(!user){
//         return NextResponse.json({error:"user not found"},{status:404});
//     }
//      return NextResponse.json({isAtHome:user.isAtHome});
// };
// export async function PATCH(req:NextRequest) {

//     connectDB();
//     const {userId}=await verifyClerkJWT(req);

//     if(!userId){
//         NextResponse.json({error:"unauthorized"},{status:401})
//     }
//      const body=await req.json();
//      const {isAtHome}=body;
//      if(typeof isAtHome !== 'boolean'){
//         return NextResponse.json({error:"invalid value for isAtHome"},{status:400});
//      }
//       const user=await User.findOneAndUpdate(
//         {clerkId:userId},
//         {isAtHome},
//         {new:true,upsert:true}
//       );
//       return NextResponse.json({message:"status updated",isAtHome:user.isAtHome});
// }



import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ error: 'No token' }, { status: 401 });
  }

  // 🔍 Decode only (no verify) to inspect algorithm
  const decoded = jwt.decode(token, { complete: true });
  console.log('Decoded header:', decoded?.header);

  return NextResponse.json({
    alg: decoded?.header?.alg,
    header: decoded?.header,
  });
}
