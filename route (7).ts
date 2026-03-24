'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const LEVEL_MAP: Record<string, { label: string; pct: number; color: string }> = {
  entry:  { label: 'Antrè',       pct: 35,  color: 'bg-blue-50 text-blue-700' },
  mid:    { label: 'Entèmedyè',   pct: 60,  color: 'bg-green-50 text-green-700' },
  senior: { label: 'Ekspèrimante', pct: 85, color: 'bg-amber-50 text-amber-700' },
};

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem('kt_profile');
    if (!raw) { router.push('/onboard'); return; }
    setProfile(JSON.parse(raw));
  }, [router]);

  if (!profile) return <div className="p-8 text-center text-gray-400">Chaje...</div>;

  const level = LEVEL_MAP[profile.experience_level] ?? LEVEL_MAP.entry;

  return (
    <main className="max-w-lg mx-auto px-5 pt-8 pb-20">
      <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-green-700 text-sm font-medium mb-5">
        ✓ Pwofil kreye avèk siksè!
      </div>

      <h2 className="section-title">{profile.name}</h2>
      <p className="section-sub">{profile.summary}</p>

      <div className="card">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
          Konpetans idantifye
        </div>
        <div className="flex flex-wrap gap-2">
          {profile.skills?.map((s: any) => (
            <span key={s.name} className={`tag tag-${s.category}`}>{s.name}</span>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
          Nivo eksperyans
        </div>
        <div className="flex items-center gap-3">
          <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${level.color}`}>
            {level.label}
          </span>
          <div className="flex-1">
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand rounded-full transition-all duration-700"
                style={{ width: `${level.pct}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {profile.gaps?.length > 0 && (
        <div className="card">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
            Amelyorasyon pwopoze
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.gaps.map((g: string) => (
              <span key={g} className="px-3 py-1 rounded-full text-xs bg-red-50 text-red-600 border border-red-100">
                + {g}
              </span>
            ))}
          </div>
        </div>
      )}

      <Link href="/jobs" className="btn-primary mb-3">
        Jenere Rezime + Wè Travay →
      </Link>
    </main>
  );
}
