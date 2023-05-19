let selectionJson = JSON.parse(localStorage.getItem("cart"));
console.log(selectionJson)
let products = [];


function viewProductsCart(){
    if (selectionJson === null || selectionJson == 0) {
        document.querySelector("h1").insertAdjacentHTML(
            // Position du texte à ajouter à l'intérieur de l'élément, donc après le texte "Votre panier" déja présent sur la page
            "beforeend",
            // Création des balises produits
             " est vide."
            )
        document.querySelector(".cart__order").style.display = "none";
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

                                // Création du tableau des produits à envoyer au serveur 
                                products.push(product.id); // je crois que ça ne sert à rien puisque même en le retirant j'ai quand-même l'id qui s'affiche dans l'url de la page de confirmation
                            
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
    
        inputs.addEventListener("change", (event) => {
            event.preventDefault()
            inputs = inputs(event.target);
            console.log(inputs)

            let test = inputs.value;

            const idTest = inputs.closest("article");
            console.log (idTest)

            /*const idTestDeux = inputs.closest("article");
            console.log (idTestDeux)*/



            const id = idTest.dataset.id;
            console.log (id)

            const color = idTest.dataset.color;
            console.log (color)


       

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
    }



/* function modifyQuantity() {
    let itemQtt = document.querySelectorAll('.itemQuantity');
    for (let j = 0; j < itemQtt.length; j++) {
      itemQtt[j].addEventListener('change', (event) => {
      event.preventDefault();
      // sélection de la nouvelle quantité...
      // ... qu'on va sauvegarder dans un nouveau tableau
     // avec les autres éléments du localStorage
      let itemNewQtt = itemQtt[j].value;
      const newLocalStorage = {
        id: selectionJson[j].id,
        color: selectionJson[j].color,
        quantity: Number(itemNewQtt)
      };
  
      // actualiser le localStorage avec les nouvelles données récupérées... 
      selectionJson[j] = newLocalStorage;
      // ...en transformant les Js en Json
      localStorage.setItem('cart', JSON.stringify(selectionJson));
  
     
        })
    }
  } */
    
    


/*function modifyQuantity(){
    let inputs = document.querySelector(".itemQuantity");
//  for (let n = 0; n < inputs.length; n++) {
  //  for (let i = 0; i < inputs.length; i++) {
        inputs.addEventListener("change", (event) => {
            event.preventDefault()

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
} */

/* function modifyQuantity(){
    let inputs = document.querySelector(".itemQuantity");
 
        inputs.addEventListener("change", (event) => {
            event.preventDefault()

            let inputsValue = inputs.value;

            const article = inputs.closest("article");
            console.log(article)

            const id = article.dataset.id;
            console.log(id)
            const color = article.dataset.color;
            console.log(color)

            const newQuantity = {
                id: id,
                color: color,
                quantity: Number(inputsValue)
            }
           
            let quantity = [];
            quantity.push(newQuantity);
            localStorage.setItem("cart", JSON.stringify(quantity)); 
            location.reload();
            totalQuantityPrice();
        });
}  */

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
    for (let product of selectionJson) {
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




const formulaireCommande = document.querySelector("#order");
    formulaireCommande.addEventListener("click", (event) => {
        event.preventDefault();


        const contact = {
            firstName: document.querySelector("#firstName").value,
            lastName: document.querySelector("#lastName").value,
            address:document.querySelector("#address").value,
            city: document.querySelector("#city").value,
            email: document.querySelector("#email").value,
        };

function verifyFirstName() {
    const formulaireFirstName = contact.firstName;
    let regexFirstName = /^([a-zA-ZéèëêçàâäîïìùûüÀÈÉ -]){3,25}$/
    if (regexFirstName.test(formulaireFirstName)) {
        return true } else {
        document.querySelector("#firstNameErrorMsg").insertAdjacentHTML(
            // Position du texte à ajouter à l'intérieur de l'élément, donc après le texte "Votre panier" déja présent sur la page
            "beforeend",
            // Création des balises produits
            "Veuillez entrer un caractère valide ou un nombre de caractères valide (de 3-25)."
        )
    }  
}

function verifyLastName() {
    const formulaireLastName = contact.lastName;
    let regexLastName = /^([a-zA-ZéèëêçàâäîïìùûüÀÈÉ -]){3,25}$/
    if (regexLastName.test(formulaireLastName)) {
        return true } else {
        document.querySelector("#lastNameErrorMsg").insertAdjacentHTML(
            // Position du texte à ajouter à l'intérieur de l'élément, donc après le texte "Votre panier" déja présent sur la page
            "beforeend",
            // Création des balises produits
            "Veuillez entrer un caractère valide ou un nombre de caractères valide (de 3-25)."
        )
    }  
}

function verifyAdress() {
    const formulaireAddress = contact.address;
    const regexAddress = /^([0-9]{1,} [a-zA-ZéèëêçàâäîïìùûüÀÈÉ '-]{5,})$/
    if (regexAddress.test(formulaireAddress)) {
        return true } else {
        document.querySelector("#addressErrorMsg").insertAdjacentHTML(
            // Position du texte à ajouter à l'intérieur de l'élément, donc après le texte "Votre panier" déja présent sur la page
            "beforeend",
            // Création des balises produits
            "Veuillez entrer une adresse valide."
        )
    }  
}

function verifyCity() {
    const formulaireCity = contact.city;
    const regexCity = /^([a-zA-ZéèëêçàâäîïìùûüÀÈÉ '-]){2,}$/
    if (regexCity.test(formulaireCity)) {
        return true } else {
        document.querySelector("#cityErrorMsg").insertAdjacentHTML(
            // Position du texte à ajouter à l'intérieur de l'élément, donc après le texte "Votre panier" déja présent sur la page
            "beforeend",
            // Création des balises produits
            "Veuillez entrer un nom de ville valide."
        )
    }  
}


function verifyEmail() {
    const formulaireEmail = contact.email;                 
    const regexEmail = /^([a-zA-ZéèëêçàâäîïìùûüÀÈÉ_.-]{3,}[@]{1}[a-z]+[.]{1}[a-z]{2,})$/
    if (regexEmail.test(formulaireEmail)) {
        return true } else {
        document.querySelector("#emailErrorMsg").insertAdjacentHTML(
            // Position du texte à ajouter à l'intérieur de l'élément, donc après le texte "Votre panier" déja présent sur la page
            "beforeend",
            // Création des balises produits
            "Veuillez entrer une adresse mail valide."
        )
    }  
}


if (verifyFirstName() && verifyLastName() && verifyAdress() && verifyCity() && verifyEmail()) {
    localStorage.setItem("contact", JSON.stringify(contact));
    order();
}

let orderId = "";

function order(){
    
    
       
        // const chargeUtile = localStorage.setItem("commande", JSON.stringify(inputId));
        console.log({contact, products});
        
      
        fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            body: JSON.stringify({contact, products}),
            headers: {
                "Content-Type": "application/json"
              },
        })
            .then((response) => response.json())
            .then((data) => {
                orderId = data.orderId;
             location.href = "confirmation.html?id=" + orderId; 
                
            })
            .catch((error) => console.log(error))
     
}


})

/* 
// regex firstName = (/([a-zA-Z-]){1}/) Amélioré : /^([a-zA-Z-]){3,25}$/ nouveau : /^([a-zA-ZéèëêçàâäîïìùûüÀÈÉ-]){3,25}$/
// regex lastName = (/([a-zA-Z-]){1}/)  Amélioré : /^([a-zA-Z-]){3,35}$/ nouveau : /^([a-zA-ZéèëêçàâäîïìùûüÀÈÉ -]){3,35}$/
// regex address = (/([0-9a-zA-Z-]+)/)  Amélioré : /^([0-9]{1,} [a-zA-Z-]{5,})$/ nouveau : /^([0-9]{1,} [a-zA-ZéèëêçàâäîïìùûüÀÈÉ '-]{5,})$/ 
// regex city = (/(a-zA-Z-]+)/)         Amélioré : /^([a-zA-Z-]){2,}$/ nouveau : /^([a-zA-ZéèëêçàâäîïìùûüÀÈÉ '-]){2,}$/ 
// regex email = (/([a-zA-Z-_@.]){1}/)  Amélioré : /^([a-zA-Z-_.]{3,}[@]{1}[a-zA-Z]+[.]{1}[com]*[fr]*[net]*[org]*)$/ ou : /^([a-zA-Z-_.]{3,}[@]{1}[a-z]+[.]{1}[a-z]{2,})*$/ ou : /^([a-zA-Z-_.]{3,}[@]{1}[a-zA-Z]+[.]{1})([com]{3})*([fr]{2})*([net]{3})*([org]{3})*$/ nouveau : /^([a-zA-ZéèëêçàâäîïìùûüÀÈÉ_.-]{3,}[@]{1}[a-z]+[.]{1}[a-z]{2,})$/     
*/

