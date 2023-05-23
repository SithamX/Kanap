// Récupération de l'id du produit à afficher
const urlParams = new URLSearchParams(window.location.search);
const urlId = urlParams.get('id'); // affiche la valeur du paramètre 'param1'


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


// Création d'une fonction permettant d'ajouter un article au panier
function addSelectionCart(){
  const productSelection = document.querySelector("#addToCart");

  // Appel de la fonction addSelectionCart après un clique 
  productSelection.addEventListener("click", () => {
    const color = document.querySelector("#colors").value; // .value ça veut dire que l'on sélectionne la valeur selectionnée, donc la couleur choisie
    const quantity = document.querySelector("#quantity").value;

    // Création d'une condition permetant soit d'afficher un message d'erreur, 
    // soit de rediriger l'utilisateur vers la page panier.
    if (color == 0 || quantity == 0) {
      alert("Veuillez choisir une couleur et une quantité.");
      return;
    } else if (quantity < 0 || quantity > 100) {
     alert("Veuillez choisir une quantitée entre 1 et 100.");
     return;
    } else {
      //window.location.href = "cart.html";
      //window.location.href = "cart.html";
    }

    // Enregistrements de certaines valeurs dans un objet
    const cartSelection = {
      id: urlId,
      color: color,
      quantity: Number(quantity)
    }

    // Création d'une variable permettant de récupérer les données stockées dans le localStorage quant il y en aura
    let localStorageParse = JSON.parse(localStorage.getItem("cart"));

    // Création d'une condition 
    if (localStorageParse) {
      let product = localStorageParse.find((product) => product.id == cartSelection.id && product.color == cartSelection.color);
    
      if (product) {
        product.quantity = product.quantity + cartSelection.quantity;
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

    /*let localStorageP = JSON.parse(localStorage.getItem("cart"));
    const cartSelection = {
      id: urlId,
      color: color,
      quantity: Number(quantity)
    }

    if (localStorageP) {
      let azerty = localStorageP.length;
      console.log(azerty);
      if (localStorageP.length > 0) {
        localStorageP.push(cartSelection);
        localStorage.setItem("cart", JSON.stringify(localStorageP));          
        return
      } */
      /*if (localStorageP.id == cartSelection.id && localStorageP.color == cartSelection.color) {
        localStorageP.quantity = localStorageP.quantity + cartSelection.quantity;
        localStorage.setItem("cart", JSON.stringify(localStorageP));
        return;
      }*/
      return
  /*  }  else {

      // Enregistrements de certaines valeurs dans un objet
      

      
        let cart = [];
        cart.push(cartSelection);
        localStorage.setItem("cart", JSON.stringify(cart)); // sur l'article qui est cité dans le guide des étapes clés, il n'y a pas d'écrit window.localStorage.setItem comme dans le cours, mais seulement localStorage.steItem
        

    }*/

     


  });
  
}
addSelectionCart()





/*   let localStorageP = JSON.parse(localStorage.getItem("cart"));
    const cartSelection = {
      id: urlId,
      color: color,
      quantity: Number(quantity)
    }

    if (localStorageP) {
      let azerty = localStorageP.length;
      console.log(azerty);
      if (localStorageP.length > 0) {
        localStorageP.push(cartSelection);
        localStorage.setItem("cart", JSON.stringify(localStorageP));
        return
      }
      return
    }  else {

      // Enregistrements de certaines valeurs dans un objet
      

      
        let cart = [];
        cart.push(cartSelection);
        localStorage.setItem("cart", JSON.stringify(cart)); // sur l'article qui est cité dans le guide des étapes clés, il n'y a pas d'écrit window.localStorage.setItem comme dans le cours, mais seulement localStorage.steItem
        

    } */