// Récupération de l'id du produit à afficher
const urlParams = new URLSearchParams(window.location.search);
const urlId = urlParams.get('id'); // affiche la valeur du paramètre 'param1'
console.log (urlId);