//const numberItems = localStorage.length; // permet de savoir combien d'items différents il y a dans le panier 

/*for (let i = 0; i < numberItems; i++){
    let selectionJson = localStorage.getItem(localStorage.key(i));
    console.log("objet à la position", i, "est", selectionJson);
    /*let panier = JSON.parse(selectionJson);
    //alert(datat.quantity)
    let dataCart = [];*/
//}

let selectionJson = JSON.parse(localStorage.getItem("cart"));
/*let products = [];
products.push(selectionJson)*/
console.log(selectionJson)
/*products.push(selectionJson);
console.log(products)
console.log(products.color)
console.log(products.id)
console.log(selectionJson)*/


//console.log(dataCart)s

/*if (selectionJson.length == 0) {
    document.querySelector("#cartAndFormContainer").insertAdjacentHTML(
        // Position à l'intérieur de l'élément, après son dernier enfant
        "afterbegin",
        // Création des balises produits
        `<h2>Test</h2>`
        )
}

if (selectionJson.length === null) {
            altert("Test");
        }
        else {*/

function viewProductsCart(){
    if (selectionJson === null) {
        document.querySelector("h1").insertAdjacentHTML(
            // Position du texte à ajouter à l'intérieur de l'élément, donc après le texte "Votre panier" déja présent sur la page
            "beforeend",
            // Création des balises produits
             " est vide."
            )
    } 
    else {
        for (let product of selectionJson) {
            console.log(product.id)
            console.log(product.quantity)
            console.log(product.color)
            fetch(`http://localhost:3000/api/products/${product.id}`)
                .then(response => response.json())
                .then((prod) => {
                                console.log(prod.imageUrl)
                            
                                document.querySelector("#cart__items").insertAdjacentHTML(
                                    // Position à l'intérieur de l'élément, après son dernier enfant
                                    "afterbegin",
                                    // Création des balises produits
                                    `<article class="cart__item" data-id="${product.id}" data-color="${product.color}">
                                        <div class="cart__item__img">
                                            <img src="${prod.imageUrl}" alt="Photographie d'un canapé">
                                        </div>
                                        <div class="cart__item__content">
                                            <div class="cart__item__content__description">
                                                <h2>${prod.name}</h2>
                                                <p>${product.color}</p>
                                                <p>${prod.price}€</p>
                                            </div>
                                            <div class="cart__item__content__settings">
                                                <div class="cart__item__content__settings__quantity">
                                                    <p>Qté : </p>
                                                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
                                                </div>
                                                <iv class="cart__item__content__settings__delete">
                                                    <p class="deleteItem">Supprimer</p>
                                                </div>
                                            </div>
                                        </div>
                                    </article>`
                                )

                        modifyQuantity()
                });
        }
    }
}
viewProductsCart()




function modifyQuantity(){
    let input = document.querySelector(".itemQuantity");
    for (let i = 0; i < input.length; i++) {
        input.addEventListener("change", () => {
            let test = input.value;

            const idTest = input.closest("article");
            console.log(idTest)
           

            const id = idTest.dataset.id;
            console.log(id)
            const color = idTest.dataset.color;
            console.log(color)

            const newQuantity = {
                id: id,
                color: color,
                quantity: Number(test)
            }
            
            let quantity = [];
            quantity.push(newQuantity);
            localStorage.setItem("cart", JSON.stringify(quantity)); // sur l'article qui est cité dans le guide des étapes clés, il n'y a pas d'écrit window.localStorage.setItem comme dans le cours, mais seulement localStorage.steItem
            console.log(test)
        });
    }
}

/*  <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
        <div class="cart__item__img">
            <img src="../images/product01.jpg" alt="Photographie d'un canapé">
        </div>
        <div class="cart__item__content">
            <div class="cart__item__content__description">
                <h2>Nom du produit</h2>
                <p>Vert</p>
                <p>42,00 €</p>
            </div>
            <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                </div>
                <iv class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                </div>
            </div>
        </div>
    </article> */