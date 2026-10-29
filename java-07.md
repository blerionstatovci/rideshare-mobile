# RideShare — Java 7 · Kontrolli i MVP-së

## Rasti dhe parashikimi

**Rasti 3 · Klikim apo rezervim.** Përdoruesi hap listën, zgjedh një udhëtim,
shikon detajet dhe provon kërkesën demonstruese. Pritshmëria është që ID-ja dhe
të dhënat të jenë të njëjta në listë e detaje; faqja e kërkesës duhet të thotë
qartë se nuk ka rezervim dhe shoferi nuk njoftohet.

Kodi personal nuk u gjenerua, sepse linku i gjeneratorit nuk ishte në tekstin e
ngjitur. Prandaj provat përdorin të dhënat demo që u kthyen nga API-ja, jo të
dhënat personale të caktuara nga kursi.

## Dy probleme dhe korrigjimi

1. Mesazhi i kërkesës thoshte se demonstrimi e kishte “pranuar” kërkesën, që
   mund të dukej si miratim. Teksti në
   `aplikacioni/src/app/udhetimi/[id]/kerkesa/page.tsx` tani sqaron se kërkesa
   regjistrohet vetëm në demonstrim, shoferi nuk njoftohet dhe vendi nuk
   rezervohet.
2. Faqja kryesore nuk shpjegonte nëse duhej hyrë për ta provuar kërkesën.
   Teksti në `aplikacioni/src/app/page.tsx` tani thotë se hyrja me GitHub hap
   profilin dhe panelin, ndërsa kërkesa demonstruese mund të provohet edhe pa
   hyrë.

## Provat

Provat u kryen në aplikacionin lokal, te `http://127.0.0.1:3000`, me udhëtimin
ID 2 që u kthye nga API-ja. Të tria kaluan me të dhënat demo që ishin në
databazë.

### Prova 1 · Lista

- **Hapat:** Hapa `/` dhe kërkova udhëtimet; pastaj hapa `/api/udhetimet`.
- **Pritshmëria:** Lista publike shfaq udhëtimet nga Neon, ndërsa API-ja kthen
  të njëjtat të dhëna publike.
- **Vëzhgimi:** Faqja u përgjigj me HTTP 200 dhe shfaqi listën. API-ja u
  përgjigj me HTTP 200 dhe ktheu tri udhëtime. ID 2 ishte Fushë Kosovë → AAB,
  ora 08:15, me 1 vend të lirë. Faqja sqaroi se hyrja hap profilin dhe panelin,
  por nuk kërkohet për kërkesën demonstruese.

### Prova 2 · Lista te detajet

- **Hapat:** Hapa `/udhetimi/2`.
- **Pritshmëria:** Shfaqen detajet e udhëtimit me ID 2 dhe ID-ja përputhet me
  kartën e zgjedhur në listë.
- **Vëzhgimi:** Faqja u përgjigj me HTTP 200 dhe shfaqi të njëjtin ID 2,
  Fushë Kosovë → AAB, nisjen 08:15 dhe 1 vend të lirë. Shoferi ishte Dreni dhe
  vendtakimi “Te stacioni kryesor”.

### Prova 3 · Kërkesa demonstruese

- **Hapat:** Hapa `/udhetimi/2/kerkesa`.
- **Pritshmëria:** Shfaqet simulimi dhe sqarohet se nuk ka rezervim real ose
  njoftim për shoferin.
- **Vëzhgimi:** Faqja u përgjigj me HTTP 200. Shfaqi “Simulim: Në pritje” dhe
  sqaroi se kërkesa u regjistrua vetëm në demonstrim, shoferi nuk u njoftua dhe
  vendi nuk u rezervua.

## Hyrja dhe të dhënat

Hyrja me GitHub vazhdon të hapë profilin dhe panelin. Ndryshimi i Java 7 vetëm
sqaroi se hyrja nuk kërkohet për kërkesën demonstruese. Të dhënat lexohen nga
Neon në server përmes `aplikacioni/src/lib/udhetimet.ts`. Nuk ndryshova të dhëna
në databazë.

## Commit-et

- **Para:** https://github.com/blerionstatovci/rideshare-mobile/commit/de1433349a35ca3cf2d7fd372fdeb180c137e93d
- **Pas:** https://github.com/blerionstatovci/rideshare-mobile/commit/2a415d3ef08a554fb782451d15b91a9d4c69efc7

## Ndihma nga AI

Përdora AI për të shqyrtuar udhëzimin, për të kontrolluar rrjedhën e skedarëve
dhe për të provuar faqet lokale. Rezultatet e tri provave u raportuan siç u
shfaqën; AI nuk u përdor për të sajuar të dhëna ose rezultate.
