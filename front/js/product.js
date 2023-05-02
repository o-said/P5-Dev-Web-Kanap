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
        console.log(data);
        console.log(data.imageUrl);
        let viewImg = `<img src="${data.imageUrl}"> `;
        console.log(viewImg);
        document.querySelector('.item__img').innerHTML = viewImg;
        let viewTitle = `${data.name}`;
        document.querySelector('#title').innerHTML = viewTitle;
        let viewPrice = `${data.price}`;
        document.querySelector('#price').innerHTML = viewPrice;
        let viewDescription = `${data.altTxt}`;
        document.querySelector('#description').innerHTML = viewDescription;
    
        let tabCol = data.colors;
        console.log(tabCol);
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
                img : data.imageUrl,
                txtAlt: data.altTxt,
                name : data.name,
                qty :numberOfItem,
                option : colorSelected,
                price : viewPrice
            }
            console.log(selectArticle);
        })
    
        }
)}
execute();