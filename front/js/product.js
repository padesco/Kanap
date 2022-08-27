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

// Clique pour ajouter au panier
let addToCart = document.getElementById('addToCart');
addToCart.addEventListener('click', function() {
    error.innerText = "";
    if (
        quantityProduct > 0
        && quantityProduct <= 100
        && colorProduct !== ''
    ) {
        // Objet nouveau produit
        let productSelection = {
            _id : id,
            quantity : quantityProduct,
            colors : colorProduct
        };
        // Si nouveau produit, on le parse en JSON pour ajouter de nouveaux produits
        if (localStorage.getItem("products") !== null) {
            productSelection = JSON.parse(localStorage.getItem("products"));
        }
        // Fonction future pour ajouter des doublons
        
        // Push des nouveaux produits dans le panier
        productSelection.push(productSelection);
        localStorage.setItem("products", JSON.stringify(productSelection));
        alert('Votre sélection a été ajouté au panier, merci !');
        console.log(productSelection);
    } else {
        alert (
            'Veuillez renseigner une couleur et une quantité valide, entre 1 et 100 !'
        );
    }
});

