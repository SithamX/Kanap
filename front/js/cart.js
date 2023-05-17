let selectionJson = JSON.parse(localStorage.getItem("cart"));
console.log(selectionJson)


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

        if (verifyFirstName()) return
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

function verifyFirstName() {
    const formulaireFirstName = document.querySelector("#firstName").value;
    const regexFirstName = /^([a-zA-ZéèëêçàâäîïìùûüÀÈÉ-]){3,25}$/
    if (regexFirstName.test(formulaireFirstName) === false) {
        document.querySelector("#firstNameErrorMsg").insertAdjacentHTML(
            // Position du texte à ajouter à l'intérieur de l'élément, donc après le texte "Votre panier" déja présent sur la page
            "beforeend",
            // Création des balises produits
            "Veuillez entrer un caractère valide ou un nombre de caractères valide (de 3-25)."
        )
        return true
    }  
}

function verifyLastName() {
    const formulaireLastName = document.querySelector("#lastName").value;
    const regexLastName = /^([a-zA-ZéèëêçàâäîïìùûüÀÈÉ -]){3,25}$/
    if (regexLastName.test(formulaireLastName) === false) {
        document.querySelector("#lastNameErrorMsg").insertAdjacentHTML(
            // Position du texte à ajouter à l'intérieur de l'élément, donc après le texte "Votre panier" déja présent sur la page
            "beforeend",
            // Création des balises produits
            "Veuillez entrer un caractère valide ou un nombre de caractères valide (de 3-25)."
        )
        return true
    }  
}

function verifyAdress() {
    const formulaireAddress = document.querySelector("#address").value;
    const regexAddress = /^([0-9]{1,} [a-zA-ZéèëêçàâäîïìùûüÀÈÉ '-]{5,})$/
    if (regexAddress.test(formulaireAddress) === false) {
        document.querySelector("#addressErrorMsg").insertAdjacentHTML(
            // Position du texte à ajouter à l'intérieur de l'élément, donc après le texte "Votre panier" déja présent sur la page
            "beforeend",
            // Création des balises produits
            "Veuillez entrer une adresse valide."
        )
        return true
    }  
}

function verifyCity() {
    const formulaireCity = document.querySelector("#city").value;
    const regexCity = /^([a-zA-ZéèëêçàâäîïìùûüÀÈÉ '-]){2,}$/
    if (regexCity.test(formulaireCity) === false) {
        document.querySelector("#cityErrorMsg").insertAdjacentHTML(
            // Position du texte à ajouter à l'intérieur de l'élément, donc après le texte "Votre panier" déja présent sur la page
            "beforeend",
            // Création des balises produits
            "Veuillez entrer un nom de ville valide."
        )
        return true
    }  
}


function verifyEmail() {
    const formulaireEmail = document.querySelector("#email").value;                 
    const regexEmail = /^([a-zA-ZéèëêçàâäîïìùûüÀÈÉ_.-]{3,}[@]{1}[a-z]+[.]{1}[a-z]{2,})$/
    if (regexEmail.test(formulaireEmail) === false) {
        document.querySelector("#emailErrorMsg").insertAdjacentHTML(
            // Position du texte à ajouter à l'intérieur de l'élément, donc après le texte "Votre panier" déja présent sur la page
            "beforeend",
            // Création des balises produits
            "Veuillez entrer une adresse mail valide."
        )
        return true
    }  
}








/* 
// regex firstName = (/([a-zA-Z-]){1}/) Amélioré : /^([a-zA-Z-]){3,25}$/ nouveau : /^([a-zA-ZéèëêçàâäîïìùûüÀÈÉ-]){3,25}$/
// regex lastName = (/([a-zA-Z-]){1}/)  Amélioré : /^([a-zA-Z-]){3,35}$/ nouveau : /^([a-zA-ZéèëêçàâäîïìùûüÀÈÉ -]){3,35}$/
// regex address = (/([0-9a-zA-Z-]+)/)  Amélioré : /^([0-9]{1,} [a-zA-Z-]{5,})$/ nouveau : /^([0-9]{1,} [a-zA-ZéèëêçàâäîïìùûüÀÈÉ '-]{5,})$/ 
// regex city = (/(a-zA-Z-]+)/)         Amélioré : /^([a-zA-Z-]){2,}$/ nouveau : /^([a-zA-ZéèëêçàâäîïìùûüÀÈÉ '-]){2,}$/ 
// regex email = (/([a-zA-Z-_@.]){1}/)  Amélioré : /^([a-zA-Z-_.]{3,}[@]{1}[a-zA-Z]+[.]{1}[com]*[fr]*[net]*[org]*)$/ ou : /^([a-zA-Z-_.]{3,}[@]{1}[a-z]+[.]{1}[a-z]{2,})*$/ ou : /^([a-zA-Z-_.]{3,}[@]{1}[a-zA-Z]+[.]{1})([com]{3})*([fr]{2})*([net]{3})*([org]{3})*$/ nouveau : /^([a-zA-ZéèëêçàâäîïìùûüÀÈÉ_.-]{3,}[@]{1}[a-z]+[.]{1}[a-z]{2,})$/     
*/

