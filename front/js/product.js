//On récupère l'url , on le décompose en un objet pour pouvoir récupérer l'id 
const queryUrl = window.location.href;
const url = new URL(queryUrl);
const id = url.searchParams.get('id');
//On récupère les données spécifique à l'id avec un fetch
const execute = () => {
    fetch(`http://localhost:3000/api/products/${id}`)
    .then(response => {
        switch(response.status){
            case 200:
                return response.json();
            case 404:
                alert('Page introuvable');
                return null;
            case 500:
                alert('Le serveur a rencontré une erreur.');
                return null;
            default:
                alert('Erreur introuvable');
                return null;
        }
    })
    //On crée les éléments et on leur affecte leur propriétés 
    .then(data => {
        let viewImg = `<img src="${data.imageUrl}"> `;        
        document.querySelector('.item__img').innerHTML = viewImg;
        let viewTitle = `${data.name}`;
        document.querySelector('#title').innerHTML = viewTitle;
        let viewPrice = `${data.price}`;
        document.querySelector('#price').innerHTML = viewPrice;
        let viewDescription = `${data.altTxt}`;
        document.querySelector('#description').innerHTML = viewDescription;    
        let tabCol = data.colors;        
        let viewColor = "";
        viewColor = `<option value ="">--SVP, choisissez une couleur</option>\n`
        for(let i of tabCol){            
            viewColor += `<option value ="${i}">${i}</option>\n`;
            }        
        document.querySelector('#colors').innerHTML = viewColor;
        const btn_addBasket = document.querySelector('#addToCart');
        //au click sur le boutton , on récupère les données correspondantes à l'id, la quantité, et la couleur
        btn_addBasket.addEventListener('click',(event)=> {
            event.preventDefault();
            function getBasket(){
                return JSON.parse(localStorage.getItem('basket')) || [];
            }
            function saveBasket(basket){
                localStorage.setItem('basket',JSON.stringify(basket)) ;
            }
            //on crée une fonction qui ajoute les données au panier
            function addBasket(product) {
                    let basket = getBasket();
                    let foundProduct = basket.find(p => p.id == product.id && p.option_product == product.option_product);
                    if(foundProduct != undefined){
                        foundProduct.quantity = (parseInt(foundProduct.quantity)+parseInt(product.quantity));
                    }else {
                        basket.push(product);
                    }    
                    saveBasket(basket);                
            }
            let colorSelected = document.querySelector('#colors').value;
            const numberOfItem = document.querySelector('#quantity').value;
            let selectArticle = {
                id : data._id,
                quantity :parseInt(numberOfItem),
                option_product : colorSelected,
                }   
            //on crée une fonction qui vérifie que la valeur de la quantité désirée soit bien un entier
            function fits(valueNumber){
            if(Number.isInteger(valueNumber)){
                return true;
            }
            return false;           
            }
            let num = Number(numberOfItem);
            //selon les valeurs des données on valide le chois d'article où on émet des alertes contenants un descriptif de l'erreur;
            if (colorSelected != "" && numberOfItem != 0 && numberOfItem <= 100  && fits(num) ) {            
                alert(`${numberOfItem} ${data.name}, couleur ${colorSelected}, ${(numberOfItem <= 1) ? "a bien été ajouté " : "ont bien été ajoutés"} au panier. `);
                addBasket(selectArticle);
            }else if(colorSelected != "" && numberOfItem != 0   && !fits(num) ){
                alert('Veuillez entrer un nombre entier inférieur à 100');
            }else if( colorSelected != "" && numberOfItem != 0 && numberOfItem > 100 && fits(num)) {
                alert('Veuillez indiquer une quantité inférieur à 100');
            }else if (colorSelected == "" && numberOfItem != 0 ){
                alert ('Veuillez indiquer une couleur !');
            }  
            else if (colorSelected != "" && numberOfItem == 0 ){
                alert ('Veuillez indiquer une quantité !');
            }
            else if (colorSelected == "" && numberOfItem == 0 ){
                alert('Veuillez indiquer une quantité et une couleur !');
            }  
        })
    })
};
execute();
