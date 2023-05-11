// Récupération de l'id du produit à afficher
const urlParams = new URLSearchParams(window.location.search);
const urlId = urlParams.get('id'); // affiche la valeur du paramètre 'param1'
console.log (urlId);

// Récupération des propriétés et des valeurs d'un élément en fonction de son ID
fetch(`http://localhost:3000/api/products/${urlId}`)
    .then(response => response.json())
    .then(product => data(product))
    .catch(error => console.log(error));

// Création d'une fonction permettant d'afficher les valeurs d'un produit sur la page
function data(product){
    // Récupération de l'élément du DOM qui acceuillera l'item
    document.querySelector(".item__img").insertAdjacentHTML(
      // Position à l'intérieur de l'élément, après son dernier enfant
      "beforeend",
      // Création et ajout d'une image dans la balise image
      `<img src="${product.imageUrl}" alt="${product.altTxt}">` 
      )

    // Récupération de l'élément du DOM qui acceuillera l'item
    document.querySelector("#title").insertAdjacentHTML(
      // Position à l'intérieur de l'élément, après son dernier enfant
      "beforeend",
      // Ajout du nom du produit dans la balise sélectionnée 
      `${product.name}` 
      )

    // Récupération de l'élément du DOM qui acceuillera l'item
    document.querySelector("#price").insertAdjacentHTML(
      // Position à l'intérieur de l'élément, après son dernier enfant
      "beforeend",
      // Ajout du prix du produit dans la balise sélectionnée
      `${product.price}` 
      )

    // Récupération de l'élément du DOM qui acceuillera l'item
    document.querySelector("#description").insertAdjacentHTML(
      // Position à l'intérieur de l'élément, après son dernier enfant
      "beforeend",
      // Ajout de la description du produit dans la balise sélectionnée 
      `${product.description}` 
      )
      // Récupération de l'élément du DOM qui acceuillera l'item
      // Création d'une boucle for permettant d'ajouter les différentes couleurs du tableau json
      for (let color in product.colors) {
        document.querySelector("#colors").insertAdjacentHTML(
          // Position à l'intérieur de l'élément, après son dernier enfant
          "beforeend",
          // Création et ajout des couleurs dans la balise option
          `<option value="${product.colors[color]}">${product.colors[color]}</option>`
          )
      }
}

// Mais c'est trop bien les focntions en fait, puisque si tu veux créer 
// une constante pour faire un truc à un moment et en créer une autre pour 
// faire quelque chose d'autre mais en voulant utiliser le même nom, ben en mettant 
// ça dans deux fonctions différentes, tu n'auras pas dee problème puisqu'une fonction 
// dans une constante ne peut pas être récupérer en dehors de celle-ci
//Par exemple la constante id

// Création d'une fonction permettant d'ajouter un article au panier
function addSelectionCart(){
  const productSelection = document.querySelector("#addToCart");

  // Appel de la fonction ajoutSelectionPanier après un clique 
  productSelection.addEventListener("click", () => {
    const color = document.querySelector("#colors").value; // .value ça veut dire que l'on sélectionne la valeur selectionnée, donc la couleur choisie
    const quantity = document.querySelector("#quantity").value;

    if (color == 0 || quantity == 0) {
      alert("Veuillez choisir une couleur et une quantité.");
      return;
    } else if (quantity < 0 || quantity > 100) {
     alert("Veuillez choisir une quantitée entre 1 et 100.");
     return;
    } else {
      window.location.href = "cart.html";
    }

    // Enregistrements de certaines valeurs dans une constante
    const cartSelection = {
      id: urlId,
      color: color,
      quantity: Number(quantity)
    }

    // Création d'une variable permettant de récupérer les donées stockées dans le localStorage quant il y en aura
    let localStorageParse = JSON.parse(localStorage.getItem("cart"));

    if (localStorageParse) {
      let item = localStorageParse.find((item) => item.id == cartSelection.id && item.color == cartSelection.color);
    
      if (item) {
        item.quantity = item.quantity + cartSelection.quantity;
        localStorage.setItem("cart", JSON.stringify(localStorageParse));
        return;
      }

      localStorageParse.push(cartSelection);
      localStorage.setItem("cart", JSON.stringify(localStorageParse));
      return;
    } 

     else {
      let cart = [];
      cart.push(cartSelection);
      localStorage.setItem("cart", JSON.stringify(cart)); // sur l'article qui est cité dans le guide des étapes clés, il n'y a pas d'écrit window.localStorage.setItem comme dans le cours, mais seulement localStorage.steItem
    }
    /*const losto = localStorage.length;
    if (losto = 1) {
      localStorage.clear();
    } */
   /* const local = localStorage.length;
    if (local > 0) {
      localStorage.getItem("cart", JSON.parse);
      const cart = [];
        cart.push({
          id: urlId,
          color: color,
          quantity: quantity
        })
      localStorage.setItem("cart2", JSON.stringify(cart));
    }*/
  });
}
addSelectionCart()



/*function ajoutSelectionPanier(){
    const productSelection = document.querySelector("#addToCart");
    // Appel de la fonction ajoutSelectionPanier après un clique 
    productSelection.addEventListener("click", function (event) {
      const id = event.target.dataset.userId;
      fetch(`http://localhost:3000/api/products/${urlId}/panier`);
    });

}*/




/*async function data(){
  // Récupération des élément dans l'API
  const ressource = await fetch(`http://localhost:3000/api/products/${urlId}`);
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
data();*/








/*async function data(){
  // Récupération des élément dans l'API
  const ressource = await fetch(`http://localhost:3000/api/products/${urlId}`);
  const product = await ressource.json();
  console.log(product);
    
  // Récupération de lélément du DOM qui acceuillera les items
 document.querySelector(".item__img").insertAdjacentHTML(
      // Position à l'intérieur de l'élément, après son dernier enfant
      "beforeend",
      // Création des balises produits
      `<img src="${product.imageUrl}" alt="Photographie d'un canapé">` )
}
// Appel de la fonction permettant de l'executer
data();*/









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