// Contenuto del regolamento completo di Prima dell’Alba (dal PDF dell’autrice).

export const COMPONENTI = [
  ["Tabellone", "1", "Percorso di 50 caselle e Tracciato dell’Alba"],
  ["Pedine personaggio", "6", "3 Buoni e 3 Furfanti"],
  ["Gettoni Regalo dorati", "12", "I doni da consegnare o rubare"],
  ["Gettoni Carbone", "8", "Servono ai Furfanti per sostituire un regalo"],
  ["Segnalino Alba (luna e sole)", "1", "Scandisce il tempo che resta"],
  ["Dadi", "2", "Movimento e duelli"],
  ["Carte Missione (blu)", "40", "Giochi e sfide di squadra"],
  ["Carte Magia (oro)", "12", "Aiuti e bonus"],
  ["Carte Tempesta (ghiaccio)", "12", "Imprevisti"],
  ["Regolamento", "1", "Questo libretto"],
] as const;

export const SQUADRE = [
  ["2", "1 contro 1", "6", "ogni 3 round"],
  ["3", "2 contro 1", "6", "ogni 2 round"],
  ["4", "2 contro 2", "9", "ogni round"],
  ["5", "3 contro 2", "9", "ogni round"],
  ["6", "3 contro 3", "12", "ogni round"],
] as const;

export type Casella = { colore: string; nome: string; testo: string; swatch: string };

export const CASELLE: Casella[] = [
  {
    colore: "Verde",
    nome: "Casa",
    testo: "Buono: consegna un regalo. Furfante: ruba o scambia (capitolo 8).",
    swatch: "bg-tile-green",
  },
  {
    colore: "Blu",
    nome: "Missione",
    testo: "Pesca una carta Missione e prova a completarla.",
    swatch: "bg-tile-blue",
  },
  {
    colore: "Giallo",
    nome: "Magia",
    testo: "Pesca una carta Magia e usala subito (salvo se dice “Conservala”).",
    swatch: "bg-tile-yellow",
  },
  {
    colore: "Rosso",
    nome: "Tempesta",
    testo: "Pesca una carta Tempesta e applica subito l’effetto.",
    swatch: "bg-tile-red",
  },
  {
    colore: "Partenza / Arrivo",
    nome: "Polo Nord",
    testo: "Non succede nulla, ma si pesca 1 carta Magia quando si passa.",
    swatch: "bg-foreground",
  },
];

export type Potere = { nome: string; squadra: "Buoni" | "Furfanti"; potere: string; testo: string };

export const POTERI: Potere[] = [
  {
    nome: "Babbo Natale",
    squadra: "Buoni",
    potere: "Consegna magica",
    testo:
      "Metti un regalo dalla scorta su una casa verde libera fino a 6 caselle davanti a te, senza fermarti lì.",
  },
  {
    nome: "Jing l’elfo",
    squadra: "Buoni",
    potere: "Aiuto dell’elfo",
    testo: "Togli un carbone da qualsiasi casa e rimettilo nella scorta.",
  },
  {
    nome: "Cometa la renna",
    squadra: "Buoni",
    potere: "Galoppata",
    testo: "Tira il dado due volte e somma i risultati.",
  },
  {
    nome: "Cappellostorto l’elfo ladro",
    squadra: "Furfanti",
    potere: "Mano lesta",
    testo: "Ruba un regalo da una casa entro 5 caselle davanti o dietro di te e mettilo nella Tana.",
  },
  {
    nome: "Gelone l’orso",
    squadra: "Furfanti",
    potere: "Spallata",
    testo: "Scegli una pedina avversaria entro 6 caselle: torna indietro di 3.",
  },
  {
    nome: "Codarossa la volpe",
    squadra: "Furfanti",
    potere: "Passo felpato",
    testo: "In questo turno non fai duelli e aggiungi 2 al risultato del dado.",
  },
];

export type Missione = { testo: string; premio: string };

export const MISSIONI: { gruppo: string; nota?: string; carte: Missione[] }[] = [
  {
    gruppo: "Indovinelli",
    nota: "Premio +2, salvo diversa indicazione",
    carte: [
      { testo: "Ha la barba bianca, un sacco di doni e viaggia in slitta. Chi è? (Babbo Natale)", premio: "+2" },
      { testo: "Cado dal cielo leggera e bianca e copro ogni cosa. Che cosa sono? (La neve)", premio: "+2" },
      { testo: "Sono rossa e dorata, ho un fiocco e dentro una sorpresa. Che cosa sono? (Un regalo)", premio: "+2" },
      { testo: "Ho le corna come rami e tiro la slitta. Chi sono? (La renna)", premio: "+2" },
      { testo: "Sono verde tutto l’anno e mi vestono di luci e palline. Chi sono? (L’albero di Natale)", premio: "+2" },
      { testo: "Faccio din-din quando mi scuoti. Che cosa sono? (Una campanella)", premio: "+2" },
      { testo: "Brillo di notte e se cado esprimi un desiderio. Che cosa sono? (Una stella cadente)", premio: "+3" },
      { testo: "Sono calda e dolce e ho la panna sopra. Che cosa sono? (La cioccolata calda)", premio: "+2" },
    ],
  },
  {
    gruppo: "Mimo",
    carte: [
      { testo: "Mima una renna che vola: la squadra indovina in 15 secondi.", premio: "+2" },
      { testo: "Mima Babbo Natale che infila un regalo nel camino.", premio: "+2" },
      { testo: "Mima un pupazzo di neve che si scioglie.", premio: "+2" },
      { testo: "Mima un elfo che impacchetta un regalo.", premio: "+2" },
      { testo: "Mima una persona che scarta il regalo più bello del mondo.", premio: "+2" },
      { testo: "Mima una volpe che cammina in punta di zampe senza farsi sentire.", premio: "+3" },
      { testo: "Mima di pattinare sul ghiaccio senza cadere.", premio: "+2" },
    ],
  },
  {
    gruppo: "Memoria",
    carte: [
      { testo: "Un avversario dice 3 parole di Natale: ripetile nello stesso ordine.", premio: "+2" },
      { testo: "Di’ in ordine i 6 personaggi del gioco senza guardare le pedine.", premio: "Magia" },
      { testo: "Un avversario batte un ritmo con le mani: ripetilo uguale.", premio: "+2" },
      { testo: "Chiudi gli occhi: un avversario sposta una pedina. Indovina quale!", premio: "Magia" },
      { testo: "Di’ 5 cose che si trovano sotto l’albero in 10 secondi.", premio: "+3" },
      { testo: "Ripeti 3 volte veloce: “Sotto la neve la renna Cometa canta e danza”.", premio: "+2" },
    ],
  },
  {
    gruppo: "Squadra",
    carte: [
      { testo: "Tu e un compagno dite insieme il nome di un regalo. Se è lo stesso, avanzate tutti e due di 3.", premio: "+3" },
      { testo: "Inventate una frase di Natale dicendo una parola a testa (4 parole).", premio: "Magia" },
      { testo: "Fate con le mani la forma di un albero: gli avversari indovinano.", premio: "+2" },
      { testo: "Un compagno disegna un oggetto natalizio sulla tua schiena: indovina quale.", premio: "Magia" },
      { testo: "Cantate insieme due righe di una canzone di Natale (anche fischiettata).", premio: "+2" },
      { testo: "Statua di ghiaccio: restate immobili 10 secondi mentre gli avversari provano a farvi ridere.", premio: "+3" },
      { testo: "Gridate in coro “Buon Natale!” nello stesso istante.", premio: "+2" },
    ],
  },
  {
    gruppo: "Movimento",
    carte: [
      { testo: "Salta come un elfo 5 volte.", premio: "+2" },
      { testo: "Cammina come un pinguino per 3 passi.", premio: "+2" },
      { testo: "Fai il giro del tavolo come una slitta in volo (con il rumore!).", premio: "+3" },
      { testo: "Stai su un piede solo per 10 secondi contando ad alta voce.", premio: "+2" },
      { testo: "Gira 5 volte su te stesso come un fiocco di neve e resta in equilibrio.", premio: "+2" },
      { testo: "Tocca 3 oggetti rossi in 10 secondi.", premio: "+3" },
    ],
  },
  {
    gruppo: "Creatività",
    carte: [
      { testo: "Inventa un nome buffo per una renna.", premio: "+2" },
      { testo: "Racconta in 3 frasi la notte in cui Babbo Natale ha perso un calzino.", premio: "Regalo" },
      { testo: "Descrivi il regalo più bello del mondo senza dire “regalo”.", premio: "+2" },
      { testo: "Fai una pubblicità di 10 secondi per il tuo personaggio.", premio: "Magia" },
      { testo: "Inventa una rima con la parola “stella”.", premio: "+2" },
      { testo: "Disegna con il dito sul tavolo il tuo regalo preferito: gli avversari indovinano.", premio: "Regalo" },
    ],
  },
];

export type Carta = { nome: string; testo: string; conserva?: boolean };

export const MAGIE: Carta[] = [
  { nome: "Slitta veloce", testo: "Avanza di 3 caselle." },
  { nome: "Doppio tiro", testo: "Tira ancora il dado e muoviti di nuovo." },
  { nome: "Scudo di neve", testo: "Ignora un duello o una carta Tempesta.", conserva: true },
  { nome: "Scambio di posto", testo: "Scambia la tua pedina con quella di un compagno (se sei solo, con un avversario a scelta)." },
  { nome: "Vento in poppa", testo: "Tutti i tuoi compagni avanzano di 1 casella." },
  { nome: "Elfo aiutante", testo: "I Buoni tolgono un carbone da una casa; i Furfanti prendono un carbone dalla scorta e lo mettono su una casa libera." },
  { nome: "Stella cadente", testo: "Un Buono mette un regalo su una casa verde libera qualsiasi; un Furfante ruba un regalo da qualsiasi casa." },
  { nome: "Campanelle", testo: "L’avversario che ti segue più da vicino salta il prossimo turno." },
  { nome: "Cioccolata calda", testo: "Al tuo prossimo turno tira due dadi e scegli il risultato.", conserva: true },
  { nome: "Aurora", testo: "Sposta il segnalino Alba indietro di una casella." },
  { nome: "Passaggio segreto", testo: "Vai alla prossima casella blu davanti a te e pesca una Missione." },
  { nome: "Biscotti per tutti", testo: "Un compagno a tua scelta tira subito il dado e si muove." },
];

export const TEMPESTE: Carta[] = [
  { nome: "Tormenta", testo: "Torna indietro di 2 caselle." },
  { nome: "Il cane abbaia", testo: "Salti il prossimo turno." },
  { nome: "Slitta in panne", testo: "Tira il dado: con 1–3 torni indietro di 3, con 4–6 non succede nulla." },
  { nome: "Il gallo canta", testo: "Il segnalino Alba avanza di una casella." },
  { nome: "Camino ostruito", testo: "Metti un carbone sulla prima casa verde libera davanti a te." },
  { nome: "Folletto dispettoso", testo: "Scambia la tua pedina con quella avversaria più vicina." },
  { nome: "Bambino sveglio", testo: "Al tuo prossimo turno, se ti fermi su una casa verde non succede nulla." },
  { nome: "Neve profonda", testo: "Il tuo prossimo tiro vale la metà (arrotonda per eccesso)." },
  { nome: "Aurora boreale", testo: "Tutti tirano il dado: chi fa il numero più basso torna indietro di 2." },
  { nome: "Vento gelido", testo: "La squadra avversaria torna indietro di 1 con ogni pedina." },
  { nome: "Regalo smarrito", testo: "Togli un regalo dalla Tana, oppure da una casa se la Tana è vuota, e rimettilo nella scorta." },
  { nome: "Slittino fuori controllo", testo: "Avanza di 4 caselle e salta la prossima azione della casella." },
];

export const FAQ = [
  ["Posso tornare indietro?", "No, ma alcune carte e i duelli ti fanno arretrare."],
  [
    "Cosa succede se vinco il duello e il mio avversario è sulla Partenza?",
    "Funziona come sempre: perde il turno e torna indietro di 3 (cioè nelle ultime caselle del percorso).",
  ],
  ["Se la Tana è vuota e vinco un duello come Buono?", "Scegli la Spinta."],
  ["Il regalo consegnato da un potere conta?", "Sì, è un regalo sul tetto come gli altri."],
  ["Se pesco una Missione che non posso fare (ad esempio “Squadra”)?", "Pesca un’altra carta."],
  ["Posso usare due poteri nello stesso turno?", "No, uno solo, e solo il tuo."],
] as const;

export const CAPITOLI = [
  { id: "storia", titolo: "La storia" },
  { id: "contenuto", titolo: "Contenuto della scatola" },
  { id: "scopo", titolo: "Scopo del gioco" },
  { id: "squadre", titolo: "Giocatori e squadre" },
  { id: "preparazione", titolo: "Preparazione" },
  { id: "turno", titolo: "Il tuo turno" },
  { id: "caselle", titolo: "Le caselle" },
  { id: "regali", titolo: "Regali, carboni e Tana" },
  { id: "duello", titolo: "Il duello di palle di neve" },
  { id: "poteri", titolo: "I personaggi e i loro poteri" },
  { id: "carte", titolo: "Le carte" },
  { id: "alba", titolo: "Il tracciato dell’Alba" },
  { id: "fine", titolo: "Fine della partita" },
  { id: "varianti", titolo: "Varianti" },
  { id: "faq", titolo: "Domande frequenti" },
  { id: "elenco", titolo: "Elenco delle carte" },
] as const;
