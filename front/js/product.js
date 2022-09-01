// on récupère l'url courante
const urlId = window.location.search;
// la propriété "urlSearchParams" de "urlId" nous retourne un objet de type "URLSearchParams"
const urlSearchParams = new URLSearchParams(urlId);
// on récupére la valeur de 'id'
const id = urlSearchParams.get('id');

// créer une requête API fetch pour chaque 'id'
fetch(`http://localhost:3000/api/products/${id}`)
    // récupérer et interpréter le résultat au format JSON
    .then( data => data.json())
    .then( productId => {
        document.querySelector('.item__img').innerHTML = `<img src="${productId.imageUrl}" alt="${productId.altTxt}">`;
        document.querySelector('title').textContent = `${productId.name}`
        document.getElementById('title').textContent = `${productId.name}`;
        document.getElementById('price').textContent = `${productId.price}`;
        document.getElementById('description').textContent = `${productId.description}`;
        // Traiter les données dans l'ordre avec la boucle for... of pour effectuer le travail d'itération
        for (color of productId.colors){
            document.getElementById('colors').innerHTML += `<option value="${color}">${color}</option>`;
        }

    })
    // Message d'erreur en cas de problème
    .catch( function(err) {
        let error = document.querySelector(".item__img");
        error.innerHTML = `<h2 style="text-align:center">Une erreur est survenue, veuillez nous en excuser! <br> Notre équipe met tout en oeuvre pour régler ce problème dans les plus bref délais.</h2>`;
        console.log("erreur chargement du produit");
    });


// Choix de la couleur
let colorSelected = document.getElementById('colors');
// écoute de l'événement sur l'élément (#colors)
colorSelected.addEventListener('input', function(event) {
    // on récupère la valeur de la cible
    let colorProduct = event.target.value;
    colorSelected = colorProduct;
});

// Sélection de la quantité
let quantitySelected = document.getElementById('quantity');
// écoute de l'événement sur l'élément (#quantity)
quantitySelected.addEventListener('input', function(event) {
    // on récupère la valeur de la cible
    let quantityProduct = event.target.value;
    quantitySelected = parseInt(quantityProduct);
});


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
    let cart = localStorage.getItem("cart");
    // si il n'y a rien retourne un tableau vide
    if (cart == null) {
        return [];
    // sinon retourne la chaîne de caractère en tableau
    } else {
        return JSON.parse(cart);
    }
}

// fonction d'ajout de produit dans le local storage
function addCart(product) {
    let cart = [];
    cart = getCart();
    let foundProduct = cart.find(p => p._id == product._id && p.colors == product.colors);
    // si il y a un produit identique (id et couleur) alors on augmente la quantité
    if (foundProduct != undefined) {
        // on définie la nouvelle quantité
        let newQuantity = foundProduct.quantity + product.quantity;
        foundProduct.quantity = newQuantity;
        // si la quantité totale pour un produit fait plus de 100
        if (foundProduct.quantity > 100) {
            // on revient à l'ancienne quantité
            let oldQuantity = foundProduct.quantity - product.quantity;
            foundProduct.quantity = oldQuantity;
            alert ('La quantité pour ce produit est trop importante. Le maximum pour un produit est de 100 unités ! Pour voir la quantité totale pour ce produit consulté votre panier.')
            // sinon on ajoute la quantité
        } else {
            alert ('La quantité pour ce produit a été modifiée dans votre panier, merci!')
        }
    // sinon on rajoute un autre produit dans le local storage
    } else {
        cart.push(product);
        alert ('Le produit vient d\'être ajouté à votre panier, merci !')
    }
    // on envoi dans le local storage
    saveCart(cart);
}


//--------------------------------------------------
//----Envoi des éléments dans le local storage----//
//--------------------------------------------------

// Clique pour ajouter au panier
const addToCart = document.getElementById('addToCart');
addToCart.addEventListener('click', () => {
    // Condition pour pouvoir envoyer la sélection dans le panier
    if (
        quantitySelected > 0
        && quantitySelected <= 100
        && colorSelected !== ''
    ) { // On crée un objet pour y mettre l'ID, la quantité et la couleur sélectionné
        let product = {
            _id: id,
            colors: colorSelected,
            quantity: quantitySelected
        };
        console.log(product);
        addCart(product);
    } else {
        // Alert si les conditions pour envoyer dans le panier ne sont pas respectées
        alert ('Veuillez renseigner une couleur et une quantité valide, entre 1 et 100 !');
    }
});

