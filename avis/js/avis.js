document.addEventListener("DOMContentLoaded", function () {
  const sendBtn = document.querySelector(".avis-send-btn");
  const input = document.querySelector(".avis-input");
  const avisList = document.getElementById("avisList");

  const username = window.Telegram?.WebApp?.initDataUnsafe?.user?.username;

  function maskUsername(username) {
    if (!username || !username.startsWith('@') || username.length < 5) {
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

    const fullUsername = username ? `@${username}` : '@inconnu';
    const now = new Date();
    const date = now.toLocaleString("fr-FR", {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });

    try {
      const response = await fetch("http://localhost:8000/api/send-avis.js", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, username: fullUsername, date }),
      });

      const data = await response.json();

      if (data.success) {
        const masked = maskUsername(fullUsername);

        const avisHTML = `
          <div class="avis-message">
            ${masked} • ${date}<br />
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
      alert("Connexion au serveur impossible.");
    }
  });
});
