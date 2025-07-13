export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Méthode non autorisée" });
  }

  const { message, username } = req.body;

  if (!message || !username) {
    return res.status(400).json({ success: false, error: "Données manquantes" });
  }

  // ✅ Token de ton bot @Calidreamsbot
  const TELEGRAM_TOKEN = "7832206699:AAGYLTLWD9QPBYfkV26AmJ9uajsiwurh8Fs";

  // ✅ chat_id privé de ton canal (à ajuster si besoin)
  const TELEGRAM_CHAT_ID = "-1008196735310"; // ← tu m'as donné cet ID via @userinfobot

  const text = 💬 *Nouvel avis reçu :*\n\n👤 ${username}\n📝 ${message};

  try {
    const telegramURL = https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage;
    const response = await fetch(telegramURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
        parse_mode: "Markdown"
      }),
    });

    const data = await response.json();

    if (!data.ok) {
      console.error("Erreur Telegram:", data);
      return res.status(500).json({ success: false, error: "Erreur Telegram" });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Erreur serveur:", error);
    return res.status(500).json({ success: false, error: "Erreur serveur" });
  }
}
