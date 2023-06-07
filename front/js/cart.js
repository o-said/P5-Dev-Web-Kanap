function getBasket(){
    let basket = localStorage.getItem("basket");
    if(basket == null){//dans le cas  d'un panier vide -> basket n'est pas déclaré
        return [];
    }else{//le panier existe
        return JSON.parse(basket)
    }        
}
let cart = [];
cart = getBasket();
let allProduct = [];
let products = [];
let imageUrl = [];
let totalProduct = [];
let totalPrice = 0;
const run =()=> {
    fetch(`http://localhost:3000/api/products/`)
    .then (response => response.json())
    .then (data => {         
        //boucle pour récupérer les données de l'api
        for(let product of data){
            allProduct.push(product);           
        };
        for(p of cart){            
            //récupérer les id du post 
                let article = {
                    id : p.id,
                    color: p.option_product,
                    quantity: p.quantity
                };                  
            //retrouver les produits de l'api et du panier
            const find = allProduct.find(product => product._id == p.id);   //ajoute la couleur                
            p.imageUrl = find.imageUrl;            
            p.altTxt = find.altTxt;            
            p.description = find.description;            
            p.price = find.price;            
            p.option_color = p.option_product;                 
            products.push(p.id)           
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
            h2Description.innerHTML = find.name;
            //cart__item__content__description > p
            let pDescriptionColor = document.createElement('p')
            divDescription.appendChild(pDescriptionColor);
            pDescriptionColor.innerText = p.option_color;
            let pDescriptionPrice = document.createElement('p')
            divDescription.appendChild(pDescriptionPrice);
            pDescriptionPrice.innerText = p.price + ' ' +'€';
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
            pQuantity.innerText = 'Qté' + ' ' + ' : ';
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
            valueItemQuantity.value = p.quantity;
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
            function totalNumberOfProduct(){    
                totalProduct = basket.getNumberProduct();
                document.getElementById('totalQuantity').innerHTML = totalProduct;
            }
            totalNumberOfProduct();
            function setTotalPrice(){
                let totalPrice = basket.getTotalPrice();                          
                document.getElementById("totalPrice").innerHTML = totalPrice;            
            }
            setTotalPrice(); 
            function changeNumberOfProducts() {
                inputQuantity.addEventListener("change", function (event) {
                event.preventDefault();
                let idChangedValue = article.id;
                let quantityChanged = Number(inputQuantity.value);
                let colorChanged = article.color;
                let panier = cart.find(
                    (el) => el.id === idChangedValue && el.option_product === colorChanged
                );
                if (panier) {
                    panier.quantity = quantityChanged;
                    localStorage.setItem("basket", JSON.stringify(cart));
                } else {
                    cart.push({
                    id: idChangedValue,
                    option_product: colorChanged,
                    quantity: quantityChanged,
                    });
                    localStorage.setItem("basket", JSON.stringify(cart));
                }
                setTotalPrice();
                location.reload();
                });
            }
            changeNumberOfProducts();
            function removeProduct() {
                divDelete.addEventListener('click', function (e) {
                    e.preventDefault();
                    let idItem = article.id;
                    let colorItem = article.color;
                    let updatedCart = cart.filter(el => el.id !== idItem || el.option_product !== colorItem);
                    e.target.closest('.cart__item').remove();
                    localStorage.setItem('basket', JSON.stringify(updatedCart));
                    alert('Ce produit a bien été supprimé du panier !');
                    location.reload();
                    });
                }
                removeProduct();
            }
            let contact  = {
                firstName: "",
                lastName: "",
                address: "",
                city: "",
                email: "",
            };
            console.log(contact)
            const regex = {
                firstName: /^[a-zA-ZÀ]+$/u,
                lastName: /^[a-zA-ZÀ]+$/u,
                address: /^[a-zA-Z0-9\s,'-]*$/u,
                city: /^[a-zA-Z\s-]+$/u,
                email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                };
            document.addEventListener('input', function () {   
                console.log(contact);
                const firstNameInput = document.getElementById('firstName');              
                const firstNameErrorMsg = document.getElementById('firstNameErrorMsg');            
                firstNameInput.addEventListener('input', function (e) {
                e.preventDefault();
                contact.firstName = e.target.value;
                if (!regex.firstName.test(firstNameInput.value)) {
                    firstNameErrorMsg.textContent = 'Le prénom est invalide.';
                } else {
                    firstNameErrorMsg.textContent = '';
                }
                });  
                const lastNameInput = document.getElementById('lastName');             
                const lastNameErrorMsg = document.getElementById('lastNameErrorMsg');            
                lastNameInput.addEventListener('input', function (e) {
                e.preventDefault();
                contact.lastName = e.target.value;
                if (!regex.lastName.test(lastNameInput.value)) {
                    lastNameErrorMsg.textContent = 'Le nom est invalide.';
                } else {
                    lastNameErrorMsg.textContent = '';
                }
                });  
                const addressInput = document.getElementById('address');             
                const addressErrorMsg = document.getElementById('addressErrorMsg');            
                addressInput.addEventListener('input', function (e) {
                e.preventDefault();
                contact.address = e.target.value;
                if (!regex.address.test(addressInput.value)) {
                    addressErrorMsg.textContent = 'L\'adresse est invalide.';
                } else {
                    addressErrorMsg.textContent = '';
                }
                }); 
                const cityInput = document.getElementById('city');               
                const cityErrorMsg = document.getElementById('cityErrorMsg');            
                cityInput.addEventListener('input', function (e) {
                contact.city = e.target.value;
                e.preventDefault();
                if (!regex.city.test(cityInput.value)) {
                    cityErrorMsg.textContent = 'La ville est invalide.';
                } else {
                    cityErrorMsg.textContent = '';
                }
                });  
                const emailInput = document.getElementById('email');              
                const emailErrorMsg = document.getElementById('emailErrorMsg');            
                emailInput.addEventListener('input', function (e) {
                contact.email = e.target.value;
                e.preventDefault();
                if (!regex.email.test(emailInput.value)) {
                    emailErrorMsg.textContent = 'L\'adresse email est invalide.';
                } else {
                    emailErrorMsg.textContent = '';
                }
                });            
                const submitButton = document.getElementById('order');
            submitButton.addEventListener('click', function (event) {
                event.preventDefault();
                const cart = getBasket();
                if (cart.length === 0) {
                alert('Votre panier est vide. Ajoutez des articles avant de soumettre le formulaire.');
                return ;
                } else{
                    const firstName = firstNameInput.value.trim();
                const lastName = lastNameInput.value.trim();
                const email = emailInput.value.trim();
                const address = addressInput.value.trim();
                const city = cityInput.value.trim();
                if (firstName === '' || lastName === '' || email === '' || address === '' || city === '') {
                alert('Veuillez remplir tous les champs du formulaire.');
           
                }else {
                    // Si toutes les conditions sont remplies, vous pouvez soumettre le formulaire ici
                const formInput = document.querySelector('.cart__order__form');                
                formInput.submit();
                }
                
                 //envoi de contact dans le localStorage
                localStorage.setItem("contact", JSON.stringify(contact));

                 //créer un objet order contenant les informations du formulaire de contact
                console.log(contact);
                let order = {
                    contact: contact,
                    products: products,
                }
                fetch("http://localhost:3000/api/products/order", {
                    //ajouter la methode POST
                    method: "post",
                    body: JSON.stringify(order),
                    headers: {
                        'content-type': 'application/json'
                    },
                })
                .then(response => response.json())
                .then((data) => {
                    console.log(data);
                    let orderId = data.Id;
                    location.assign("confirmation.html?id=" + orderId)
                })
                }
                
        });
            });                     
        });
    };
run();