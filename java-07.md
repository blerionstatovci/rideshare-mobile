# RideShare — Java 7 · Kontrolli i MVP-së

## Rasti im

Kodi personal: P7-194
GitHub: blerionstatovci
Rasti: Rasti 3 · Klikim apo rezervim.
Udhëtimi i provuar: ID 2 nga lista që ktheu databaza e projektit.

## Parashikimi

Pa hyrë me GitHub, Arta duhet të shohë listën, të hapë të njëjtin ID në detaje
dhe të provojë kërkesën. Lista dhe detajet duhet të tregojnë të njëjtën nisje,
orë dhe vende të lira. Faqja e kërkesës duhet ta quajë qartë simulim dhe të
thotë se shoferi nuk njoftohet dhe vendi nuk rezervohet.

## Ndryshimi i ri

Në faqen kryesore u shtua shpjegimi se hyrja me GitHub hap profilin dhe panelin,
por kërkesa demonstruese mund të provohet pa hyrë. Në faqen e kërkesës, teksti
tani thotë se kërkesa regjistrohet vetëm në demonstrim dhe nuk krijon rezervim
ose njoftim për shoferin.

## Dy probleme

1. Faqja e kërkesës thoshte se demonstrimi e kishte “pranuar” kërkesën. Kjo
   mund të kuptohej si miratim i shoferit.
2. Faqja kryesore shfaqte butonin e hyrjes, por nuk tregonte nëse hyrja kërkohej
   për kërkesën demonstruese.

## Korrigjimi

Arsyeja: Mesazhi i mëparshëm mund të krijonte përshtypjen se kishte ndodhur
rezervim real. E ndryshova që të thotë se kërkesa shfaqet vetëm në demonstrim,
shoferi nuk njoftohet dhe vendi nuk rezervohet. Shtova edhe sqarimin në faqen
kryesore që hyrja me GitHub nuk kërkohet për kërkesën demonstruese.

Skedari: aplikacioni/src/app/page.tsx

### Prova 1

Hapat: Nisa aplikacionin, hapa / pa hyrë me GitHub dhe pastaj hapa /api/udhetimet.

Pritshmëria: Faqja shfaq listën; API-ja kthen udhëtimet publike. Shpjegimi tregon se hyrja nuk kërkohet për kërkesën demonstruese.

Vëzhgimi: Faqja dhe API-ja u përgjigjën me HTTP 200. API-ja ktheu tri udhëtime. ID 2 ishte Fushë Kosovë → AAB, ora 08:15, me 1 vend të lirë. Faqja shpjegoi se hyrja hap profilin dhe panelin, por kërkesa mund të provohet pa hyrë.

### Prova 2

Hapat: Nga lista ndoqa ID 2 duke hapur /udhetimi/2.

Pritshmëria: Detajet paraqesin të njëjtin ID dhe të njëjtat të dhëna si karta në listë.

Vëzhgimi: Faqja u përgjigj me HTTP 200 dhe shfaqi ID 2, Fushë Kosovë → AAB, nisjen 08:15 dhe 1 vend të lirë. Shoferi ishte Dreni dhe vendtakimi “Te stacioni kryesor”.

### Prova 3

Hapat: Hapa /udhetimi/2/kerkesa pa hyrë me GitHub.

Pritshmëria: Faqja tregon simulimin dhe sqaron se nuk ka rezervim real ose njoftim për shoferin.

Vëzhgimi: Faqja u përgjigj me HTTP 200. Shfaqi “Simulim: Në pritje” dhe sqaroi se kërkesa u regjistrua vetëm në demonstrim, shoferi nuk u njoftua dhe vendi nuk u rezervua.

## Ndryshimi i hyrjes

Hyrja me GitHub vazhdon të hapë profilin dhe panelin. Ndryshimi i kësaj jave
qartëson se hyrja nuk kërkohet për kërkesën demonstruese. Udhëtimet lexohen nga
Neon në server përmes aplikacioni/src/lib/udhetimet.ts.

## Ndihma nga AI

Përdora ChatGPT për të analizuar komentet e kontrollit automatik, për të
organizuar raportin sipas fushave të kërkuara dhe për të shqyrtuar tekstet e
ndryshuara. Aplikacioni u kontrollua në zhvillim lokal me ndihmën e AI-së;
provat duhet t'i demonstroj vetë në klasë.

## Versionet

Para: https://github.com/blerionstatovci/rideshare-mobile/commit/de1433349a35ca3cf2d7fd372fdeb180c137e93d

Pas: https://github.com/blerionstatovci/rideshare-mobile/commit/2a415d3ef08a554fb782451d15b91a9d4c69efc7

