const queryUrl = window.location.href;
console.log(queryUrl);
const url = new URL(queryUrl);
const id = url.searchParams.get('id');
console.log(queryUrl)
console.log(url)
console.log(id);

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
        let viewColor = '';
        for(let i of tabCol){
            viewColor += `<option value ="${i}">${i}</option>\n`;
            }
        document.querySelector('#colors').innerHTML = viewColor;
        const btn_addBasket = document.querySelector('#addToCart');
        btn_addBasket.addEventListener('click',(event)=> {
            event.preventDefault();
            let colorSelected = document.querySelector('#colors').value;
            const numberOfItem = document.querySelector('#quantity').value;
            let selectArticle = {
                id : data._id,
                quantity :numberOfItem,
                option_product : colorSelected,
                }        
            const confirmWindow = () => {
                if(window.confirm(`${numberOfItem} ${data.name} , couleur ${selectArticle.option_product} , ${(selectArticle.quantity <= 1) ? "a bien été ajouté " : "ont bien été ajoutés "} au panier \n Consulter le panier : OK ou revenir à l'acceuil : ANNULER `) ){
                    basket.add(selectArticle);
                    window.location.href = "cart.html"; 
                } else {                        
                    window.location.href = "index.html";                    
                }    
            }    
        if (colorSelected != '' && numberOfItem != 0 && numberOfItem <= 100) {
            confirmWindow();
        }else if(numberOfItem > 100 && colorSelected != '') {
            alert('Veuillez indiquer un nombre inférieur à 100');
        }else {
            alert('Veuillez choisir une couleur!');
        }
    })
})
}
execute();
/*
au click su ajouter au panier -> alert choix element ou quantité
quantité min et max
gérer création min et max
condition pour min et max:
        si depasse alert "quantité entre 1 et 100 pas 0"
si couleur et quantité choisie -> message "article bien ajouté"
utilser le localSrorage

2- LOCALSTORAGE
setItem , getItem pour sauvegarder ou obtenir les valeurs du panier
    3 valeurs dans localStorage:
        ID COULEUR QUANTITE
*dans panier
fetch-> avec id recuperer infos id+élément de référence
        couleur dans storage
*avant de sauvegarder le panier:
        gérer les quantités 
        verifier si produit de même quantité
        si noyuv créer la valeur dans le panier
        
        */