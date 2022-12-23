orderConfirmation();

function redirect() {
    document.location.href = "/front/html/index.html";
}
//Fonction de confirmation et d'affichage du numéro de commande
function orderConfirmation() {
    const params = new URLSearchParams(document.location.search);
    const orderId = params.get("orderId");
    if(orderId != undefined) {
        const order = document.getElementById("orderId");
        order.innerHTML = orderId;
        localStorage.clear();
    } else {
        redirect();
    }
    
}