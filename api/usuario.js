import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  const supabase = createClient(
    "https://ptcgbouchrlozaewflyb.supabase.co",
    process.env.SUPABASE_KEY
  );

  if (req.method !== "POST") {
    return res.status(405).json({ erro: "Método não permitido" });
  }

  const { nome, email } = req.body;

  const { data, error } = await supabase
    .from("usuarios")
    .insert([{ nome, email }])
    .select()
    .single();

  if (error) {
    return res.status(500).json({ sucesso: false, erro: error.message });
  }

  return res.status(200).json({ sucesso: true, usuario: data });
}
