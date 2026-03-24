'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function JobsPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = sessionStorage.getItem('kt_profile');
    if (!raw) { router.push('/onboard'); return; }
    const profile = JSON.parse(raw);

    fetch('/api/match-jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        profileSummary: profile.summary,
        skills: profile.skills,
        language: profile.detectedLanguage ?? 'en',
      }),
    })
      .then(r => r.json())
      .then(d => { setJobs(d.matches ?? []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [router]);

  function scamBadge(score: number) {
    if (score <= 20) return { cls: 'bg-green-50 text-green-700', label: '✓ Vérifye' };
    if (score <= 50) return { cls: 'bg-amber-50 text-amber-700', label: '⚠ Verify' };
    return { cls: 'bg-red-50 text-red-600', label: '✗ Risk Fwod' };
  }

  return (
    <main className="max-w-lg mx-auto px-5 pt-8 pb-20">
      <h2 className="section-title">Travay ki matche</h2>
      <p className="section-sub">Klasman pa AI — ki baze sou konpetans ou ak risk fwod yo.</p>

      {loading && (
        <div className="text-center py-12 text-gray-400">
          <div className="w-8 h-8 border-2 border-brand-pale border-t-brand rounded-full animate-spin mx-auto mb-3" />
          Ap jwenn travay ki matche...
        </div>
      )}

      {!loading && jobs.map((job: any) => {
        const badge = scamBadge(job.scam_score ?? 0);
        return (
          <div key={job.id} className="card cursor-pointer hover:border-brand-light transition-colors">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="font-semibold text-[15px]">{job.title}</div>
                <div className="text-sm text-gray-500 mt-0.5">{job.company}</div>
              </div>
              <div className="text-right">
                <div className="font-serif text-2xl text-brand">{job.final_score ?? job.match_score}%</div>
                <div className="text-[11px] text-gray-400">match</div>
              </div>
            </div>

            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-3">
              <div
                className="h-full bg-brand rounded-full"
                style={{ width: `${job.final_score ?? job.match_score ?? 70}%` }}
              />
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <span className="meta-pill">💵 {job.pay_min}–{job.pay_max} {job.pay_currency}</span>
              <span className="meta-pill">🌐 {job.language_required ?? 'en'}</span>
              <span className="meta-pill">💳 {job.pay_method}</span>
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${badge.cls}`}>
                {badge.label}
              </span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => router.push('/tracker')}
                className="flex-1 py-2 border border-brand rounded-lg text-brand text-sm font-medium hover:bg-brand-pale transition-colors"
              >
                Mwen Aplike ✓
              </button>
              <Link
                href={`/interview?job=${encodeURIComponent(job.title)}`}
                className="flex-1 py-2 border border-gray-200 rounded-lg text-gray-500 text-sm text-center hover:bg-gray-50 transition-colors"
              >
                Prepare Entèvyou →
              </Link>
            </div>
          </div>
        );
      })}

      <div className="bg-brand-pale rounded-lg p-4 text-sm text-brand mt-2">
        <strong>Konsèy:</strong> Toujou verify konpayi a sou Google anvan ou aplike. Si yo mande lajan anvan, sa se yon siy move.
      </div>
    </main>
  );
}
