-- Te dhena fiktive per laboratorin Java 4; ekzekutoje ne Neon SQL Editor.
CREATE TABLE IF NOT EXISTS udhetimet (
  id TEXT PRIMARY KEY,
  nisja TEXT NOT NULL,
  destinacioni TEXT NOT NULL,
  ora TEXT NOT NULL CHECK (ora ~ '^([01][0-9]|2[0-3]):[0-5][0-9]$'),
  vendtakimi TEXT NOT NULL,
  shoferi TEXT NOT NULL,
  vende INTEGER NOT NULL CHECK (vende >= 0)
);
INSERT INTO udhetimet (id, nisja, destinacioni, ora, vendtakimi, shoferi, vende)
VALUES
  ('1', 'Prishtë', 'AAB', '08:00', 'Stacioni i autobusëve', 'Arta', 2),
  ('2', 'Fushë Kosovë', 'AAB', '08:15', 'Te stacioni kryesor', 'Dreni', 1),
  ('3', 'Lipjan', 'AAB', '07:45', 'Qendra e qytetit', 'Blerimi', 0)
ON CONFLICT (id) DO NOTHING;
SELECT * FROM udhetimet ORDER BY id;