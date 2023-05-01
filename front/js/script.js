// RECUPERATION ET AFFICHAGE DES DONNEES DE L'API //

async function data(){
  // Récupération des élément dans l'API
  const ressources = await fetch("http://localhost:3000/api/products");
  const products = await ressources.json();
  console.log(products);

  // Création d'une boucle for dans la fonction pour permettre d'afficher plusieurs produits avec cette mise en forme plutôt qu'un seul produit et pour permettre de faire référence à la constant "products" qui ne peut être appélée en dehors de la fonction dans laquelle elle à été créée
  for (let i in products) { // j'ai créé une fonction et ai mis entre panrenthèses "products" pour pouvoir accéder à la constante products dans la fonction d'au-dessus, puisque les constantes dans les  fonctions sont impossible à y faire référence si je laisse toutes ces autres constantes en dehors de la nouvelle fonction en supprimant la fonction
    const article = products[i]; //ou products[i] exemple : https://github.com/OpenClassrooms-Student-Center/7697016-Front-End.1/blob/P2C1-BoucleFor/pieces.js tiré du cours : https://openclassrooms.com/fr/courses/7697016-creez-des-pages-web-dynamiques-avec-javascript/7911102-manipulez-les-listes-en-javascript ---------------- finalement j'ai mis [i] à la place de [0] puisque i démarre automatiquement à zéro dan une boucle for.. in : https://openclassrooms.com/fr/courses/6175841-apprenez-a-programmer-avec-javascript/6279104-utilisez-la-bonne-boucle-pour-repeter-les-taches-for-while
    
    // Récupération de lélément du DOM qui acceuillera les items
    const sectionItems = document.querySelector(".items");

    // Création d'une balise a telle que dans l'exemple dans le fichier html
    const aElement = document.createElement("a");
      
    // Création d'une balise article telle que dans l'exemple dans le fichier html 
    const articleElement = document.createElement("article");

    // Création des différentes balises qui seront dans la balise article elle-même dans la balise a tel que dans l'exemple dans le fichier html
    const imageItem = document.createElement("img");
    imageItem.src = article.imageUrl; // il faut mettre imageUrl et pas juste image parce que dans le json de l'api, c'est ce qui est écrit avant l'url des images
    imageItem.alt = article.altTxt;
    const nomItem = document.createElement("h3");
    nomItem.innerText = article.name; // j'ai mis name pluôt que nom parce que dans le json de l'api, ça s'apelle name
    const descriptionItem = document.createElement("p");
    descriptionItem.innerText = article.description;
    console.log(article);

    // Rattachement de la balise <a> a la section items
    sectionItems.appendChild(aElement);
    // Rattachement de la balise <article> a la balise <a>
    aElement.appendChild(articleElement);

    // Rattachement des balises se trouvant dans la balise <article>
    articleElement.appendChild(imageItem);
    articleElement.appendChild(nomItem);
    articleElement.appendChild(descriptionItem);
  }
}
// Appel de la fonction permettant de l'executer
data();