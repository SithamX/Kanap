// Récupération des données dans le localStorage
let selectionJson = JSON.parse(localStorage.getItem("cart"));
console.log(selectionJson)
// Création du tableau qui servira lors du fetch GET
let products = [];
// Création d'un tableau qui sera rempli dans le fonction viewProductsCart() et qui sera utilisé en dehors d'elle, dans la fonction totalQuantityPrice()
let productsId = [];


// Fonction permettant d'afficher les produits dans le panier
function viewProductsCart(){
    // Ajout d'une condition permettant d'ajouter du texte et de cacher le formulaire de commande si le localStorage est vide 
    if (selectionJson === null || selectionJson == 0) {
        document.querySelector("h1").insertAdjacentHTML(
            // Position du texte à ajouter à l'intérieur de l'élément, donc après le texte "Votre panier" déja présent sur la page
            "beforeend",
            // Ajout du texte
             " est vide."
            )
        // Formulaire de commande caché
        document.querySelector(".cart__order").style.display = "none";
    } 
    // Si le localStorage comporte au moins un élément, il s'affiche
    else {
        for (let product of selectionJson) {

            // Récupération des données d'un produit spécifique dans l'API en fonction de son ID 
            fetch(`http://localhost:3000/api/products/${product.id}`)
                .then(response => response.json())
                .then((prod) => {

                    // Ajout du prix d'un produit spécifique dans le tableau productsId et dans une autre key dans le localStorage 
                    // pour l'utiliser dans la fonction qui calculera le prix total
                    product.price = prod.price
                    console.log(product)
                    productsId.push(product); 
                    console.log(productsId)
                    localStorage.setItem("cartPrice", JSON.stringify(productsId));
                    
                    // Ajout de l'id dans le tableau qui sera utilisé pour le fetch POST
                    products.push(product.id); // je crois que ça ne sert à rien puisque même en le retirant j'ai quand-même l'id qui s'affiche dans l'url de la page de confirmation, quoique, je le laisse quand-même puisque c'est ce qui est demanbdé à la fin des Spécifications techniques du projet
        
                                // Ajout du code html permettant d'afficher correctement un produit
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

                        // Appel des fonctions de modification et de suppression d'un produit.
                        modifyQuantity();
                        deleteProduct();
                    });
        }
    }
}
viewProductsCart();

// Création de la fonction permettant de modifier la quantité d'un produit
 function modifyQuantity(){
    let inputs = document.querySelector(".itemQuantity");
 
        // Dès que l'input de quantité subira un changement, alors les actions suivantes seront effectuées
        inputs.addEventListener("change", (event) => {
            event.preventDefault()

            // Récupération de nouvelle valeur sélectionée sur l'élément précis sur lequel l'évènement s'est prduit grâce à event.target
            let inputsValue = event.target.value;

            // Récupération de la balise article sur l'élément précis sur lequel l'évènement s'est prduit grâce à event.target
            const article = event.target.closest("article");
            console.log(article)

            // Récupération du data.id et du data.color de la balise article
            const id = article.dataset.id;
            console.log(id)
            const color = article.dataset.color;
            console.log(color)

            // Récupération des données dans le localStorage
            let carts = JSON.parse(localStorage.getItem("cart"));

            // Utilisation de la méthode .map pour créer un nouveau tableau à partir de la récupération 
            // des données dans le localStorage qui comportera la nouvelle quantité
            carts = selectionJson.map((item => {
                console.log(item.quantity)
                // Si l'id et la couleur sont les mêmes entre ce qu'il y avait dans le localStorage et entre le produit 
                // dont on change la quantité, alors la nouvelle valeur rentrée remplacera celle qu'il y avait dans le tableau récupéré du localStorage
                if (item.id == id && item.color == color) {
                   item.quantity = Number(inputsValue);
                }
                return item;
            }));
            
            // Le nouveau tableau est envoyé dans le localStorage
            localStorage.setItem("cart", JSON.stringify(selectionJson)); 
       
            // La page recharge automatiquement
            location.reload();
        });
}  

// Création de la fonction permettant de supprimer un produit
function deleteProduct(){
    let deleteItem = document.querySelector(".deleteItem");
    
        // Dès que le bouton "Supprimer" sera cliqué, alors les actions suivantes seront effectuées
        deleteItem.addEventListener("click", (event) => {
            // Annulation du comportement par défaut
            event.preventDefault()

            // Récupération de la balise article du produit qui à précisément été cliquée grâce à event.target
            const idTest = event.target.closest("article");
            console.log(idTest)

            // Récupération du data-id et du data-color de la balise article 
            const id = idTest.dataset.id;
            const color = idTest.dataset.color;

            // Récupération des données dans le localStorage
            let quantits = JSON.parse(localStorage.getItem("cart"));
            console.log(quantits)   

            // Utilisation de la méthode filter() pour retourner un tableau qui ne contiendra pas le produit cliqué,
            // et en précision de filtrage, on retire du tableau l'objet ayant le même id et la même couleur que celui du produit dont on à cliqué sur "Supprimer"
            quantits = quantits.filter(item => !(item.id === id && item.color === color));
            console.log(quantits)

            // Ajout du nouveau tableau dans le local storage (ce qui à pour effet de retirer le tableau précédemment supprimé)
            localStorage.setItem("cart", JSON.stringify(quantits));

            // Rechargement automatique de la page
            location.reload();
        });
}

// Création de la fonction permettant de calculer le total de quantité et du prix
function totalQuantityPrice() {
  
    // Récupération des données dans le localStoage
    let selectionJsonQuantityPrice = JSON.parse(localStorage.getItem("cartPrice"));
    console.log(selectionJsonQuantityPrice)

    // Si le localStorage n'était pas vide, alors on calcule la quantité et le prix
    if (selectionJsonQuantityPrice != null) {

        // Utilisation de la méthode .map pour récupérer la quantité du (ou des) prduit(s) qui étaient dans le localStorage 
        // Puis utilisation de la méthode .reduce à ce moment pour calculer la somme des quantités qui sera affichée sur la page avant le prix
        const totalQuantity = selectionJsonQuantityPrice.map(quantite => quantite.quantity).reduce((prev, curr) => prev + curr, 0);
        console.log(totalQuantity )
    
        // Utilisation de la méthode .reduce pour calculer le résultat du prix multiplié par la quantité
        const totalPrice = selectionJsonQuantityPrice.reduce((total, item) => total + item.price * item.quantity, 0);
        console.log(totalPrice)

        // Affichage de la quantité totale sur la page
        document.querySelector("#totalQuantity").insertAdjacentHTML(
            // Position du texte à ajouter à l'intérieur de l'élément, donc après le texte "Votre panier" déja présent sur la page
            "beforeend",
            // Création des balises produits
            `${totalQuantity}` //  `${product.color}`
        )

        // Affichage du prix total sur la page
        document.querySelector("#totalPrice").insertAdjacentHTML(
            // Position du texte à ajouter à l'intérieur de l'élément, donc après le texte "Votre panier" déja présent sur la page
            "beforeend",
            // Création des balises produits
            `${totalPrice}` //  `${product.color}`
        )
    }
}
totalQuantityPrice();


// Fonction faisant fonctionner le formulaire de commande 
function formulaire() {
    const formulaireCommande = document.querySelector("#order");
        formulaireCommande.addEventListener("click", (event) => {
            event.preventDefault();

            // Création d'un objet qui permettra de faire appel efficacement à chaque input ayant une valeur saisie
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
                    // Ajout de l'orderId dans la variable et renvoi vers la page de confirmation qui contiendra l'identifiant de commande à la fin de l'url
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

