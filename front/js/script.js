//On récupère les donnés du serveur par un fetch
fetch('http://localhost:3000/api/products')
.then(response => {
    switch(response.status){
        case 200:
            return response.json();
        case 404:
            alert('Page introuvable');
            break;
        case 500:
            alert('le serveur a rencontrer une erreur');
            break;
        default:
            alert("erreur inconnue");
            break;
        }        
})
//Si pas de problème dû au fetch on crée les éléments et on leur affecte les propriétés correspondante 
.then(data => {
    for(let product of data){
        let linkA = document.createElement('a');        
        let href = document.createAttribute("href");
        href.value =`./product.html?id=${product._id}`;
        linkA.setAttributeNode(href);        
        let article = document.createElement('article');        
        let img = document.createElement('img');        
        let src = document.createAttribute('src');
        src.value =`${product.imageUrl}`;
        img.setAttributeNode(src);
        let altTxt = document.createAttribute('alt');
        altTxt.value = `${product.altTxt}`;
        img.setAttributeNode(altTxt);
        let h3 = document.createElement('h3');
        let h3Class = document.createAttribute('class');
        h3Class.value = "productName";
        h3.setAttributeNode(h3Class);        
        h3.innerHTML = `"${product.name}"` ;
        let p = document.createElement('p');        
        p.innerHTML = `${product.description}`;
        let classP = document.createAttribute('class');
        classP.value ="productDescription";
        p.setAttributeNode(classP);
        let a = document.getElementById('items');
        a.appendChild(linkA);
        linkA.appendChild(article);
        article.appendChild(img);
        article.appendChild(h3);
        article.appendChild(p);
    }   
})