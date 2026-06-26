import { Reveal } from "./Reveal";

const paragraphs = [
  "Je ne suis pas née souple. On m'a même dit que je ne le serais jamais, et pourtant…",
  "Passionnée par le mouvement depuis plus de 10 ans, j'ai construit mon expertise à travers la musculation, la pole dance et les disciplines aériennes ; jusqu'à la souplesse et la mobilité, que j'ai enseignées et dont j'ai fait mon métier. En 2019, j'ai fondé ma propre école et suite à la fermeture COVID, j'ai eu envie d'une version digitale.",
  "On m'a dit que je n'étais génétiquement pas souple.. Les méthodes que j'ai pu exercer ne faisaient qu'une chose : me blesser ; parce qu'elles sont pensées pour des corps déjà souples, pas pour le mien. Alors j'ai construit ma méthode, une méthode pragmatique & progressive basée sur le meilleur de mes entraînements. Aujourd'hui, j'ai mes deux écarts latéraux, mon facial, mes oversplits. Et je ne me blesse plus.",
  "Ma mission : permettre à chacun de développer un corps plus mobile, plus souple et plus performant ; à son rythme, depuis chez soi ou sa salle de sport préférée.",
];

export function FounderSection() {
  return (
    <section
      aria-label="Mylène Miletto, fondatrice"
      className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid items-start gap-8 sm:gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14 xl:gap-16">
          <Reveal className="order-2 lg:order-1 lg:sticky lg:top-28 lg:self-start">
            <img
              src="/images/mylene-miletto.png"
              alt="Mylène, fondatrice d'Amplitude"
              width={460}
              height={660}
              className="mx-auto aspect-[4/5] max-h-[17.5rem] w-full max-w-[460px] rounded-3xl border border-border object-cover object-[50%_35%] sm:max-h-[19rem] sm:aspect-[10/14] lg:mx-0 lg:max-h-none lg:aspect-[10/15]"
            />
          </Reveal>

          <div className="order-1 lg:order-2">
            <Reveal delay={80}>
              <p className="label-accent">Mylène Miletto</p>
              <h2 className="mt-4 text-3xl font-medium leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem]">
                <span className="block text-muted-light">
                  « Je ne suis pas souple. »
                </span>
                <span className="mt-2 block text-text">
                  Et si c&apos;était{" "}
                  <span className="text-gold">juste faux</span> ?
                </span>
              </h2>
            </Reveal>

            <div className="mt-8 space-y-5">
              {paragraphs.map((paragraph, index) => (
                <Reveal key={paragraph.slice(0, 24)} delay={140 + index * 70}>
                  <p className="text-sm leading-relaxed text-muted-light sm:text-base">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={420}>
              <div className="mt-10 flex items-center gap-4 border-l-2 border-gold pl-5 sm:mt-12">
                <p className="text-4xl font-semibold tracking-tight text-gold sm:text-5xl">
                  100&nbsp;%
                </p>
                <p className="max-w-[14rem] text-sm leading-snug text-muted-light sm:text-base">
                  de mes élèves réguliers progressent
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
