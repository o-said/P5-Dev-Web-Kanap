function run() {
    let basket = localStorage.getItem("basket");    
    function getBasket() {                
        return JSON.parse(localStorage.getItem('basket')) || [];      
        }
    let cart = getBasket(); 
    fetch(`http://localhost:3000/api/products/`)
    .then (response => response.json())
    .then ((data) => {    
        let article = {};
        let pName = [];
        let pImageUrl = [];
        let pPrice = [];
        let pOption_color = [];
        let productsId = [];           
        //boucle pour récupérer les données de l'api
        let allProduct=data;         
        for(let p of cart){            
            //récupérer les id du post 
                article = {
                    id : p.id,
                    color: p.option_product,
                    quantity: p.quantity,
                };                  
            //retrouver les produits de l'api et du panier
            const find = allProduct.find(product => product._id == p.id);   //ajoute la couleur  
            pName = find.name;              
            pImageUrl = find.imageUrl;            
            pPrice = find.price;            
            pOption_color = p.option_product;                 
            productsId.push(p.id);                  
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
            dataColor.value = pOption_color;
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
            srcImg.value = pImageUrl;
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
            h2Description.innerHTML = pName;
            //cart__item__content__description > p
            let pDescriptionColor = document.createElement('p')
            divDescription.appendChild(pDescriptionColor);
            pDescriptionColor.innerText = pOption_color;
            let pDescriptionPrice = document.createElement('p')
            divDescription.appendChild(pDescriptionPrice);
            pDescriptionPrice.innerText = pPrice + ' ' +'€';
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
            valueItemQuantity.value = article.quantity;
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
            //Calcul du nombre total de produit
            function totalNumberOfProduct(){                 
                let number = 0;
                for(let product of cart){
                number += JSON.parse(product.quantity);
                }        
                document.getElementById('totalQuantity').innerHTML = number;
            }
            totalNumberOfProduct();
            //Calcul du prix total
            function setTotalPrice(){              
                let total = 0;
                for (let p of cart){
                    const find = allProduct.find(product => product._id == p.id);
                    total += p.quantity * find.price;    
                }               
                document.getElementById("totalPrice").innerHTML = total;            
            }
            setTotalPrice(); 
            //Changer la quantité de produit
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
            // Supprimer un produit
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
            // Formulaire
            let contact  = {
                firstName: "",
                lastName: "",
                address: "",
                city: "",
                email: "",
            };
            // Regex
            const regex = {
                firstName: /^[a-zA-ZÀ]+$/u,
                lastName: /^[a-zA-ZÀ]+$/u,
                address: /^[a-zA-Z0-9\s,'-]*$/u,
                city: /^[a-zA-Z\s-]+$/u,
                email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                };
            // Récupération des inputs
            const firstNameInput = document.getElementById('firstName');              
            const firstNameErrorMsg = document.getElementById('firstNameErrorMsg');  
            const lastNameInput = document.getElementById('lastName');             
            const lastNameErrorMsg = document.getElementById('lastNameErrorMsg'); 
            const addressInput = document.getElementById('address');
            const addressErrorMsg = document.getElementById('addressErrorMsg');
            const cityInput = document.getElementById('city');
            const cityErrorMsg = document.getElementById('cityErrorMsg');
            const emailInput = document.getElementById('email');
            const emailErrorMsg = document.getElementById('emailErrorMsg');
            // Ecoute des inputs
            document.addEventListener('input', function () {                    
                firstNameInput.addEventListener('input', function (e) {
                e.preventDefault();
                contact.firstName = e.target.value;
                if (!regex.firstName.test(firstNameInput.value)) {
                    firstNameErrorMsg.textContent = 'Le prénom est invalide.';
                } else {
                    firstNameErrorMsg.textContent = '';
                }
                });                            
                lastNameInput.addEventListener('input', function (e) {
                e.preventDefault();
                contact.lastName = e.target.value;
                if (!regex.lastName.test(lastNameInput.value)) {
                    lastNameErrorMsg.textContent = 'Le nom est invalide.';
                } else {
                    lastNameErrorMsg.textContent = '';
                }
                });  
                            
                addressInput.addEventListener('input', function (e) {
                e.preventDefault();
                contact.address = e.target.value;
                if (!regex.address.test(addressInput.value)) {
                    addressErrorMsg.textContent = 'L\'adresse est invalide.';
                } else {
                    addressErrorMsg.textContent = '';
                }
                }); 
                cityInput.addEventListener('input', function (e) {
                contact.city = e.target.value;
                e.preventDefault();
                if (!regex.city.test(cityInput.value)) {
                    cityErrorMsg.textContent = 'La ville est invalide.';
                } else {
                    cityErrorMsg.textContent = '';
                }
                });  
                emailInput.addEventListener('input', function (e) {
                contact.email = e.target.value;
                e.preventDefault();
                if (!regex.email.test(emailInput.value)) {
                    emailErrorMsg.textContent = 'L\'adresse email est invalide.';
                } else {
                    emailErrorMsg.textContent = '';
                }
                });  
            });    
            //envoi des données au serveur
                const submitButton = document.getElementById('order');
                submitButton.addEventListener('click', function (event) {
                event.preventDefault();
                //vérification du panier
                if (cart.length === 0) {
                        alert('Votre panier est vide. Ajoutez des articles avant de soumettre le formulaire.');                        
                }else {
                    //récupération des valeurs du formulaire
                const firstName = firstNameInput.value.trim();
                const lastName = lastNameInput.value.trim();
                const email = emailInput.value.trim();
                const address = addressInput.value.trim();
                const city = cityInput.value.trim();
                //validation des données du formulaire
                if (firstName === '' || lastName === '' || email === '' || address === '' || city === '') {
                alert('Veuillez remplir tous les champs du formulaire.');
                
                } else {
                                    // Si toutes les conditions sont remplies, vous pouvez soumettre le formulaire ici
                const formInput = document.querySelector('.cart__order__form'); 
                formInput.submit();              
                 //envoi de contact dans le localStorage
                 //créer un objet order contenant les informations du formulaire de contact
                let order = {
                    contact: 
                    {
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        address: address,
                        city: city,
                    },
                    products: productsId,
                }
                fetch("http://localhost:3000/api/products/order", {
                    //ajouter la methode POST
                    method: "POST",
                    body: JSON.stringify(order),
                    headers: {
                        'Content-type': 'application/json',
                        
                    },
                })
                .then(response => response.json())
                .then((data) => {                    
                    location.assign("confirmation.html?id=" + data.orderId);
                })
                .catch((error) => {
                    alert("Il y a eu une erreur : " + error);
                    });
                };  
            };                
        });
    })
}
run();