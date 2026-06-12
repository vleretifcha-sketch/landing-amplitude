import { Reveal } from "./Reveal";
import { RevealGroup } from "./RevealGroup";

const servicePreviewClass =
  "flex h-[13rem] flex-col rounded-2xl border border-border bg-surface-inset";

export function Services() {
  return (
    <section id="services" className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="label-accent">La méthode</p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl">
            Ce que je propose
          </h2>
        </Reveal>

        <RevealGroup
          className="mt-8 grid gap-5 sm:mt-12 sm:gap-6 lg:mt-14 lg:grid-cols-3 lg:items-stretch"
          itemClassName={(index) =>
            index === 3 ? "lg:col-span-3" : ""
          }
        >
          <article className="card-dark flex h-full flex-col overflow-hidden p-6 sm:p-8">
            <div className={`${servicePreviewClass} justify-center space-y-2 p-3`}>
              {[
                {
                  label: "Cours signature",
                  sub: "Séance guidée",
                  image: "/images/services/signature.jpg",
                },
                {
                  label: "Training A",
                  sub: "Environ 30 min la séance",
                  image: "/images/services/training-a.jpg",
                },
                {
                  label: "Training B",
                  sub: "Environ 30 min la séance",
                  image: "/images/services/training-b.jpg",
                },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-center gap-3 rounded-xl bg-card px-3 py-2.5"
                >
                  <div className="h-8 w-8 shrink-0 overflow-hidden rounded-lg bg-card">
                    <img
                      src={row.image}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{row.label}</p>
                    <p className="truncate text-xs text-muted">{row.sub}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-1 flex-col">
              <h3 className="text-lg font-semibold">Cours signature</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-light">
                Séance guidée en vidéo de 30 minutes axées sur un coaching précis, la
                respiration et l&apos;alignement. C&apos;est la séance principale du mois.
              </p>
            </div>
          </article>

          <article className="card-dark flex h-full flex-col overflow-hidden p-6 sm:p-8">
            <div className={`${servicePreviewClass} p-4`}>
              <p className="text-xs text-muted">Avant Amplitude</p>
              <div className="mt-auto flex h-28 w-full items-end justify-center gap-2">
                {[30, 45, 35, 50, 40].map((h, i) => (
                  <div
                    key={i}
                    className={`w-7 rounded-t ${i === 3 ? "bg-gold" : "bg-gold/20"}`}
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
            <div className="mt-6 flex flex-1 flex-col">
              <h3 className="text-lg font-semibold">Progression mesurable</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-light">
                Répétition intelligente, amplitude progressive, adaptation du système
                nerveux : exactement comme en musculation.
              </p>
            </div>
          </article>

          <article className="card-dark flex h-full flex-col overflow-hidden p-6 sm:p-8">
            <div className={`${servicePreviewClass} justify-center space-y-3 p-4`}>
              <p className="text-xs italic text-muted">Séance complémentaire</p>
              <div className="rounded-xl border border-chip-border bg-chip-bg px-4 py-3">
                <p className="text-sm text-text">Série 2/3 - 15 répétitions</p>
              </div>
              <div className="flex items-start gap-2 rounded-xl bg-card px-3 py-2">
                <div className="mt-0.5 h-6 w-6 shrink-0 rounded-full bg-avatar-bg" />
                <p className="text-sm text-muted-light">
                  Timer • repetition | esprit fitness
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-1 flex-col">
              <h3 className="text-lg font-semibold">Séance complémentaire</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-light">
                2 séances par semaine. Conçu pour renforcer et approfondir le travail
                réalisé dans le cours signature guidé.
              </p>
            </div>
          </article>

          <article className="card-dark grid overflow-hidden lg:grid-cols-2">
            <div className="flex flex-col items-start justify-start border-b border-border p-8 sm:p-10 lg:border-r lg:border-b-0">
              <p className="text-sm text-muted-light">Semaine type</p>
              <h3 className="mt-4 text-xl font-semibold sm:text-2xl">
                3 séances environ 30 minutes
              </h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-light">
                3 séances d&apos;environ 30 minutes chacune. Un cours guidé plus deux
                séances complémentaires. Pas besoin de pratiquer tous les jours ni de
                faire des heures de stretching.
              </p>
            </div>
            <div className="flex flex-col items-start justify-start p-8 sm:p-10">
              <p className="text-sm text-muted-light">Mobilité active guidée</p>
              <h3 className="mt-4 text-xl font-semibold sm:text-2xl">
                Avant vos entraînements
              </h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-light">
                Séance de mobilité active guidée à réaliser avant vos séances.
              </p>
            </div>
          </article>
        </RevealGroup>
      </div>
    </section>
  );
}
