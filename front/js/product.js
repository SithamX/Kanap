// Récupération de l'id du produit à afficher
const urlParams = new URLSearchParams(window.location.search);
console.log(urlParams.get('id')); // affiche la valeur du paramètre 'param1'


async function data(){
  // Récupération des élément dans l'API
  const products = await fetch("http://localhost:3000/api/products")
    .then(products => products.json())
    .catch(error => console.log(error))
    console.log(products);

  // Création d'une boucle for dans la fonction pour permettre d'afficher plusieurs produits avec cette mise en forme plutôt qu'un seul produit et pour permettre de faire référence à la constant "products" qui ne peut être appélée en dehors de la fonction dans laquelle elle à été créée
  for (let i in products) { // j'ai créé une fonction et ai mis entre panrenthèses "products" pour pouvoir accéder à la constante products dans la fonction d'au-dessus, puisque les constantes dans les  fonctions sont impossible à y faire référence si je laisse toutes ces autres constantes en dehors de la nouvelle fonction en supprimant la fonction
    const article = products[i]; //ou products[i] exemple : https://github.com/OpenClassrooms-Student-Center/7697016-Front-End.1/blob/P2C1-BoucleFor/pieces.js tiré du cours : https://openclassrooms.com/fr/courses/7697016-creez-des-pages-web-dynamiques-avec-javascript/7911102-manipulez-les-listes-en-javascript ---------------- finalement j'ai mis [i] à la place de [0] puisque i démarre automatiquement à zéro dan une boucle for.. in : https://openclassrooms.com/fr/courses/6175841-apprenez-a-programmer-avec-javascript/6279104-utilisez-la-bonne-boucle-pour-repeter-les-taches-for-while
    
    // Récupération de lélément du DOM qui acceuillera les items
    document.querySelector(".items").insertAdjacentHTML(
      // Position à l'intérieur de l'élément, après son dernier enfant
      "beforeend",
      // Création des balises produits
      `<a href="./product.html?id=${article._id}">
            <article>
              <img src="${article.imageUrl}" alt="${article.altTxt}">
              <h3 class="productName">${article.name}</h3>
              <p class="productDescription">${article.description}</p>
            </article>
          </a>`
    )
  }
}