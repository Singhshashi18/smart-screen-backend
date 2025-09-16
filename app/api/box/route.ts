    import { verifyClerkJWT } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Box } from "@/models/Box";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    try {
        const {userId}=await verifyClerkJWT(req);
     if(!userId){
        NextResponse.json({error:'unauthorized'},{status:401})
     }
      await connectDB();

      const box=await Box.findOne({userId});

      if(!box){
        await Box.create({userId,status:"available",isOccupied:false});
      }
      return NextResponse.json(box,{status:200});

        
    } catch (error) {
        return NextResponse.json({error:'internal server error'},{status:500})
    }
};

export async function PATCH(req: NextRequest) {
  try {
    const { userId } = await verifyClerkJWT(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { status } = await req.json();
    if (!["available", "occupied","damaged"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }
    await connectDB();
    const updatedBox = await Box.findOneAndUpdate(
      { userId },
      { status,isOccupied:status === 'occupied' },
      { new: true, upsert: true }
    );
    return NextResponse.json(updatedBox);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
