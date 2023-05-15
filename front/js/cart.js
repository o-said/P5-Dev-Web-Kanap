let cart = JSON.parse(window.localStorage.getItem('basket'));
console.log(cart);
let allProduct = [];
let products = [];
let imageUrl = [];
const run =()=> {
    fetch(`http://localhost:3000/api/products/`)
    .then (response => response.json())
    .then (data => {
        //boucle pour récupérer les données de l'api
        for(let product of data){
            allProduct.push(product);
            console.log(allProduct);
        };
        for(let p of cart){
            //récupérer les id du post 
            products.push(p.id);
            console.log(products)
            //retrouver les produits de l'api et du panier
            const find = allProduct.find(product => product._id == p.id);
            console.log(find);
            p.imageUrl = find.imageUrl;
            console.log(p.imageUrl);
            p.altTxt = find.altTxt;
            console.log(p.altTxt);
            p.description = find.description;
            console.log(p.description);
            p.price = find.price;
            console.log(p.price);
            p.option_color = find.option_product;
            console.log(p.option_product);
        }
    })
}
run();