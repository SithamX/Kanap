// Récupération des données de l'API

async function data(){
    const ressources = await fetch("http://localhost:3000/api/products");
    const json = await ressources.json();
    console.log(json);
}
data();
//console.log(megaTest);


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
