'use client';
import { useState } from 'react';

const INITIAL_APPS = [
  { id: '1', title: 'Bilingual Customer Support', company: 'RemoteFirst Inc.', status: 'applied', date: 'Jodi a' },
  { id: '2', title: 'Haitian Creole Transcriptionist', company: 'TranscribeNow', status: 'applied', date: '2 jou pase' },
  { id: '3', title: 'French-English Translator', company: 'LinguaWork', status: 'interview', date: 'Madi 10am UTC' },
  { id: '4', title: 'VA Administrative Support', company: 'TaskBridge', status: 'rejected', date: '5 jou pase' },
];

const COLUMNS = [
  { key: 'applied',   label: 'Aplike',  accent: '' },
  { key: 'interview', label: 'Entèvyou', accent: 'border-l-2 border-l-brand' },
  { key: 'offer',     label: 'Ofè',     accent: 'border-l-2 border-l-green-500' },
  { key: 'rejected',  label: 'Rejte',   accent: 'opacity-60' },
];

export default function TrackerPage() {
  const [apps, setApps] = useState(INITIAL_APPS);

  function move(id: string, status: string) {
    setApps(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  }

  return (
    <main className="max-w-2xl mx-auto px-5 pt-8 pb-20">
      <h2 className="section-title">Swivi aplikasyon</h2>
      <p className="section-sub">Kenbe yon tras tout travay ou aplike yo.</p>

      <div className="grid grid-cols-2 gap-3">
        {COLUMNS.map(col => {
          const colApps = apps.filter(a => a.status === col.key);
          return (
            <div key={col.key} className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                  {col.label}
                </span>
                <span className="bg-gray-200 text-gray-500 rounded-full px-2 py-0.5 text-[11px]">
                  {colApps.length}
                </span>
              </div>

              {colApps.length === 0 && (
                <div className="text-xs text-gray-400 py-2">Anyen pou kounye a</div>
              )}

              {colApps.map(app => (
                <div
                  key={app.id}
                  className={`bg-white border border-gray-200 rounded-lg p-3 mb-2 text-sm ${col.accent}`}
                >
                  <div className="font-semibold text-[13px] mb-0.5">{app.title}</div>
                  <div className="text-gray-400 text-xs">{app.company} · {app.date}</div>
                  <select
                    value={app.status}
                    onChange={e => move(app.id, e.target.value)}
                    className="mt-2 w-full text-xs border border-gray-200 rounded px-1.5 py-1 bg-white text-gray-500"
                  >
                    {COLUMNS.map(c => <option key={c.key} value={c.key}>{c.label}</option>)}
                  </select>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </main>
  );
}
