import { NextResponse } from 'next/server';

export async function POST() {
  // For now, just return a 200 status code
  return NextResponse.json(
    { message: 'Signup successful' },
    { status: 200 }
  );
}
