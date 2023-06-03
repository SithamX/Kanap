// Récupération des données dans le localStorage.
let selectionJson = JSON.parse(localStorage.getItem("cart"));

// Création du tableau qui servira lors du fetch GET.
let products = [];


// Fonction permettant d'afficher les produits dans le panier.
function viewProductsCart(){
    // Ajout d'une condition permettant d'ajouter du texte et de cacher le total et le formulaire de commande si le localStorage est vide.
    if (selectionJson === null || selectionJson === 0 || selectionJson.length === 0) {
        document.querySelector("h1").insertAdjacentHTML(
            // Position du texte à ajouter à l'intérieur de l'élément, donc après le texte "Votre panier" déja présent sur la page.
            "beforeend",
            // Ajout du texte.
             " est vide."
            )
        // Utilisation de style.display pour cacher le total et le formulaire de commande.
        document.querySelector(".cart__price").style.display = "none"; 
        document.querySelector(".cart__order").style.display = "none";
    } 
    // Si le localStorage comporte au moins un élément, il s'affiche.
    else {
        for (let product of selectionJson) {

            // Récupération des données d'un produit spécifique dans l'API en fonction de son ID.
            fetch(`http://localhost:3000/api/products/${product.id}`)
                .then(response => response.json())
                .then((prod) => {
                    
                    // Ajout de l'id dans le tableau qui sera utilisé pour le fetch POST.
                    products.push(product.id); 
        
                                // Ajout du code html permettant d'afficher correctement un produit.
                                document.querySelector("#cart__items").insertAdjacentHTML(
                                    // Position à l'intérieur de l'élément, après son dernier enfant.
                                    "afterbegin",
                                    // Création des balises produits.
                                    `<article class="cart__item" data-id="${product.id}" data-color="${product.color}">
                                        <div class="cart__item__img">
                                            <img src="${prod.imageUrl}" alt="${prod.altTxt}">
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

                        // Appel des fonctions de calcul du total, de modification et de suppression d'un produit.
                        totalQuantityPrice();
                        modifyQuantity();
                        deleteProduct();
                    });
        }
    }
}
viewProductsCart();


// Création de la fonction permettant de modifier la quantité d'un produit.
 function modifyQuantity(){
    let inputs = document.querySelector(".itemQuantity");
 
        // Dès que l'input de quantité subira un changement, alors les actions suivantes seront effectuées.
        inputs.addEventListener("change", (event) => {
            event.preventDefault()

            // Récupération de la nouvelle valeur sélectionée sur l'élément précis sur lequel l'évènement s'est prduit grâce à event.target.
            let inputsValue = event.target.value;
            
            // Condition qui affiche une alerte si la quantité saisie est inférieure à 0 ou suprérieure à 100.
            if (inputsValue < 0 || inputsValue > 100) {
                alert("Veuillez choisir une quantitée entre 1 et 100.");
                return;
            }

            // Récupération de la balise article sur l'élément précis sur lequel l'évènement s'est prduit grâce à event.target.
            const article = event.target.closest("article");

            // Récupération du data.id et du data.color de la balise article.
            const id = article.dataset.id;
            const color = article.dataset.color;

            // Utilisation de la méthode .map pour créer un nouveau tableau à partir de la récupération 
            // des données dans le localStorage qui comportera la nouvelle quantité.
            selectionJson = selectionJson.map((item => {

                // Si l'id et la couleur sont les mêmes entre ce qu'il y avait dans le localStorage et entre le produit 
                // dont on change la quantité, alors la nouvelle valeur rentrée remplacera celle qu'il y avait dans le tableau récupéré du localStorage.
                if (item.id == id && item.color == color) {
                   item.quantity = Number(inputsValue);
                }
                return item;
            }));
            
            // Le nouveau tableau est envoyé dans le localStorage.
            localStorage.setItem("cart", JSON.stringify(selectionJson)); 
       
            // Appel de la fonction pour mettre à jour le prix total.
            totalQuantityPrice()
        });
}  


// Création de la fonction permettant de supprimer un produit.
function deleteProduct(){
    let deleteItem = document.querySelector(".deleteItem");
    
        // Dès que le bouton "Supprimer" sera cliqué, alors les actions suivantes seront effectuées
        deleteItem.addEventListener("click", (event) => {
            event.preventDefault()

            // Récupération de la balise article du produit qui à précisément été cliquée grâce à event.target.
            const closestArticle = event.target.closest("article");

            // Récupération du data-id et du data-color de la balise article. 
            const id = closestArticle.dataset.id;
            const color = closestArticle.dataset.color;  

            // Utilisation de la méthode filter() pour retourner un tableau qui ne contiendra pas le produit cliqué,
            // et en précision de filtrage, on retire du tableau l'objet ayant le même id et la même couleur que celui du produit dont on à cliqué sur "Supprimer".
            selectionJson = selectionJson.filter(item => !(item.id === id && item.color === color));

            // Ajout du nouveau tableau dans le local storage (ce qui à pour effet de retirer le tableau précédemment supprimé).
            localStorage.setItem("cart", JSON.stringify(selectionJson));

            // Appel de la fonction pour mettre à jour le prix total.
            totalQuantityPrice();

            // Utilisation de la méthode remove pour retirer le produit du DOM (donc ici on retire visuellement de la page la 
            // balise article sur laquelle on à cliqué sur supprimer après qu'elle ait été retirée du localStorage).
            closestArticle.remove();
        });
}


// Création de la fonction permettant de calculer le total de la quantité et du prix.
function totalQuantityPrice() {

    // Création de variables pour la quantité et le prix.
    let totalQuantity = 0;
    let totalPrice = 0;

    // Création d'une boucle for pour récupérer la quantité.
    for (let product of selectionJson) {

        // Utilisation de fetch pour récupérer le prix du (ou des) produit(s) présent(s) sur la page.
        fetch(`http://localhost:3000/api/products/${product.id}`)
        .then(response => response.json())
        .then((prod) => {

            // Récupération du prix et de la quantité.
            const price = prod.price;
            const quantity = product.quantity;

            // Calcul du total.
            const productTotalPrice = price * quantity;

            // Met à jour le total de la quantité en ajoutant la quantité actuelle grâce à l'opérateur d'incrémentation.
            totalQuantity += quantity;

            // Met à jour le prix total en ajoutant le prix total du produit actuel grâce à l'opérateur d'incrémentation.
            totalPrice += productTotalPrice;

            // Affichage de la quantité totale et du prix total sur la page.
            document.querySelector("#totalQuantity").innerHTML = totalQuantity;
            document.querySelector("#totalPrice").innerHTML = totalPrice;
        });
    }

    // Condition qui retire l'affichage du dernier prix présent dans le localStorage en le remplaçant par un zéro (au moins on est sûrs qu'il ne restera pas affiché), 
    // puis qui fait appel à la fonction dans laquelle il y a la condition qui cache le total et le formulaire de commande si le localStorage est vide (ce qui sert si le dernier article présent dans le panier est supprimé).
    if (selectionJson === null || selectionJson.length === 0) {
        document.querySelector("#totalQuantity").innerHTML = "0";
        document.querySelector("#totalPrice").innerHTML = "0";
        viewProductsCart();
    }
} 


// Fonction faisant fonctionner le formulaire de commande.
function formulaire() {
    const formulaireCommande = document.querySelector("#order");
        formulaireCommande.addEventListener("click", (event) => {
            event.preventDefault();

            // Création d'un objet qui permettra de faire appel efficacement à chaque input ayant une valeur saisie.
            const contact = {
                firstName: document.querySelector("#firstName").value,
                lastName: document.querySelector("#lastName").value,
                address:document.querySelector("#address").value,
                city: document.querySelector("#city").value,
                email: document.querySelector("#email").value,
            };


            // Fonction vérifiant la bonne saisie du prénom.
            function verifyFirstName() {
                const formulaireFirstName = contact.firstName;

                // Caractères autorisés avec une limite minimale et maximale.
                let regexFirstName = /^([a-zA-ZéèëêçàâäîïìùûüÀÈÉ -]){3,25}$/
                if (regexFirstName.test(formulaireFirstName)) {

                    // Si après avoir eu un message d'erreur qui s'est affiché, le texte saisi est désormais valide au regard du rejex, alors le message d'erreur est caché.
                    document.querySelector("#firstNameErrorMsg").style.display = "none"; 
                    return true 
                } 

                // Si le texte saisi n'est pas en accord avec le regex, un message d'erreur s'affiche.
                else {
                    document.querySelector("#firstNameErrorMsg").innerHTML = "Veuillez entrer un caractère valide ou un nombre de caractères valide (de 3-25).";

                    // Si après avoir eu un message d'erreur qui s'est affiché et après avoir corrigé l'erreur, le texte saisi est désormais invalide au regard du rejex (parce que 
                    // l'utilisateur aurait re-modifié ce qu'il y avait dans le formulaire), alors le message d'erreur s'affichera à nouveau.
                    document.querySelector("#firstNameErrorMsg").style.display = "block"; 
                }  
            }


            // Fonction vérifiant la bonne saisie du nom de famille.
            function verifyLastName() {
                const formulaireLastName = contact.lastName;

                // Caractères autorisés avec une limite minimale et maximale.
                let regexLastName = /^([a-zA-ZéèëêçàâäîïìùûüÀÈÉ -]){3,25}$/
                if (regexLastName.test(formulaireLastName)) {

                    // Si après avoir eu un message d'erreur qui s'est affiché, le texte saisi est désormais valide au regard du rejex, alors le message d'erreur est caché.
                    document.querySelector("#lastNameErrorMsg").style.display = "none"; 
                    return true 
                } 
                
                // Si le texte saisi n'est pas en accord avec le regex, un message d'erreur s'affiche
                else {
                    document.querySelector("#lastNameErrorMsg").innerHTML = "Veuillez entrer un caractère valide ou un nombre de caractères valide (de 3-25).";

                    // Si après avoir eu un message d'erreur qui s'est affiché et après avoir corrigé l'erreur, le texte saisi est désormais invalide au regard du rejex (parce que 
                    // l'utilisateur aurait re-modifié ce qu'il y avait dans le formulaire), alors le message d'erreur s'affichera à nouveau.
                    document.querySelector("#lastNameErrorMsg").style.display = "block"; 
                }  
            }


            // Fonction vérifiant la bonne saisie de l'adresse postale.
            function verifyAdress() {
                const formulaireAddress = contact.address;

                // Caractères autorisés et dans quel ordre avec une limite minimale et maximale.
                const regexAddress = /^([0-9]{1,} [a-zA-ZéèëêçàâäîïìùûüÀÈÉ '-]{5,})$/
                if (regexAddress.test(formulaireAddress)) {

                    // Si après avoir eu un message d'erreur qui s'est affiché, le texte saisi est désormais valide au regard du rejex, alors le message d'erreur est caché.
                    document.querySelector("#addressErrorMsg").style.display = "none"; 
                    return true 
                } 
                
                // Si le texte saisi n'est pas en accord avec le regex, un message d'erreur s'affiche.
                else {
                    document.querySelector("#addressErrorMsg").innerHTML = "Veuillez entrer une adresse valide (ex : 8 Route des Kanap).";
                    

                    // Si après avoir eu un message d'erreur qui s'est affiché et après avoir corrigé l'erreur, le texte saisi est désormais invalide au regard du rejex (parce que 
                    // l'utilisateur aurait re-modifié ce qu'il y avait dans le formulaire), alors le message d'erreur s'affichera à nouveau.
                    document.querySelector("#addressErrorMsg").style.display = "block"; 
                }  
            }


            // Fonction vérifiant la bonne saisie de la ville.
            function verifyCity() {
                const formulaireCity = contact.city;

                // Caractères autorisés et dans quel ordre avec une limite minimale et maximale.
                const regexCity = /^([a-zA-ZéèëêçàâäîïìùûüÀÈÉ '-]){2,}$/
                if (regexCity.test(formulaireCity)) {

                    // Si après avoir eu un message d'erreur qui s'est affiché, le texte saisi est désormais valide au regard du rejex, alors le message d'erreur est caché.
                    document.querySelector("#cityErrorMsg").style.display = "none"; 
                    return true 
                } 
                
                // Si le texte saisi n'est pas en accord avec le regex, un message d'erreur s'affiche.
                else {
                    document.querySelector("#cityErrorMsg").innerHTML = "Veuillez entrer un nom de ville valide.";

                    // Si après avoir eu un message d'erreur qui s'est affiché et après avoir corrigé l'erreur, le texte saisi est désormais invalide au regard du rejex (parce que 
                    // l'utilisateur aurait re-modifié ce qu'il y avait dans le formulaire), alors le message d'erreur s'affichera à nouveau.
                    document.querySelector("#cityErrorMsg").style.display = "block"; 
                }  
            }


            // Fonction vérifiant la bonne saisie de l'adresse mail.
            function verifyEmail() {
                const formulaireEmail = contact.email;           

                // Caractères autorisés et dans quel ordre avec une limite minimale et maximale.   
                const regexEmail = /^([a-zA-ZéèëêçàâäîïìùûüÀÈÉ_.-]{3,}[@]{1}[a-z]+[.]{1}[a-z]{2,})$/
                if (regexEmail.test(formulaireEmail)) {

                    // Si après avoir eu un message d'erreur qui s'est affiché, le texte saisi est désormais valide au regard du rejex, alors le message d'erreur est caché.
                    document.querySelector("#emailErrorMsg").style.display = "none"; 
                    return true 
                } 
                
                // Si le texte saisi n'est pas en accord avec le regex, un message d'erreur s'affiche
                else {
                    document.querySelector("#emailErrorMsg").innerHTML = "Veuillez entrer une adresse mail valide (ex : kanap@panak.com).";

                    // Si après avoir eu un message d'erreur qui s'est affiché et après avoir corrigé l'erreur, le texte saisi est désormais invalide au regard du rejex (parce que 
                    // l'utilisateur aurait re-modifié ce qu'il y avait dans le formulaire), alors le message d'erreur s'affichera à nouveau.
                    document.querySelector("#emailErrorMsg").style.display = "block"; 
                }  
            }

            // Si toutes les valeurs insérées par l'utilisateur dans les champs sont bonnes, elles sont envoyées dans le localStorage.
            if (verifyFirstName() && verifyLastName() && verifyAdress() && verifyCity() && verifyEmail()) {
                localStorage.setItem("contact", JSON.stringify(contact));

                // Appel de la fonction qui met les valeurs récupéres en forme pour le localStorage.
                order();
            }


            // Variable qui contiendra l'ID de commande.
            let orderId = "";
            

            // Fonction mettant en forme les valeurs récupéres pour le localStorage.
            function order(){    
                
                // Ici j'envoi des données vers l'API grâce à la requête fetch POST.
                fetch("http://localhost:3000/api/products/order", {
                    method: "POST",
                    body: JSON.stringify({contact, products}),
                    headers: {
                        "Content-Type": "application/json"
                    },
                })
                .then((response) => response.json())
                .then((data) => {
                    // Ajout de l'orderId dans la variable et renvoi vers la page de confirmation qui contiendra l'identifiant de commande à la fin de l'url.
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

