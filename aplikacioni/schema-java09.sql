-- Ekzekutoje në Neon pas schema.sql dhe schema-java05.sql.
-- Një rresht unik për llogari dhe udhëtim e bën ruajtjen të sigurt nga klikimet e përsëritura.
CREATE TABLE IF NOT EXISTS udhetimet_favoritet (
  github_id TEXT NOT NULL REFERENCES profilet(github_id) ON DELETE CASCADE,
  udhetim_id TEXT NOT NULL REFERENCES udhetimet(id) ON DELETE CASCADE,
  krijuar_me TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (github_id, udhetim_id)
);

CREATE INDEX IF NOT EXISTS udhetimet_favoritet_sipas_perdoruesit
ON udhetimet_favoritet (github_id, krijuar_me DESC);
