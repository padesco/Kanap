// fonction pour enregistrer dans le local storage
function saveCart(cart) {
    // transformation du tableau en chaîne de caractères
    localStorage.setItem("cart", JSON.stringify(cart));
}

// fonction pour récupérer les données du local storage
function getCart() {
    let cart = localStorage.getItem("cart");
    // si il n'y a rien retourne un tableau vide
    if (cart == null) {
        return [];
    // sinon retourne la chaîne de caractère en tableau
    } else {
        return JSON.parse(cart);
    }
}

//----Récupération des produits de l'API----//
// créer une requête API fetch pour les produits
fetch("http://localhost:3000/api/products")
 // récupérer et interpréter le résultat au format JSON
 .then( data => data.json())
 .then( productList => {
    // Appel de la fonction productCart
     productCart(productList);
 })
 // Message d'erreur en cas de problème
 .catch( function(err) {
     let error = document.querySelector("#cart__items");
     error.innerHTML = `<h2 style="text-align:center">Une erreur est survenue, veuillez nous en excuser! <br> Notre équipe met tout en oeuvre pour régler ce problème dans les plus bref délais.</h2>`;
 });

// On récupère les informations de l'API avec la fonction productCart
function productCart(productList) {
    // on récupère les éléments du localStorage
    let cart = [];
    cart = getCart();
// Si le panier est vide
if (cart === null) {
    document.querySelector("main").innerHTML = `<h2 style="text-align:center">Votre panier est vide.</h2>`;
} else {
    // Si le panier n'est pas vide: on récupère les produits
    for (product of productList) {
        // On crée une boucle pour récupèrer les éléments du local storage
        for (item of cart) {
            if (product._id === item._id) {
                // Création et ajout des valeurs correspondante
                document.getElementById('cart__items').innerHTML += `<article class="cart__item" data-id="${item._id}" data-color="${item.colors}">
                                                                        <div class="cart__item__img">
                                                                        <img src="${product.imageUrl}" alt="${product.altTxt}">
                                                                        </div>
                                                                        <div class="cart__item__content">
                                                                        <div class="cart__item__content__description">
                                                                            <h2>${product.name}</h2>
                                                                            <p>${item.colors}</p>
                                                                            <p>${product.price} €</p>
                                                                        </div>
                                                                        <div class="cart__item__content__settings">
                                                                            <div class="cart__item__content__settings__quantity">
                                                                            <p>Qté : </p>
                                                                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.quantity}">
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
    removeFromCart();
}
}

function removeFromCart() {
const deleteItem = document.querySelector('.deleteItem');
deleteItem.forEach((deleteItem) => {
deleteItem.addEventListener('click', () => {
    console.log(deleteItem);
    if (window.confirm('Voulez vous supprimer cet article?')) {
        let cart = getCart();
        let foundItem = cart.find(p => p._id == product._id && p.colors == product.colors);
        window.localStorage.removeItem(foundItem);
        saveCart(cart);
    }
})
})
}
