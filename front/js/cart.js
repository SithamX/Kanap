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
    if (selectionJson === null || selectionJson == 0) {
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
                                                <div class="cart__item__content__settings__delete">
                                                    <p class="deleteItem">Supprimer</p>
                                                </div>
                                            </div>
                                        </div>
                                    </article>`
                                )
                        totalQuantityPrice();
                        modifyQuantity();
                        deleteProduct();
                });
        }
    }
}
viewProductsCart();




function modifyQuantity(){
    let inputs = document.querySelector(".itemQuantity");
//  for (let n = 0; n < selectionJson.length; n++) {
        inputs.addEventListener("change", () => {
            let test = inputs.value;

            const idTest = inputs.closest("article");
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
            location.reload();
            totalQuantityPrice();
        });
//  }
}

function deleteProduct(){
    let deleteItem = document.querySelector(".deleteItem");
    //let cartDelete = [];
        deleteItem.addEventListener("click", () => {


            const idTest = deleteItem.closest("article");
            console.log(idTest)
           

            const id = idTest.dataset.id;
            console.log(id)
            const color = idTest.dataset.color;
            console.log(color)

            const newQuantity = {
                id: id,
                color: color,
            }
           
            let quantity = [];
            quantity.push(newQuantity);

            quantity.splice(0);

                selectionJson = localStorage.setItem("cart", JSON.stringify(quantity));
                location.reload();
            });
}


function totalQuantityPrice(){
    for (product of selectionJson) {
        fetch(`http://localhost:3000/api/products/${product.id}`)
        .then(response => response.json())
        .then((prod) => {

            const price = product.quantity * prod.price;

            document.querySelector("#totalQuantity").insertAdjacentHTML(
                // Position du texte à ajouter à l'intérieur de l'élément, donc après le texte "Votre panier" déja présent sur la page
                "beforeend",
                // Création des balises produits
                `${product.quantity}`
                )
            document.querySelector("#totalPrice").insertAdjacentHTML(
                // Position du texte à ajouter à l'intérieur de l'élément, donc après le texte "Votre panier" déja présent sur la page
                "beforeend",
                // Création des balises produits
                `${price}` //  `${product.color}`
            )
        });
    }
}




function order(){
    const formulaireCommande = document.querySelector("#order");
    formulaireCommande.addEventListener("click", (event) => {
        event.preventDefault();
       
        const inputId = {
            firstName: document.querySelector("#firstName").value,
            lastName: document.querySelector("#lastName").value,
            address:document.querySelector("#address").value,
            city: document.querySelector("#city").value,
            email: document.querySelector("#email").value,
        };
        const chargeUtile = localStorage.setItem("commande", JSON.stringify(inputId));

        if (verificationChampsFormualire()) return
        if (verifyLastName()) return 
        if (verifyAdress()) return 
        if (verifyCity()) return 
        if (verifyEmail()) return

        fetch("http://localhost:3000/api/products/order"), {
            method: "POST",
            headers: {"Content-Type": "application.json"},
            body: chargeUtile
        }
        window.location.href = "confirmation.html";
    });
}
order()

/*function testAffichage() {
    const test = document.querySelector("input")
    test.addEventListener("click", () => {
    });
}*/


function verificationChampsFormualire() {
    const formulaireFirstName = document.querySelector("#firstName").value;
    const formulaireLastName = document.querySelector("#lastName");
    const formulaireAddress = document.querySelector("#address");
    const formulaireCity = document.querySelector("#city");
    const formulaireEmail = document.querySelector("#email");

    /*let regexFirstName = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    if (regexFirstName(formulaireFirstName)) {
        alert("Problème test")
    }*/
    /*formulaireFirstName.addEventListener("change", () => {
        if (/^@/) {
            alert("Problème test")
           // return true;
        }
    });*/
    
    const regexFirstName = /^([a-zA-Z-]){3,25}$/
    if (regexFirstName.test(formulaireFirstName) === false) {
        document.querySelector("#firstNameErrorMsg").insertAdjacentHTML(
            // Position du texte à ajouter à l'intérieur de l'élément, donc après le texte "Votre panier" déja présent sur la page
            "beforeend",
            // Création des balises produits
            "erreur"
        )
        return true
    }  
    
}

function verifyLastName() {
    const formulaireLastName = document.querySelector("#lastName").value;

    const regexLastName = /^([a-zA-Z-]){3,25}$/
    if (regexLastName.test(formulaireLastName) === false) {
        document.querySelector("#lastNameErrorMsg").insertAdjacentHTML(
            // Position du texte à ajouter à l'intérieur de l'élément, donc après le texte "Votre panier" déja présent sur la page
            "beforeend",
            // Création des balises produits
            "erreur"
        )
        return true
    }  
}

function verifyAdress() {
    const formulaireAddress = document.querySelector("#address").value;

    const regexAddress = /^([0-9]{1,} [a-zA-Z-]{5,})$/
    if (regexAddress.test(formulaireAddress) === false) {
        document.querySelector("#addressErrorMsg").insertAdjacentHTML(
            // Position du texte à ajouter à l'intérieur de l'élément, donc après le texte "Votre panier" déja présent sur la page
            "beforeend",
            // Création des balises produits
            "erreur"
        )
        return true
    }  
}

function verifyCity() {
    const formulaireCity = document.querySelector("#city").value;

    const regexCity = /^([a-zA-Z-]){2,}$/
    if (regexCity.test(formulaireCity) === false) {
        document.querySelector("#cityErrorMsg").insertAdjacentHTML(
            // Position du texte à ajouter à l'intérieur de l'élément, donc après le texte "Votre panier" déja présent sur la page
            "beforeend",
            // Création des balises produits
            "erreur"
        )
        return true
    }  
}



function verifyEmail() {
    const formulaireEmail = document.querySelector("#email").value;

    const regexEmail = /^([a-zA-Z-_.]{3,}[@]{1}[a-zA-Z]+[.]{1}[com]*[fr]*[net]*[org]*)$/
    if (regexEmail.test(formulaireEmail) === false) {
        document.querySelector("#emailErrorMsg").insertAdjacentHTML(
            // Position du texte à ajouter à l'intérieur de l'élément, donc après le texte "Votre panier" déja présent sur la page
            "beforeend",
            // Création des balises produits
            "erreur"
        )
        return true
    }  
}







/*  Voyons voir si vous avez bien tout compris ! 
    Vous allez devoir créer une regex qui permet de vérifier 
    que le pseudo saisit par l'utilisateur contient bien des chiffres, 
    des lettres ou des tirets bas, et fait de 6 à 20 caractères de long. 
    A vos marques, prêts, codez ! */


// let regex = /([0-9]+) [a-z] [A-Z] [-] {6, 20}/;
// correction : let regex = (/^([0-9a-zA-Z_]){6,20}$/)

// regex firstName = (/([a-zA-Z-]){1}/) Amélioré : /^([a-zA-Z-]){3,25}$/
// regex lastName = (/([a-zA-Z-]){1}/)  Amélioré : /^([a-zA-Z-]){3,35}$/
// regex address = (/([0-9a-zA-Z-]+)/)  Amélioré : /^([0-9]{1,} [a-zA-Z-]{5,})$/
// regex city = (/(a-zA-Z-]+)/)         Amélioré : /^([a-zA-Z-]){2,}$/
// regex email = (/([a-zA-Z-_@.]){1}/)  Amélioré : /^([a-zA-Z-_.]{3,}[@]{1}[a-zA-Z]+[.]{1}[com]*[fr]*[net]*[org]*)$/





/*function totalQuantityPrice(){
    console.log(selectionJson)
    let deleteItem = document.querySelector(".cart__item__content__settings");
    
    const idTest = deleteItem.closest('div');
    console.log(idTest)
    for (product of selectionJson) {

           

        document.querySelector("#totalQuantity").insertAdjacentHTML(
            // Position du texte à ajouter à l'intérieur de l'élément, donc après le texte "Votre panier" déja présent sur la page
            "beforeend",
            // Création des balises produits
            `${product.quantity}`
            )
            document.querySelector("#totalPrice").insertAdjacentHTML(
                // Position du texte à ajouter à l'intérieur de l'élément, donc après le texte "Votre panier" déja présent sur la page
                "beforeend",
                // Création des balises produits
                `${product.price}` //  `${product.color}`
                )
    }
}*/






/* Premièree méthode pour supprimer :

function deleteProduct(){
    let deleteItem = document.querySelector(".deleteItem");
    let cartDelete = [];
        deleteItem.addEventListener("click", () => {


            cartDelete = selectionJson;
                

                cartDelete.splice(0);

                selectionJson = localStorage.setItem("cart", JSON.stringify(cartDelete));
                location.reload();
            });
} 

Deuxième méthode :

function deleteProduct(){
    let deleteItem = document.querySelector(".deleteItem");
    //let cartDelete = [];
        deleteItem.addEventListener("click", () => {


            const idTest = deleteItem.closest("article");
            console.log(idTest)
           

            const id = idTest.dataset.id;
            console.log(id)
            const color = idTest.dataset.color;
            console.log(color)

            const newQuantity = {
                id: id,
                color: color,
            }
           
            let quantity = [];
            quantity.push(newQuantity);

            quantity.splice(0);

                selectionJson = localStorage.setItem("cart", JSON.stringify(quantity));
                location.reload();
            });
}
*/




/*function deleteProduct(){
    let deleteItem = document.querySelector(".deleteItem");
//  for (let n = 0; n < selectionJson.length; n++) {
    deleteItem.addEventListener("click", () => {

            const idTest = deleteItem.closest("article");
            console.log(idTest)
           

            const id = idTest.dataset.id;
            console.log(id)
            const color = idTest.dataset.color;
            console.log(color)

            //const deleteItem = id + color + localStorage.("cart")

            localStorage.removeItem("cart"); 
            location.reload();
        });
//  }
}*/

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
                <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                </div>
            </div>
        </div>
    </article> */