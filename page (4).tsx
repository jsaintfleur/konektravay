'use client';
import { useEffect, useRef, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

interface Message {
  role: 'ai' | 'user' | 'feedback';
  text: string;
}

function InterviewChat() {
  const params = useSearchParams();
  const jobTitle = params.get('job') ?? 'Customer Support';
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<{ role: string; content: string }[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([{
      role: 'ai',
      text: `Bonjou! Mwen pral ede ou prepare pou entèvyou "${jobTitle}". Kòmanse di mwen yon ti kras sou ou menm — ki jan ou te travay anvan, ak poukisa ou vle travay a distans?`,
    }]);
  }, [jobTitle]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function send() {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    const newHistory = [...history, { role: 'user', content: userMsg }];

    try {
      const res = await fetch('/api/interview-prep', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobTitle, history: newHistory, message: userMsg }),
      });
      const data = await res.json();
      setHistory([...newHistory, { role: 'assistant', content: data.reply }]);
      setMessages(prev => [...prev,
        { role: 'feedback', text: data.feedback ?? '' },
        { role: 'ai', text: data.reply },
      ].filter(m => m.text));
    } catch {
      setMessages(prev => [...prev, { role: 'ai', text: 'Yon erè te rive. Eseye ankò.' }]);
    }
    setLoading(false);
  }

  return (
    <main className="max-w-lg mx-auto px-5 pt-8 pb-20">
      <h2 className="section-title">Pratike entèvyou</h2>
      <p className="section-sub text-sm text-gray-500 mb-4">{jobTitle}</p>

      <div className="bg-gray-50 border border-gray-200 rounded-xl h-[360px] overflow-y-auto p-4 flex flex-col gap-3 mb-3">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] px-3.5 py-2.5 rounded-xl text-sm leading-relaxed ${
              m.role === 'user'
                ? 'bg-brand text-white rounded-br-sm'
                : m.role === 'feedback'
                ? 'bg-gold-pale text-yellow-800 border border-yellow-200 rounded-bl-sm text-xs'
                : 'bg-white text-gray-900 border border-gray-200 rounded-bl-sm'
            }`}>
              {m.role === 'feedback' && <span className="font-semibold">💬 Coaching: </span>}
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-xl px-4 py-3">
              <div className="flex gap-1">
                {[0,1,2].map(i => (
                  <div key={i} className="w-2 h-2 rounded-full bg-gray-300 animate-pulse" style={{ animationDelay: `${i*0.2}s` }} />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="flex gap-2">
        <textarea
          className="input-field flex-1 min-h-[48px] max-h-[100px] resize-none"
          placeholder="Ekri repons ou..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
        />
        <button
          onClick={send}
          disabled={loading}
          className="w-12 h-12 bg-brand text-white rounded-lg flex items-center justify-center text-lg disabled:opacity-40 hover:bg-brand-light transition-colors flex-shrink-0"
        >
          ↑
        </button>
      </div>

      <p className="text-xs text-gray-400 text-center mt-2">
        AI pap kenbe repons ou — pratike lib
      </p>
    </main>
  );
}

export default function InterviewPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-400">Chaje...</div>}>
      <InterviewChat />
    </Suspense>
  );
}
