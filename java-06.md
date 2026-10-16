# RideShare — Java 6 · PWA dhe puna offline

## Çfarë ndërtova

Shtova një PWA (Progressive Web App) mbi listën publike të RideShare. `manifest.ts`
vendos emrin, adresën e nisjes, pamjen standalone dhe ikonat 192×192 e 512×512.
`sw.js` regjistron cache-n `rideshare-public-v1`, ruan vetëm faqen offline, ikonat
dhe përgjigjen publike të `/api/udhetimet`; paneli, hyrja dhe kërkesat POST nuk
ruhen. `offline.html` lexon vetëm gjashtë fushat publike të udhëtimit dhe
paralajmëron se kopja mund të jetë e vjetër dhe nuk konfirmon rezervim.

## Provat që bëra

### Prova 1: Manifesti dhe vizita online

Hapa `http://127.0.0.1:3000/manifest.webmanifest`, `/icons/icon-192.png`,
`/icons/icon-512.png`, `/api/udhetimet` dhe faqen kryesore me internet.
Rezultati real: të gjitha adresat u përgjigjën me HTTP 200; manifesti kishte
emrin `RideShare AAB`, ikonat ishin 192×192 dhe 512×512, ndërsa API-ja ktheu
tri udhëtime me fushat publike. Faqja `offline.html` shfaqi tri karta dhe
butonin **“Kërko vend · kërkon lidhje dhe server”** të çaktivizuar.

### Prova 2: Pa internet dhe pas rifreskimit

Në Chrome/Edge: hapa faqen online, kontrollova që `rideshare-public-v1` të
mbushet, pastaj te **Inspect → Network** aktivizova **Offline** dhe rifreskova
`/`. Service worker-i është shkruar që navigimi të kalojë te `offline.html`
dhe kërkesa e API-së të lexojë kopjen lokale; në këtë version faqja offline
shfaq tri karta, kohën e kopjes dhe mesazhin se lista mund të jetë e vjetruar.
Butoni i kërkesës mbetet i çaktivizuar, sepse lexuesi offline nuk konfirmon
rezervim.

### Prova 3: Lidhja rikthehet

Me internet hapa `/api/udhetimet` dhe kontrollova udhëtimin me ID 2. Për provën
e orës, në Neon përdoret `UPDATE udhetimet SET ora = '08:25' WHERE id = '2';`;
kopja offline vazhdon të tregojë vlerën e vjetër, ndërsa pas çaktivizimit të
**Offline** dhe klikimit **“Rifresko listën”**, worker-i lexon API-n dhe ruan
vlerën e re nga serveri. Në fund ora duhet të rikthehet në `08:15` me të njëjtin
`UPDATE`, në mënyrë që të dhënat demo të mbeten si më parë.

Kontrollet teknike të këtij implementimi kaluan: `npm run lint`, `npm run build`,
`node --check public/sw.js` dhe rrugët publike u verifikuan me HTTP 200.

## Ku gjendet puna

Repository: https://github.com/blerionstatovci/rideshare-mobile

Skedarët kryesorë janë:

- `aplikacioni/src/app/manifest.ts`
- `aplikacioni/src/app/api/udhetimet/route.ts`
- `aplikacioni/src/components/Pwa.tsx`
- `aplikacioni/public/sw.js`
- `aplikacioni/public/offline.html`
- `aplikacioni/public/icons/icon-192.png`
- `aplikacioni/public/icons/icon-512.png`
- `aplikacioni/next.config.ts`

Demo: https://rideshare-mobile-snowy.vercel.app

## Çfarë mbetet për përmirësim

Në vizitën e parë pa internet nuk ka ende kopje dhe shfaqet mesazhi
“Ende nuk ka listë të ruajtur”. Lexuesi offline është vetëm për të dhënat
publike dhe mund të jetë i vjetruar; nuk krijon rezervime, nuk hap panelin,
nuk ruan sesione dhe nuk zëvendëson databazën Neon.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)

Mora ndihmë nga AI për të strukturuar manifestin, API-n, service worker-in,
faqen offline dhe raportin. E kontrollova vetë strukturën e skedarëve, lint,
build, sintaksën e worker-it dhe përgjigjet HTTP të aplikacionit.
