module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Méthode non autorisée" });
  }

  const { message, username } = req.body;

  if (!message || !username) {
    return res.status(400).json({ success: false, error: "Données manquantes" });
  }

  const BOT_TOKEN = "7832206699:AAGYLTLWD9QPBYfkV26AmJ9uajsiwurh8Fs";
  const CHAT_ID = "-1002128436010"; // remplace par ton vrai ID canal

  const text = 💬 Nouvel avis de ${username} :\n\n${message};

  try {
    const telegramUrl = https://api.telegram.org/bot${BOT_TOKEN}/sendMessage;
    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        parse_mode: "HTML"
      })
    });

    const data = await response.json();

    if (data.ok) {
      res.status(200).json({ success: true });
    } else {
      res.status(500).json({ success: false, error: data.description });
    }
  } catch (err) {
    console.error("Erreur Telegram:", err);
    res.status(500).json({ success: false, error: "Erreur lors de l'envoi" });
  }
};
