/**
 * Insérer les produits dans la page d’accueil
 */
fetch("http://localhost:3000/api/products")
    .then( data => data.json())
    .then( productList => {
        console.log(productList)
        for(product of productList){
            document.getElementById('items').innerHTML += `<a href="./product.html?id=${product._id}">
                                                                <article>
                                                                <img src="${product.imageUrl}" alt="${product.altTxt}">
                                                                <h3 class="productName">${product.name}</h3>
                                                                <p class="productDescription">${product.description}</p>
                                                                </article>
                                                            </a>`
        };
    });
