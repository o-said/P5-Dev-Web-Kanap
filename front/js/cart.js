// Récupération du panier dans le local storage
async function getBasket() {
    return JSON.parse(localStorage.getItem('basket') || "[]");
}
//on crée toutes les variables dont on aura besoin et on les initialise dans des tableaux
let cart = [];
let productsId = [];
let pName = [];
let pImageUrl = [];
let pPrice = [];
let pOption_color = [];
let article = [];

// Affichage du panier
async function displayCart() {
    // Récupération du panier
    cart = await getBasket();
    //aatendre la réponse de l'api
    const response = await fetch(`http://localhost:3000/api/products/`);
    const data = await response.json();
    // Récupération des produits
    let product = data;
    for (let p of cart) {
        // Récupérer les id, couleur et quantité du post
        article = {
            id: p.id,
            color: p.option_product,
            quantity: p.quantity
        };
        // Récupérer les informations du produit
        // Récupérer le nom, l'image et le prix du produit des produits qui ont le même id que le post
        const find = product.find(product => product._id == p.id);
        pName = find.name;
        pImageUrl = find.imageUrl;
        pPrice = find.price;
        pOption_color = p.option_product;
        productsId.push(p.id);

        // Création de la structure HTML
        // cart__items
        let item = document.createElement('article');
        let items = document.getElementById('cart__items');
        items.appendChild(item);
        item.setAttribute('class', 'cart__item');
        item.setAttribute('data-id', p.id);
        item.setAttribute('data-color', pOption_color);

        // cart__item__img
        let divImg = document.createElement('div');
        item.appendChild(divImg);
        divImg.setAttribute('class', 'cart__item__img');
        let img = document.createElement('img');
        divImg.appendChild(img);
        img.setAttribute('src', pImageUrl);

        // cart__item__content
        let divContent = document.createElement('div');
        item.appendChild(divContent);
        divContent.setAttribute('class', 'cart__item__content');

        // cart__item__content__description
        let divDescription = document.createElement('div');
        divContent.appendChild(divDescription);
        divDescription.setAttribute('class', 'cart__item__content__description');

        // cart__item__content__description__title
        let h2Description = document.createElement('h2');
        divDescription.appendChild(h2Description);
        h2Description.innerHTML = pName;

        // cart__item__content__description__color
        let pDescriptionColor = document.createElement('p');
        divDescription.appendChild(pDescriptionColor);
        pDescriptionColor.innerText = pOption_color;

        // cart__item__content__description__price
        let pDescriptionPrice = document.createElement('p');
        divDescription.appendChild(pDescriptionPrice);
        pDescriptionPrice.innerText = pPrice + ' €';

        // cart__item__content__settings
        let divContentSetting = document.createElement('div');
        divContent.appendChild(divContentSetting);
        divContentSetting.setAttribute('class', 'cart__item__content__settings');

        // cart__item__content__settings__quantity
        let divQuantity = document.createElement('div');
        divContentSetting.appendChild(divQuantity);
        divQuantity.setAttribute('class', 'cart__item__content__settings__quantity');

        // cart__item__content__settings__quantity__input
        let pQuantity = document.createElement('p');
        divQuantity.appendChild(pQuantity);
        pQuantity.innerText = 'Qté' + ' : ';

        // cart__item__content__settings__quantity__input
        let inputQuantity = document.createElement('input');
        divQuantity.appendChild(inputQuantity);
        inputQuantity.setAttribute('type', 'number');
        inputQuantity.setAttribute('class', 'itemQuantity');
        inputQuantity.setAttribute('name', 'itemQuantity');
        inputQuantity.setAttribute('min', '1');
        inputQuantity.setAttribute('max', '100');
        inputQuantity.setAttribute('value', p.quantity);

        // cart__item__content__settings__delete
        let divDelete = document.createElement('div');
        divContentSetting.appendChild(divDelete);
        divDelete.setAttribute('class', 'cart__item__content__settings__delete');

        // cart__item__content__settings__delete__p
        let pDelete = document.createElement('p');
        divDelete.appendChild(pDelete);
        pDelete.setAttribute('class', 'deleteItem');
        pDelete.textContent = 'Supprimer';

        // Modification du nombre de produits
        function changeNumberOfProducts(inputQuantity, article) {
            //écoute le changement de la quantité
            inputQuantity.addEventListener("change", function (event) {
            event.preventDefault();
            let idChangedValue = article.id;
            let quantityChanged = Number(inputQuantity.value);
            let colorChanged = article.color;
            //cherche tous les éléments du panier qui ont le même id et la même couleur
            let panier = cart.find(
                (el) => el.id === idChangedValue && el.option_product === colorChanged
            );
            //si le panier existe, on modifie la quantité
            if (panier) {
                panier.quantity = quantityChanged;
                localStorage.setItem("basket", JSON.stringify(cart));
            }//sinon on ajoute le produit au panier 
            else {
                cart.push({
                id: idChangedValue,
                option_product: colorChanged,
                quantity: quantityChanged,
                });
                localStorage.setItem("basket", JSON.stringify(cart));
            }
            setTotalPrice();
            //on recharge la page pour afficher les modifications
            location.reload();
            });
        }
        changeNumberOfProducts(inputQuantity, article);

        // Suppression d'un produit
        function removeProduct(divDelete, article) {
            //écoute le clic sur le bouton supprimer
            divDelete.addEventListener('click', function (e) {
            e.preventDefault();
            let idItem = article.id;
            let colorItem = article.color;
            //on filtre le panier pour supprimer le produit qui a le même id et la même couleur
            let updatedCart = cart.filter(el => el.id !== idItem || el.option_product !== colorItem);
            //on cible l'élement parent du bouton supprimer pour supprimer le produit du DOM
            e.target.closest('.cart__item').remove();
            //on met à jour le panier
            localStorage.setItem('basket', JSON.stringify(updatedCart));
            alert('Ce produit a bien été supprimé du panier !');
            location.reload();
            });
        }
        removeProduct(divDelete, article);
    }

    // Calcul du nombre total de produits
    function totalNumberOfProduct() {
        let number = 0;
        for (let product of cart) {
            //on additionne la quantité de chaque produit
            number += JSON.parse(product.quantity);
        }
        //on affiche le nombre total de produits
        document.getElementById('totalQuantity').innerHTML = number;
    }
    totalNumberOfProduct();

    // Calcul du prix total
    function setTotalPrice() {
        let total = 0;
        for (let p of cart) {
            //on cherche tous les produits dans le data qui ont le même id que le produit du panier
            const find = product.find(product => product._id == p.id);
            total += p.quantity * find.price;
        }
        document.getElementById("totalPrice").innerHTML = total;
    }
    setTotalPrice();
}

async function validateForm() {
    // Création de l'objet contact
    let contact = {
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        email: "",
    };

    // Regex pour la validation du formulaire
    const regex = {
        name: /^[a-zA-ZÀ-àçèïéù\s'.-]+$/u,
        address: /^[a-zA-Z0-9-àçèïéù\s,'.-]*$/u,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    };

    // Création des variables pour les inputs et les messages d'erreur
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

    // Validation du prénom
    firstNameInput.addEventListener('input', function (e) {
        e.preventDefault();
        contact.firstName = e.target.value;
        // Si le prénom est invalide
        if (!regex.name.test(firstNameInput.value)) {
            firstNameErrorMsg.textContent = 'Le prénom est invalide.';
        } else 
        // Si le prénom est valide
        {
            firstNameErrorMsg.textContent = '';
        }
    });

    // Validation du nom
    lastNameInput.addEventListener('input', function (e) {
        e.preventDefault();
        contact.name = e.target.value;
        if (!regex.lastName.test(lastNameInput.value)) {
            lastNameErrorMsg.textContent = 'Le nom est invalide.';
        } else {
            lastNameErrorMsg.textContent = '';
        }
    });

    // Validation de l'adresse
    addressInput.addEventListener('input', function (e) {
        e.preventDefault();
        contact.address = e.target.value;
        if (!regex.address.test(addressInput.value)) {
            addressErrorMsg.textContent = 'L\'adresse est invalide.';
        } else {
            addressErrorMsg.textContent = '';
        }
    });

    // Validation de la ville
    cityInput.addEventListener('input', function (e) {
        e.preventDefault();
        contact.city = e.target.value;
        if (!regex.name.test(cityInput.value)) {
            cityErrorMsg.textContent = 'La ville est invalide.';
        } else {
            cityErrorMsg.textContent = '';
        }
    });

    // Validation de l'email
    emailInput.addEventListener('input', function (e) {
        e.preventDefault();
        contact.email = e.target.value;
        if (!regex.email.test(emailInput.value)) {
            emailErrorMsg.textContent = 'L\'adresse email est invalide.';
        } else {
            emailErrorMsg.textContent = '';
        }
    });

    // Envoi des données au serveur
    function submitForm() {
        const submitButton = document.getElementById('order');
        // Écoute du bouton de validation du formulaire
        submitButton.addEventListener('click', async function (event) {
            event.preventDefault();
            if (cart.length === 0) {
                alert('Votre panier est vide. Ajoutez des articles avant de soumettre le formulaire.');
            } else 
            // Si le formulaire est valide on récupère les données du formulaire et les produits du panier
            {
                const firstName = firstNameInput.value;
                const lastName = lastNameInput.value;
                const email = emailInput.value;
                const address = addressInput.value;
                const city = cityInput.value;
                //si tous les champs ne sont pas remplis on affiche une alerte
                if (firstName === '' || lastName === '' || email === '' || address === '' || city === '') {
                    alert('Veuillez remplir tous les champs du formulaire.');
                } else
                //si le formulaire est valide on envoie les données au serveur
                {
                    let order = {
                        contact: {
                            firstName: firstName,
                            lastName: lastName,
                            email: email,
                            address: address,
                            city: city,
                        },
                        products: productsId,
                    };

                    // Fetch POST pour envoyer les données au serveur
                    try {
                        // Envoi des données au serveur par le biais de la méthode POST
                        const response = await fetch("http://localhost:3000/api/products/order", {
                            // Configuration de la requête
                            method: "POST",
                            body: JSON.stringify(order),
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                            },
                        });

                        // Récupération de la réponse du serveur
                        const data = await response.json();
                        // Redirection vers la page de confirmation de commande
                        location.assign("confirmation.html?id=" + data.orderId);
                    } 
                    // Affichage de l'erreur dans la console
                    catch (error) {
                        console.log('Erreur : ' + error);
                    }
                }
            }
        });
    }
    submitForm();
}
displayCart();
validateForm();
