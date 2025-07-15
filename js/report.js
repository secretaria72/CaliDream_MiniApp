function sendReport() {
  const msg = document.getElementById("reportMessage").value.trim();
  if (msg.length < 5) return alert("Message trop court");

  const user = Telegram.WebApp.initDataUnsafe.user;
  const username = user.username || "anonyme";
  const userId = user.id;

  const fullMessage = 🚨 SIGNALEMENT\n👤 @${username} (ID: ${userId})\n📝 ${msg};

  const token = "7832206699:AAGYLTLWD9QPBYfkV26AmJ9uajsiwurh8Fs";     // à remplacer
  const chatId = " 8196735310"; // à remplacer

  fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text: fullMessage })
  }).then(() => {
    alert("Merci pour ton retour.");
    document.getElementById("reportModal").style.display = "none";
  }).catch(() => alert("Erreur, réessaie plus tard"));
}
