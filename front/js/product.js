//Récupération de l' id du produit à afficher dans l'url de la page

const productUrl = window.location.href;
let url = new URL(productUrl);
let productId = new URLSearchParams(url.search);

//Affichage du produit et ses détails

if (productId.has('id')) {
    let id = productId.get('id');
    const url = "http://localhost:3000/api/products/" + id;
    fetch(url)
        .then(function (getProductInfos) {
            if (getProductInfos.ok) {
                return getProductInfos.json();
            }
        })
        .then(function (productInfos) {
            let productPicture = document.querySelector('.item__img img');
            productPicture.src = productInfos.imageUrl;
            productPicture.alt = productInfos.altTxt;
            let productName = document.getElementById('title');
            productName.textContent = productInfos.name;
            let productPrice = document.getElementById('price');
            productPrice.textContent = productInfos.price;
            let productDescription = document.getElementById('description');
            productDescription.textContent = productInfos.description;
            let productColors = document.getElementById('colors');
            for (i = 0; i < productInfos.colors.length; i++) {
                productColors.innerHTML += `<option value="${productInfos.colors[i]}">${productInfos.colors[i]}</option>`;
            }
            let pageTitle = document.querySelector('title');
            pageTitle.textContent = productInfos.name;

        })

}