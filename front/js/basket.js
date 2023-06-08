class Basket{
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
    add(product){    
        let foundProduct = this.basket.find(p => p.id == product.id && p.option_product == product.option_product);
        if(foundProduct != undefined){
            foundProduct.quantity = (parseInt(foundProduct.quantity)+parseInt(product.quantity));
        }else {
            //product.quantity = 1;
            this.basket.push(product);
        }    
        this.save();
    }
    remove(product){
    this.basket = this.basket.filter(p => p.id != product.id);//avec || au lieu de && pour la couleur
    this.save();
    }
    changeQuantity(product,quantity){
        let foundProduct = this.basket.find(p => p.id == product._id && p.option_product == product.option_product);
        
        if(foundProduct != undefined){//
            foundProduct.quantity += quantity;           
            //this.save();
            if(foundProduct.quantity <= 0){
                this.remove(foundProduct);
            }
        }else {
            this.save();
            }
    }
    getNumberProduct(){
    let number = 0;
        for(let product of this.basket){
            number += JSON.parse(product.quantity);
        }
        return number;
        }
    getTotalPrice(){
        let total = 0;
        let products = [];
        for (let p of cart){
            const find = allProduct.find(product => product._id == p.id);
            products.push(find);
            total += p.quantity * find.price;    
        console.log(total)    }
        return total; 
    }
}
let basket = new Basket();