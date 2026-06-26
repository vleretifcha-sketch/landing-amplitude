import { Reveal } from "./Reveal";

const steps = [
  {
    num: 1,
    title: "Parce que ton corps s'adapte à ce que tu lui demandes.",
    desc: "Tu ajoutes une charge sur la barre, le muscle se renforce. Tu demandes un peu plus d'amplitude chaque semaine, ton corps s'adapte : les tissus gagnent en longueur, ton système nerveux apprend à te laisser aller plus loin, en sécurité. La souplesse s'entraîne, elle ne se force pas.",
  },
  {
    num: 2,
    title: "Parce que la progression vient de la répétition, pas de l'acharnement.",
    desc: "Personne ne prend 10 kg de muscle en une séance. La souplesse, c'est pareil : des séries, des répétitions, une amplitude qui gagne des degrés semaine après semaine. Quand le talent ne s'entraîne pas, l'entraînement bat le talent, à chaque fois.",
  },
  {
    num: 3,
    title: "Parce que la vraie souplesse est une souplesse forte.",
    desc: "Gagner de l'amplitude ne sert à rien si tu n'as pas la force de la contrôler. C'est tout l'enjeu de la mobilité : être souple et solide sur toute ton amplitude. C'est ce qui rend tes progrès durables ; et ce qui t'évite de te blesser.",
  },
];

export function Process() {
  return (
    <section id="process" className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="max-w-3xl">
            <p className="label-accent">La réalité</p>
            <h2 className="mt-5 text-3xl font-medium leading-tight tracking-tight sm:mt-6 sm:text-4xl lg:text-5xl">
              <span className="block">
                La souplesse{" "}
                <span className="text-gold">n&apos;est pas un don.</span>
              </span>
              <span className="block">C&apos;est une capacité qui se travaille</span>
              <span className="block">; à tout âge et à tout niveau.</span>
            </h2>
            <p className="mt-6 text-sm leading-[1.75] text-muted-light sm:mt-7 sm:text-base">
              On t&apos;a fait croire que la souplesse était une question de chance :
              on l&apos;a de naissance, ou jamais. C&apos;est faux. La souplesse et la
              mobilité suivent exactement les mêmes lois que la force ; et comme un
              muscle, ça se construit.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 sm:mt-12 lg:mt-16">
          <div className="grid gap-6 lg:grid-cols-3 lg:gap-5">
            {steps.map((step) => (
              <Reveal key={step.num} delay={80 + step.num * 70} className="h-full">
                <article className="card-dark flex h-full flex-col p-6 sm:p-8">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold text-sm font-bold text-on-gold">
                    {step.num}
                  </div>
                  <h3 className="mt-6 text-lg font-semibold leading-snug">{step.title}</h3>
                  <p className="mt-3.5 text-sm leading-[1.75] text-muted-light">
                    {step.desc}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
