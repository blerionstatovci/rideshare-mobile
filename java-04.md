# RideShare — Java 4 · Neon dhe PostgreSQL

## Çfarë ndërtova

Lista kryesore, faqja e detajeve dhe faqja e kërkesës lexojnë udhëtimet nga Neon
përmes funksioneve server-only në `aplikacioni/src/lib/udhetimet.ts`. Lidhja ruhet
në `DATABASE_URL` dhe nuk ekspozohet në shfletues. Faqet përdorin `force-dynamic`,
prandaj ndryshimet në databazë shfaqen pas rifreskimit.

## Provat që bëra

### Prova 1: Ndryshimi në databazë shfaqet në aplikacion

Skema dhe kodi janë gati për ndryshimin e orës së ID 2 nga `08:15` në `08:25`
në Neon SQL Editor. Pas konfigurimit të `DATABASE_URL`, rifreskimi i listës dhe
detajeve duhet të shfaqë `08:25`; ora rikthehet në `08:15` me SQL Editor.
Kjo provë kërkon lidhjen reale me Neon dhe nuk u ekzekutua pa kredencialin privat.

### Prova 2: Lista bosh dhe rikthimi

Kur pyetja e `lexoUdhetimet` përdor përkohësisht `WHERE false`, aplikacioni
shfaq `Nuk ka udhëtime për momentin.`. Heqja e kushtit rikthen tri kartat.
Sjellja është implementuar në faqen kryesore dhe verifikohet pasi të lidhet Neon.

### Prova 3: Lidhja mungon, rikthimi dhe siguria

Nëse `DATABASE_URL` mungon ose riemërtohet përkohësisht, aplikacioni shfaq
`Nuk u lidhëm me databazën. Provo përsëri.`. `.env.local` është i përfshirë në
`.gitignore` dhe nuk duhet të publikohet.

## Ku gjendet puna

Skema ndodhet te `aplikacioni/schema.sql`. Kodi i databazës është te
`aplikacioni/src/lib/db.ts` dhe `aplikacioni/src/lib/udhetimet.ts`; faqet e
listës, detajeve dhe kërkesës përdorin tani funksione async.

## Çfarë mbetet për përmirësim

Kërkesa “Në pritje” mbetet simulim: nuk ka ruajtje të rezervimit, autentikim
ose njoftim real të shoferit. Hapi i ardhshëm është konfigurimi i Neon dhe
ekzekutimi i tri provave me databazën reale.

## Ndihma nga AI

U përdor ndihmë nga AI për integrimin e kërkesave të ushtrimit me strukturën
ekzistuese të projektit. Verifikimi i databazës dhe provat me SQL Editor duhet
të bëhen vetë me `DATABASE_URL` privat të projektit.