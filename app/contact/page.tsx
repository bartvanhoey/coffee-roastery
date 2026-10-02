import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { img } from "@/lib/products";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Wholesale, press, careers or simply a question about a coffee. Write to Aurum in Trieste.",
};

const channels = [
  {
    label: "Roastery",
    lines: ["Magazzino 26, Porto Vecchio", "34132 Trieste, Italia"],
  },
  { label: "Email", lines: [site.email] },
  { label: "Telephone", lines: [site.phone, "Mon – Fri, 09:00 – 18:00 CET"] },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        size="short"
        eyebrow="Contact"
        title={
          <>
            Say <em>hello.</em>
          </>
        }
        text="Wholesale, press, careers, or simply a question about a coffee. Every message lands on a real desk in Trieste."
        image={img("1445116572660-236099ec97a0", 1600)}
      />

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.6fr] lg:gap-24">
          <Reveal>
            <dl className="space-y-10">
              {channels.map((c) => (
                <div key={c.label}>
                  <dt className="eyebrow">{c.label}</dt>
                  <dd className="mt-3 space-y-1 text-lg text-cream">
                    {c.lines.map((l) => (
                      <p key={l}>{l}</p>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="hairline mt-12" />
            <p className="mt-8 text-sm leading-relaxed text-muted">
              Visiting the roastery? Public cuppings run every Saturday at
              10:00. No booking needed, no charge, and the coffee is on us.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
