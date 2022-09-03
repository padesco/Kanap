// fonction pour enregistrer dans le local storage
function saveCart(cart) {
    // transformation du tableau en chaîne de caractères
    localStorage.setItem("cart", JSON.stringify(cart));
}

// fonction pour récupérer les données du local storage
function getCart() {
    let cart = [];
    cart = localStorage.getItem("cart");
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
 .then( itemsList => {
    // Appel de la fonction productCart
     productCart(itemsList);
 })
 // Message d'erreur en cas de problème
 .catch( function(err) {
     let error = document.querySelector("#cart__items");
     error.innerHTML = `<h2 style="text-align:center">Une erreur est survenue, veuillez nous en excuser! <br> Notre équipe met tout en oeuvre pour régler ce problème dans les plus bref délais.</h2>`;
 });

// On récupère les informations de l'API avec la fonction productCart
function productCart(itemsList) {
    // on récupère les éléments du localStorage
    let cart = getCart();
// Si le panier est vide
if (cart === null) {
    document.querySelector("main").innerHTML = `<h2 style="text-align:center">Votre panier est vide.</h2>`;
} else {
    // Si le panier n'est pas vide: on récupère les produits
    for (item of itemsList) {
        // On crée une boucle pour récupèrer les éléments du local storage
        for (product of cart) {
            if (item._id === product._id) {
                // Création et ajout des valeurs correspondante
                document.getElementById('cart__items').innerHTML += `<article class="cart__item" data-id="${product._id}" data-color="${product.colors}">
                                                                        <div class="cart__item__img">
                                                                        <img src="${item.imageUrl}" alt="${item.altTxt}">
                                                                        </div>
                                                                        <div class="cart__item__content">
                                                                        <div class="cart__item__content__description">
                                                                            <h2>${item.name}</h2>
                                                                            <p>${product.colors}</p>
                                                                            <p>${item.price} €</p>
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
            }
        } 
    }
    changeQuantity(itemsList);
    removeFromCart(itemsList);
    getNumberProduct();
    getTotalPrice(itemsList);
}
}

// Sélection de la quantité
function changeQuantity(itemsList) {
    let myNodeList = document.querySelectorAll('.itemQuantity');
    myNodeList.forEach((product) => {
        // écoute de l'événement sur l'élément (.itemQuantity)
        product.addEventListener('change', function(event) {
            // on récupère l'article concerné avec les détails du produits
            let productSelected = product.closest('article');
            // on récupère l'id et la couleur
            let foundProduct = {
                _id : productSelected.dataset.id,
                colors : productSelected.dataset.color
            };
            // on récupère les éléments du local storage
            let cart = getCart();
            // on compare pour trouver le produit sélectionné
            let sameProduct = cart.find(p => p._id == foundProduct._id && p.colors == foundProduct.colors);
            // on récupère la valeur de la cible
            let quantityProduct = event.target.value;
            sameProduct.quantity = parseInt(quantityProduct);
            if (
                quantityProduct > 0
                && quantityProduct <= 100
            ) {
                console.log("on remplace la quantité");
                saveCart(cart);
            } else {
                alert ('Veuillez rentrer une quantité entre 1 et 100 !')
            }
            getNumberProduct();
            getTotalPrice(itemsList);
        })
    })
}

function removeFromCart(itemsList) {
    let myNodeList = document.querySelectorAll('.deleteItem');
    myNodeList.forEach((product) => {
        // écoute de l'événement sur l'élément (.deleteItem)
        product.addEventListener('click', function(event) {
            let productSelected = product.closest('article');
            let foundProduct = {
                _id : productSelected.dataset.id,
                colors : productSelected.dataset.color
            };
            let cart = getCart();
            let sameProduct = cart.find(p => p._id == foundProduct._id && p.colors == foundProduct.colors);
            console.log(sameProduct);
            if (window.confirm('Êtes-vous sûre de vouloir supprimer cet article?')) {
                console.log("on supprime l'article");
                localStorage.removeItem(sameProduct);
                saveCart(cart);
            }
            getNumberProduct();
            getTotalPrice(itemsList);
        })
    })
}

function getNumberProduct() {
    const totalQuantity = document.getElementById('totalQuantity');
    let cart = getCart();
    let number = 0;
    for (product of cart) {
        number += product.quantity;
    }
    return totalQuantity.textContent = `${number}`;
}

function getTotalPrice(itemsList) {
    const totalPrice = document.getElementById('totalPrice');
    let cart = getCart();
    let total = 0;
        for (item of itemsList)
            for (product of cart) {
                if (product._id === item._id) {
                    total += product.quantity * item.price;
                    console.log(product.quantity);
                }
                return totalPrice.textContent = `${total}`;
    }
}