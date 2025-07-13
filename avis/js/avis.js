// Chargement des avis depuis avis.json
fetch('./avis.json')
  .then(response => response.json())
  .then(data => {
    const avisList = document.querySelector('.avis-list');
    avisList.innerHTML = ''; // On vide la liste d'origine

    data.forEach(avis => {
      const messageDiv = document.createElement('div');
      messageDiv.className = 'avis-message';
      messageDiv.textContent = ${avis.user} : ${avis.message};
      avisList.appendChild(messageDiv);
    });
  })
  .catch(error => {
    console.error('Erreur lors du chargement des avis :', error);
  });

// Simulation de l'envoi d’un avis (fonctionnalité admin désactivée ici)
document.addEventListener('DOMContentLoaded', () => {
  const sendBtn = document.querySelector('.avis-send-btn');
  const input = document.querySelector('.avis-input');

  sendBtn.addEventListener('click', () => {
    const message = input.value.trim();
    if (message.length < 5) return alert('Merci d’écrire un avis plus long.');

    const newMessage = document.createElement('div');
    newMessage.className = 'avis-message';
    newMessage.textContent = @Vous : ${message};

    document.querySelector('.avis-list').prepend(newMessage);
    input.value = '';
  });
});
