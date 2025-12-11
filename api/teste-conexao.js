import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  const supabase = createClient(
    "https://ptcgbouchrlozaewflyb.supabase.co",
    process.env.SUPABASE_KEY
  );

  const { data, error } = await supabase.from("usuarios").select("*");

  if (error) {
    return res.status(500).json({ sucesso: false, erro: error.message });
  }

  return res.status(200).json({ sucesso: true, usuarios: data });
}
