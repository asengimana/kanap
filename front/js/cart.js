
const page = document.location.href;
const url = "http://localhost:3000/api/products";

//Récupération de tous les produits de l'API
fetch(url)
  .then((response) => response.json())
  .then((getAllProducts) => {
    console.log(getAllProducts);
    // appel de la fonction displayProductsFromCart
    displayProductsFromCart(getAllProducts);
  })
  .catch((error) => {
    document.querySelector("#cartAndFormContainer").innerHTML = "<h1>Une erreur est survenue</h1>";
    console.log("Erreur sur l'api: " + error);
  });

//Fonction pour récuperer les produits du panier depuis le localStorage
function displayProductsFromCart(product) {

  let cart = JSON.parse(localStorage.getItem("cart"));

  if (cart && cart.length != 0) {

    for (let item of cart) {
      console.log(item);
      for (let i = 0; i < product.length; i++) {
        if (item._id === product[i]._id) {

          item.name = product[i].name;
          item.price = product[i].price;
          item.picture = product[i].imageUrl;
          item.description = product[i].description;
          item.alt = product[i].altTxt;
        }
      }
    }

    cartDisplay(cart);
  } else {

    document.querySelector("#totalQuantity").innerHTML = "0";
    document.querySelector("#totalPrice").innerHTML = "0";
    document.querySelector("h1").innerHTML = "Vous n'avez pas d'article dans votre panier";
  }

  changeQuantity();
  removeFromCart();
}

//Fonction pour afficher les produits du panier
function cartDisplay(product) {

  let cartItems = document.querySelector("#cart__items");

  cartItems.innerHTML += product.map((item) =>
    `<article class="cart__item" data-id="${item._id}" data-color="${item.color}" data-quantity="${item.quantity}" data-price="${item.price}">
                <div class="cart__item__img">
                  <img src="${item.picture}" alt="${item.alt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${item.name}</h2>
                    <p>${item.color}</p>
                    <p data-price="${item.price}">${item.price}</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem" data-id="${item._id}" data-color="${item.color}">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`
  
  ).join("");
  totalProducts();
}
//Fonction pour modifier la quantité d'un produit du panier
function changeQuantity() {
  const cartItem = document.querySelectorAll(".cart__item");
  cartItem.forEach((cartItem) => {
    cartItem.addEventListener("change", (quantity) => {

      let cart = JSON.parse(localStorage.getItem("cart"));

      for (item of cart)
        if (item._id === cartItem.dataset.id && cartItem.dataset.color === item.color) {
          item.quantity = quantity.target.value;
          if(item.quantity >= 1 && item.quantity <= 100) {
            localStorage.cart = JSON.stringify(cart);
          cartItem.dataset.quantity = quantity.target.value;
          totalProducts();
          } else {
            alert("Quantité supérieure à 100 articles !");
          }
          
        }
    });
  });
}

//Fonction pour supprimer un produit
function removeFromCart() {
  const cartItemToRemove = document.querySelectorAll(".cart__item .deleteItem");
  cartItemToRemove.forEach((cartItemToRemove) => {
    cartItemToRemove.addEventListener("click", () => {
      let cart = JSON.parse(localStorage.getItem("cart"));
      for (let i = 0; i < cart.length; i++)
        if (cart[i]._id === cartItemToRemove.dataset.id && cart[i].color === cartItemToRemove.dataset.color) {
          const num = [i];
          let newCart = JSON.parse(localStorage.getItem("cart"));
          newCart.splice(num, 1);
          
          if (newCart && newCart.length == 0) {
            document.querySelector("#totalQuantity").innerHTML = "0";
            document.querySelector("#totalPrice").innerHTML = "0";
            document.querySelector("h1").innerHTML = "Vous n'avez pas d'article dans votre panier";
          }

          localStorage.cart = JSON.stringify(newCart);
          totalProducts();
          return location.reload();
        }
    });
  });
}

//Fonction pour calculer le nombre total des produits et le prix total
function totalProducts() {
  let totalItems = 0;

  let totalPrice = 0;

  const cart = document.querySelectorAll(".cart__item");

  cart.forEach((cart) => {

    totalItems += JSON.parse(cart.dataset.quantity);

    totalPrice += cart.dataset.quantity * cart.dataset.price;
  });

  document.getElementById("totalQuantity").textContent = totalItems;

  document.getElementById("totalPrice").textContent = totalPrice;
}

//Infos client
var customerInfo = {};
localStorage.customerInfo = JSON.stringify(customerInfo);

var firstName = document.querySelector("#firstName");
firstName.classList.add("regex_text_input");
var lastName = document.querySelector("#lastName");
lastName.classList.add("regex_text_input");
var city = document.querySelector("#city");
city.classList.add("regex_text_input");

var address = document.querySelector("#address");
address.classList.add("regex_address");

var email = document.querySelector("#email");
email.classList.add("regex_email");

var regexTextInput = document.querySelectorAll(".regex_text_input");

document.querySelector("#email").setAttribute("type", "text");


let regexForLetters = /^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,31}$/i;

let regexForNumbersAndLetters = /^[a-z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,60}$/i;
let regexForEmailValidation = /^[a-z0-9æœ.!#$%&’*+/=?^_`{|}~"(),:;<>@[\]-]{1,60}$/i;
let regexForMatchingEmail = /^[a-zA-Z0-9æœ.!#$%&’*+/=?^_`{|}~"(),:;<>@[\]-]+@([\w-]+\.)+[\w-]{2,4}$/i;


regexTextInput.forEach((regexTextInput) =>
  regexTextInput.addEventListener("input", (e) => {

    inputValue = e.target.value;

    let regexInput = inputValue.search(regexForLetters);
    if (regexInput === 0) {
      customerInfo.firstName = firstName.value;
      customerInfo.lastName = lastName.value;
      customerInfo.city = city.value;
    }
    if (
      customerInfo.city !== "" &&
      customerInfo.lastName !== "" &&
      customerInfo.firstName !== "" &&
      regexInput === 0
    ) {
      customerInfo.regexInput = 3;
    } else {
      customerInfo.regexInput = 0;
    }
    localStorage.customerInfo = JSON.stringify(customerInfo);
    colorRegex(regexInput, inputValue, regexTextInput);
    orderButtonValidation();
  })
);


inputInfo(regexForLetters, "#firstNameErrorMsg", firstName);
inputInfo(regexForLetters, "#lastNameErrorMsg", lastName);
inputInfo(regexForLetters, "#cityErrorMsg", city);


let regexAddress = document.querySelector(".regex_address");
regexAddress.addEventListener("input", (e) => {

  inputValue = e.target.value;

  let regAddress = inputValue.search(regexForNumbersAndLetters);
  if (regAddress == 0) {
    customerInfo.address = address.value;
  }
  if (customerInfo.address !== "" && regAddress === 0) {
    customerInfo.regexAddress = 1;
  } else {
    customerInfo.regexAddress = 0;
  }
  localStorage.customerInfo = JSON.stringify(customerInfo);
  colorRegex(regAddress, inputValue, regexAddress);
  orderButtonValidation();
});


inputInfo(regexForNumbersAndLetters, "#addressErrorMsg", address);


let regexEmail = document.querySelector(".regex_email");
regexEmail.addEventListener("input", (e) => {

  inputValue = e.target.value;

  let regexMatch = inputValue.match(regexForMatchingEmail);

  let regexValidate = inputValue.search(regexForEmailValidation);
  if (regexValidate === 0 && regexMatch !== null) {
    customerInfo.email = email.value;
    customerInfo.regexEmail = 1;
  } else {
    customerInfo.regexEmail = 0;
  }
  localStorage.customerInfo = JSON.stringify(customerInfo);
  colorRegex(regexValidate, inputValue, regexEmail);
  orderButtonValidation();
});



email.addEventListener("input", (e) => {

  inputValue = e.target.value;
  let regexMatch = inputValue.match(regexForMatchingEmail);
  let regexValidate = inputValue.search(regexForEmailValidation);

  if (inputValue === "" && regexMatch === null) {
    document.querySelector("#emailErrorMsg").textContent = "Saisissez une adresse e-mail valide.";
    document.querySelector("#emailErrorMsg").style.color = "white";

  } else if (regexValidate !== 0) {
    document.querySelector("#emailErrorMsg").innerHTML = "Caractère non valide";
    document.querySelector("#emailErrorMsg").style.color = "white";

  } else if (inputValue != "" && regexMatch == null) {
    document.querySelector("#emailErrorMsg").innerHTML = "Votre adresse e-mail n'est pas conforme";
    document.querySelector("#emailErrorMsg").style.color = "white";
  } else {
    document.querySelector("#emailErrorMsg").innerHTML = "";
    document.querySelector("#emailErrorMsg").style.color = "white";
  }
});


let inputValue = "";

function colorRegex(regexSearch, inputValue, inputAction) {

  if (inputValue === "" && regexSearch != 0) {
    inputAction.style.backgroundColor = "white";
    inputAction.style.color = "black";

  } else if (inputValue !== "" && regexSearch != 0) {
    inputAction.style.backgroundColor = "rgb(220, 50, 50)";
    inputAction.style.color = "white";

  } else {
    inputAction.style.backgroundColor = "rgb(0, 138, 0)";
    inputAction.style.color = "white";
  }
}

function inputInfo(regex, target, area) {
  if (page.match("cart")) {
    area.addEventListener("input", (e) => {

      inputValue = e.target.value;
      product = inputValue.search(regex);

      if (inputValue === "" && product != 0) {
        document.querySelector(target).textContent = "Veuillez renseigner ce champ.";
        document.querySelector(target).style.color = "white";

      } else if (inputValue !== "" && product != 0) {
        document.querySelector(target).innerHTML = "Reformulez cette donnée";
        document.querySelector(target).style.color = "white";

      } else {
        document.querySelector(target).innerHTML = "";
        document.querySelector(target).style.color = "white";
      }
    });
  }
}

let order = document.querySelector("#order");

function orderButtonValidation() {
  let customContactInfo = JSON.parse(localStorage.getItem("customerInfo"));
  let sum = customContactInfo.regexInput + customContactInfo.regexAddress + customContactInfo.regexEmail;
  if (sum === 5) {
    order.removeAttribute("disabled", "disabled");
    document.querySelector("#order").setAttribute("value", "Commander !");
  } else {
    order.setAttribute("disabled", "disabled");
    document.querySelector("#order").setAttribute("value", "Remplir le formulaire");
  }
}


order.addEventListener("click", (e) => {

  e.preventDefault();
  orderButtonValidation();
  submitCustomContactInfo();
});



let cartId = [];
function productArrayIds() {

  let cart = JSON.parse(localStorage.getItem("cart"));

  if (cart && cart.length > 0) {
    for (let itemId of cart) {
      cartId.push(itemId._id);
    }
  } else {
    console.log("le panier est vide");
    document.querySelector("#order").setAttribute("value", "panier vide !");
  }
}

let customContactInfo;
let customerCartOrder;
function customerOrder() {
  customContactInfo = JSON.parse(localStorage.getItem("customerInfo"));
  // définition de l'objet order
  customerCartOrder = {
    contact: {
      firstName: customContactInfo.firstName,
      lastName: customContactInfo.lastName,
      address: customContactInfo.address,
      city: customContactInfo.city,
      email: customContactInfo.email,
    },
    products: cartId,
  };
}

function submitCustomContactInfo() {
  productArrayIds();
  customerOrder();

  console.log(customerCartOrder);
  let sum = customContactInfo.regexInput + customContactInfo.regexAddress + customContactInfo.regexEmail;

  if (cartId.length != 0 && sum === 5) {
    const url = "http://localhost:3000/api/products/order";
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customerCartOrder),
    })
      .then((response) => response.json())
      .then((data) => {
        window.location.href = `./confirmation.html?orderId=${data.orderId}`;
      })
      .catch(function (error) {
        console.log(error);
        alert("erreur");
      });
  }
}


