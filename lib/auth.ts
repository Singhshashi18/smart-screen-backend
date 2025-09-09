
import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken'

const CLERK_JWT_KEY = process.env.CLERK_JWT_KEY!;

export async function verifyClerkJWT(req: NextRequest) {
  try {
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new Error("No token found in Authorization header");
    }

    const decoded = jwt.verify(token, CLERK_JWT_KEY,{algorithms:['HS256']})as any ;
    console.log(decoded?.header?.alg);
    return decoded;
  } catch (err) {
    console.error("JWT verification failed::", err);
    return null;
  }
}
