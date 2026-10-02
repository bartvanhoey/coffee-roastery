"use client";

import { useState, type FormEvent } from "react";

export default function Newsletter({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "done">("idle");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setState("done");
  };

  if (state === "done") {
    return (
      <p
        className={`${compact ? "mt-5 text-sm" : "mt-8 text-lg"} text-gold-soft`}
        role="status"
      >
        Welcome. Your first letter arrives on Sunday.
      </p>
    );
  }

  return (
    <form
      onSubmit={submit}
      className={`flex items-end gap-3 border-b border-cream/25 transition-colors focus-within:border-gold ${
        compact ? "mt-5" : "mt-8"
      }`}
    >
      <label htmlFor={compact ? "nl-compact" : "nl"} className="sr-only">
        Email address
      </label>
      <input
        id={compact ? "nl-compact" : "nl"}
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        className={`w-full bg-transparent pb-3 text-cream placeholder:text-muted focus:outline-none ${
          compact ? "text-sm" : "text-lg"
        }`}
      />
      <button
        type="submit"
        className="pb-3 text-[0.72rem] font-medium tracking-[0.22em] uppercase text-gold transition-colors hover:text-cream"
      >
        Subscribe
      </button>
    </form>
  );
}
