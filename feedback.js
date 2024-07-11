
let storedProducts = JSON.parse(localStorage.getItem("products"));
let storedTotal = JSON.parse(localStorage.getItem("totalPrice"));


function paymentDone() {
    // Collect values from form fields
    var firstName = document.getElementById("first-name").value;
    var lastName = document.getElementById("last-name").value;
    var mobileNumber = document.getElementById("phone").value;
    var emailAddress = document.getElementById("email").value;
    var address = document.getElementById("address").value;
    var city = document.getElementById("city").value;
    var country = document.getElementById("country").value;
    var zipCode = document.getElementById("post-code").value;
    var cardNumber = document.getElementById("card-number").value;
    var cardHolder = document.getElementById("card-holder").value;
    var expiryDate = document.getElementById("expire").value;
    var securityCode = document.getElementById("ccv").value;
  
    // Update modal content with collected values using spans
    document.querySelector(".fname-span").textContent = firstName;
    document.querySelector(".lname-span").textContent = lastName;
    document.querySelector(".mnum-span").textContent = mobileNumber;
    document.querySelector(".email-span").textContent = emailAddress;
    document.querySelector(".address-span").textContent = address;
    document.querySelector(".city-span").textContent = city;
    document.querySelector(".country-span").textContent = country;
    document.querySelector(".zip-span").textContent = zipCode;
    document.querySelector("#card-num-span").textContent = cardNumber;
    document.querySelector("#card-name-span").textContent = cardHolder;
    document.querySelector("#exp-date-span").textContent = expiryDate;
    document.querySelector("#sec-code-span").textContent = securityCode;

    // Update greeting with first name
    document.querySelector(".first-name").textContent = firstName;


    // Show the modal
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
  
  
    // Prevent form submission for this example
    return false;
  }
  

// JavaScript code to handle closing modal
document.querySelector(".close").addEventListener("click", function () {
  var modal = document.getElementById("myModal");
  var doneModal = document.getElementById("doneModal");
  modal.style.display = "none";
  doneModal.style.display = "none";
});

function checkInput() {
    
  let markArray = [
    "mark2",
    "mark3",
    "mark4",
    "mark5",
    "mark6",
    "mark7",
    "mark8",
    "mark9",
    "mark10",
    "mark11",
    "mark12",
    "mark13",
  ];

  var cardNumber = document.getElementById("card-number").value;
  var cvv = document.getElementById("ccv").value;
  var phone = document.getElementById("phone").value;
  var mail = document.getElementById("email").value;
  var expiryDate = document.getElementById("expire").value;
  var currentDate = new Date();
  var expiry = new Date(expiryDate);

  let isValid = true;

  // Validate Card Number
  var crossImgCard = document.getElementById("mark2");
  if (cardNumber.length === 16 && !isNaN(cardNumber)) {
    crossImgCard.src = "checked.png";
    crossImgCard.removeAttribute("style");
    markArray = markArray.filter((item) => item !== "mark2");
  } else {
    window.alert("The card number is invalid.");
    crossImgCard.removeAttribute("style");
    isValid = false;
  }

  //validate expiry
  if (expiry < currentDate) {
    document.getElementById("mark4").style.visibility = "visible";
    document.getElementById("mark4").src = "cross.png";
    alert("Your card is expired, Enter different card!");
    markArray = markArray.filter((item) => item !== "mark4");
    isValid = false;
  } else {
    document.getElementById("mark4").style.visibility = "visible";
    document.getElementById("mark4").src = "checked.png";
  }

  // Validate CVV
  var crossImgCVV = document.getElementById("mark5");
  if (cvv.length === 3 && !isNaN(cvv)) {
    crossImgCVV.src = "checked.png";
    crossImgCVV.removeAttribute("style");
    markArray = markArray.filter((item) => item !== "mark5");
  } else {
    window.alert("The CVV number is invalid.");
    crossImgCVV.removeAttribute("style");
    isValid = false;
  }

  // Validate Phone Number
  var crossImgPhone = document.getElementById("mark12");
  if (phone.length === 10 && !isNaN(phone)) {
    crossImgPhone.src = "checked.png";
    crossImgPhone.removeAttribute("style");
    markArray = markArray.filter((item) => item !== "mark12");
  } else {
    window.alert("The Phone number is invalid.");
    crossImgPhone.removeAttribute("style");
    isValid = false;
  }

  // Validate Email
  var crossImgMail = document.getElementById("mark13");
  if (mail.includes("@") && mail.includes(".")) {
    crossImgMail.src = "checked.png";
    crossImgMail.removeAttribute("style");
    markArray = markArray.filter((item) => item !== "mark13");
  } else {
    window.alert("The email is invalid.");
    crossImgMail.src = "cross.png";
    crossImgMail.removeAttribute("style");
    isValid = false;
  }

  // Remove style attribute for other elements in markArray
  markArray.forEach((item) => {
    var element = document.getElementById(item);
    if (element) {
      element.removeAttribute("style");
    }
  });

  if (isValid) {
    return paymentDone();
  }

  return false;
}


function updateItemSummaryFromLocalStorage() {

    let storedProducts = JSON.parse(localStorage.getItem("products"));
    
    let itemSummaryDiv = document.getElementById("ItemSummary");
    
    itemSummaryDiv.innerHTML = '';
    
    // Iterate through stored products to display details
    if (storedProducts) {
      storedProducts.forEach((product) => {
        // Create HTML for each product
        let productHTML = `
          <div class="product-summary">
            <p>Item Name: <span>${product.name}</span></p>
            <p>Price: ${product.price}</p>
            <p>Quantity: ${product.count}</p>
          </div>
          <hr>
        `;
    
        itemSummaryDiv.innerHTML += productHTML;

        document.getElementById("orderTotal").textContent = `Order Total: ${storedTotal}`;

      });
    }
  }
  
  // Call the function to update ItemSummary based on localStorage data
  updateItemSummaryFromLocalStorage();
  




  document.getElementById("doneBtn").addEventListener("click", function () {

    var doneModal = document.getElementById("doneModal");
    doneModal.style.display = "block";

    

    setTimeout(function () {
        document.getElementById("feedback-form").submit();
        window.location.href = "shop.html";
    }, 3000);

    // Prevent default button behavior
    return false;
});


