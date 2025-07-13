
// /vercel/api/send-avis.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const { message, username } = req.body;

  if (!message || !username) {
    return res.status(400).json({ error: 'Message ou username manquant' });
  }

  // Formatage du message
  const finalMessage = Nouvel avis client :\n@${username}\n\n"${message}";

  // Envoi vers ton bot Telegram
  const botToken = 'TON_TOKEN_ICI';
  const chatId = 'TON_CHAT_ID_ICI'; // Remplace par ton canal ou ID personnel

  const url = https://api.telegram.org/bot${botToken}/sendMessage;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: finalMessage,
      }),
    });

    if (!response.ok) throw new Error('Échec envoi Telegram');

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Erreur :', error);
    return res.status(500).json({ error: 'Erreur interne serveur' });
  }
}
