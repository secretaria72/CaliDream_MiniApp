document.addEventListener("DOMContentLoaded", async function () {
  const sendBtn = document.querySelector(".avis-send-btn");
  const input = document.querySelector(".avis-input");
  const avisList = document.getElementById("avisList");

  // Récupération du username depuis Telegram WebApp
  const tg = window.Telegram?.WebApp;
  const username = tg?.initDataUnsafe?.user?.username || null;

  // ✅ Debug : afficher en haut à gauche le username détecté
  const debug = document.createElement("div");
  debug.style.position = "fixed";
  debug.style.top = "6px";
  debug.style.left = "6px";
  debug.style.backgroundColor = "#2ecc71";
  debug.style.color = "#fff";
  debug.style.padding = "4px 10px";
  debug.style.borderRadius = "6px";
  debug.style.fontSize = "13px";
  debug.style.zIndex = "9999";
  debug.textContent = username ? `@${username}` : "❌ Pas de username";
  document.body.appendChild(debug);

  // Fonction pour masquer le @username
  function maskUsername(user) {
    if (!user || user.length < 5) return "@inconnu";
    return (
      user.substring(0, 2) +
      "*".repeat(user.length - 4) +
      user.substring(user.length - 2)
    );
  }

  // Envoi d’un nouvel avis
  sendBtn.addEventListener("click", async () => {
    const message = input.value.trim();
    if (message.length < 10) {
      alert("Merci de laisser un avis plus détaillé (min. 10 caractères).");
      return;
    }

    const masked = maskUsername(username);
    const dateStr = new Date().toLocaleString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const avisHTML = `
      <div class="avis-message">
        ${masked} • ${dateStr} <br />
        ${message}
      </div>
    `;

    // Ajoute à l'écran
    avisList.innerHTML = avisHTML + avisList.innerHTML;
    input.value = "";

    // Envoi au serveur Vercel
    try {
      const response = await fetch("https://cali-dream-mini-app.vercel.app/api/send-avis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username ? `@${username}` : "@inconnu",
          message: message,
        }),
      });

      const result = await response.json();
      if (!result.success) {
        console.error("Erreur serveur :", result.error);
        alert("Erreur : l’avis n’a pas été enregistré.");
      }
    } catch (err) {
      console.error("Erreur JS :", err);
      alert("Erreur : connexion au serveur impossible.");
    }
  });
});
