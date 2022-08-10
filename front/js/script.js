/**
 * Représentation du format d'un article
 */

class Article{
    constructor(jsonArticle){
        jsonArticle && Object.assign(this, jsonArticle);
    }
}

/**
 * Gestion des articles en objet
 */
 class ArticleManager{
    constructor(listArticle){
        this.listArticle = listArticle;
    }
 }


/**
 * Insérer les produits dans la page d’accueil
 */

fetch("http://localhost:3000/api/products")
    .then( data => data.json())
    .then( jsonListArticle => {
        for(let jsonArticle of jsonListArticle){
            let article = new Article(jsonArticle);
            document.getElementById('items').innerHTML += `<a href="./product.html?id=42">
                                                                <article>
                                                                <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
                                                                <h3 class="productName">Kanap name1</h3>
                                                                <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
                                                                </article>
                                                            </a>`
        };
    });
