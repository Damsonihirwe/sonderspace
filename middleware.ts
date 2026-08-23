import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  // No authentication middleware - all routes are public
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
