import { NextRequest, NextResponse } from 'next/server';
import { interviewChat } from '@/lib/ai';

export async function POST(req: NextRequest) {
  try {
    const { jobTitle, history, message } = await req.json();
    if (!jobTitle || !message) {
      return NextResponse.json({ error: 'jobTitle and message required' }, { status: 400 });
    }
    const result = await interviewChat(jobTitle, history ?? [], message);
    return NextResponse.json(result);
  } catch (err: any) {
    console.error('[interview-prep]', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
