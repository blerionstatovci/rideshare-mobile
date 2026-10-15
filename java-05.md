# RideShare — Java 5 · Hyrja me GitHub dhe lejet

## Çfarë u ndërtua

- Hyrja dhe dalja me GitHub përmes NextAuth 4.
- Profili dhe roli ruhen në tabelën `profilet` në Neon.
- Udhëtimet kanë pronar përmes fushës `shofer_id`.
- Paneli `/panel` shfaq profilin dhe formularin vetëm për shoferin.
- Ndryshimi i orës kryhet me Server Action dhe kontrollohet në server sipas rolit dhe pronarit.

## Skedarët kryesorë

- `aplikacioni/schema-java05.sql`
- `aplikacioni/src/lib/auth.ts`
- `aplikacioni/src/lib/lejet.ts`
- `aplikacioni/src/app/api/auth/[...nextauth]/route.ts`
- `aplikacioni/src/app/panel/actions.ts`
- `aplikacioni/src/app/panel/page.tsx`
- `aplikacioni/src/components/Hyrja.tsx`

## Provat

### Prova 1: Hyrja reale me GitHub

Hapa `http://localhost:3000`, klikova **Hyr me GitHub**, autorizova aplikacionin dhe u ktheva në panelin `/panel`.
Rezultati real: paneli shfaqi **“Përshëndetje, Blerion Statovci”**, ID-në GitHub `247399869`, rolin dhe butonin **“Dil”**.

### Prova 2: Roli udhëtar dhe kufizimi i lejeve

Në panelin e autentikuar kontrollova profilin e llogarisë së përdorur për hyrje.
Rezultati real: paneli shfaqi **“Roli: udhetar”** dhe mesazhin **“Si udhëtar mund t’i shohësh udhëtimet, por nuk mund të ndryshosh orën.”**; formulari i shoferit nuk u shfaq.

### Prova 3: Kontrollet teknike, rrugët dhe databaza

Ekzekutova `npm run lint` dhe `npm run build`, kontrollova rrugët lokale `/`, `/panel`, `/api/auth/providers` dhe `/udhetimi/2`, si dhe ekzekutova `schema-java05.sql` në Neon.
Rezultati real: lint dhe build kaluan pa gabime, rrugët u përgjigjën me HTTP 200 dhe u verifikuan tabela `profilet` dhe kolona `udhetimet.shofer_id`.

Testi i ndryshimit si shofer-pronar dhe refuzimit për një përdorues tjetër kërkon që profili i përdorur për hyrje të caktohet si `shofer` dhe të lidhet me udhëtimin; profili i provuar këtu është `udhetar`.

## Siguria

`GITHUB_ID`, `GITHUB_SECRET`, `NEXTAUTH_SECRET` dhe `DATABASE_URL` nuk vendosen
në repository. Roli dhe pronari nuk merren nga formulari; verifikohen në server
para çdo UPDATE.
