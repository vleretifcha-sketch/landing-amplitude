import { Reveal } from "./Reveal";
import { RevealGroup } from "./RevealGroup";

export function Services() {
  return (
    <section id="services" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="label-accent">La méthode</p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl">
            Ce que nous proposons
          </h2>
        </Reveal>

        <RevealGroup
          className="mt-14 grid gap-5 lg:grid-cols-3"
          stagger={300}
          itemClassName={(index) => (index === 3 ? "lg:col-span-3" : undefined)}
        >
          <article className="card-dark flex h-full flex-col overflow-hidden p-6 sm:p-8">
            <div className="space-y-2 rounded-2xl border border-border bg-black/50 p-3">
              {[
                { label: "Cours signature", sub: "Séance guidée premium", active: true },
                { label: "Training A", sub: "10–20 min · silencieux", active: false },
                { label: "Training B", sub: "10–20 min · silencieux", active: false },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-center gap-3 rounded-xl bg-card px-3 py-2.5"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-xs font-bold text-gold">
                    A
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{row.label}</p>
                    <p className="truncate text-xs text-muted">{row.sub}</p>
                  </div>
                  {row.active && (
                    <span className="shrink-0 text-xs font-medium text-gold">
                      En cours
                    </span>
                  )}
                </div>
              ))}
            </div>
            <h3 className="mt-6 text-xl font-semibold">Cours signature</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-light">
              Une vidéo guidée de 20 à 30 minutes. Coaching précis, respiration et
              alignement. La séance principale du mois.
            </p>
          </article>

          <article className="card-dark flex h-full flex-col overflow-hidden p-6 sm:p-8">
            <div className="rounded-2xl border border-border bg-black/50 p-4">
              <p className="text-xs text-muted">Avant Amplitude</p>
              <div className="mt-4 flex h-28 items-end justify-center gap-2">
                {[30, 45, 35, 50, 40].map((h, i) => (
                  <div
                    key={i}
                    className="w-7 rounded-t bg-white/15"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
            <h3 className="mt-6 text-xl font-semibold">Progression mesurable</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-light">
              Répétition intelligente, amplitude progressive, adaptation du système
              nerveux — exactement comme en musculation.
            </p>
          </article>

          <article className="card-dark flex h-full flex-col overflow-hidden p-6 sm:p-8">
            <div className="space-y-3 rounded-2xl border border-border bg-black/50 p-4">
              <p className="text-xs italic text-muted">Séance complémentaire</p>
              <div className="rounded-xl border border-gold/20 bg-gold/10 px-4 py-3">
                <p className="text-sm text-text">Série 2/4 — 45 secondes</p>
              </div>
              <div className="flex items-start gap-2 rounded-xl bg-card px-3 py-2">
                <div className="mt-0.5 h-6 w-6 shrink-0 rounded-full bg-gold/30" />
                <p className="text-sm text-muted-light">
                  Timer · séries · texte à l&apos;écran — esprit fitness.
                </p>
              </div>
            </div>
            <h3 className="mt-6 text-xl font-semibold">Trainings complémentaires</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-light">
              Deux entraînements silencieux par semaine pour renforcer et approfondir
              le travail du cours principal.
            </p>
          </article>

          <article className="card-dark grid overflow-hidden lg:grid-cols-2">
            <div className="flex flex-col justify-center p-8 sm:p-10">
              <p className="text-sm lowercase text-muted-light">semaine type</p>
              <h3 className="mt-4 text-2xl font-semibold sm:text-3xl">
                3 séances maximum. 20–30 minutes.
              </h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-light">
                1 cours guidé + 2 trainings complémentaires. Pas besoin de pratiquer
                tous les jours ni de faire des heures de stretching.
              </p>
              <div className="mt-8 flex flex-wrap gap-6">
                <div>
                  <p className="text-3xl font-bold text-gold">3×</p>
                  <p className="text-xs text-muted">par semaine</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gold">4</p>
                  <p className="text-xs text-muted">semaines / objectif</p>
                </div>
              </div>
            </div>
            <div className="relative min-h-[240px] border-l border-border bg-card p-8 lg:min-h-[280px]">
              <div className="relative mt-8 max-w-xs rounded-2xl border border-border bg-bg p-4">
                <p className="text-xs text-gold">Cette semaine</p>
                <p className="mt-2 text-sm font-medium">Cours signature · Training A</p>
                <p className="mt-1 text-xs text-muted">Prochaine séance : mercredi</p>
              </div>
            </div>
          </article>
        </RevealGroup>
      </div>
    </section>
  );
}
