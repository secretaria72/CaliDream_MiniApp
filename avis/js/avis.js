document.addEventListener("DOMContentLoaded", function () {
  const sendBtn = document.querySelector(".avis-send-btn");
  const input = document.querySelector(".avis-input");
  const avisList = document.getElementById("avisList");

  // Affiche le username récupéré (test debug)
  const debug = document.createElement("div");
  debug.style.position = "fixed";
  debug.style.top = "10px";
  debug.style.left = "10px";
  debug.style.backgroundColor = "#2ecc71";
  debug.style.color = "#fff";
  debug.style.padding = "8px";
  debug.style.borderRadius = "4px";
  debug.style.zIndex = "9999";
  debug.style.fontSize = "14px";

  const username = window.Telegram?.WebApp?.initDataUnsafe?.user?.username;
  debug.textContent = username ? @${username} : "❌ username non reçu";

  document.body.appendChild(debug);

  function maskUsername(username) {
    if (!username  !username.startsWith('@')  username.length < 5) {
      return '@inconnu';
    }
    return (
      username.substring(0, 2) +
      '*'.repeat(username.length - 4) +
      username.substring(username.length - 2)
    );
  }

  sendBtn.addEventListener("click", async function () {
    const message = input.value.trim();

    if (message.length < 10) {
      alert("Merci de laisser un avis plus détaillé (min. 10 caractères).");
      return;
    }

    const fullUsername = username ? @${username} : '@inconnu';

    try {
      const response = await fetch("https://cali-dream-mini-app.vercel.app/api/send-avis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, username: fullUsername }),
      });

      const data = await response.json();

      if (data.success) {
        const masked = maskUsername(fullUsername);
        const now = new Date();
        const dateStr = now.toLocaleString("fr-FR", {
          day: '2-digit', month: '2-digit', year: 'numeric',
          hour: '2-digit', minute: '2-digit'
        });

        const avisHTML = `
          <div class="avis-message">
            ${masked} • ${dateStr} <br />
            ${message}
          </div>
        `;

        avisList.innerHTML = avisHTML + avisList.innerHTML;
        input.value = "";
      } else {
        alert("Erreur : l’avis n’a pas pu être envoyé.");
        console.error("Erreur API:", data.error);
      }
    } catch (err) {
      console.error("Erreur JS:", err);
      alert("Impossible de contacter le serveur.");
    }
  });
});
