//--------------------------
//----Le Local Storage----//
//--------------------------

// fonction pour enregistrer dans le local storage
export function saveCart(cart) {
    // transformation du tableau en chaîne de caractères
    localStorage.setItem("cart", JSON.stringify(cart));
}

// fonction pour récupérer les données du local storage
export function getCart() {
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