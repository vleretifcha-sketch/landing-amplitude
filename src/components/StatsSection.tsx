import { Reveal } from "./Reveal";

const stats = [
  {
    value: "100 %",
    label: "des élèves réguliers progressent",
  },
  {
    value: "+200 000",
    label: "abonnés sur les réseaux",
  },
  {
    value: "+10 ans",
    label: "de pratique & d'enseignement",
  },
];

export function StatsSection() {
  return (
    <section aria-label="Chiffres clés" className="px-4 pb-10 sm:px-6 sm:pb-16 lg:px-8 lg:pb-20">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex flex-col sm:grid sm:grid-cols-3 sm:gap-y-0">
            {stats.map((stat) => (
              <div
                key={stat.value}
                className="flex flex-col items-center justify-center px-4 py-5 text-center sm:px-6 sm:py-10"
              >
                <p className="text-2xl font-semibold tracking-tight text-gold sm:text-4xl lg:text-[2.75rem]">
                  {stat.value}
                </p>
                <p className="mt-2 max-w-[12rem] text-sm leading-snug text-muted-light sm:mt-3 sm:text-base">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
