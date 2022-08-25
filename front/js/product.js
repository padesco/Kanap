// Array pour le panier
const productSelection = [];
// on récupère l'url courante
const urlId = window.location.search;
// la propriété "urlSearchParams" de "urlId" nous retourne un objet de type "URLSearchParams"
const urlSearchParams = new URLSearchParams(urlId);
// on récupére la valeur de 'id'
const id = urlSearchParams.get('id');
console.log(id);
productSelection.id = id;


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

    });


// Choix de la couleur
let colorSelection = document.getElementById('colors');
// écoute de l'événement sur l'élément (#colors)
colorSelection.addEventListener('input', function(event) {
    // on récupère la valeur de la cible
    let colorProduct = event.target.value;
    // on ajoute la couleur à l'object productSelection
    productSelection.color = colorProduct;
    console.log(productSelection.color);
    event.preventDefault();
});

// Sélection de la quantité
let quantitySelection = document.getElementById('quantity');
// écoute de l'événement sur l'élément (#quantity)
quantitySelection.addEventListener('input', function(event) {
    // on récupère la valeur de la cible
    let quantityProduct = event.target.value;
    // on ajoute la quantité à l'object productSelection
    productSelection.quantity = quantityProduct;
    console.log(productSelection.quantity);
    event.preventDefault();
});

// Clique pour ajouter au panier
let addToCart = document.getElementById('addToCart');
addToCart.addEventListener('click', () => {
    if (
        productSelection.quantity < 1 || productSelection.quantity > 100 || productSelection.color === '' || productSelection.color === undefined
    ) {
        alert (
            'Veuillez renseigner une couleur et une quantité valide, entre 1 et 100 !'
        );
    } else {
        console.log(productSelection);
        alert('Votre sélection a été ajouté au panier, merci !');
    }
});

