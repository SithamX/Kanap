// Récupération de l'id du produit à afficher
var str = window.location.href;
var url = new URL(str);
var idItem = url.searchParams.get("id");
console.log(idItem);

const urlParams = new URLSearchParams(window.location.search);
console.log(urlParams.get('id')); // outputs the value of the 'param1' parameter

async function data(){
    // Récupération d'un élément dans l'API
    const ressource = await fetch(`http://localhost:3000/api/products/${idItem}`);
    const product = await ressource.json();
    console.log(product);
  
  }
  // Appel de la fonction permettant de l'executer
  data();