const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.post('/api/send-avis', (req, res) => {
  const { username, message, date } = req.body;

  if (!username || !message) {
    return res.status(400).json({ error: 'Données manquantes' });
  }

  const token = '7832206699:AAGYtL1W0D9PBvCfvRKv26AmJ9uajsiwurh8Fs';
  const chatId = '1008196735310';
  const text = `🗣 Nouvel avis reçu :\n\n👤 ${username}\n🕒 ${date}\n💬 ${message}`;

  const https = require('https');
  const data = JSON.stringify({
    chat_id: chatId,
    text,
    parse_mode: 'HTML'
  });

  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data)
    }
  };

  const request = https.request(url, options, (response) => {
    let responseData = '';
    response.on('data', (chunk) => {
      responseData += chunk;
    });
    response.on('end', () => {
      if (response.statusCode === 200) {
        res.status(200).json({ success: true });
      } else {
        res.status(500).json({ error: 'Erreur Telegram', details: responseData });
      }
    });
  });

  request.on('error', (error) => {
    res.status(500).json({ error: 'Erreur de requête', details: error.message });
  });

  request.write(data);
  request.end();
});

// Démarrage
app.listen(3000, () => {
  console.log('Serveur local démarré sur http://localhost:3000/api/send-avis');
});
