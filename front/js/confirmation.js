// Récupération de l'id de commande dans l'URL.
const urlParams = new URLSearchParams(window.location.search);
const urlId = urlParams.get('id'); // affiche la valeur du paramètre 'param1'


// Affichage de l'ID de commande sur la page.
const numberOder =  document.querySelector("#orderId").insertAdjacentHTML(
    // Position du texte à ajouter à l'intérieur de l'élément, donc après le texte "Votre numéro de commande est :" déja présent sur la page.
    "beforeend",
    // Ajout de l'ID de commande dans la balise sélectionnée.
    `${urlId}` 
);

// Suppression des éléments présents dans le localStorage.
localStorage.clear();
