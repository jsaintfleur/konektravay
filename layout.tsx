'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="max-w-lg mx-auto px-5 pt-10 pb-20">
      <div className="inline-flex items-center gap-2 bg-brand-pale text-brand px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide mb-5">
        🌍 AI pou jèn ayisyen
      </div>

      <h1 className="font-serif text-[38px] leading-tight text-brand mb-3">
        Tounen travay <em className="text-gold not-italic">global</em> fasil.
      </h1>

      <p className="text-[17px] text-gray-500 mb-7 leading-relaxed">
        Ekri ki sa ou konnen fè — n ap konvèti li an pwofil pwofesyonèl,
        jwenn travay a distans, epi pwoteje ou kont fwod.
      </p>

      <div className="grid grid-cols-3 gap-3 mb-7">
        {[
          { num: '4.5M', label: 'Jèn ayisyen' },
          { num: '25+',  label: 'Travay vérifye' },
          { num: '3',    label: 'Lang sipòte' },
        ].map(s => (
          <div key={s.num} className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <div className="font-serif text-2xl text-brand">{s.num}</div>
            <div className="text-xs text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <Link href="/onboard" className="btn-primary mb-3">
        Kòmanse Gratis →
      </Link>
      <Link href="/onboard" className="btn-secondary">
        Gade demo
      </Link>
    </main>
  );
}
