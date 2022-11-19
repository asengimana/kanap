const url = "http://localhost:3000/api/products";
fetch(url)
    .then(function(getAllProducts) {
        if(getAllProducts.ok){
            return getAllProducts.json();
        }
    })
    .then(function(allProducts){
        const allProductsSection = document.getElementById("items");
        for(i = 0; i < allProducts.length; i++) {
            const productDisplay = `
            <a href="./product.html?id=${allProducts[i]._id}">
            <article>
              <img src="${allProducts[i].imageUrl}" alt="${allProducts[i].altTxt}">
              <h3 class="productName">${allProducts[i].name}</h3>
              <p class="productDescription">${allProducts[i].description}</p>
            </article>
          </a>
            `;
            allProductsSection.innerHTML += productDisplay;
        }

    })
    .catch(function(error){

    });