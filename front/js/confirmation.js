// Récupération de l'id du produit à afficher
const urlParams = new URLSearchParams(window.location.search);
const urlId = urlParams.get('id'); // affiche la valeur du paramètre 'param1'
console.log (urlId);


const numberOder =  document.querySelector("#orderId").insertAdjacentHTML(
    // Position du texte à ajouter à l'intérieur de l'élément, donc après le texte "Votre panier" déja présent sur la page
    "beforeend",
    // Création des balises produits
    `${urlId}` //  `${product.color}`
);


