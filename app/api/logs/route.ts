   import { verifyClerkJWT } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Log from "@/models/Log";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    try {
        const {userId} =await verifyClerkJWT(req);

        if(!userId){
            NextResponse.json({error:'unauthorized'},{status:401})
        }
          await connectDB();

          const logs =await Log.find({userId}).sort({timestamp:-1});
          return NextResponse.json(logs);

    } catch (error) {
        return NextResponse.json({error:'internal server error'},{status:500})
    }
};

export async function POST(req:NextRequest) {
    try {
        const {userId} = await verifyClerkJWT(req);

        if(!userId){
            NextResponse.json({error:"unauthorized"},{status:401});
        }
        const {type,description} = await req.json();

        if(!type ||  !description){
            NextResponse.json({error:'missing fields'},{status:400});
        }
        connectDB();

        const newLog=await Log.create({
            userId,
            type,
            description,
        });
        return NextResponse.json(newLog,{status:201});
    } catch (error) {
        return NextResponse.json({error:'internal server error '},{status:500})
    }
    
}
