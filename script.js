// Initialisation de Stripe avec ta clé publique
var stripe = Stripe('TA_CLE_PUBLIQUE_STRIPE');  // Remplace par ta clé publique Stripe
var elements = stripe.elements();

// Créer un élément de carte
var card = elements.create('card');
card.mount('#card-element');

// Ajouter l'événement de soumission du formulaire
var form = document.getElementById('payment-form');
var spinner = document.getElementById('loading-spinner');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  // Afficher l'animation de chargement
  spinner.style.display = 'block';
  document.getElementById('submit').disabled = true;

  // Créer un token avec Stripe
  stripe.createToken(card).then(function(result) {
    if (result.error) {
      // Afficher l'erreur
      alert(result.error.message);
    } else {
      // Envoyer le token à ton serveur pour traitement du paiement
      var token = result.token;

      // Exemple d'envoi du token via fetch (remplace par ton endpoint de serveur)
      fetch('/charge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: token.id })
      }).then(function(response) {
        if (response.ok) {
          alert('Paiement réussi !');
        } else {
          alert('Une erreur est survenue.');
        }
      }).finally(function() {
        // Masquer l'animation de chargement
        spinner.style.display = 'none';
        document.getElementById('submit').disabled = false;
      });
    }
  });
});
