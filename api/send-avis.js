const express = require('express');
const app = express();const express = require('express');
const https = require('https');
const app = express();
const cors = require('cors');

// Middleware
app.use(cors());
app.use(express.json());

// Route POST
app.post('/api/send-avis', (req, res) => {
  const { username, message, date } = req.body;

  if (!username || !message) {
    return res.status(400).json({ error: 'Données manquantes' });
  }

  const token = '7832206699:AAGYtL1W0D9PBvCfvRKv26AmJ9uajsiwurh8Fs';
  const chatId = '-1008196735310'; // ✅ ID du canal bien avec le -100
  const text = `🗣 Nouvel avis reçu :\n\n👤 ${username}\n🕒 ${date}\n💬 ${message}`;

  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  const data = JSON.stringify({
    chat_id: chatId,
    text,
    parse_mode: 'HTML'
  });

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
        console.log('✅ Message envoyé avec succès à Telegram.');
        res.status(200).json({ success: true });
      } else {
        console.error('❌ Erreur Telegram:', responseData);
        res.status(500).json({ error: 'Erreur Telegram', details: responseData });
      }
    });
  });

  request.on('error', (error) => {
    console.error('❌ Erreur de requête :', error.message);
    res.status(500).json({ error: 'Erreur de requête', details: error.message });
  });

  request.write(data);
  request.end();
});

// Démarrage du serveur local
app.listen(3000, () => {
  console.log('✅ Serveur local démarré sur http://localhost:3000/api/send-avis');
});
const cors = require('cors');
const https = require('https');

app.use(cors());
app.use(express.json());

app.post('/api/send-avis', (req, res) => {
  const { username, message, date } = req.body;

  if (!username || !message || !date) {
    return res.status(400).json({ error: 'Données manquantes' });
  }

  const token = '7832206699:AAGYtL1W0D9PBvCfvRKv26AmJ9uajsiwurh8Fs';
  const chatId = '1008196735310';
  const text = `🗣 Nouvel avis reçu :\n\n👤 ${username}\n🕒 ${date}\n💬 ${message}`;

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

// Lancement du serveur
app.listen(3000, () => {
  console.log('✅ Serveur local démarré sur http://localhost:3000/api/send-avis');
});
