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
.then(data => {
    for(let product of data){
        let linkA = document.createElement('a');
        let a = document.getElementById('items');
        a.appendChild(linkA);
        let href = document.createAttribute("href");
        href.value =`./product.html?id=${product._id}`;
        linkA.setAttributeNode(href);        
        let article = document.createElement('article');
        linkA.appendChild(article);
        let img = document.createElement('img');
        article.appendChild(img);
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
        article.appendChild(h3);
        h3.innerHTML = `"${product.name}"` ;
        let p = document.createElement('p');
        article.appendChild(p);
        p.innerHTML = "`${product.description}`";
        let classP = document.createAttribute('class');
        classP.value ="productDescription";
        p.setAttributeNode(classP);
        

//h3.value = ;
    }   
})