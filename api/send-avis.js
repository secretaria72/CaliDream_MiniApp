export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée.' });
  }

  const { username, message, date } = req.body;

  if (!username || !message) {
    return res.status(400).json({ error: 'Données manquantes.' });
  }

  const token = '7832206699:AAGYLTLWD9QPBYfkV26AmJ9uajsiwurh8Fs'; // Remplace par ton vrai token (format : 123456789:AAxxx...)
  const chatId = '-1008196735310'; // Remplace par ton chat ID (ex: -1001234567890)

  const text = `🗣 <b>Nouvel avis reçu</b>\n\n👤 <b>${username}</b>\n🕒 ${date}\n💬 ${message}`;

  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  const data = {
    chat_id: chatId,
    text: text,
    parse_mode: 'HTML'
  };

  try {
    const telegramResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await telegramResponse.json();

    if (!telegramResponse.ok) {
      throw new Error(result.description || 'Erreur inconnue côté Telegram');
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Erreur lors de l’envoi à Telegram :', error.message);
    return res.status(500).json({ error: 'Échec de l’envoi du message.' });
  }
}
