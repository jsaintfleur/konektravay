import { NextRequest, NextResponse } from 'next/server';
import { checkScam } from '@/lib/ai';

export async function POST(req: NextRequest) {
  try {
    const { jobDescription, payInfo } = await req.json();
    if (!jobDescription) {
      return NextResponse.json({ error: 'jobDescription required' }, { status: 400 });
    }
    const result = await checkScam(jobDescription, payInfo ?? '');
    return NextResponse.json(result);
  } catch (err: any) {
    console.error('[scam-check]', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
