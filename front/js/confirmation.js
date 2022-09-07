let confirmationNumber = document.getElementById('orderId');

const params = new URLSearchParams(document.location.search);
const orderId = params.get("orderId");
localStorage.clear();

confirmationNumber.innerHTML = `<strong>${orderId}</strong><br>Merci pour votre commande !`;

