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
        allProductsSection.innerHTML += `<a href="./product.html?_id=${displayAProduct._id}">
            <article>
              <img src="${displayAProduct.imageUrl}" alt="${displayAProduct.altTxt}">
              <h3 class="productName">${displayAProduct.name}</h3>
              <p class="productDescription">${displayAProduct.description}</p>
            </article>
          </a>`;
    }
}