let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
let payNowButton = document.getElementById("pay-now-button");

let clicked = 0;

cartIcon.onclick = () => {
  cart.classList.add("active");
};

closeCart.onclick = () => {
  cart.classList.remove("active");
};

let products = {
  product1: {
    img: "product1.jpeg",
    name: "Organic Protein",
    price: 40,
    countId: "count-p1",
    present: false,
  },
  product2: {
    img: "product2.jpeg",
    name: "Fitness Tracker",
    price: 50,
    countId: "count-p2",
    present: false,
  },
  product3: {
    img: "thermo.jpg",
    name: "Thermometer",
    price: 25,
    countId: "count-p3",
    present: false,
  },
  product4: {
    img: "tulsi.jpg",
    name: "Herby Tulsy Product",
    price: 60,
    countId: "count-p4",
    present: false,
  },
  product5: {
    img: "yoga.jpg",
    name: "Yoga Mat",
    price: 10,
    countId: "count-p5",
    present: false,
  },
  product6: {
    img: "body wash.avif",
    name: "Healthy Body Wash",
    price: 20,
    countId: "count-p6",
    present: false,
  },
  product7: {
    img: "herby newborn oil.jpg",
    name: "Herby Baby Oil",
    price: 50,
    countId: "count-p7",
    present: false,
  },
  product8: {
    img: "snack.jpg",
    name: "Nature Valley Snack",
    price: 15,
    countId: "count-p8",
    present: false,
  },
  product9: {
    img: "sunscream.avif",
    name: "Sunscreen",
    price: 50,
    countId: "count-p9",
    present: false,
  },
  product10: {
    img: "aloevera gels.jpg",
    name: "Aloevera Gel",
    price: 30,
    countId: "count-p10",
    present: false,
  },
  product11: {
    img: "Gripe water.jpeg",
    name: "Gripe Water",
    price: 40,
    countId: "count-p11",
    present: false,
  },
  product12: {
    img: "moov.jpeg",
    name: "Moove Spray",
    price: 5,
    countId: "count-p12",
    present: false,
  },
};

function addCount(productKey) {
  let product = products[productKey];
  let countElement = document.getElementById(product.countId);
  let count = Number(countElement.textContent);
  count++;
  countElement.textContent = count;

  calTotal("add", product.price);
}

function removeCount(productKey) {
  let product = products[productKey];
  let countElement = document.getElementById(product.countId);
  let count = Number(countElement.textContent);

  if (count > 1) {
    calTotal("reduce", product.price);
  }

  if (count > 1) {
    count--;
    countElement.textContent = count;
  }
}

function addToCart(productKey) {
  let cart = document.getElementById("cart-content");
  let product = products[productKey];

  if (!product.present) {
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
    calTotal("add", product.price);
  }
  product.present = true;
  updateCartState();
}

function removeProduct(productKey) {
  let productDiv = document.getElementById(`${productKey}`);

  if (productDiv) {
    let product = products[productKey];

    //To minus the total of the product
    let productCount = document.getElementById(product.countId).textContent;
    //console.log(productCount);
    let productPrice = Number(product.price);
    //console.log(productPrice);
    let productTotal = productCount * productPrice;
    calTotal("reduce", productTotal);

    productDiv.remove();
    if (document.getElementById("cart-content") == null) {
      console.log("hi");
    }
    products[productKey].present = false;
  }

  updateCartState();
}

function calTotal(action, price) {
  let total = document.getElementById("total-price").textContent;
  total = Number(total);

  if (action === "add") {
    total = total + price;
  } else if (action === "reduce") {
    total = total - price;
  }

  document.getElementById("total-price").textContent = total;
}

/*
payNowButton.addEventListener("click", function () {
  let cartContent = document.getElementById("cart-content");

  // Check if cart content is empty or null
  if (!cartContent || cartContent.children.length === 0) {
    alert(
      "Your cart is empty. Please add items before proceeding to checkout."
    );
  } else {
    window.location.href = "feedback.html";
  }
});*/



payNowButton.addEventListener("click", function () {

  let cartContent = document.getElementById("cart-content");
  let total = document.getElementById("total-price").textContent
  

  // Check if cart content is empty or null
  if (!cartContent || cartContent.children.length === 0) {
    alert(
      "Your cart is empty. Please add items before proceeding to checkout."
    );
  } else {
    // Create an array to store products
    let products = [];

    // Loop through each product container in the cart content
    Array.from(cartContent.children).forEach((productContainer) => {
      let productKey = productContainer.id;
      let productName = productContainer.querySelector(".cart-product-title").textContent;
      let productPrice = productContainer.querySelector(".cart-price").textContent;
      let itemCount = productContainer.querySelector("#item-count p").textContent;

      // Create a product object
      let product = {
        key: productKey,
        name: productName,
        price: productPrice,
        count: itemCount
      };

      // Add product object to products array
      products.push(product);
    });

    // Store products array in localStorage
    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem("totalPrice", JSON.stringify(total));

    // Redirect to feedback.html
    window.location.href = "feedback.html";
  }
});


function updateCartState() {
  let cartContainer = document.getElementById("cart-container");
  let cartContent = document.getElementById("cart-content");

  if (cartContent && cartContent.children.length > 0) {
    cartContainer.style.backgroundColor = "green";
    cartContainer.classList.add("clicked");
  } else {
    cartContainer.style.backgroundColor = ""; // Remove background color style
    cartContainer.classList.remove("clicked"); // Remove 'clicked' class
  }
}
