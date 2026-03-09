// order page
// friendly item names for confirmation
var itemNames = {
  "custom-cake": "Custom Cake",
  "cupcakes": "Cupcakes (Dozen)",
  "pastry-platter": "Pastry Platter",
  "bread-assortment": "Bread Assortment",
  "other": "Custom Request"
};

// order form validation
function setupOrderForm() {
  var orderForm = document.getElementById("order-form");
  if (!orderForm) {
    return;
  }

  orderForm.addEventListener("submit", function(event) {
    event.preventDefault();
    var formIsValid = true;

    // validate name
    var nameInput = document.getElementById("full-name");
    var nameError = document.getElementById("name-error");
    if (nameInput.value.trim() === "") {
      nameError.textContent = "Please enter your full name.";
      nameError.style.display = "block";
      formIsValid = false;
    } else {
      nameError.style.display = "none";
    }

    // validate email
    var emailInput = document.getElementById("email");
    var emailError = document.getElementById("email-error");
    var emailValue = emailInput.value.trim();
    var hasAtSymbol = emailValue.indexOf("@") > -1;
    var hasDot = emailValue.indexOf(".") > -1;
    if (emailValue === "" || hasAtSymbol === false || hasDot === false) {
      emailError.textContent = "Please enter a valid email address.";
      emailError.style.display = "block";
      formIsValid = false;
    } else {
      emailError.style.display = "none";
    }

    // validate phone
    var phoneInput = document.getElementById("phone");
    var phoneError = document.getElementById("phone-error");
    if (phoneInput.value.trim() === "") {
      phoneError.textContent = "Please enter a phone number.";
      phoneError.style.display = "block";
      formIsValid = false;
    } else {
      phoneError.style.display = "none";
    }

    // validate item type
    var itemSelect = document.getElementById("item-type");
    var itemError = document.getElementById("item-error");
    if (itemSelect.value === "") {
      itemError.textContent = "Please select an item type.";
      itemError.style.display = "block";
      formIsValid = false;
    } else {
      itemError.style.display = "none";
    }

    // validate pickup date
    var dateInput = document.getElementById("pickup-date");
    var dateError = document.getElementById("date-error");
    if (dateInput.value === "") {
      dateError.textContent = "Please select a pickup date.";
      dateError.style.display = "block";
      formIsValid = false;
    } else {
      dateError.style.display = "none";
    }

    // show thank you and reset
    if (formIsValid) {
      var selectedItem = itemSelect.value;
      var friendlyName = itemNames[selectedItem];
      if (!friendlyName) {
        friendlyName = "Order";
      }
      var userName = nameInput.value.trim();
      var pickupDate = dateInput.value;
      alert(
        "Thank you, " + userName + "!\n\n" +
        "Your request for a " + friendlyName + " has been received.\n" +
        "Requested pickup: " + pickupDate + "\n\n" +
        "We'll be in touch within 24 hours to confirm your order.\n" +
        "Sweet Crumb Bakery"
      );
      orderForm.reset();
    }
  });
}

// run on page load
document.addEventListener("DOMContentLoaded", function() {
  setupOrderForm();
});
