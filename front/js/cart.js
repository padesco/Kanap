//Déclaration de la variable "productStorage" dans laquelle on met les clés et valeurs
let productStorage = JSON.parse(localStorage.getItem("products"));
// JSON.parse pour convertir les données au format JSON qui sont dans le local storage
console.log(productStorage);


//----Récupération des produits de l'API----//
// créer une requête API fetch pour les produits
fetch("http://localhost:3000/api/products")
 // récupérer et interpréter le résultat au format JSON
 .then( data => data.json())
 .then( productList => {
    console.log(productList);
    // Appel de la fonction productCart
     productCart(productList);
 })
 // Message d'erreur en cas de problème
 .catch( function(err) {
     let error = document.querySelector("#cart__items");
     error.innerHTML = `<h2 style="text-align:center">Une erreur est survenue, veuillez nous en excuser! <br> Notre équipe met tout en oeuvre pour régler ce problème dans les plus bref délais.</h2>`;
     console.log("erreur chargement du panier");
 });

// On récupère les informations de l'API avec la fonction productCart
function productCart(productList) {
    // on récupère les éléments du localStorage
    let productStorage = JSON.parse(localStorage.getItem("products"));
    console.log(productStorage);
// Si le panier est vide
if (productStorage === null) {
    document.querySelector("main").innerHTML = `<h2 style="text-align:center">Votre panier est vide.</h2>`;
} else {
    // Si le panier n'est pas vide: on récupère les produits
    for (product of productList) {
        // On crée une boucle pour récupèrer les éléments du local storage
        for (i = 0; i < productStorage.length; i++) {
            if (product._id === productStorage[i]._id) {
                // Création et ajout des valeurs correspondante
                document.getElementById('cart__items').innerHTML += `<article class="cart__item" data-id="${productStorage[i]._id}" data-color="${productStorage[i].colors}">
                                                                        <div class="cart__item__img">
                                                                        <img src="${product.imageUrl}" alt="${product.altTxt}">
                                                                        </div>
                                                                        <div class="cart__item__content">
                                                                        <div class="cart__item__content__description">
                                                                            <h2>${product.name}</h2>
                                                                            <p>${productStorage[i].colors}</p>
                                                                            <p>${product.price} €</p>
                                                                        </div>
                                                                        <div class="cart__item__content__settings">
                                                                            <div class="cart__item__content__settings__quantity">
                                                                            <p>Qté : </p>
                                                                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productStorage[i].quantity}">
                                                                            </div>
                                                                            <div class="cart__item__content__settings__delete">
                                                                            <p class="deleteItem">Supprimer</p>
                                                                            </div>
                                                                        </div>
                                                                        </div>
                                                                    </article>`
            }
        }
    }
}
}