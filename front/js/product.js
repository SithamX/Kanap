// Récupération de l'id du produit à afficher
const urlParams = new URLSearchParams(window.location.search);
const urlId = urlParams.get('id'); // affiche la valeur du paramètre 'param1'
console.log (urlId);



async function data(){
  // Récupération des élément dans l'API
  const ressource = await fetch (`http://localhost:3000/api/products/${urlId}`);
  const product = await ressource.json();
  console.log(product);
    
  // Récupération de lélément du DOM qui acceuillera les items
  const divImage = document.querySelector(".item__img");


  // Création des différentes balises qui seront dans la balise article elle-même dans la balise a tel que dans l'exemple dans le fichier html
  const imageItem = document.createElement("img");
  imageItem.src = product.imageUrl; // il faut mettre imageUrl et pas juste image parce que dans le json de l'api, c'est ce qui est écrit avant l'url des images
  imageItem.alt = product.altTxt;

  // Rattachement de la balise <a> a la section items
  divImage.appendChild(imageItem);
  console.log(divImage);
}
// Appel de la fonction permettant de l'executer
data();













/*function dataProducts(products){
  fetch(`http://localhost:3000/api/products/${urlId}`) /// ou fetch("http://localhost:3000/api/products + urlParms")
    .then(response => response.json())
    .then(products => dataProducts(products))
    .catch(error => console.log(error));
    
    
  // Création d'une boucle for dans la fonction pour permettre d'afficher plusieurs produits avec cette mise en forme plutôt qu'un seul produit et pour permettre de faire référence à la constant "products" qui ne peut être appélée en dehors de la fonction dans laquelle elle à été créée
  for (let product of products) { // j'ai créé une fonction et ai mis entre panrenthèses "products" pour pouvoir accéder à la constante products dans la fonction d'au-dessus, puisque les constantes dans les  fonctions sont impossible à y faire référence si je laisse toutes ces autres constantes en dehors de la nouvelle fonction en supprimant la fonction
    
    // Récupération de lélément du DOM qui acceuillera les items
    document.querySelector(".item__img").insertAdjacentHTML(
      // Position à l'intérieur de l'élément, après son dernier enfant
      "beforeend",
      // Création des balises produits
      `<img src="${product.imageUrl}" alt="Photographie d'un canapé">`
    )
  }
} */




// Récupération de l'id du produit à afficher
/*var str = window.location.href;
var url = new URL(str);
var idItem = url.searchParams.get("id");
console.log(idItem);

const urlParams = new URLSearchParams(window.location.search);
console.log(urlParams.get('id')); // outputs the value of the 'param1' parameter

async function data(){
    // Récupération d'un élément dans l'API
    const ressource = await fetch(`http://localhost:3000/api/products/${urlParams.get('id')}`);
    const product = await ressource.json();
    console.log(product);
  
  }
  // Appel de la fonction permettant de l'executer
  data();*/