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
let colorSelection = document.getElementById('colors');
// écoute de l'événement sur l'élément (#colors)
colorSelection.addEventListener('input', function(event) {
    // on récupère la valeur de la cible
    let colorProduct = event.target.value;
    console.log(colorProduct);
    event.preventDefault();
});

// Sélection de la quantité
let quantitySelection = document.getElementById('quantity');
// écoute de l'événement sur l'élément (#quantity)
quantitySelection.addEventListener('input', function(event) {
    // on récupère la valeur de la cible
    let quantityProduct = event.target.value;
    console.log(quantityProduct);
    event.preventDefault();
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
    let cart = getCart();
    console.log(cart);
    const values = Object.values(cart);
    console.log(values);
    let foundProduct = values.find(p => p._id == product._id);
    console.log(foundProduct);
    // si il y a un produit identique (id et couleur) alors on augmente la quantité
    if (foundProduct != undefined) {
        foundProduct.quantity++;
    // sinon on rajoute un autre produit dans le local storage
    } else {
        product.quantity = 1;
        cart.push(product);
    }
    // on envoi dans le local storage
    saveCart(cart);
}


//--------------------------------------------------
//----Envoi des éléments dans le local storage----//
//--------------------------------------------------

// Clique pour ajouter au panier
const addToCart = document.getElementById('addToCart');
addToCart.addEventListener('click', (event) => {
    event.preventDefault();
    // Condition pour pouvoir envoyer la sélection dans le panier
    if (
        quantityProduct > 0
        && quantityProduct <= 100
        && colorProduct !== ''
    ) { // On crée un objet pour y mettre l'ID, la quantité et la couleur sélectionné
        let product = {
            _id: id,
            colors: colorProduct,
            quantity: quantityProduct
        };
        console.log(product);
        addCart(product);
    } else {
        // Alert si les conditions pour envoyer dans le panier ne sont pas respectées
        alert ('Veuillez renseigner une couleur et une quantité valide, entre 1 et 100 !');
    }
});

