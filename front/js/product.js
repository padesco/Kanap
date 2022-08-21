// on récupère l'url courante
const urlId = window.location.search;
// la propriété "searchId" de "url" nous retourne un objet de type "URLSearchId"
const urlSearchParams = new URLSearchParams(urlId);
// on peut facilement vérifier la présence d'une clé
const id = urlSearchParams.get('id');
console.log(id);

fetch(`http://localhost:3000/api/products/${id}`)
    .then( data => data.json())
    .then( productId => {
        console.log(productId)
        document.getElementsByClassName('item__img').innerHTML = `<img src="${productId.imageUrl}" alt="${productId.altTxt}">`;
        document.getElementById('title').textContent = `${productId.name}`;
        document.getElementById('price').textContent = `${productId.price}`;
        document.getElementById('description').textContent = `${productId.description}`;
        for (color of productId.colors){
            document.getElementById('colors').innerHTML += `<option value="${color}">${color}</option>`;
        }
    });

