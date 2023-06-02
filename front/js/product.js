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
      alert("Veuillez choisir une quantité entre 1 et 100.");
      return;
      } else {
        window.location.href = "cart.html";
      }

    // Création d'un objet contenant l'id, la couleur et la quantité du produit choisi
    const cartSelection = {
      id: urlId,
      color: color,
      quantity: Number(quantity)
    }

    // Récupération de ce qui se trouvera dans le localStorage
    let localStorageP = JSON.parse(localStorage.getItem("cart"));

    // Si le localStorage contient au moins un élément, alors :
    if (localStorageP) {
      // on crée une constante qui permettra de vérifier si la sélection effectuée concernerait un produit ayant déja son id en plus de sa couleur de présents dans le localStorage
      const changeQuantity = localStorageP.find(element => element.id == cartSelection.id && element.color == cartSelection.color);
      console.log(changeQuantity)
      // si la sélection effectuée concernerait un produit ayant déja son id en plus de sa couleur de présents dans le localStorage, alors on ne modifie que la quantité puis on l'ajoute au localStorage
      if (changeQuantity) {
        changeQuantity.quantity = changeQuantity.quantity + cartSelection.quantity;
        localStorage.setItem("cart", JSON.stringify(localStorageP));
        return
      }
      // si le produit à un id ou une couleur différente, on l'ajoute dans le localStorage
      localStorageP.push(cartSelection);
      localStorage.setItem("cart", JSON.stringify(localStorageP));
      return
    } 
    // Si le localStorage est vide, alors on push l'objet dans un tableau et on ajoute le premier produit dans le localStorage
    else {
      let cart = [];
      cart.push(cartSelection);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  });
}
addSelectionCart()


