/**
 * Insérer les produits dans la page d’accueil
 */
// créer une requête API fetch
fetch("http://localhost:3000/api/products")
    // récupérer et interpréter le résultat au format JSON
    .then( data => data.json())
    .then( productList => {
        console.log(productList)
        // Traiter les données dans l'ordre avec la boucle for... of pour effectuer le travail d'itération
        for(product of productList){
            document.getElementById('items').innerHTML += `<a href="./product.html?id=${product._id}">
                                                                <article>
                                                                <img src="${product.imageUrl}" alt="${product.altTxt}">
                                                                <h3 class="productName">${product.name}</h3>
                                                                <p class="productDescription">${product.description}</p>
                                                                </article>
                                                            </a>`
        };
    })
    // Message d'erreur en cas de problème
    .catch( function(err) {
        let error = document.querySelector("main");
        error.innerHTML = `<h2 style="text-align:center">Une erreur est survenue, veuillez nous en excuser! <br> Notre équipe met tout en oeuvre pour régler ce problème dans les plus bref délais.</h2>`;
        console.log("erreur chargement des produits");
    });
