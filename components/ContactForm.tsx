"use client";

import { useState, type FormEvent } from "react";

const topics = ["Wholesale", "Press", "Careers", "A salone visit", "Other"];

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div
        className="rounded-sm border border-gold/40 bg-roast/60 p-10 text-center"
        role="status"
      >
        <p className="eyebrow">Received</p>
        <p className="display mt-4 text-3xl text-cream">
          Thank you. We read every message, and we reply to every one.
        </p>
        <p className="mt-4 text-sm text-muted">
          Expect to hear from us within two working days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-8 sm:grid-cols-2">
      <Field label="Name" id="name" required />
      <Field label="Email" id="email" type="email" required />
      <div className="sm:col-span-2">
        <label htmlFor="topic" className="eyebrow block">
          Topic
        </label>
        <select
          id="topic"
          name="topic"
          className="mt-3 w-full appearance-none border-b border-cream/25 bg-transparent pb-3 text-lg text-cream focus:border-gold focus:outline-none"
          defaultValue={topics[0]}
        >
          {topics.map((t) => (
            <option key={t} value={t} className="bg-ink">
              {t}
            </option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="message" className="eyebrow block">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="mt-3 w-full resize-none border-b border-cream/25 bg-transparent pb-3 text-lg text-cream placeholder:text-muted focus:border-gold focus:outline-none"
          placeholder="Tell us what you have in mind."
        />
      </div>
      <div className="sm:col-span-2">
        <button
          type="submit"
          className="inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-[0.72rem] font-medium tracking-[0.22em] uppercase text-ink transition-colors hover:bg-gold-soft"
        >
          Send message
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  id,
  type = "text",
  required,
}: {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow block">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        className="mt-3 w-full border-b border-cream/25 bg-transparent pb-3 text-lg text-cream focus:border-gold focus:outline-none"
      />
    </div>
  );
}
