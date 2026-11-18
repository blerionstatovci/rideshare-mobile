# RideShare — Java 10

## Çfarë ndërtova

Shtova kërkesa reale për vende në Neon, lexim të gjendjes sipas rolit dhe rifreskim automatik çdo 5 sekonda te detajet e udhëtimit. Udhëtari mund të dërgojë kërkesë një herë dhe të shohë statusin e vet; shoferi pronar i udhëtimit sheh kërkesat dhe mund t'i pranojë. Pranimi ndryshon statusin dhe ul vendet në të njëjtin funksion SQL, me bllokim të rreshtave, kështu që pranimi i përsëritur nuk ul sërish numrin dhe vendet nuk shkojnë nën zero. Leximet janë `no-store`; kur rrjeti bie ruhet pamja e fundit, shfaqet paralajmërimi dhe veprimet bllokohen derisa të rikthehet lidhja.

## Provat teknike

- `npm.cmd run lint` — kaloi pa gabime.
- `npm.cmd run build` — kaloi; u përfshinë `/api/udhetimet/[id]/gjendja`, `/api/udhetimet/[id]/kerkesat` dhe `/api/kerkesat/[id]/prano`.
- `schema-java10.sql` u aplikua dhe u verifikua në Neon-in e projektit; tabela `udhetimet_kerkesat` dhe funksioni `prano_kerkesen(bigint,text)` ekzistojnë.
- Rrugët API u provuan me dy sesione JWT të nënshkruara lokalisht për profilet testuese ekzistuese. Vizitori mori `401`; kërkesa u krijua (`201`), dublikatë e njëjtë u kthye (`200`) me të njëjtin ID; udhëtari pa “Në pritje” dhe shoferi pronar e pa kërkesën.
- Pranimi u provua dy herë: hera e parë `200`, përsëritja `200`, vendet mbetën 1. Kërkesa e dytë me vende të vendosura në 0 mori `409` dhe mesazhin “Nuk ka më vende të lira.”
- Të dhënat provizore u fshinë; udhëtimi 2 u kthye në 1 vend dhe pronari i mëparshëm. Nuk u ndryshuan kërkesat/profilet ekzistuese.
- Rasti i ndërprerjes së rrjetit dhe rilidhjes është i implementuar në komponent, por ende duhet provuar në shfletues me DevTools → Network → Offline dhe No throttling.

## Rezultatet e provave të funksionalitetit

### Prova 1: Kërkesa mbetet në pritje dhe shfaqet te shoferi

- Udhëtimi testues/ID: 2 (të dhënat provizore u pastruan pas provës)
- Hapat: Dërgova `POST /api/udhetimet/2/kerkesat` me sesionin e udhëtarit; lexova gjendjen me sesionin e udhëtarit dhe të shoferit.
- Rezultati: Kërkesa u krijua me `201`; udhëtari pa statusin `ne_pritje`, shoferi pa kërkesën pa Refresh. Dublikatë e kërkesës ktheu të njëjtin ID.

### Prova 2: Pranimi ul vendet vetëm një herë

- Vendet para/pas: 2 → 1.
- Hapat: Thirra endpoint-in e pranimit dy herë për të njëjtën ID. Të dy përgjigjet ishin `200`; pas të dyjave mbeti 1 vend.
- Me 0 vende, pranimi i një kërkese tjetër ktheu `409` dhe “Nuk ka më vende të lira”; numri mbeti 0.

### Prova 3: Offline dhe rilidhja

- Ende nuk e kam provuar në DevTools. Komponenti ruan gjendjen e fundit, shfaq paralajmërimin kur leximet dështojnë, çaktivizon veprimet dhe rilexon pas ngjarjes `online` ose timer-it pasues. Duhet plotësuar ky rezultat pas provës vizuale.

## Skedarët kryesorë

- `aplikacioni/src/components/GjendjaUdhetimitLive.tsx` — sinkronizimi periodik dhe ndërfaqja.
- `aplikacioni/src/lib/kerkesat.ts` — leximet me leje dhe veprimet e autentikuara.
- `aplikacioni/src/app/api/udhetimet/[id]/gjendja/route.ts`, `aplikacioni/src/app/api/udhetimet/[id]/kerkesat/route.ts`, `aplikacioni/src/app/api/kerkesat/[id]/prano/route.ts` — API-ja.
- `aplikacioni/schema-java10.sql` — tabela, indeksi dhe funksioni atomik i pranimit.
- `aplikacioni/src/app/udhetimi/[id]/page.tsx`, `aplikacioni/src/app/globals.css` — përfshirja dhe pamja.

## Çfarë mbetet para dorëzimit

Për provën vizuale, përdor dy sesione të ndryshme dhe te udhëtari simulo Offline, ndërsa shoferi qëndron online; prano kërkesën, pastaj rilidhe udhëtarin dhe kontrollo që pa Refresh të shfaqen statusi i pranuar dhe vendi i ri. Plotëso vëzhgimin final. Pastaj commit/push kodin dhe raportin, hap Issue-n e javës 10 dhe lexo përgjigjen e kontrollit automatik.

Mos dorëzo `.env.local`, kredenciale ose të dhëna reale të udhëtarëve.

## Ndihma nga AI

Përdora ChatGPT për strukturën e API-së, lejet sipas sesionit, rifreskimin periodik dhe funksionin SQL që bën pranimin dhe uljen e vendeve atomikisht. Kontrollova lint-in, build-in, migrimin në Neon dhe rrjedhën e API-së me sesione testuese. Prova offline/rilidhje në shfletues mbetet për demonstrim.
