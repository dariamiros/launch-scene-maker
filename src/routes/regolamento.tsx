import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { PageShell } from "@/components/site-chrome";
import completo from "@/assets/rules/regolamento_completo.pdf.asset.json";
import libretto from "@/assets/rules/libretto_regole.pdf.asset.json";
import {
  CAPITOLI,
  CASELLE,
  COMPONENTI,
  FAQ,
  MAGIE,
  MISSIONI,
  POTERI,
  SQUADRE,
  TEMPESTE,
  type Carta,
} from "@/lib/regolamento";

const TITLE = "Regolamento completo — Prima dell’Alba";
const DESCRIPTION =
  "Le regole complete di Prima dell’Alba: preparazione, turno, caselle, duelli, poteri dei personaggi, varianti e l’elenco di tutte le 64 carte. Scarica il PDF.";

export const Route = createFileRoute("/regolamento")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Regolamento,
});

function Chapter({ n, id, title, children }: { n: number; id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-border pt-10">
      <h2 className="flex items-baseline gap-4 font-display text-2xl font-bold uppercase tracking-wide md:text-3xl">
        <span className="text-primary">{n}.</span>
        {title}
      </h2>
      <div className="mt-6 space-y-5 text-base leading-relaxed text-foreground/90 md:text-[17px]">
        {children}
      </div>
    </section>
  );
}

function Table({ head, rows }: { head: string[]; rows: readonly (readonly ReactNode[])[] }) {
  return (
    <div className="overflow-x-auto border border-border">
      <table className="w-full min-w-[480px] text-left text-sm md:text-base">
        <thead className="bg-secondary">
          <tr>
            {head.map((h) => (
              <th
                key={h}
                className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-border">
              {r.map((c, j) => (
                <td key={j} className="px-4 py-3 align-top">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-3">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-[0.6em] h-1.5 w-1.5 flex-none rounded-full bg-primary" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

function Steps({ items }: { items: ReactNode[] }) {
  return (
    <ol className="space-y-4">
      {items.map((it, i) => (
        <li key={i} className="flex gap-4">
          <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full border-2 border-primary font-display text-sm font-bold text-primary">
            {i + 1}
          </span>
          <span className="pt-1">{it}</span>
        </li>
      ))}
    </ol>
  );
}

function CardList({ cards, tone }: { cards: Carta[]; tone: "magia" | "tempesta" }) {
  return (
    <ol className="grid gap-3 sm:grid-cols-2">
      {cards.map((c, i) => (
        <li
          key={c.nome}
          className={`border bg-card/60 p-4 ${tone === "magia" ? "border-primary/50" : "border-tile-blue/60"}`}
        >
          <div className="flex items-baseline justify-between gap-3">
            <span className="font-semibold">
              <span className="mr-2 text-primary">{i + 1}.</span>
              {c.nome}
            </span>
            {c.conserva && (
              <span className="flex-none border border-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-primary">
                Conservala
              </span>
            )}
          </div>
          <p className="mt-2 text-sm leading-relaxed text-foreground/85">{c.testo}</p>
        </li>
      ))}
    </ol>
  );
}

const btnPrimary =
  "inline-flex h-12 items-center bg-primary px-6 text-sm font-semibold uppercase tracking-[0.06em] text-primary-foreground transition-colors hover:bg-primary-glow";
const btnOutline =
  "inline-flex h-12 items-center border-[1.5px] border-primary px-6 text-sm font-semibold uppercase tracking-[0.06em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground";

function Regolamento() {
  let missionNo = 0;

  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-5 pb-12 pt-16 md:px-8 md:pt-24">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Regolamento</p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold uppercase leading-tight tracking-wide md:text-6xl">
          Le regole complete
        </h1>
        <p className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-foreground/75">
          Gioco da tavolo natalizio di squadra · 2–6 giocatori · dai 6 anni · 25–35 minuti
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a href={completo.url} download="Prima-dell-Alba-Regolamento-completo.pdf" className={btnPrimary}>
            Scarica il regolamento completo (PDF)
          </a>
          <a href={libretto.url} download="Prima-dell-Alba-Libretto-regole.pdf" className={btnOutline}>
            Libretto illustrato (PDF)
          </a>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-24 md:px-8 lg:grid-cols-[240px_1fr]">
        <nav aria-label="Indice del regolamento" className="lg:sticky lg:top-28 lg:self-start">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-primary">Indice</p>
          <ol className="grid grid-cols-1 gap-x-6 gap-y-2 text-sm sm:grid-cols-2 lg:grid-cols-1">
            {CAPITOLI.map((c, i) => (
              <li key={c.id}>
                <a href={`#${c.id}`} className="text-foreground/75 transition-colors hover:text-primary">
                  <span className="mr-2 text-primary">{i + 1}.</span>
                  {c.titolo}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="min-w-0 space-y-14">
          <Chapter n={1} id="storia" title="La storia">
            <p>
              È la notte di Natale e in ogni angolo del mondo i bambini dormono. Ma il sole sta per
              sorgere! <strong>Babbo Natale</strong>, l’elfo <strong>Jing</strong> e la renna{" "}
              <strong>Cometa</strong> devono consegnare tutti i regali prima dell’alba. Peccato che i{" "}
              <strong>Furfanti</strong> siano in agguato: l’elfo ladro <strong>Cappellostorto</strong>,
              l’orso <strong>Gelone</strong> e la volpe <strong>Codarossa</strong> vogliono rubare ogni
              dono o sostituirlo con un pezzo di carbone. Chi sarà più veloce… e più furbo?
            </p>
          </Chapter>

          <Chapter n={2} id="contenuto" title="Contenuto della scatola">
            <Table head={["Componente", "Quantità", "A cosa serve"]} rows={COMPONENTI} />
            <p>
              Il percorso ha <strong>50 caselle</strong>: 1 Partenza, 1 Arrivo, 12 verdi, 14 blu, 11
              gialle e 11 rosse.
            </p>
          </Chapter>

          <Chapter n={3} id="scopo" title="Scopo del gioco">
            <p>
              Si gioca a squadre: i <strong>Buoni</strong> (Babbo Natale, Jing, Cometa) contro i{" "}
              <strong className="text-rogue">Furfanti</strong> (Cappellostorto, Gelone, Codarossa).
            </p>
            <Bullets
              items={[
                "I Buoni vogliono consegnare i regali sui tetti delle case (caselle verdi).",
                "I Furfanti vogliono rubarli e portarli nella loro Tana.",
              ]}
            />
            <p>La partita finisce in uno di questi tre modi:</p>
            <Steps
              items={[
                <>
                  <strong>Vittoria immediata dei Buoni:</strong> tutti i regali in gioco sono sui tetti
                  delle case allo stesso tempo.
                </>,
                <>
                  <strong>Vittoria immediata dei Furfanti:</strong> tutti i regali in gioco sono nella
                  Tana.
                </>,
                <>
                  <strong>Alba:</strong> il segnalino Alba arriva sul sole. Si contano i regali (vedi
                  capitolo 13).
                </>,
              ]}
            />
          </Chapter>

          <Chapter n={4} id="squadre" title="Giocatori e squadre">
            <Table head={["Giocatori", "Squadre", "Regali in gioco", "L’Alba avanza"]} rows={SQUADRE} />
            <p>
              Con 3 o 5 giocatori la squadra più piccola inizia con 2 carte Magia. Un{" "}
              <strong>round</strong> è completo quando ogni giocatore ha fatto un turno.
            </p>
          </Chapter>

          <Chapter n={5} id="preparazione" title="Preparazione">
            <Steps
              items={[
                "Apri il tabellone sul tavolo. Il percorso va da PARTENZA ad ARRIVO.",
                "Metti il segnalino Alba sulla prima casella del Tracciato dell’Alba (la luna).",
                <>
                  Prendi i regali in gioco (numero in tabella) e mettili vicino al tabellone: è la{" "}
                  <strong>scorta</strong>. I regali che avanzano tornano nella scatola. Metti nella
                  scorta anche gli 8 carboni.
                </>,
                <>
                  Appoggia il coperchio della scatola vicino ai Furfanti: è la <strong>Tana</strong>,
                  dove finiranno i regali rubati.
                </>,
                "Mescola separatamente le carte Missione, Magia e Tempesta e metti i tre mazzi coperti accanto al tabellone.",
                "Ogni giocatore sceglie un personaggio della propria squadra e mette la pedina su PARTENZA, in piedi.",
                "Inizia il giocatore più giovane tra i Buoni. Poi si alterna: un Buono, un Furfante, un Buono, un Furfante…",
              ]}
            />
          </Chapter>

          <Chapter n={6} id="turno" title="Il tuo turno">
            <Steps
              items={[
                <>
                  <strong>Usa un potere</strong> (facoltativo): puoi usare il potere del tuo personaggio
                  prima di tirare (capitolo 10).
                </>,
                <>
                  <strong>Tira il dado e muovi</strong> la pedina in avanti, lungo il percorso, di tanti
                  passi quanti ne indica il dado.
                </>,
                <>
                  <strong>Duello:</strong> se ti fermi su una casella occupata da un avversario, fate un
                  duello (capitolo 9).
                </>,
                <>
                  <strong>Azione della casella:</strong> esegui l’azione del colore su cui ti trovi
                  (capitolo 7).
                </>,
                "Passa il turno al giocatore successivo.",
              ]}
            />
            <p>
              Si va sempre avanti. Due pedine della stessa squadra possono stare nella stessa casella.
              Il <strong>percorso è un cerchio</strong>: se superi ARRIVO, continui da PARTENZA con i
              passi che restano. Ogni volta che una pedina passa da ARRIVO o da PARTENZA, il suo
              giocatore pesca 1 carta Magia e, se il suo potere è usato (pedina sdraiata), lo ricarica
              (rimetti la pedina in piedi). Non si possono avere più di 2 carte Magia in mano.
            </p>
            <p>
              Il movimento dato da una carta o da un potere <strong>non</strong> attiva l’azione della
              casella in cui si arriva.
            </p>
          </Chapter>

          <Chapter n={7} id="caselle" title="Le caselle">
            <ul className="space-y-3">
              {CASELLE.map((c) => (
                <li key={c.nome} className="flex items-start gap-4 border border-border bg-card/50 p-4">
                  <span className={`mt-1 h-7 w-7 flex-none ${c.swatch}`} aria-hidden />
                  <div>
                    <p className="font-semibold">
                      {c.colore} <span className="text-primary">· {c.nome}</span>
                    </p>
                    <p className="mt-1 text-foreground/85">{c.testo}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Chapter>

          <Chapter n={8} id="regali" title="Regali, carboni e Tana">
            <p>
              Su ogni casa verde può esserci <strong>un solo</strong> regalo oppure{" "}
              <strong>un solo</strong> carbone.
            </p>
            <Bullets
              items={[
                <>
                  <strong>Consegna (Buono):</strong> se ti fermi su una casa verde libera e nella scorta
                  c’è un regalo, mettilo sul tetto, cioè sulla casella.
                </>,
                <>
                  <strong>Furto (Furfante):</strong> se ti fermi su una casa con un regalo, prendilo e
                  mettilo nella Tana. La casa torna libera.
                </>,
                <>
                  <strong>Scambio col carbone (Furfante):</strong> invece di rubare, puoi prendere un
                  carbone dalla scorta e metterlo sulla casa al posto del regalo. Il regalo torna nella
                  scorta (non va nella Tana). La casa resta <strong>bloccata</strong>: nessuno può
                  consegnare lì finché il carbone non viene tolto.
                </>,
                <>
                  <strong>Togliere il carbone (Buono):</strong> se ti fermi su una casa con il carbone,
                  rimettilo nella scorta. Il tuo turno finisce lì, senza consegnare.
                </>,
                <>
                  <strong>Casa vuota:</strong> se un Furfante si ferma su una casa senza regali, non
                  succede nulla.
                </>,
                "Se nella scorta non ci sono regali, i Buoni non possono consegnare.",
              ]}
            />
            <p className="border-l-2 border-primary pl-4 italic text-foreground/80">
              Rubare porta punti ai Furfanti; scambiare blocca la casa e fa perdere tempo ai Buoni. A voi
              scegliere la tattica!
            </p>
          </Chapter>

          <Chapter n={9} id="duello" title="Il duello di palle di neve">
            <p>
              Se ti fermi su una casella occupata da un avversario, fate subito un duello: tu e lui
              tirate un dado ciascuno. Chi fa il numero più alto vince (se pareggiate, tirate ancora). Il
              vincitore sceglie una di queste due cose:
            </p>
            <Bullets
              items={[
                <>
                  <strong>Spinta:</strong> lo sconfitto torna indietro di 3 caselle.
                </>,
                <>
                  <strong>Bottino:</strong> un Buono vincitore recupera 1 regalo dalla Tana e lo rimette
                  nella scorta; un Furfante vincitore ruba 1 regalo da una casa qualsiasi e lo mette
                  nella Tana.
                </>,
              ]}
            />
            <p>
              Se vince chi si è appena mosso, esegue poi l’azione della casella. Se vince chi era già
              sulla casella, chi è arrivato perde il turno. Lo sconfitto non fa nessuna azione. Dopo un
              duello non si fanno altri duelli nello stesso turno.
            </p>
          </Chapter>

          <Chapter n={10} id="poteri" title="I personaggi e i loro poteri">
            <p>
              Ogni personaggio ha un potere che si usa <strong>una volta</strong>, all’inizio del proprio
              turno, prima di tirare il dado (tranne dove indicato). Dopo l’uso sdraia la pedina: si
              ricarica quando passi da PARTENZA o ARRIVO.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {POTERI.map((p) => {
                const rogue = p.squadra === "Furfanti";
                return (
                  <div
                    key={p.nome}
                    className={`border-2 bg-card/50 p-4 ${rogue ? "border-rogue/70" : "border-primary/70"}`}
                  >
                    <p className="font-display text-lg font-bold">{p.nome}</p>
                    <p
                      className={`mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${rogue ? "text-rogue" : "text-primary"}`}
                    >
                      {p.squadra} · {p.potere}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/85">{p.testo}</p>
                  </div>
                );
              })}
            </div>
          </Chapter>

          <Chapter n={11} id="carte" title="Le carte">
            <h3 className="font-display text-lg font-bold text-tile-blue">Carte Missione (blu)</h3>
            <p>
              Quando atterri su una casella blu, pesca una carta Missione e leggila ad alta voce.{" "}
              <strong>La squadra avversaria fa da giuria</strong>: decide, con onestà natalizia, se la
              missione è riuscita. Se la carta dice “Squadra”, i tuoi compagni possono aiutarti; se sei
              solo nella tua squadra, scegli un avversario come aiutante. Se la missione riesce, ottieni
              il premio indicato sulla carta:
            </p>
            <Bullets
              items={[
                <>
                  <strong>+2 / +3 caselle:</strong> avanza di quel numero di passi.
                </>,
                <>
                  <strong>Magia:</strong> pesca una carta Magia.
                </>,
                <>
                  <strong>Regalo:</strong> un Buono mette un regalo dalla scorta su una casa verde
                  libera entro 5 caselle davanti a sé; un Furfante ruba un regalo da una casa entro 5
                  caselle davanti o dietro di sé.
                </>,
              ]}
            />
            <p>Se la missione non riesce non succede nulla: nessuna penitenza! Poi la carta va sotto il mazzo.</p>
            <h3 className="pt-2 font-display text-lg font-bold text-primary">Carte Magia (oro)</h3>
            <p>
              Sono aiuti. Si usano subito, tranne quelle con “Conservala”, che si tengono in mano e si
              giocano quando serve.
            </p>
            <h3 className="pt-2 font-display text-lg font-bold text-tile-blue">Carte Tempesta (ghiaccio)</h3>
            <p>Sono imprevisti: si applicano subito. Alcune riguardano tutti i giocatori.</p>
          </Chapter>

          <Chapter n={12} id="alba" title="Il tracciato dell’Alba">
            <p>
              Il segnalino Alba parte dalla luna. Alla fine di ogni round (o ogni 2 o 3 round, vedi
              capitolo 4) spostalo di una casella verso il sole. Quando arriva sul sole è{" "}
              <strong>ALBA</strong>: la partita finisce subito. Alcune carte possono farlo avanzare o
              tornare indietro.
            </p>
          </Chapter>

          <Chapter n={13} id="fine" title="Fine della partita">
            <p>Se il sole sorge, contate:</p>
            <Bullets
              items={[
                <>
                  <strong>Buoni:</strong> i regali che sono sui tetti delle case.
                </>,
                <>
                  <strong>Furfanti:</strong> i regali che sono nella Tana.
                </>,
              ]}
            />
            <p>
              Vince la squadra che ne ha di più. In caso di parità vincono i Buoni: il Natale è salvo! I
              carboni non contano per i punti, ma bloccano le case.
            </p>
          </Chapter>

          <Chapter n={14} id="varianti" title="Varianti">
            <div className="grid gap-3 md:grid-cols-3">
              {[
                [
                  "Partita facile",
                  "dai 6 anni",
                  "Niente poteri e niente duelli. Chi si ferma su una casella occupata la divide con l’avversario.",
                ],
                [
                  "Partita esperta",
                  "dai 10 anni",
                  "I poteri si ricaricano solo da ARRIVO; un Furfante può scambiare col carbone solo se ha già un regalo nella Tana; il segnalino Alba avanza di 1 anche ogni volta che un giocatore tira 6.",
                ],
                [
                  "Cooperativa",
                  "1–3 giocatori",
                  "Tutti sono Buoni e giocano a turno. I Furfanti sono controllati dal dado: a fine round tira un dado. Con 1–2 un regalo a caso va nella Tana; con 3–4 si mette un carbone su una casa a caso; con 5–6 l’Alba avanza di una casella in più. Si vince se alla fine tutti i regali in gioco sono sui tetti, o se sono più di quelli rubati.",
                ],
              ].map(([t, s, d]) => (
                <div key={t} className="border border-border bg-card/50 p-5">
                  <p className="font-display text-lg font-bold">{t}</p>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">{s}</p>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/85">{d}</p>
                </div>
              ))}
            </div>
          </Chapter>

          <Chapter n={15} id="faq" title="Domande frequenti">
            <dl className="divide-y divide-border border-y border-border">
              {FAQ.map(([q, a]) => (
                <div key={q} className="py-4">
                  <dt className="font-semibold">{q}</dt>
                  <dd className="mt-1 text-foreground/85">{a}</dd>
                </div>
              ))}
            </dl>
          </Chapter>

          <Chapter n={16} id="elenco" title="Elenco delle carte">
            <h3 className="font-display text-xl font-bold text-tile-blue">40 carte Missione</h3>
            {MISSIONI.map((g) => (
              <div key={g.gruppo}>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                  {g.gruppo}
                  {g.nota && <span className="ml-2 normal-case tracking-normal text-foreground/60">({g.nota})</span>}
                </p>
                <ol className="divide-y divide-border border-y border-border">
                  {g.carte.map((c) => {
                    missionNo += 1;
                    return (
                      <li key={missionNo} className="flex items-start gap-4 py-3 text-sm md:text-base">
                        <span className="w-6 flex-none text-right text-primary">{missionNo}.</span>
                        <span className="flex-1">{c.testo}</span>
                        <span className="flex-none border border-primary/60 px-2 py-0.5 text-xs font-semibold text-primary">
                          {c.premio}
                        </span>
                      </li>
                    );
                  })}
                </ol>
              </div>
            ))}

            <h3 className="pt-4 font-display text-xl font-bold text-primary">12 carte Magia</h3>
            <CardList cards={MAGIE} tone="magia" />

            <h3 className="pt-4 font-display text-xl font-bold text-tile-blue">12 carte Tempesta</h3>
            <CardList cards={TEMPESTE} tone="tempesta" />
          </Chapter>

          <p className="border-t border-border pt-10 text-center font-display text-xl text-primary">
            Buon divertimento e buon Natale!
          </p>
        </div>
      </div>
    </PageShell>
  );
}
