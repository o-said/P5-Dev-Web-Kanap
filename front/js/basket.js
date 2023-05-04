//JSON.stringify() transforme un objet en chaine de caractère, JSON.parse convertit un chaîne de caractère en objet, tableau ou donnée complexe
function saveBasket(basket) {
    localStorage.setItem("basket", JSON.stringify(basket));
}
function getBasket() {
    let basket = localStorage.getItem("basket");
    if(basket == null) {//dans le cas d'un panier vide ->   basket n'est pas déclaré
        return[];
    }else{//le panier existe
        return JSON.parse(basket)
    }
}
function addBasket(product) {//fonction ajout au panier de la variable qu'on veut lui ajouter
    let basket = getBasket();//récupérer le panier
    let foundProduct = basket.find(p => p.id == product.id)//p = nom de la fonction ; fonction pour ls tableaux -> cherche un élément sur un tableau par raport à une condition
    //ex:on cherche dans le paniersi il y a un produit dont l'id est égal à l'id du produit que je veux ajouter ,
    //si il trouve il retournel'élément en question sinon renvoie undefined
    if(foundProduct != undefined) {
        foundProduct.quantity++;//si le produit est ans le panier on augmente la quantité sinon on l'ajoute
    }else {
        product.quantity = 1;
        basket.push(product);//ajout d'un ou de plusieurs éléments sous forme de tableau
    }
    saveBasket(basket);//on enregistre le pnier dans localStorage
}
function removeFromBasket(product){
    let basket = getBasket();
    //fonction filter est comme find , travail sur un tableau et qui va filtrerun tableau par raapport à une condition
    basket = basket.filter(p => p.id != product.id);
    saveBasket(basket);
}
function changeQuantity(product, quantity){
    let basket = getBasket();
    let foundProduct = basket.find(p => p.id == product.id);//on veut trouver le produit dans le panier
    if(foundProduct != undefined){
        foundProduct.quantity += quantity;
        if(foundProduct.quantity <= 0){//si la quantité est inférieur ou égal à 0 on le supprime
            removeFromBasket(foundProduct);
        }
    }else {
        saveBasket(basket); // on lenregistre que si le produit n'a pas été supprimé
    }
}
function getNumberOfProduct(){
    let basket = getBasket();
    let number = 0;
    for (let product of basket){
        number += product.quantity
    }
    return number;
}
/*dans la page produit sur le boutton ajouterau panier -> un addEventListener, au clic appelle la fonction addBasketen lui passant le le produit affiché sur la page .
sur la page panier pour supprimer un produit on appelle la fonction removeFromBasketavec le produit qui correspond à la ligne sur laquelle on a cliqué*/
function getTotalPrice(){
    let basket = getBasket();
    let total = 0;
    for (let product of basket){
        total += product.quantity * product.price;
    }
    return total;
}