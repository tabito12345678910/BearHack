import { NextResponse } from 'next/server';
import { handleInputFormSubmission } from '@/controllers/input_form';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await handleInputFormSubmission(body);

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error("Error in route.ts:", error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}