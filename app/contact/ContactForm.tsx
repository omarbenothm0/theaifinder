'use client';

import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name.trim() && form.email.trim() && form.message.trim()) {
      setSubmitted(true);
      setForm({ name: '', email: '', subject: '', message: '' });
    }
  };

  if (submitted) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-3">
        <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
        <h2 className="font-bold text-emerald-900 text-base">Message Received</h2>
        <p className="text-sm text-emerald-700">Thanks for reaching out. We review submissions weekly and will get back to you if needed.</p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-xs font-bold text-emerald-700 hover:text-emerald-600 cursor-pointer"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-5">
      <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Send a Message</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1 text-xs">Name</label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1 text-xs">Email</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="you@example.com"
            />
          </div>
        </div>
        <div>
          <label className="block font-bold text-slate-700 mb-1 text-xs">Subject</label>
          <select
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">Select a topic...</option>
            <option value="submission">Tool submission</option>
            <option value="correction">Report outdated info</option>
            <option value="question">General question</option>
            <option value="feedback">Feedback</option>
          </select>
        </div>
        <div>
          <label className="block font-bold text-slate-700 mb-1 text-xs">Message</label>
          <textarea
            name="message"
            required
            rows={5}
            value={form.message}
            onChange={handleChange}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
            placeholder="Tell us more..."
          />
        </div>
        <button
          type="submit"
          className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors cursor-pointer flex items-center gap-2"
        >
          <Send className="w-4 h-4" />
          Send Message
        </button>
      </form>
    </div>
  );
}
