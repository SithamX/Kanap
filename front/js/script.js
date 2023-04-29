// Récupération des données de l'API

async function data(){
    const ressources = await fetch("http://localhost:3000/api/products");
    const products = await ressources.json();
    console.log(products);
}
data();

 /* <a href="./product.html?id=42">
            <article>
              <img src="../../back/images/kanap01.jpeg" alt="Lorem ipsum dolor sit amet, Kanap name1">
              <h3 class="productName">Kanap name1</h3>
              <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
            </article>
          </a> */


// Création des balises 
function makeItems(products) { // j'ai créé une fonction et ai mis entre panrenthèses "products" pour pouvoir accéder à la constante products dans la fonction d'au-dessus, puisque les constantes dans les  fonctions sont impossible à y faire référence si je laisse toutes ces autres constantes en dehors de la nouvelle fonction en supprimant la fonction
    const item = products[0];

    const imageItem = document.createElement("img");
    imageItem.src = item.image;
    const nomItem = document.createElement("h3");
    nomItem.innerText = item.nom;
    const descriptionItem = document.createElement("p");
    descritionItem.innerText = item.description;


    // Rattachement des balises au DOM
    const sectionItems = document.querySelector(".items");
    sectionItems.appendChild(imageItem);
    sectionItems.appendChild(nomItem);
    sectionItems.appendChild(descriptionItem);
    console.log(sectionItems);
}

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
