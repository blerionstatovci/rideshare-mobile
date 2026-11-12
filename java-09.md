# RideShare — Java 9

## Çfarë ndërtova

Shtova ruajtjen e udhëtimeve te të preferuarat në kartat e listës dhe në faqen e detajeve. Preferencat ruhen në Neon për llogarinë e përdoruesit që hyn me GitHub, kështu që shfaqen përsëri pas rifreskimit. Vizitori që nuk është futur ftohet të hyjë para ruajtjes.

Pas klikimit, butoni ndryshon menjëherë. Nëse serveri dështon, ekrani kthehet te gjendja e mëparshme dhe shfaqet **Provo përsëri**. Butoni çaktivizohet gjatë ruajtjes. API-ja përdor `PUT` dhe `DELETE`, ndërsa çelësi unik në databazë parandalon rreshtat e dyfishtë.

## Provat teknike që bëra

- `npm.cmd run lint` — kaloi.
- `npm.cmd run build` — kaloi; Next.js përfshiu rrugën dinamike `/api/udhetimet/[id]/preferuar`.
- Faqja kryesore lokale ktheu HTTP 200.
- API-ja e preferencave ktheu HTTP 401 për vizitorin, siç pritet pa hyrje.
- Aplikova `schema-java09.sql` në Neon-in e konfiguruar dhe verifikova që tabela `udhetimet_favoritet` ekziston.
- Me sesion provizor, API-ja lexoi gjendjen fillestare, ruajti të njëjtin udhëtim dy herë, lexoi sërish `favorit: true` dhe e hoqi me sukses. Kontrolli në databazë gjeti vetëm një rresht. Profili dhe preferenca e testit u fshinë menjëherë pas provës.
- Në Chrome, simulova përgjigjen HTTP 503: butoni u kthye te gjendja e mëparshme, riprovimi funksionoi, preferenca mbeti pas rifreskimit dhe heqja funksionoi. Sesioni provizor dhe të dhënat e provës u pastruan.

## Provat për demonstrim me llogari

Provat e API-së dhe të ndërfaqes u bënë me sesion provizor, jo me llogari reale GitHub. Kështu u provuan ruajtja, rikthimi pas gabimit, riprovimi, rifreskimi dhe heqja pa përdorur një llogari reale.

### Prova 1: Ruajtja mbetet pas rifreskimit

**Hapat:** Në provën lokale me sesion provizor, ruajta udhëtimin dhe rifreskova faqen.

**Rezultati:** Pas rifreskimit, butoni në kartë mbeti i zgjedhur. API-ja e lexoi preferencën e ruajtur nga Neon.

### Prova 2: Gabimi i serverit e kthen gjendjen dhe lejon riprovimin

**Hapat:** Simulova përgjigje HTTP 503 për kërkesën e ruajtjes, pastaj hoqa simulimin dhe shtypa **Provo përsëri**.

**Rezultati:** Pas dështimit, butoni u kthye te gjendja e mëparshme dhe shfaqi gabimin. Pas heqjes së simulimit, riprovimi ruajti udhëtimin.

### Prova 3: Klikimet e përsëritura nuk krijojnë kopje

**Hapat:** Dërgova dy kërkesa `PUT` rresht për të njëjtin udhëtim dhe kontrollova numrin e rreshtave në Neon.

**Rezultati:** Dy kërkesa krijuan një rresht të vetëm. Në ndërfaqe, butoni çaktivizohet gjatë ruajtjes.

## Ku gjendet puna

- `aplikacioni/src/components/PreferuariUdhetimit.tsx` — gjendja optimiste, rikthimi, hyrja dhe riprovimi.
- `aplikacioni/src/app/api/udhetimet/[id]/preferuar/route.ts` — API-ja me kontroll hyrjeje.
- `aplikacioni/src/lib/favoritet.ts` — leximet dhe ndryshimet në Neon.
- `aplikacioni/schema-java09.sql` — tabela me çelës unik për llogari dhe udhëtim.
- `aplikacioni/src/components/KartaUdhetimi.tsx` dhe `aplikacioni/src/app/udhetimi/[id]/page.tsx` — vendet ku shfaqet butoni.

Repository: https://github.com/blerionstatovci/rideshare-mobile

## Çfarë mbetet për përmirësim

Hyrja me GitHub OAuth duhet përdorur në demonstrimin me llogarinë reale. Për një databazë tjetër, ekzekuto fillimisht `schema.sql`, pastaj `schema-java05.sql` dhe në fund `schema-java09.sql`. Pas commit dhe push, kontrollo që vendosja e publikuar përdor të njëjtin konfigurim të Neon dhe GitHub OAuth.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)

Përdora ChatGPT për strukturën e ruajtjes optimiste, trajtimin e gabimeve dhe raportin. Kontrollova vetë lint-in, build-in, përgjigjen e faqes lokale, autorizimin e API-së, rrjedhën në Chrome me sesion provizor dhe krijimin e tabelës në Neon. Hyrjen reale me GitHub duhet ta përdor gjatë prezantimit.
