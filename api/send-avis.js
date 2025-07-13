export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message, username } = req.body;

    const botToken = '7832206699:AAGYLTLWD9QPBYfkV26AmJ9uajsiwurh8Fs';
    const channelId = '-1002853283373'; // ✅ Ton canal privé

    const text = 📝 Nouvel avis client\n👤 @${username}\n💬 ${message};

    const telegramApiUrl = https://api.telegram.org/bot${botToken}/sendMessage;

    try {
      const response = await fetch(telegramApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: channelId,
          text: text,
          parse_mode: 'Markdown',
        }),
      });

      const data = await response.json();

      if (data.ok) {
        res.status(200).json({ success: true });
      } else {
        console.error('Erreur Telegram:', data);
        res.status(500).json({ success: false, error: data });
      }
    } catch (error) {
      console.error('Erreur serveur:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Méthode non autorisée' });
  }
}
