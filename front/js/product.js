//On récupère l'url , on le décompose en un objet pour pouvoir récupérer l'id 
const queryUrl = window.location.href;
const url = new URL(queryUrl);
const id = url.searchParams.get('id');
//On récupère les données spécifique à l'id avec un fetch
const execute = () =>{
    fetch(`http://localhost:3000/api/products/${id}`)
    .then(response => {
        switch(response.status){
            case 200:
                return response.json();
            case 404:
                alert('Page introuvable');
                break;
            case 500:
                ('Le serveur a rencontré une erreur.')
                break;
            default:
                alert('Erreur introuvable')
                break;
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
            let colorSelected = document.querySelector('#colors').value;
            const numberOfItem = document.querySelector('#quantity').value;
            let selectArticle = {
                id : data._id,
                quantity :numberOfItem,
                option_product : colorSelected,
                }   
            //on crée une fonction qui vérifie que la valeur de la quantité désirée soit bien un entier
            function fits(valueNumber){
            if(Number.isInteger(valueNumber)){
                return true;
            }
            return false;           
            }
            let num = Number(numberOfItem)
            const confirmWindow = () => {
                //window.confirm 'Voulez vous continuer vos achats?
                //si oui on ajoute les données au localStorage et on retourne sur la page d'accueil
                if(window.confirm('Voulez-vous continuer vos achats ?')){
                    basket.add(selectArticle);
                    window.location.href = "index.html";   
                //si  non on ajoute les données au localeStorage et on passe a la page panier(cart.js)
                } else {                        
                    basket.add(selectArticle);
                    //window.location.assign("cart.html") ;                     
                }    
            }
            //selon les vvaleurs des données on valide le chois d'article ou on émet des alertes contenants un descriptif
            if (colorSelected != "" && numberOfItem != 0 && numberOfItem <= 100  && fits(num) ) {            
                confirmWindow();
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
                alert('Veuillez indiquer une quantité et une couleur !')
            }  
        })
    })
}
execute();
