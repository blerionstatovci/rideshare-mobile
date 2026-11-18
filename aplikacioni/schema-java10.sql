-- Ekzekutoje nÃ« Neon pas schema.sql, schema-java05.sql dhe schema-java09.sql.
-- KÃ«rkesa identifikohet pÃ«r udhÃ«tim dhe udhÃ«tar; pranimi/ulja e vendeve bÃ«het
-- nga funksioni SQL nÃ« njÃ« transaksion tÃ« vetÃ«m.
CREATE TABLE IF NOT EXISTS udhetimet_kerkesat (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  udhetim_id TEXT NOT NULL REFERENCES udhetimet(id) ON DELETE CASCADE,
  udhetar_id TEXT NOT NULL REFERENCES profilet(github_id) ON DELETE CASCADE,
  statusi TEXT NOT NULL DEFAULT 'ne_pritje'
    CHECK (statusi IN ('ne_pritje', 'pranuar')),
  krijuar_me TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  pranuar_me TIMESTAMPTZ,
  UNIQUE (udhetim_id, udhetar_id)
);

CREATE INDEX IF NOT EXISTS udhetimet_kerkesat_sipas_udhetimit
ON udhetimet_kerkesat (udhetim_id, krijuar_me);

CREATE OR REPLACE FUNCTION prano_kerkesen(p_kerkesa_id BIGINT, p_shofer_id TEXT)
RETURNS TABLE (rezultati TEXT, udhetim_id TEXT, vende INTEGER)
LANGUAGE plpgsql
AS $$
DECLARE
  v_udhetim_id TEXT;
  v_statusi TEXT;
  v_vende INTEGER;
BEGIN
  SELECT k.udhetim_id, k.statusi
  INTO v_udhetim_id, v_statusi
  FROM udhetimet_kerkesat k
  JOIN udhetimet u ON u.id = k.udhetim_id
  WHERE k.id = p_kerkesa_id AND u.shofer_id = p_shofer_id
  FOR UPDATE OF k;

  IF NOT FOUND THEN
    RETURN QUERY SELECT 'ndaluar'::TEXT, NULL::TEXT, NULL::INTEGER;
    RETURN;
  END IF;

  SELECT u.vende INTO v_vende
  FROM udhetimet u WHERE u.id = v_udhetim_id
  FOR UPDATE;

  IF v_statusi = 'pranuar' THEN
    RETURN QUERY SELECT 'tashme_pranuar'::TEXT, v_udhetim_id, v_vende;
    RETURN;
  END IF;
  IF v_vende < 1 THEN
    RETURN QUERY SELECT 'pa_vende'::TEXT, v_udhetim_id, v_vende;
    RETURN;
  END IF;

  UPDATE udhetimet_kerkesat
  SET statusi = 'pranuar', pranuar_me = NOW()
  WHERE id = p_kerkesa_id AND statusi = 'ne_pritje';
  UPDATE udhetimet AS u SET vende = u.vende - 1
  WHERE u.id = v_udhetim_id
  RETURNING u.vende INTO v_vende;

  RETURN QUERY SELECT 'pranuar'::TEXT, v_udhetim_id, v_vende;
END;
$$;
