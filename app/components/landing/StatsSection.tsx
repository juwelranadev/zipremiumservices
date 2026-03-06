"use client";

const stats = [
  {
    value: "20 days",
    label: "saved on average.",
    company: "Netflix",
    logo: null,
  },
  {
    value: "98%",
    label: "instant delivery rate.",
    company: "Spotify",
    logo: null,
  },
  {
    value: "300%",
    label: "increase in savings.",
    company: "YouTube",
    logo: null,
  },
  {
    value: "6x",
    label: "faster than retail.",
    company: "Canva",
    logo: null,
  },
];

export default function StatsSection() {
  return (
    <section className="relative py-20 lg:py-32 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-black p-8 lg:p-10 group hover:bg-white/[0.02] transition-colors duration-500"
            >
              <div className="space-y-4">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl lg:text-4xl font-bold text-white">
                    {stat.value}
                  </span>
                  <span className="text-lg text-white/40">{stat.label}</span>
                </div>
                <div className="pt-4 border-t border-white/5">
                  <span className="text-sm text-white/30 font-medium tracking-wide">
                    {stat.company}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
