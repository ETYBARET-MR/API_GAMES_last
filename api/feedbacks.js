import { supabase } from "./supabaseClient.js";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { id_usuario, jogo, comentario } = req.body;

    const { data: usuario } = await supabase
      .from("usuarios")
      .select("id_usuario")
      .eq("id_usuario", id_usuario)
      .single();

    if (!usuario) {
      return res.status(400).json({ sucesso: false, erro: "Usuário não existe" });
    }

    const { data, error } = await supabase
      .from("feedbacks")
      .insert([{ id_usuario, jogo, comentario }])
      .select()
      .single();

    if (error) return res.status(500).json({ sucesso: false, erro: error.message });

    return res.status(200).json({ sucesso: true, feedback: data });
  }

  if (req.method === "GET") {
    const { data, error } = await supabase
      .from("view_feedbacks_com_usuarios")
      .select("*")
      .order("data_envio", { ascending: false });

    if (error) return res.status(500).json({ erro: error.message });

    return res.status(200).json(data);
  }

  return res.status(405).json({ erro: "Método não permitido" });
}
