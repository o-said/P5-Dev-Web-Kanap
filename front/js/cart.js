function getBasket(){
    let basket = localStorage.getItem("basket");
    if(basket == null){//dans le cas  d'un panier vide -> basket n'est pas déclaré
        return [];
    }else{//le panier existe
        return JSON.parse(basket)
    }    
}
let cart = getBasket();
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
        };
        for(let p of cart){
            //récupérer les id du post 
            products.push(p.id);            
            //retrouver les produits de l'api et du panier
            const find = allProduct.find(product => product._id == p.id);            
            p.imageUrl = find.imageUrl;            
            p.altTxt = find.altTxt;
            console.log(p.altTxt);
            p.description = find.description;
            console.log(p.description);
            p.price = find.price;
            console.log(p.price);
            p.option_color = p.option_product;
            
            //création des différentes balises et de leur propriété
            let item = document.createElement('article');
            let items = document.getElementById('cart__items');
            items.appendChild(item);
            let classArticle = document.createAttribute('class');
            classArticle.value = "cart__item";
            item.setAttributeNode(classArticle);
            let dataId = document.createAttribute('data-id');
            dataId.value = `"${p.id}"`;
            item.setAttributeNode(dataId);
            let dataColor = document.createAttribute('data-color');
            dataColor.value = p.option_color;
            item.setAttributeNode(dataColor);
            //div class="cart__item__img"
            let divImg =document.createElement('div');
            item.appendChild(divImg);
            let classImg = document.createAttribute('class');
            classImg.value = "cart__item__img";
            divImg.setAttributeNode(classImg);
            let img = document.createElement('img');
            divImg.appendChild(img);
            let srcImg = document.createAttribute('src');
            srcImg.value = p.imageUrl;
            img.setAttributeNode(srcImg);
            //div class=" cart__item__content"
            let divContent = document.createElement('div');
            item.appendChild(divContent);
            let contentClass =  document.createAttribute('class');
            contentClass.value = "cart__item__content";
            divContent.setAttributeNode(contentClass);
            //div class="cart__item__content__description"
            let divDescription = document.createElement('div');
            divContent.appendChild(divDescription);
            let descriptionClass = document.createAttribute('class');
            descriptionClass.value = "cart__item__content__description";
            divDescription.setAttributeNode(descriptionClass);
            //cart__item__content__description > h2
            let h2Description = document.createElement('h2');
            divDescription.appendChild(h2Description);
            //cart__item__content__description > p
            let pDescriptionColor = document.createElement('p')
            divDescription.appendChild(pDescriptionColor);
            let pDescriptionPrice = document.createElement('p')
            divDescription.appendChild(pDescriptionPrice);
            //div "cart__item__content__settings"
            let divContentSetting = document.createElement('div');
            divContent.appendChild(divContentSetting);
            let classSetting = document.createAttribute('class');
            classSetting.value = "cart__item__content__settings";
            divContentSetting.setAttributeNode(classSetting);
            //div "cart__item__content__settings__quantity"
            let divQuantity = document.createElement('div');
            divContentSetting.appendChild(divQuantity);
            let classQuantity = document.createAttribute('class');
            classQuantity.value = "cart__item__content__settings__quantity";
            divQuantity.setAttributeNode(classQuantity);
            //div "cart__item__content__settings__quantity" > p
            let pQuantity = document.createElement('p');
            divQuantity.appendChild(pQuantity);
            //div "cart__item__content__settings__quantity" > input
            let inputQuantity = document.createElement('input');
            divQuantity.appendChild(inputQuantity);
            let inputType = document.createAttribute('type');
            inputType.value = "number";
            inputQuantity.setAttributeNode(inputType);
            let classItemQuantity = document.createAttribute('class');
            classItemQuantity.value = "itemQuantity";
            inputQuantity.setAttributeNode(classItemQuantity);
            let nameItemQuantity = document.createAttribute('name');
            nameItemQuantity.value = "itemQuantity";
            inputQuantity.setAttributeNode(nameItemQuantity);
            let minItemQuantity = document.createAttribute('min');
            minItemQuantity.value = "1";
            inputQuantity.setAttributeNode(minItemQuantity);
            let maxItemQuantity = document.createAttribute('max');
            maxItemQuantity.value = "100";
            inputQuantity.setAttributeNode(maxItemQuantity);
            let valueItemQuantity = document.createAttribute('value');
            valueItemQuantity.value = "0";
            inputQuantity.setAttributeNode(valueItemQuantity);
            //div "cart__item__content__settings__delete";
            let divDelete = document.createElement('div');
            divContentSetting.appendChild(divDelete);
            let classDelete = document.createAttribute('class');
            classDelete.value = "cart__item__content__settings__delete";
            divDelete.setAttributeNode(classDelete);
            let pDelete = document.createElement('p');
            divDelete.appendChild(pDelete);
            let classPDelelete = document.createAttribute('class');
            classPDelelete.value = "deleteItem";
            pDelete.setAttributeNode(classPDelelete);
            pDelete.textContent = "Supprimer";
        }
        
    })
}
run();