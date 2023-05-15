class Basket {
    constructor(){
        let basket = localStorage.getItem("basket");
            if (basket == null) {
                this.basket = [];
            }else {
                this.basket = JSON.parse(basket);
            }
    }
    save() {
        localStorage.setItem("basket", JSON.stringify(this.basket));
    }
    add(product) {
        let foundProduct = this.basket.find(p =>p.id == product.id && p.option_product == product.option_product);
        if(foundProduct != undefined) {
            foundProduct.quantity = parseInt (product.quantity) + parseInt(foundProduct.quantity);
        }else {
            this.basket.push(product);
        }
        this.save();
    }
}
let basket = new Basket;

