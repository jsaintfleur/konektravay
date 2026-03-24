import { NextRequest, NextResponse } from 'next/server';
import { matchJobs } from '@/lib/matching';

export const revalidate = 3600; // cache job matches 1 hour

export async function POST(req: NextRequest) {
  try {
    const { profileSummary, skills, language } = await req.json();
    if (!profileSummary) {
      return NextResponse.json({ error: 'profileSummary required' }, { status: 400 });
    }
    const matches = await matchJobs(profileSummary, skills ?? [], language ?? 'en');
    return NextResponse.json({ matches });
  } catch (err: any) {
    console.error('[match-jobs]', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
