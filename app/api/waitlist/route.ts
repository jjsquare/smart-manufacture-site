// app/api/waitlist/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Replace with your Google Apps Script URL
    const GAS_URL = process.env.GOOGLE_SCRIPT_URL!;

    const response = await fetch(GAS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    console.log("api response from Googlesheet",response);
    
    const text = await response.text();
    return new NextResponse(text, { status: 200 });
  } catch (error) {
    console.error('API Error:', error);
    return new NextResponse('Server error', { status: 500 });
  }
}
