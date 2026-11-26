# Java 11 · Njoftimet dhe angazhimi

## Përgatitu

U kontrollua RideShare pas Java 10. Kërkesat dhe udhëtimet ruhen në Neon; të dhënat e provës duhet të jenë llogari GitHub dhe udhëtime testuese, pa të dhëna personale reale.

## Çfarë u ndërtua

- Shoferi mund të pranojë ose refuzojë kërkesën. Përgjigjja e ruajtur paraqitet në pamjen e udhëtarit.
- Për çdo përgjigje krijohet njoftim në aplikacion, i lidhur me ID-në e kërkesës dhe udhëtarin përkatës. Tabela ka ID të veçantë për çdo njoftim, që disa përgjigje/njoftime të mos ngatërrohen.
- Inbox-i gjendet te `/njoftimet`. Hapja e një njoftimi kontrollon pronësinë, e shënon si të lexuar dhe hap udhëtimin që përmban kërkesën përkatëse.
- Shtoi migrimin `aplikacioni/schema-java11.sql`; ekzekutohet në Neon pas skemës së Java 10.
- Njoftimet push nuk u aktivizuan; faqja i përcakton si zgjerim opsional. Inbox-i funksionon pa mbështetjen e push-it.

## Prova me koleg

Prova në pajisje me koleg nuk është kryer ende; nuk po paraqitet si rezultat i kryer. Skenari për verifikim:

1. Kërko dy udhëtarë me llogari prove të dërgojnë kërkesa të veçanta te i njëjti udhëtim.
2. Shoferi pranon kërkesën e parë dhe refuzon të dytën.
3. Kontrollo që secili udhëtar sheh përgjigjen e vet dhe inbox-i i tij përmban njoftimin e lidhur me ID-në e saktë të kërkesës.
4. Hape secilin njoftim: duhet të hapet udhëtimi përkatës dhe njoftimi të kalojë nga i palexuar në i lexuar.
5. Përsërit leximin dhe rifresko inbox-in: përgjigjet nuk duhet të ndërrohen ose të krijohen njoftime të dyfishta.
6. Çaktivizo/ mos mbështet push-in dhe përsërit skenarin: inbox-i duhet të vazhdojë të punojë.

**Pritej:** dy kërkesa të ndryshme të marrin përgjigjen e tyre, njoftimi të hapë kërkesën e saktë dhe të shënohet i lexuar.

**Ndodhi realisht:** migrimi u ekzekutua me sukses në Neon-in e projektit; u verifikuan tabela `njoftimet` dhe funksioni `refuzo_kerkesen(bigint,text)`. `npm run lint` dhe `npm run build` përfunduan me sukses. U krye provë integrimi në Neon me udhëtime dhe profile fiktive: dy kërkesa morën përgjigje të ndryshme, secili njoftim u lidh me kërkesën e saktë, u verifikua shënimi si i lexuar dhe të dhënat e provës u pastruan. Prova me koleg dhe telefona realë ende nuk është kryer.

## Dorëzimi

Skedari `java-11.md` është pranë README-së. Para dorëzimit, kryej provën me koleg në telefon dhe shto rezultatin real këtu; pastaj shty ndryshimet në GitHub, dorëzo lidhjen te formulari Java 11 dhe kërko `rikontrollo` pas korrigjimeve.
