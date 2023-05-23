// Récupération des données dans le localStorage
let selectionJson = JSON.parse(localStorage.getItem("cart"));
console.log(selectionJson)
let products = [];


// Fonction permettant d'afficher les produits dans le panier
function viewProductsCart(){
    // Ajout d'une condition permettant d'ajouter du texte et de cacher le formulaire de commande si le localStorage est vide 
    if (selectionJson === null || selectionJson == 0) {
        document.querySelector("h1").insertAdjacentHTML(
            // Position du texte à ajouter à l'intérieur de l'élément, donc après le texte "Votre panier" déja présent sur la page
            "beforeend",
            // Création des balises produits
             " est vide."
            )
        document.querySelector(".cart__order").style.display = "none";
    } 
    // Si le localStorage comporte un élément, il s'affiche
    else {
        for (let product of selectionJson) {

            // Récupération des données d'un produit spécifique dans l'API en fonction de son ID 
            fetch(`http://localhost:3000/api/products/${product.id}`)
                .then(response => response.json())
                .then((prod) => {
                                // Création du tableau des produits à envoyer au serveur 
                                products.push(product.id); // je crois que ça ne sert à rien puisque même en le retirant j'ai quand-même l'id qui s'affiche dans l'url de la page de confirmation
                            
                                // Ajout du code html permettant d'afficher correctement le produit sélectionné
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

                        // Appel des fonctions de calcul du total, de la modification et de la suppression d'un produit.
                        
                        modifyQuantity();
                        deleteProduct();
                });
        }
    }
}
viewProductsCart();


// Fonction de modification d'une quantité
/*function modifyQuantity(){
    let inputs = document.querySelector(".itemQuantity");
    
        inputs.addEventListener("change", (event) => {
            event.preventDefault()
            inputs = inputs(event.target);
            console.log(inputs)

            let test = inputs.value;

            const idTest = inputs.closest("article");
            console.log (idTest)*/

            /*const idTestDeux = inputs.closest("article");
            console.log (idTestDeux)*/



        /*    const id = idTest.dataset.id;
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
    }*/



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

 function modifyQuantity(){
    let inputs = document.querySelector(".itemQuantity");
 
        inputs.addEventListener("change", (event) => {
            event.preventDefault()

            /*let input = document.querySelector(".itemQuantity").value.event.target;
            console.log(input)*/

            let inputsValue = event.target.value;

            const article = event.target.closest("article");
            console.log(article)

            const id = article.dataset.id;
            console.log(id)
            const color = article.dataset.color;
            console.log(color)

            let carts = JSON.parse(localStorage.getItem("cart"));

            carts = carts.map((item => {
                console.log(item.quantity)
                if (item.id == id && item.color == color) {
                   item.quantity = Number(inputsValue);
                }
                return item;
            }));
            
           /* carts = item => item 
                
            if (item.id == id && item.color == color) {
               item.quantity = inputsValue;
            }*/

           /* const newQuantity = {
                id: id,
                color: color,
                quantity: Number(inputsValue)
            }*/
           
            /*const cart = JSON.parse(localStorage.getItem("cart"));
            console.log(cart)
            const la = cart;
            console.log(la)*/
            /*let quantity = [];
            quantity.push(newQuantity);*/
            /*const newCart = quantity;
            console.log(newCart)*/
            localStorage.setItem("cart", JSON.stringify(carts)); 
            totalQuantityPrice();
            location.reload();
          
        });
}  

/* // Fonction de suppression d'un produit
function deleteProduct(){
    let deleteItem = document.querySelector(".deleteItem");
    
        deleteItem.addEventListener("click", (event) => {
            const idTest = event.target.closest("article");
            console.log(idTest)
           

            const id = idTest.dataset.id;
            console.log(id)
            const color = idTest.dataset.color;
            console.log(color)

            let quantits = JSON.parse(localStorage.getItem("cart"));
            console.log(quantits)
            quantits = quantits.map(quantit => quantit.quantity);

            console.log(event.target.quantits)

            console.log(document.querySelector(".itemQuantity").value)


            const newQuantity = {
                id: id,
                color: color,
            }
            
            console.log(newQuantity)
           
            let quantity = [];
            quantity.push(newQuantity);
            

            console.log(quantity)

            const filterQuantity = newQuantity.filter();
            console.log(filterQuantity)

            console.log(quantits) */

           /* quantity.splice(0);

                selectionJson = localStorage.setItem("cart", JSON.stringify(quantity));
                location.reload(); */
         /*   });
} */


/* // Fonction de suppression d'un produit
function deleteProduct(){
    let deleteItem = document.querySelector(".deleteItem");
    
        deleteItem.addEventListener("click", (event) => {
            event.preventDefault()


            const idTest = event.target.closest("article");
            console.log(idTest)
           

            const id = idTest.dataset.id;
            const color = idTest.dataset.color;

            const newQuantity = {
                id: id,
                color: color,
                quantity: 10,
            }
            console.log(newQuantity)

            let quantity = [];
            quantity.push(newQuantity);
            console.log(quantity)

            let quantits = JSON.parse(localStorage.getItem("cart"));
            console.log(quantits)

           // console.log(document.querySelector(".itemQuantity").value)     

            quantits = quantits.filter((item) => !(item.id == id && item.color == color));
            console.log(quantits)

            localStorage.setItem("cart", JSON.stringify(quantits));
            });
} */

// Fonction de suppression d'un produit
function deleteProduct(){
    let deleteItem = document.querySelector(".deleteItem");
    
        deleteItem.addEventListener("click", (event) => {
            // Annulation du comportement par défaut
            event.preventDefault()

            // Récupération de la balise article du produit qui à précisément été cliquée 
            const idTest = event.target.closest("article");
            console.log(idTest)

            // Récupération du data-id et du data-color de la balise article 
            const id = idTest.dataset.id;
            const color = idTest.dataset.color;

            // Récupération des données dans le localStorage
            let quantits = JSON.parse(localStorage.getItem("cart"));
            console.log(quantits)   

            // Utilisation de la méthode filter() pour retourner un tableau qui ne contiendra pas le produit cliqué,
            // et  en précision de filtrage, on retire du tableau l'objet ayant le même id et la même couleur que celui du produit dont on à cliqué sur "Supprimer"
            quantits = quantits.filter(item => !(item.id === id && item.color === color));
            console.log(quantits)

            // Ajout du nouveau tableau dans le local storage (ce qui à pour effet de retirer le tableau précédemment supprimé)
            localStorage.setItem("cart", JSON.stringify(quantits));
            });
}

const input = document.querySelector(".itemQuantity");
console.log(input)

function totalQuantityPrice(){
    for (let i = 0; i < selectionJson.length; i++) {

        
        fetch(`http://localhost:3000/api/products/${selectionJson[i].id}`)
        .then(response => response.json())
        .then((prod) => {

            console.log(selectionJson[i].quantity)
            const qty = [selectionJson[i].quantity * [i]];
            console.log(qty)
            

            const price = selectionJson[i].quantity * prod.price;
            //const totalQuantity = 

            document.querySelector("#totalQuantity").insertAdjacentHTML(
                // Position du texte à ajouter à l'intérieur de l'élément, donc après le texte "Votre panier" déja présent sur la page
                "beforeend",
                // Création des balises produits
                `${selectionJson[i].quantity}`
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
totalQuantityPrice();


// Fonction faisant fonctionner le formulaire de commande 
function formulaire() {
    const formulaireCommande = document.querySelector("#order");
        formulaireCommande.addEventListener("click", (event) => {
            event.preventDefault();

            // Création d'un objet qui permettra de faire appel efficacement à chaque input ayant une valeur de saisie
            const contact = {
                firstName: document.querySelector("#firstName").value,
                lastName: document.querySelector("#lastName").value,
                address:document.querySelector("#address").value,
                city: document.querySelector("#city").value,
                email: document.querySelector("#email").value,
            };

            // Fonction vérifiant la bonne saisie du prénom
            function verifyFirstName() {
                const formulaireFirstName = contact.firstName;

                // Caractères autorisés avec une limite minimale et maximale
                let regexFirstName = /^([a-zA-ZéèëêçàâäîïìùûüÀÈÉ -]){3,25}$/
                if (regexFirstName.test(formulaireFirstName)) {
                    return true } 
                    // Si le texte saisi n'est pas en accord avec le regex, un message d'erreur s'affiche
                    else {
                    document.querySelector("#firstNameErrorMsg").insertAdjacentHTML(
                        "beforeend",
                        "Veuillez entrer un caractère valide ou un nombre de caractères valide (de 3-25)."
                    )
                }  
            }

            // Fonction vérifiant la bonne saisie du nom de famille
            function verifyLastName() {
                const formulaireLastName = contact.lastName;

                // Caractères autorisés avec une limite minimale et maximale
                let regexLastName = /^([a-zA-ZéèëêçàâäîïìùûüÀÈÉ -]){3,25}$/
                if (regexLastName.test(formulaireLastName)) {
                    return true 
                } 
                
                // Si le texte saisi n'est pas en accord avec le regex, un message d'erreur s'affiche
                else {
                    document.querySelector("#lastNameErrorMsg").insertAdjacentHTML(
                        "beforeend",
                        "Veuillez entrer un caractère valide ou un nombre de caractères valide (de 3-25)."
                    )
                }  
            }

            // Fonction vérifiant la bonne saisie de l'adresse postale
            function verifyAdress() {
                const formulaireAddress = contact.address;

                // Caractères autorisés et dans quel ordre avec une limite minimale et maximale
                const regexAddress = /^([0-9]{1,} [a-zA-ZéèëêçàâäîïìùûüÀÈÉ '-]{5,})$/
                if (regexAddress.test(formulaireAddress)) {
                    return true 
                } 
                
                // Si le texte saisi n'est pas en accord avec le regex, un message d'erreur s'affiche
                else {
                    document.querySelector("#addressErrorMsg").insertAdjacentHTML(
                        "beforeend",
                        "Veuillez entrer une adresse valide."
                    )
                }  
            }

            // Fonction vérifiant la bonne saisie de la ville
            function verifyCity() {
                const formulaireCity = contact.city;

                // Caractères autorisés et dans quel ordre avec une limite minimale et maximale
                const regexCity = /^([a-zA-ZéèëêçàâäîïìùûüÀÈÉ '-]){2,}$/
                if (regexCity.test(formulaireCity)) {
                    return true 
                } 
                
                // Si le texte saisi n'est pas en accord avec le regex, un message d'erreur s'affiche
                else {
                    document.querySelector("#cityErrorMsg").insertAdjacentHTML(
                        "beforeend",
                        "Veuillez entrer un nom de ville valide."
                    )
                }  
            }

            // Fonction vérifiant la bonne saisie de l'adresse mail
            function verifyEmail() {
                const formulaireEmail = contact.email;           

                // Caractères autorisés et dans quel ordre avec une limite minimale et maximale      
                const regexEmail = /^([a-zA-ZéèëêçàâäîïìùûüÀÈÉ_.-]{3,}[@]{1}[a-z]+[.]{1}[a-z]{2,})$/
                if (regexEmail.test(formulaireEmail)) {
                    return true 
                } 
                
                // Si le texte saisi n'est pas en accord avec le regex, un message d'erreur s'affiche
                else {
                    document.querySelector("#emailErrorMsg").insertAdjacentHTML(
                        "beforeend",
                        "Veuillez entrer une adresse mail valide."
                    )
                }  
            }

            // Si toutes les valeurs insérées par l'utilisateur dans les champs sont bonnes, elles sont envoyées dans le localStorage
            if (verifyFirstName() && verifyLastName() && verifyAdress() && verifyCity() && verifyEmail()) {
                localStorage.setItem("contact", JSON.stringify(contact));

                // Appel de la fonction qui met les valeurs récupéres en forme pour le localStorage
                order();
            }

            // Variable qui contiendra l'ID de commande
            let orderId = "";


            // Fonction mettant en forme les valeurs récupéres pour le localStorage
            function order(){    
                
                // Ici j'envoi des données vers l'API grâce à la requête fetch POST
                fetch("http://localhost:3000/api/products/order", {
                    method: "POST",
                    body: JSON.stringify({contact, products}),
                    headers: {
                        "Content-Type": "application/json"
                    },
                })
                    .then((response) => response.json())
                    .then((data) => {

                        // Demain, commenter cette partie, ça me permettra de mieux commprendre comment ça foncitonne
                        orderId = data.orderId;
                        location.href = "confirmation.html?id=" + orderId;        
                    })
                    .catch((error) => console.log(error))
                
            }


    })
}
formulaire();


/* Les regex que j'ai créé manuellement : 
    regex firstName = (/([a-zA-Z-]){1}/) Amélioré : /^([a-zA-Z-]){3,25}$/ nouveau : /^([a-zA-ZéèëêçàâäîïìùûüÀÈÉ-]){3,25}$/
    regex lastName = (/([a-zA-Z-]){1}/)  Amélioré : /^([a-zA-Z-]){3,35}$/ nouveau : /^([a-zA-ZéèëêçàâäîïìùûüÀÈÉ -]){3,35}$/
    regex address = (/([0-9a-zA-Z-]+)/)  Amélioré : /^([0-9]{1,} [a-zA-Z-]{5,})$/ nouveau : /^([0-9]{1,} [a-zA-ZéèëêçàâäîïìùûüÀÈÉ '-]{5,})$/ 
    regex city = (/(a-zA-Z-]+)/)         Amélioré : /^([a-zA-Z-]){2,}$/ nouveau : /^([a-zA-ZéèëêçàâäîïìùûüÀÈÉ '-]){2,}$/ 
    regex email = (/([a-zA-Z-_@.]){1}/)  Amélioré : /^([a-zA-Z-_.]{3,}[@]{1}[a-zA-Z]+[.]{1}[com]*[fr]*[net]*[org]*)$/ ou : /^([a-zA-Z-_.]{3,}[@]{1}[a-z]+[.]{1}[a-z]{2,})*$/ ou : /^([a-zA-Z-_.]{3,}[@]{1}[a-zA-Z]+[.]{1})([com]{3})*([fr]{2})*([net]{3})*([org]{3})*$/ nouveau : /^([a-zA-ZéèëêçàâäîïìùûüÀÈÉ_.-]{3,}[@]{1}[a-z]+[.]{1}[a-z]{2,})$/     
*/

