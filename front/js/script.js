//Récupération et insertion des produits dans la page index.html

const url = "http://localhost:3000/api/products";
fetch(url)
    .then((response) => response.json())
    .then((getAllProducts) => {
        allProducts(getAllProducts);
    })
    .catch((error) => {
        document.querySelector(".titles").innerHTML = "<h1>Une erreur est survenue</h1>";
        console.log(error);
    });
function allProducts(products) {
    let allProductsSection = document.querySelector("#items");
    for (let displayAProduct of products) {
        const a = document.createElement('a');
        a.setAttribute('href', `./product.html?_id=${displayAProduct._id}`);
        const article = document.createElement('article');
        a.appendChild(article);
        const img = document.createElement('img');
        img.setAttribute('src', `${displayAProduct.imageUrl}`);
        img.setAttribute('alt', `${displayAProduct.altTxt}`);
        article.appendChild(img);
        const h3 = document.createElement('h3');
        h3.className = "productName";
        h3.textContent = displayAProduct.name;
        article.appendChild(h3);
        const p = document.createElement("p");
        p.className = "productDescription";
        p.textContent = displayAProduct.description;
        article.appendChild(p);
        allProductsSection.appendChild(a);
    }
}