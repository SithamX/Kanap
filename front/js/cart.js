const numberItems = localStorage.length; // permet de savoir combien d'items différents il y a dans le panier 

for (let i = 0; i < numberItems; i++){
    let selectionJson = localStorage.getItem(localStorage.key(i));
    console.log("objet à la position", i, "est", selectionJson);
    /*let panier = JSON.parse(selectionJson);
    //alert(datat.quantity)
    let dataCart = [];*/
}


//console.log(dataCart)

function afficherProduit(){
    //for (let product of)
    document.querySelector("#cart__items").insertAdjacentHTML(
        // Position à l'intérieur de l'élément, après son dernier enfant
        "beforeend",
        // Création des balises produits
        `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
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
        </article>`
        )
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