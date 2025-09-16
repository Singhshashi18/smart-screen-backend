


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
