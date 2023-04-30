// Récupération des données de l'API

async function data(){
  // Récupération des élément dans l'API
    const ressources = await fetch("http://localhost:3000/api/products");
    const products = await ressources.json();
    console.log(products);

    // Création d'une boucle for dans la fonction pour permettre d'afficher plusieurs produits avec cette mise en forme plutôt qu'un seul produit et pour permettre de faire référence à la constant "products" qui ne peut être appélée en dehors de la fonction dans laquelle elle à été créée
    for (let i = 0; i < products.length; i++) { // j'ai créé une fonction et ai mis entre panrenthèses "products" pour pouvoir accéder à la constante products dans la fonction d'au-dessus, puisque les constantes dans les  fonctions sont impossible à y faire référence si je laisse toutes ces autres constantes en dehors de la nouvelle fonction en supprimant la fonction
    const article = products[0]; //ou products[i] exemple : https://github.com/OpenClassrooms-Student-Center/7697016-Front-End.1/blob/P2C1-BoucleFor/pieces.js tiré du cours : https://openclassrooms.com/fr/courses/7697016-creez-des-pages-web-dynamiques-avec-javascript/7911102-manipulez-les-listes-en-javascript
    // Récupération de lélément du DOM qui acceuillera les items
    const sectionItems = document.querySelector(".items");
    // Création d'une balise a telle que dans l'exemple dans le fichier html
    const aElement = document.createElement("a");
    // Création d'une balise article telle que dans l'exemple dans le fichier html
    const itemElement = document.createElement("article");
    // Création des différentes balises qui seront dans la balise article ell-même dans la balise a tel que dans l'exemple dans le fichier html
    const imageItem = document.createElement("img");
    imageItem.src = article.image;
    const nomItem = document.createElement("h3");
    nomItem.innerText = article.nom;
    const descriptionItem = document.createElement("p");
    descriptionItem.innerText = article.description;
    console.log(article);


    // Rattachement de la balise <a> a la section items
    sectionItems.appendChild(aElement);
    // Rattachement de la balise <article> a la balise <a>>
    aElement.appendChild(itemElement);
    // Rattachement des balises se trouvant dans la balise <article>
    itemElement.appendChild(imageItem);
    itemElement.appendChild(nomItem);
    itemElement.appendChild(descriptionItem);
  
}
}
// Appel de la fonction permettant de l'executer
data();

 /* <a href="./product.html?id=42">
            <article>
              <img src="../../back/images/kanap01.jpeg" alt="Lorem ipsum dolor sit amet, Kanap name1">
              <h3 class="productName">Kanap name1</h3>
              <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
            </article>
          </a> */


// Création des balises 



//async function loadProduct() {
 //   let result = await fetch("http://localhost:3000/api/products");
  //  let listProduct = await result.json();
   // console.log(listProduct)
//}
//loadProduct();

//const test = fetch("http://localhost:3000/api/products");
//console.log(test);

//test
//.then(data => data.json())
//.then(value => console.log(value))

// Selection de la class où le code sera injecté (si j'ai appelé la const "sectionItems", c'est parce qu'il y a une class "items") à la "section" dans le html)on peut le voir sur ce cours juste avant la capture d'écran de leur site https://openclassrooms.com/fr/courses/7697016-creez-des-pages-web-dynamiques-avec-javascript/7911057-generez-le-contenu-de-votre-page-grace-au-dom )
//const sectionItems = document.querySelector(".items");
//console.log(data)

//  Rattachement des éléments au reste du document
//sectionItems.appendChild(ici il faut rattacher un élément ou un ensemble d'éléments en particulier);
