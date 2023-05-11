// Sélectionner le bouton à écouter
const buttons = document.querySelectorAll('.commande');
buttons.forEach(button => {
  button.addEventListener('click', event => {

    // Récupérer les données du formulaire
    const entreprise = button.id; // Extraire l'entreprise à partir de la valeur du bouton
    const heure_de_livraison = button.name;
    const nombreCommandes = button.value.split(' ')[0];
    // Effectuer une requête fetch pour envoyer les données du formulaire
    fetch('/commandesInfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ entreprise, heure_de_livraison })
    })
     
      .catch(error => console.error(error));

  });
});