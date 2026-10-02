export default function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      aria-hidden
      focusable="false"
    >
      <circle cx="20" cy="20" r="18.5" stroke="currentColor" strokeWidth="1" />
      <path
        d="M20 7 L30.5 31 H26.6 L20 15.3 L13.4 31 H9.5 Z"
        fill="var(--gold)"
      />
      <path d="M15.2 26.5 H24.8" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
