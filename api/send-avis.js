module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const { message, username } = req.body;

  if (!message || !username) {
    return res.status(400).json({ error: "Champs manquants" });
  }

  // ✅ Token personnel de ton bot Telegram
  const TELEGRAM_BOT_TOKEN = "7832206699:AAGYLTLWD9QPBYfkV26AmJ9uajsiwurh8Fs";

  // ✅ ID numérique du canal privé (ex: "-100XXXXXXXXXX")
  const TELEGRAM_CHAT_ID = "-1008196735310";

  const text = 💬 Nouvel avis client :\n${username} a écrit :\n"${message}";

  try {
    const telegramResponse = await fetch(
      https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text,
        }),
      }
    );

    const data = await telegramResponse.json();

    if (!data.ok) {
      throw new Error(data.description || "Erreur Telegram");
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ Erreur Telegram :", err);
    return res.status(500).json({ error: "Erreur serveur Telegram" });
  }
};
