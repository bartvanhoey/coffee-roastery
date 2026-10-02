type Props = {
  items: string[];
  className?: string;
};

export default function Marquee({ items, className = "" }: Props) {
  const row = [...items, ...items];
  return (
    <div
      className={`relative overflow-hidden border-y border-cream/10 py-5 ${className}`}
      aria-hidden
    >
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap">
        {row.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-12 font-serif text-2xl tracking-wide text-sand/70 sm:text-3xl"
          >
            {item}
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold" />
          </span>
        ))}
      </div>
    </div>
  );
}
