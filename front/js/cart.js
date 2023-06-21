// Récupération du panier dans le local storage
async function getBasket() {
    return JSON.parse(localStorage.getItem('basket') || "[]");
}

let cart = [];
let productsId = [];
let pName = [];
let pImageUrl = [];
let pPrice = [];
let pOption_color = [];
let article = [];

// Affichage du panier
async function displayCart() {
    cart = await getBasket();
    const response = await fetch(`http://localhost:3000/api/products/`);
    const data = await response.json();
    let product = data;
    console.log(product);

    for (let p of cart) {
    // Récupérer les id du post
    article = {
        id: p.id,
        color: p.option_product,
        quantity: p.quantity
    };
    console.log(cart);
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
        inputQuantity.addEventListener("change", function (event) {
        event.preventDefault();
        let idChangedValue = article.id;
        let quantityChanged = Number(inputQuantity.value);
        console.log(quantityChanged);
        let colorChanged = article.color;
        let panier = cart.find(
            (el) => el.id === idChangedValue && el.option_product === colorChanged
        );
        console.log(panier);
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
    changeNumberOfProducts(inputQuantity, article);

    // Suppression d'un produit
    function removeProduct(divDelete, article) {
        divDelete.addEventListener('click', function (e) {
        e.preventDefault();
        let idItem = article.id;
        let colorItem = article.color;
        let updatedCart = cart.filter(el => el.id !== idItem || el.option_product !== colorItem);
        console.log(updatedCart);
        e.target.closest('.cart__item').remove();
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
        number += JSON.parse(product.quantity);
    }
    document.getElementById('totalQuantity').innerHTML = number;
    }
    totalNumberOfProduct();

    // Calcul du prix total
    function setTotalPrice() {
    let total = 0;
    for (let p of cart) {
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
    firstName: /^[a-zA-ZÀ]+$/u,
    lastName: /^[a-zA-ZÀ]+$/u,
    address: /^[a-zA-Z0-9\s,'-]*$/u,
    city: /^[a-zA-Z\s-]+$/u,
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
    if (!regex.firstName.test(firstNameInput.value)) {
        firstNameErrorMsg.textContent = 'Le prénom est invalide.';
    } else {
        firstNameErrorMsg.textContent = '';
    }
});

// Validation du nom
lastNameInput.addEventListener('input', function (e) {
    e.preventDefault();
    contact.lastName = e.target.value;
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
    if (!regex.city.test(cityInput.value)) {
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
        } else {
            const firstName = firstNameInput.value;
            const lastName = lastNameInput.value;
            const email = emailInput.value;
            const address = addressInput.value;
            const city = cityInput.value;

            if (firstName === '' || lastName === '' || email === '' || address === '' || city === '') {
                alert('Veuillez remplir tous les champs du formulaire.');
            } else {
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
                    const response = await fetch("http://localhost:3000/api/products/order", {
                        method: "POST",
                        body: JSON.stringify(order),
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                        },
                    });

                    // Récupération de la réponse du serveur
                    const data = await response.json();
                    location.assign("confirmation.html?id=" + data.orderId);
                } catch (error) {
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
