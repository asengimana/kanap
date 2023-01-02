
//Affichage du produit et ses détails
//On récupère l'id du produit dand l'URL
const params = new URLSearchParams(document.location.search);
const id = params.get("_id");
console.log(id); 
const url = "http://localhost:3000/api/products";

//Récupération de tous les produits de l'API
fetch(url)
  .then((response) => response.json())
  .then((getAllProducts) => {
    
    displayProductDetails(getAllProducts);
  })
  .catch((error) => {
    document.querySelector(".item").innerHTML = "<h1>Une erreur est survenue</h1>";
    console.log(error);
  });

let cartProduct = {};
cartProduct._id = id;


/**
 * Fonction d'affichage du produit dont l'id correspond à l'id récupéré dans l'URL
 * @param {*} product 
 */
function displayProductDetails(product) {
  
  let productPicture = document.querySelector("article div.item__img");
  let productName = document.querySelector("#title");
  let productPrice = document.querySelector("#price");
  let productDescription = document.querySelector("#description");
  let productColors = document.querySelector("#colors");
  
  for (let item of product) {
    
    if (id === item._id) {
     
      productPicture.innerHTML = `<img src="${item.imageUrl}" alt="${item.altTxt}">`;
      productName.textContent = `${item.name}`;
      productPrice.textContent = `${item.price}`;
      productDescription.textContent = `${item.description}`;
      
      for (let color of item.colors) {
        
        productColors.innerHTML += `<option value="${color}">${color}</option>`;
      }
      console.log("affichage du produit");
    }
  }
 
}

//Récupération de la couleur
let productColor = document.querySelector("#colors");
productColor.addEventListener("input", (color) => {
  let productColorChoice;
  productColorChoice = color.target.value;
  cartProduct.color = productColorChoice;
  document.querySelector("#addToCart").style.color = "white";
  document.querySelector("#addToCart").textContent = "Ajouter au panier";
  console.log(productColorChoice);
});

//Récupération de la quantité
let productQuantity = document.querySelector('input[id="quantity"]');
let productQuantityChoice;
productQuantity.addEventListener("input", (quantity) => {
  productQuantityChoice = Math.trunc(quantity.target.value);
  cartProduct.quantity = productQuantityChoice;
  document.querySelector("#addToCart").style.color = "white";
  document.querySelector("#addToCart").textContent = "Ajouter au panier";
  console.log(productQuantityChoice);
});

//Ajout d'un évènement click sur le bouton #addToCart et définition des conditions de validation pour ajouter un produit au panier
let addToCartButton = document.querySelector("#addToCart");
addToCartButton.addEventListener("click", () => {
  if (cartProduct.quantity < 1 || cartProduct.quantity > 100 || cartProduct.quantity === undefined || cartProduct.color === "" || cartProduct.color === undefined) {
    document.querySelector("#addToCart").textContent = "Veuillez renseigner une coleur, et une quantité entre 1 et 100";
  } else {
    cart();
    console.log("clic effectué");
    document.querySelector("#addToCart").style.color = "white";
    document.querySelector("#addToCart").textContent = "produit ajouté !";
  }
});


let productToBeAdded = [];//Tableau pour initialiser le panier
let productsInCart = [];//Tableau récupérant les données du localStorage
let tempProducts = [];//Tableau contenant le produit choisi
let productsToSave = [];//Tableau qui contiendra les données du localStorage + le nouveau produit à ajouter

//Fonction pour ajouter le produit choisi dans le tableau
function productToAdd() {
  console.log(productsInCart);
  if (productsInCart === null) {
    productToBeAdded.push(cartProduct);
    console.log(cartProduct);
    return (localStorage.cart = JSON.stringify(productToBeAdded));
  }
}

//Fonction pour ajouter les autres produits
function nextProductToAdd() {
  productsToSave = [];
  tempProducts.push(cartProduct);
  productsToSave = productsInCart.concat(tempProducts);
  //Ici on tri et classe les produits
  productsToSave.sort(function sortProduct(a, b) {
    if (a._id < b._id) return -1;
    if (a._id > b._id) return 1;
    if (a._id = b._id){
      if (a.color < b.color) return -1;
      if (a.color > b.color) return 1;
    }
    return 0;
  });
  tempProducts = [];
  return (localStorage.cart = JSON.stringify(productsToSave));
}


/**
 * Fonction permettant d'ajuster la quantité d'un produit existant
 * 
 * @returns {*}
 */
function cart() {
  
  productsInCart = JSON.parse(localStorage.getItem("cart"));
  
  if (productsInCart) {
    for (let product of productsInCart) {
      
      if (product._id === id && product.color === cartProduct.color) {
        
        //alert("RAPPEL: Vous aviez déja choisit cet article.");
        
        let quantityChange = parseInt(product.quantity) + parseInt(productQuantityChoice);
        if(quantityChange >= 1 && quantityChange <= 100 && Math.sign(quantityChange) != -1 && Math.sign(quantityChange) != 0) {
          product.quantity = JSON.stringify(quantityChange);
        
          return (localStorage.cart = JSON.stringify(productsInCart));
        } else {
          alert("Quantité inférieur à 1 ou supérieure à 100 !");
          
        }
        
      }
    }
    
    return nextProductToAdd();
  }
  
  return productToAdd();
}
