-- Ekzekutoje pas schema-java10.sql. Njoftimet ruhen veçmas dhe lidhen me ID-në e kërkesës.
ALTER TABLE udhetimet_kerkesat DROP CONSTRAINT IF EXISTS udhetimet_kerkesat_statusi_check;
ALTER TABLE udhetimet_kerkesat ADD CONSTRAINT udhetimet_kerkesat_statusi_check
  CHECK (statusi IN ('ne_pritje', 'pranuar', 'refuzuar'));

CREATE TABLE IF NOT EXISTS njoftimet (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  kerkesa_id BIGINT NOT NULL REFERENCES udhetimet_kerkesat(id) ON DELETE CASCADE,
  udhetar_id TEXT NOT NULL REFERENCES profilet(github_id) ON DELETE CASCADE,
  pergjigjja TEXT NOT NULL CHECK (pergjigjja IN ('pranuar', 'refuzuar')),
  krijuar_me TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  lexuar_me TIMESTAMPTZ,
  UNIQUE (kerkesa_id, pergjigjja)
);
CREATE INDEX IF NOT EXISTS njoftimet_perdoruesi ON njoftimet (udhetar_id, krijuar_me DESC);

CREATE OR REPLACE FUNCTION refuzo_kerkesen(p_kerkesa_id BIGINT, p_shofer_id TEXT)
RETURNS TABLE (rezultati TEXT, udhetim_id TEXT)
LANGUAGE plpgsql AS $$
DECLARE v_udhetim_id TEXT; v_udhetar_id TEXT; v_statusi TEXT;
BEGIN
  SELECT k.udhetim_id, k.udhetar_id, k.statusi INTO v_udhetim_id, v_udhetar_id, v_statusi
  FROM udhetimet_kerkesat k JOIN udhetimet u ON u.id = k.udhetim_id
  WHERE k.id = p_kerkesa_id AND u.shofer_id = p_shofer_id FOR UPDATE OF k;
  IF NOT FOUND THEN RETURN QUERY SELECT 'ndaluar'::TEXT, NULL::TEXT; RETURN; END IF;
  IF v_statusi <> 'ne_pritje' THEN RETURN QUERY SELECT v_statusi, v_udhetim_id; RETURN; END IF;
  UPDATE udhetimet_kerkesat SET statusi = 'refuzuar' WHERE id = p_kerkesa_id;
  INSERT INTO njoftimet (kerkesa_id, udhetar_id, pergjigjja)
  VALUES (p_kerkesa_id, v_udhetar_id, 'refuzuar') ON CONFLICT DO NOTHING;
  RETURN QUERY SELECT 'refuzuar'::TEXT, v_udhetim_id;
END; $$;
