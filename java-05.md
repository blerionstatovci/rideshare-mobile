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

- `npm run lint` kaloi pa gabime.
- `npm run build` kaloi dhe gjeneroi rrugët `/panel` dhe `/api/auth/[...nextauth]`.
- Aplikacioni lokal ktheu 200 për listën, `/panel`, endpoint-in e auth dhe detajet e ID 2.
- `schema-java05.sql` u ekzekutua në Neon; tabela `profilet` dhe kolona `udhetimet.shofer_id` u verifikuan.
- Hyrja reale me GitHub, caktimi i ID-së personale si pronar dhe provat e ruajtjes/refuzimit të orës kërkojnë OAuth App dhe kredencialet e tua.

## Siguria

`GITHUB_ID`, `GITHUB_SECRET`, `NEXTAUTH_SECRET` dhe `DATABASE_URL` nuk vendosen
në repository. Roli dhe pronari nuk merren nga formulari; verifikohen në server
para çdo UPDATE.
