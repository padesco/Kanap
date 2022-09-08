//--------------------------
//----Le Local Storage----//
//--------------------------

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
     let error = document.querySelector("main");
     error.innerHTML = `<h2 style="text-align:center">Une erreur est survenue, veuillez nous en excuser! <br> Notre équipe met tout en oeuvre pour régler ce problème dans les plus bref délais.</h2>`;
 });

// On récupère les informations de l'API avec la fonction productCart
function productCart(itemsList) {
    // on récupère les éléments du localStorage
    let cart = getCart();
// Si le panier est vide
if (cart == null || cart == '') {
    document.querySelector("main").innerHTML = `<h2 style="text-align:center">Votre panier est vide !</h2>`;
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
    // on envoie dans les différentes fonctions pour faire une boucle et mettre à jour automatiquement
    changeQuantity(itemsList);
    removeFromCart(itemsList);
    getNumberProduct();
    getTotalPrice(itemsList);
}
}


//-----------------------------------------------------
//--------------Gestion du panier -------------------//
//-----------------------------------------------------

// fonction pour modifier la quantité
function changeQuantity(itemsList) {
    // on sélectionne tous les éléments de '.itemQuantity' et on parcours chaque élément
    let myNodeList = document.querySelectorAll('.itemQuantity');
    myNodeList.forEach((product) => {
        // écoute de l'événement sur chaque élément '.itemQuantity'
        product.addEventListener('change', function(event) {
            // on récupère l'article concerné avec les détails du produits
            let productSelected = product.closest('article');
            // on récupère les éléments du local storage
            let cart = getCart();
            // on compare pour trouver le produit sélectionné
            let foundProduct = cart.find(p => p._id == productSelected.dataset.id
                && p.colors == productSelected.dataset.color);
            // on récupère la valeur de la cible et on récupère la valeur entière
            let quantityProduct = event.target.value;
            foundProduct.quantity = parseInt(quantityProduct);
            // si les conditions de quantité sont respectées on envoie dans le localStorage
            if (
                quantityProduct > 0
                && quantityProduct <= 100
            ) {
                saveCart(cart);
            // sinon message d'alerte
            } else {
                alert ('Veuillez rentrer une quantité entre 1 et 100 !')
            }
            // on retourne vers les fonctions pour la quantité totale et le prix totale
            getNumberProduct();
            getTotalPrice(itemsList);
        })
    })
}

// fonction pour supprimer un produit
function removeFromCart(itemsList) {
    // on sélectionne tous les éléments de '.deleteItem' et on parcours chaque élément
    let myNodeList = document.querySelectorAll('.deleteItem');
    myNodeList.forEach((product) => {
        // écoute de l'événement sur chaque élément '.deleteItem'
        product.addEventListener('click', function(event) {
            // on récupère l'article concerné avec les détails du produits
            let productSelected = product.closest('article');
            // on récupère les éléments du local storage
            let cart = getCart();
            // si l'utilisateur confirme on supprime le produit
            if (window.confirm('Êtes-vous sûre de vouloir supprimer cet article?')) {
                 // on utilise splice pour supprimer un objet de l'array 'cart' et on utilise findIndex pour trouver le produit sélectionné
                let foundProduct = cart.splice(cart.findIndex(p => p._id == productSelected.dataset.id
                && p.colors == productSelected.dataset.color),1);
                // on sauvegarde le panier
                saveCart(cart);
                // on recharge la page pour mettre à jour le panier
                return location.reload();
            }
            // on retourne vers les fonctions pour la quantité totale et le prix totale
            getNumberProduct();
            getTotalPrice(itemsList);
        })
    })
}

// fonction pour calculer le total de produit
function getNumberProduct() {
    // sélection de l'emplacement de la quantité totale
    const totalQuantity = document.getElementById('totalQuantity');
    // on récupère les éléments du localStorage
    let cart = getCart();
    let number = 0;
    // on parcours le localStorage
    for (product of cart) {
        // on additionne toute les quantité du localStorage
        number += product.quantity;
    }
    // on retourne le résultat à l'emplacement prévu dans la page
    return totalQuantity.textContent = number;
}

// fonction pour calculer le total du prix
function getTotalPrice(itemsList) {
    // sélection de l'emplacement du prix total
    const totalPrice = document.getElementById('totalPrice');
    // on récupère les éléments du localStorage
        let cart = getCart();
        let total = 0;
        // on parcours l'API
        for (item of itemsList)
            // on parcours le localStorage
            for (product of cart) {
                // on compare les id pour trouver le prix correspondant au produit
                if (item._id === product._id)
                    // on multiplie la quantité par le prix correspondant de chaque produit du localStorage puis on les additionnes
                    total += product.quantity * item.price;
                }
                // on retourne le résultat à l'emplacement prévu dans la page
                return totalPrice.textContent = total;
}

//-------------------------------------------------------------
//---------------------Formulaire----------------------------//
//-------------------------------------------------------------

// on créé des objets pour récupérer les données utilisateurs remplies dans le formulaire
let firstNameUser, lastNameUser, addressUser, cityUser, emailUser;

// confirmation du prénom
const firstName = document.getElementById('firstName');
// on écoute l'élément "#firstname"
firstName.addEventListener('input', function(e) {
    // si le prénom respecte la validation regex
    if (e.target.value.match(/^[a-zA-Záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ.,'’\s-]{3,25}$/)) {
        firstNameErrorMsg.innerHTML = 'Votre prénom est valide !';
        document.getElementById('firstNameErrorMsg').style.color = 'lightgreen';
        // on récupère le résultat dans l'objet 'firstNameUser'
        firstNameUser = e.target.value;
    } else { // sinon message d'erreur
        firstNameErrorMsg.textContent = `Doit contenir entre 3 et 25 lettres, sans caractères spéciaux ou chiffres !`; 
    }
})

// confirmation du nom
const lastName = document.getElementById('lastName');
// on écoute l'élément "#lastName"
lastName.addEventListener('input', function(e) {
    // si le nom respecte la validation regex
    if (e.target.value.match(/^[a-zA-Záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ.,'’\s-]{1,25}$/)) {
        lastNameErrorMsg.innerHTML = 'Votre nom est valide !';
        document.getElementById('lastNameErrorMsg').style.color = 'lightgreen';
        // on récupère le résultat dans l'objet 'lastNameUser'
        lastNameUser = e.target.value;
    } else { // sinon message d'erreur
        lastNameErrorMsg.textContent = `Doit contenir entre 1 et 25 lettres, sans caractères spéciaux ou chiffres !`;
    }
})

// confirmation de la ville
const city = document.getElementById('city');
// on écoute l'élément "#city"
city.addEventListener('input', function(e) {
    // si la ville respecte la validation regex
    if (e.target.value.match(/^[a-zA-Záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ.,'’\s-]{3,50}$/)) {
        cityErrorMsg.innerHTML = 'Votre ville est valide!';
        document.getElementById('cityErrorMsg').style.color = 'lightgreen';
        // on récupère le résultat dans l'objet 'cityUser'
        cityUser = e.target.value;
    } else { // sinon message d'erreur
        cityErrorMsg.textContent = `Doit contenir entre 3 et 50 lettres, sans caractères spéciaux ou chiffres !`;
    }
})

// confirmation de l'adresse
const address = document.getElementById('address');
// on écoute l'élément "#address"
address.addEventListener('input', function(e) {
    // si l'adresse respecte la validation regex
    if (e.target.value.match(/^[0-9]{1,6}[a-zA-Záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ.,'’\s-]{3,60}$/)) {
        addressErrorMsg.innerHTML = 'Votre adresse est valide !';
        document.getElementById('addressErrorMsg').style.color = 'lightgreen';
        // on récupère le résultat dans l'objet 'addressUser'
        addressUser = e.target.value;
    } else { // sinon message d'erreur
        addressErrorMsg.textContent = `Doit contenir entre 3 et 60 caractères et correspondre à une adresse valide, par exemple: 123 rue ...... !`;
    }
})
// confirmation de l'email
const email = document.getElementById('email');
// on écoute l'élément "#email"
email.addEventListener('input', function(e) {
    // si l'email respecte la validation regex
    if (e.target.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,5}$/)) {
        emailErrorMsg.innerHTML = 'Votre email est valide !';
        document.getElementById('emailErrorMsg').style.color = 'lightgreen';
        // on récupère le résultat dans l'objet 'emailUser'
        emailUser = e.target.value;
    } else { // sinon message d'erreur
        emailErrorMsg.textContent = `Votre email n'est pas valide, exemple: ----@---.-- !`;
    }
})

// confirmation de la commande et envoie des informations à l'API
const order = document.getElementById('order');
order.addEventListener('click', async(e) => {
    e.preventDefault();
    // on récupère les données du localStorage
    let cart = getCart();
    // si le panier n'est pas vide et le formulaire rempli correctement
    if (cart !== null && firstNameUser !== undefined && lastNameUser !== undefined
        && cityUser !== undefined && addressUser !== undefined && emailUser !== undefined) {

        // on récupère les id de chaque produit
        let productId = [];
        for (let product of cart){
            productId.push(product._id);
        }
        // on rassemble les informations dans un objet data
        const userInformation = {
            contact: {firstName: firstNameUser, lastName: lastNameUser,
                address: addressUser, city: cityUser, email: emailUser},
            products: productId };
        
        // on envoie au back avec la méthode "POST" l'objet data 
        let response = await fetch('http://localhost:3000/api/products/order', {
            method: 'POST',
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            body: JSON.stringify(userInformation)
        });
        // on récupère la réponse du serveur dans result
        let result = await response.json();

        // on redirige l'utilisateur sur la page Confirmation, en passant l'id de commande dans l'URL
        document.location.href = `confirmation.html?orderId=${result.orderId}`;
    } else { // sinon message explicatif
        alert('Veuillez renseigner tous les champs du formulaire !');
    }
})