let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

cartIcon.onclick = () => {
    cart.classList.add("active");
}

closeCart.onclick = () => {
    cart.classList.remove("active");
}


let products = {
    product1: { img:'product1.jpeg',name:'Product vitamin', price: 40, countId: 'count-p1',present:false },
    product2: { img:'product2.jpeg',name:'Fitness Tracker',price: 50, countId: 'count-p2' ,present:false}
};



function addCount(productKey){
    let product = products[productKey];
    let countElement = document.getElementById(product.countId);
    let count = Number(countElement.textContent);
    count++;
    countElement.textContent = count;

    calTotal("add",product.price);
}



function removeCount(productKey){

    let product = products[productKey];
    let countElement = document.getElementById(product.countId);
    let count = Number(countElement.textContent);

    if(count > 1){
        calTotal("reduce",product.price);
    }

    if (count > 1) {
        count--;
        countElement.textContent = count;
    }

}


function addToCart(productKey) {
    let cart = document.getElementById("cart-content");
    let product = products[productKey]

    if(!product.present){
        cart.innerHTML += `
            <div id="${productKey}" class="product-container">
                <div class="cart-box">
                    <img src="${product.img}" alt="Product Image" class="cart-img"/>

                    <div class="detail-box">
                        <div class="cart-product-title">${product.name}</div>
                        <div id="cart-price" class="cart-price">$${product.price}</div>

                        <div class="item-controls">
                            <div id="item-count">
                                <i class="fas fa-plus-circle" onclick="addCount('${productKey}')"></i>
                                <p id="${product.countId}">1</p>
                                <i class="fas fa-minus-circle" onclick="removeCount('${productKey}')"></i>
                            </div>
                            <i class='bx bxs-trash trash-icon' id="trash-${productKey}" onclick="removeProduct('${productKey}')"></i>
                        </div>

                    </div>
                </div>
            </div> 
    `;
    calTotal("add",product.price);
    }
    product.present = true; 
}


function removeProduct(productKey){
    let productDiv = document.getElementById(`${productKey}`);
    

    if(productDiv){

        let product = products[productKey];

        //To minus the total of the product
        let productCount = document.getElementById(product.countId).textContent;
        //console.log(productCount);
        let productPrice = Number(product.price);
        //console.log(productPrice);
        let productTotal = productCount * productPrice;
        calTotal("reduce" , productTotal);

    
        productDiv.remove();
        products[productKey].present = false;
    }
}

function calTotal(action , price){
    let total =  document.getElementById("total-price").textContent;
    total = Number(total);

    if(action === "add"){
        total = total + (price);
    }else if(action === "reduce"){
        total = total - (price);
    }
    
    document.getElementById("total-price").textContent = total;
}









