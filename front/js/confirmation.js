//effacer le localStorage
localStorage.clear();
//récupérer l'id
let adress = window.location.href;
let url = new URL(adress);
let idOrder = url.searchParams.get("id");
//afficher le numéro de commande
let orderId = document.getElementById("orderId");
orderId.textContent = idOrder;