// on récupère l'url courante
const urlId = window.location.search;
// la propriété "urlSearchParams" de "urlId" nous retourne un objet de type "URLSearchParams"
const urlSearchParams = new URLSearchParams(urlId);
// on récupére la valeur de 'id'
const id = urlSearchParams.get('id');
console.log(id);


// créer une requête API fetch pour chaque 'id'
fetch(`http://localhost:3000/api/products/${id}`)
    // récupérer et interpréter le résultat au format JSON
    .then( data => data.json())
    .then( productId => {
        console.log(productId)
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
        error.innerHTML = `<p style="text-align:center">Une erreur est survenue, veuillez nous en excuser! Notre équipe met tout en oeuvre pour régler ce problème dans les plus bref délais.</p>`;
        console.log("erreur chargement du produit");
    });


// Choix de la couleur
let colorSelection = document.getElementById('colors');
// écoute de l'événement sur l'élément (#colors)
colorSelection.addEventListener('input', function(event) {
    // on récupère la valeur de la cible
    let colorProduct = event.target.value;
    colorSelection = colorProduct;
    console.log(colorSelection);
    event.preventDefault();
});

// Sélection de la quantité
let quantitySelection = document.getElementById('quantity');
// écoute de l'événement sur l'élément (#quantity)
quantitySelection.addEventListener('input', function(event) {
    // on récupère la valeur de la cible
    let quantityProduct = event.target.value;
    quantitySelection = quantityProduct;
    console.log(quantitySelection);
    event.preventDefault();
});

// Récupération des données sélectionnées et envoi dans le panier
// Sélection du bouton d'ajout au panier
let addToCart = document.querySelector("#addToCart");
console.log(addToCart);

// Ecoute du bouton
addToCart.addEventListener("click", (event) => {
    event.preventDefault();

    // Récupération des valeurs de la sélection
    let productSelection = {
    _id: id,
    colors: colorSelection,
    quantity: quantitySelection
    };
    console.log(productSelection);

    //----Le local Storage----//
//Déclaration de la variable "productStorage" dans laquelle on met les clés et valeurs
let productStorage = JSON.parse(localStorage.getItem("products"));
// JSON.parse pour convertir les données au format JSON qui sont dans le local storage
console.log(productStorage);

// Fonction ajouter produit sélectionné dans le localStorage
const addToStorage = () => {
    // Ajout de l'objet dans le localStorage
    productStorage.push(productSelection);
    // Transformation en format JSON et envoyer dans la clé "products" du localStorage
    localStorage.setItem("products", JSON.stringify(productStorage));
};

// si il y a des produits déjà enregistré dans le local storage
if (productStorage){
    console.log("il y a déjà un produit dans le local storage");
    addToStorage();
    console.log(productStorage);
    alert('Votre sélection a été ajouté au panier, merci!')
} else {
    productStorage = [];
    addToStorage();
    console.log(productStorage);
}
});
