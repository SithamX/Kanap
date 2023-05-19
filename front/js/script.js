// RECUPERATION ET AFFICHAGE DES DONNEES DE L'API //

// Récupération des éléments de l'API
fetch("http://localhost:3000/api/products")
  .then(response => response.json())
  .then(products => dataProducts(products))
  .catch(error => console.log(error));

// Fonction permettant d'afficher les produits
function dataProducts(products){

  // Création d'une boucle for permettant d'afficher plusieurs produits avec la même mise en forme
  for (let product of products) { 
    
    // Récupération de l'élément du DOM qui acceuillera les items
    document.querySelector(".items").insertAdjacentHTML(
      // Position du HTML qui sera créé à l'intérieur de la section sélectionnée : après dernier enfant affiché
      "beforeend",
      // Création des balises produits
      `<a href="./product.html?id=${product._id}">
          <article>
            <img src="${product.imageUrl}" alt="${product.altTxt}">
            <h3 class="productName">${product.name}</h3>
            <p class="productDescription">${product.description}</p>
          </article>
        </a>`
        )
  }
}
