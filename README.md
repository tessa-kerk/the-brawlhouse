<p align="center">
  <img src="assets/readme/hero.png" alt="The BrawlHouse — a cutaway of Starr Park's staff dorms at night: Gale's, Janet's and Griff's rooms lit, Mr. P at the front desk, and a chained Secret Room door" width="100%">
</p>

<h1 align="center">The BrawlHouse</h1>

<p align="center">
  <em>Visit Starr Park's employee housing, talk to the Brawlers, uncover the lore, and unlock the Secret Room. A speculative Brawl Stars GTM concept — with a working live-AI prototype and a full strategy deck.</em>
</p>

<p align="center">
  <a href="https://brawlhouse.tessa-kerk.com"><strong>▶&nbsp; Try the prototype</strong></a>
  &nbsp;·&nbsp;
  <a href="https://brawlhouse.tessa-kerk.com/case-study.html"><strong>Case study</strong></a>
  &nbsp;·&nbsp;
  <a href="https://brawlhouse.tessa-kerk.com/"><strong>Landing page</strong></a>
  &nbsp;·&nbsp;
  <a href="brawlhouse-deck.pdf"><strong>Strategy deck</strong></a>
</p>

---

## What it is

Starr Park's night shift has clocked in, and the staff dorms are open to visitors. Gale mops. Janet rehearses. Griff counts the takings. And behind the desk, Mr. P watches everything.

You wander the rooms, talk to the Brawlers, and work out what Mr. P doesn't want you to find. Every resident knows a piece of what's going on at Starr Labs; none of them knows all of it. Compare what they let slip and the shape of it starts to come together — and one door in the BrawlHouse stays chained shut until you've earned the way in.

---

## Meet the residents

<p align="center">
  <img src="assets/readme/residents.png" alt="The four residents in their rooms — Gale, Janet, Griff and Mr. P" width="100%">
</p>

Four Brawlers are checked in this season. Each has their own room, their own personality, and their own piece of the mystery.

- **Gale · Park Janitor** — *"Forty years of maintenance. Lately that includes noting which deliveries don't appear on any manifest."*
- **Janet · Star Performer** — *"Living life like a spotlight! …why are you asking so many questions?"*
- **Griff · Gift Shop Mogul** — *"Global sales: 9,999,999. Best not to ask exactly what we're moving."*
- **Mr. P · Manager, Front Desk** — *"Smiling is mandatory. Questions about the back rooms are not encouraged."*

---

## Built to show, not just tell

<p align="center">
  <img src="assets/readme/conversation.png" alt="A live conversation with Griff, who stays fully in character" width="620">
</p>

Rather than pitch it in slides, I built a working prototype. Connect the mock Supercell ID and all four rooms run on live AI, each bound by the same guardrails, so the conversation stays responsive while the puzzle stays exact.

The Brawlers improvise freely — you can ask them anything — but the guardrails hold:

- You can't talk a resident into handing over the Secret Room's code.
- You can't get one to confirm an unannounced Brawler or spoil anything Supercell hasn't.
- And if a visitor says something that sounds like a genuine real-world crisis, the character steps out of the bit to point them to real help.

Not a hope — stress-tested with 220 adversarial probes (spelled-out passcodes, "another resident already told me," jailbreaks, and more) and they held.

---

## One door nobody's meant to open

<p align="center">
  <img src="assets/readme/secret-room.png" alt="A heavy door in the BrawlHouse wrapped in chains, marked Staff Only, glowing purple" width="620">
</p>

There's a room in the BrawlHouse that stays chained shut, and only the community can open it. Each Super Creator gets one lore fragment — no two the same, no single one enough on its own. Pool the clues and the door gives. No brief needed: they've got something exclusive, their audience wants in, and the campaign runs itself. What's behind it is the part you have to find out for yourself.

---

## Why this works

The game is the proof; the [deck](brawlhouse-deck.pdf) is the argument.

**The problem.** Brawl Stars ships a major update every 5–6 weeks. Each is a marketing moment, but engagement peaks for about 72 hours and settles back to baseline. Players get the update; they don't get to *interact* with it. Nothing bridges the gap between cycles.

**The precedent.** For Brawl Stars' 5th anniversary, Supercell built an interactive Starr Park CCTV experience — 89M visits, 8,500+ organic creator videos, 130M+ views, $0 media spend. The BrawlHouse takes that same lore-discovery instinct and makes it conversational, and repeatable every season.

**The target.** Benchmarked against that CCTV moment, but built to run every season rather than fire once. The [deck](brawlhouse-deck.pdf) covers cross-team execution, the GTM timeline, in-game integration touchpoints, AI-safety guardrails, the monetisation layer, and a phased prototype-to-launch roadmap.

---

## How it was made

Built solo, over a few days. AI did the grunt work — the build, the art (Nano Banana), and the animated room loops (Veo 3.1) — but the concept, the four characters, the writing in my voice, and every judgement call were mine. The live-AI layer was added, hardened, and stress-tested on top. AI-generated visuals throughout, not official Supercell art.

The live-AI backend is a single Cloudflare Pages Function ([`functions/api/brawler-chat.js`](functions/api/brawler-chat.js)) that holds each Brawler's character, the guardrails, and the passcode filter in one place.

## What's in here

- `index.html` — the landing page
- `prototype.html` — the interactive prototype (dialogue engine, fragment collection, Secret Room logic)
- `case-study.html` — the write-up
- `functions/api/brawler-chat.js` — the live-AI backend (characters + guardrails)
- `brawlhouse-deck.pdf` — the full GTM strategy deck
- `assets/` — art, room-background loops, and portraits

---

A speculative GTM concept by **Tessa Kerk** · Creator Ecosystems &amp; Community Marketing. **Not affiliated with or endorsed by Supercell.** No Supercell code or art is used; character likenesses are an affectionate homage to Brawl Stars, and every visual is AI-generated.

<p align="center">
  <a href="https://www.tessa-kerk.com">Portfolio</a>
  &nbsp;·&nbsp;
  <a href="https://linkedin.com/in/tessa-kerk">LinkedIn</a>
  &nbsp;·&nbsp;
  <a href="https://brawlhouse.tessa-kerk.com">Try the prototype</a>
</p>
