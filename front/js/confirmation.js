localStorage.clear();
//récuérer l'id
let adress = window.location.href;
let url = new URL(adress);
let idOrder = url.searchParams.get("id");

let orderId = document.getElementById("orderId");
orderId.textContent = idOrder;