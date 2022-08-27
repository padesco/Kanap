//Déclaration de la variable "productStorage" dans laquelle on met les clés et valeurs
let productStorage = JSON.parse(localStorage.getItem("products"));
// JSON.parse pour convertir les données au format JSON qui sont dans le local storage
console.log(productStorage);


//----Affichage des produits dans le panier----//
// créer une requête API fetch pour chaque 'id'
fetch("http://localhost:3000/api/products")
 // récupérer et interpréter le résultat au format JSON
 .then( data => data.json())
 .then( product => {
    // Appel de la fonction productCart
     productCart(product);
 })
 // Message d'erreur en cas de problème
 .catch( function(err) {
     let error = document.querySelector("#cart__items");
     error.innerHTML = `<p style="text-align:center">Une erreur est survenue, veuillez nous en excuser! Notre équipe met tout en oeuvre pour régler ce problème dans les plus bref délais.</p>`;
     console.log("erreur chargement du produit");
 });

// On récupère les informations de l'API avec la fonction productCart
function productCart(product) {
    
}
// Si le panier est vide
if(productStorage === null){
    document.querySelector("#cart__items").innerText = "Votre panier est vide.";
} else {
    // Si le panier n'est pas vide: afficher les produits du localStorage
    let productCart = [];
}
   