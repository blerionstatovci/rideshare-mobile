# RideShare - Java 3

## Çfarë u ndërtua

U ndërtua një rrjedhë demonstrimi në Next.js me App Router dhe të dhëna fiktive:

- lista kryesore me tri karta udhëtimesh;
- faqja e detajeve për çdo udhëtim me adresën `/udhetimi/[id]`;
- faqja e kërkesës me mesazhin **"Simulim: Në pritje"**;
- gjendja e çaktivizuar **"Nuk ka vende të lira"** për udhëtimin 3;
- faqja **"Udhëtimi nuk u gjet"** për adresat që nuk ekzistojnë, si `/udhetimi/99`.

## Provat

### Prova 1 - Lista në telefon

E hapa aplikacionin në viewport telefoni rreth 375 px. U shfaqën saktësisht tri karta dhe nuk pati lëvizje horizontale. Teksti dhe lidhjet mbetën brenda gjerësisë së ekranit.

### Prova 2 - Detajet dhe kufizimi i vendeve

Klikova kartën 2 dhe adresa ndryshoi në `/udhetimi/2`. Faqja shfaqi nisjen Fushë Kosovë, destinacionin Kolegji AAB, vendtakimin, orën dhe 1 vend të lirë. Karta 3 shfaqi butonin e çaktivizuar **"Nuk ka vende të lira"**. Adresa `/udhetimi/99` shfaqi faqen **"Udhëtimi nuk u gjet"**.

### Prova 3 - Kërkesa dhe kthimi mbrapa

Nga detajet e kartës 2 klikova **"Kërko vend"**. Faqja shfaqi **"Simulim: Në pritje"**. Lidhja **"Kthehu te detajet"** riktheu faqen e udhëtimit pa rezervim real ose ruajtje në server.

## Kufijtë e MVP-së

Të dhënat janë fiktive dhe aplikacioni nuk përdor databazë, autentikim, pagesa ose rezervim real. Kërkesa është vetëm një demonstrim i rrjedhës së përdoruesit.
