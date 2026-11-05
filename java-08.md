# RideShare — Java 8

## Çfarë ndërtova

Te faqja e detajeve shtova zgjedhjen e vendtakimit në komponentin e klientit.
Teksti që përdoruesi shkruan dhe vendtakimi i konfirmuar ruhen veçmas në
gjendjen lokale të faqes; konfirmimi nuk e ndryshon databazën. Vendndodhja
kërkohet vetëm pasi përdoruesi shtyp **“Përdor vendndodhjen time”**. Gjatë
kërkimit shfaqet pritja, ndërsa refuzimi, mungesa e pozicionit dhe skadimi pas
10 sekondash kanë mesazhe të veçanta. Pas secilit rast, vendtakimi mund të
shkruhet dhe konfirmohet manualisht. Aplikacioni nuk ruan ose dërgon koordinata;
lejon vetëm shfaqjen kalimtare të saktësisë në metra.

## Provat që bëra

### Prova 1: Leja nuk kërkohet sapo hapet faqja

**Hapat:** Ekzekutova `npm.cmd run lint` dhe `npm.cmd run build`, nisa serverin
lokal të prodhimit me lidhjen e databazës aktive dhe hapa `/udhetimi/2` në
Chrome. Në shfletues zëvendësova përkohësisht API-në GPS me një provë lokale
fiktive që numëron thirrjet.

**Pritshmëria:** Projekti kalon kontrollet teknike dhe faqja hapet pa kërkuar
lejen e vendndodhjes. API-ja GPS thirret vetëm pas klikimit të butonit dhe
pritja përdor timeout 10 sekonda.

**Rezultati:** Lint-i dhe build-i kaluan; faqja e ID 2 u hap me HTTP 200 dhe
shfaqi detajet. Thirrjet GPS ishin 0 para klikimit dhe 1 pas tij. Shfaqet
`Po kërkojmë vendndodhjen…` dhe opsionet e API-së përfshijnë `timeout: 10000`.

### Prova 2: Refuzimi i lejes nuk e bllokon përdoruesin

**Hapat:** Në provën lokale GPS ktheu gabimin `code: 1`. Shkrova
`Hyrja pranë parkingut`, kontrollova vlerën e zgjedhur para konfirmimit, pastaj
shtypa **“Konfirmo”**.

**Pritshmëria:** Shfaqet mesazhi i refuzimit, fusha manuale mbetet e përdorshme
dhe teksti i shkruar nuk e ndryshon vendtakimin e zgjedhur para konfirmimit.
Pas konfirmimit, vendtakimi i zgjedhur ndryshon vetëm në këtë faqe.

**Rezultati:** Shfletuesi shfaqi mesazhin e refuzimit. Para konfirmimit fusha
kishte `Hyrja pranë parkingut`, ndërsa vendtakimi i zgjedhur mbeti
`Te stacioni kryesor`. Pas konfirmimit u shfaq `Hyrja pranë parkingut`.

### Prova 3: Dëshmitë në GitHub nuk tregojnë adresën time reale

**Hapat:** Vendosa përgjigje GPS fiktive me koordinatat 42.1, 20.2 dhe saktësi
35 m; kontrollova tekstin e faqes. Provova gjithashtu gabimet `code: 2`,
`code: 3` dhe mungesën e API-së geolocation.

**Pritshmëria:** Shfaqet `Pozicioni u mor`, fusha lejon vendtakimin manual dhe
konfirmimi nuk zbulon koordinata. Gabimet e mungesës/skadimit dhe mungesa e
mbështetjes kanë mesazhe përkatëse dhe e riaktivizojnë butonin.

**Rezultati:** U shfaq `Pozicioni u mor (saktësia rreth 35 m)`; koordinatat
fiktive nuk u shfaqën në faqe. Gabimet `code: 2`, `code: 3` dhe API-ja që
mungon dhanë secila mesazhin e vet dhe butoni u riaktivizua. Nuk përdora
koordinata reale.

### Prova 4: Konfirmimi i një hyrjeje të re

**Hyrja që provova:** Zëvendësova `Te stacioni kryesor` me
`Porta jugore e bibliotekes`.

**Parashikimi im para klikimit:** Para se të shtypja **“Konfirmo”**, fusha do
ta shfaqte hyrjen e re, por vendtakimi i zgjedhur do të mbetej
`Te stacioni kryesor`. Pas klikimit prisja që vendtakimi i zgjedhur të
ndryshonte dhe të shfaqej mesazhi i konfirmimit.

**Çfarë pashë realisht:** Në Chrome lokalisht, fusha shfaqi
`Porta jugore e bibliotekes`; para klikimit vendtakimi i zgjedhur mbeti
`Te stacioni kryesor`. Pas klikimit, faqja shfaqi
`Vendtakimi i zgjedhur: Porta jugore e bibliotekes` dhe
`Vendtakimi u konfirmua në këtë pajisje.`

**Skedari dhe funksioni që e shpjegojnë:**
`aplikacioni/src/components/Vendtakimi.tsx`, komponenti `Vendtakimi`, ruan
veçmas tekstin e fushës dhe vendtakimin e zgjedhur me `useState`.
`konfirmoVendtakimin` e pastron tekstin dhe e ndryshon vendtakimin e zgjedhur
vetëm pas konfirmimit.

**Çfarë kuptova ose korrigjova:** Shkrimi i hyrjes nuk e ndryshon vetë
vendtakimin; duhet shtypur **“Konfirmo”**. Ky konfirmim mbetet në gjendjen
lokale të faqes dhe nuk ruhet në databazë.

**Shënim për provën:** Faqja normale `/udhetimi/2` shfaqi
`Nuk u lidhëm me databazën. Provo përsëri.` gjatë këtij testimi. Për të provuar
ndërfaqen, përdora përkohësisht rrugën lokale `/verifikim-java08`, e cila
renderonte komponentin real `Vendtakimi` me vendtakimin fillestar
`Te stacioni kryesor`; rrugën e përkohshme e hoqa pas provës. Lidhja me Neon
nuk u verifikua nga kjo provë.

## Ku gjendet puna

- `aplikacioni/src/components/Vendtakimi.tsx` — forma, gjendja lokale dhe leja
  e vendndodhjes.
- `aplikacioni/src/app/udhetimi/[id]/page.tsx` — përfshirja te detajet e
  udhëtimit.
- `aplikacioni/src/app/globals.css` — paraqitja dhe fokusimi i kontrolleve.
- Demo: https://rideshare-mobile-snowy.vercel.app
- Repository: https://github.com/blerionstatovci/rideshare-mobile

## Çfarë mbetet për përmirësim

Prova GPS u bë në Chrome me përgjigje fiktive, jo me lejen dhe sensorin e një
telefoni fizik; demonstrimi në telefon mbetet për klasë. Vendtakimi i konfirmuar
është vetëm për këtë faqe dhe nuk ruhet mes rifreskimeve. Pas demonstrimit,
bëj commit dhe push të kodit dhe këtij raporti. Pastaj dorëzo lidhjen e
repository-t me formularin e Javës 8, krijo Issue-n dhe kontrollo komentin e
kontrollit automatik; pas korrigjimeve, bëj push dhe kërko rikontroll në të
njëjtin Issue.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)

Përdora ChatGPT për të kthyer kërkesat e ushtrimit në komponentin e klientit,
mesazhet e gjendjeve dhe stilimin. Kontrollova vetë lint-in dhe build-in;
provat e lejes në pajisje mbeten për demonstrim.
