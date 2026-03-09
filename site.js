// SweetCrumbs Bakery - site.js
// This file runs on every page of the site

// ---- Associative array (object used like a dictionary) ----
// This maps the order form item values to friendly display names
var itemNames = {
  "custom-cake": "Custom Cake",
  "cupcakes": "Cupcakes (Dozen)",
  "pastry-platter": "Pastry Platter",
  "bread-assortment": "Bread Assortment",
  "other": "Custom Request"
};

// ---- Homegrown object (like a blueprint for a bakery item) ----
function BakeryItem(name, price, category) {
  this.name = name;
  this.price = price;
  this.category = category;

  this.getLabel = function() {
    return this.name + " - " + this.price;
  };
}

// Example uses of the BakeryItem object
var featuredCroissant = new BakeryItem("Butter Croissant", "$4.25", "pastries");
var featuredCake = new BakeryItem("Triple Chocolate Cake", "$48+", "cakes");
var featuredCupcake = new BakeryItem("Vanilla Cupcake", "$3.95", "cakes");

// ---- Helper functions ----

// Gets an element by its id
function getById(id) {
  return document.getElementById(id);
}

// Shows an element by setting display to block
function showElement(el) {
  if (el) {
    el.style.display = "block";
  }
}

// Hides an element
function hideElement(el) {
  if (el) {
    el.style.display = "none";
  }
}

// Gets the text value from an input and trims spaces
function getVal(el) {
  if (el && el.value) {
    return el.value.trim();
  }
  return "";
}

// Basic check if an email looks valid
function looksLikeEmail(email) {
  if (email.indexOf("@") !== -1 && email.indexOf(".") !== -1) {
    return true;
  }
  return false;
}

// Shows an error message for a form field
function showError(errorId, message) {
  var errorEl = getById(errorId);
  if (errorEl) {
    errorEl.textContent = message;
    showElement(errorEl);
  }
}

// Hides an error message
function clearError(errorId) {
  hideElement(getById(errorId));
}

// Figures out what page we're on
function getCurrentPage() {
  var path = window.location.pathname;
  var parts = path.split("/");
  var pageName = parts[parts.length - 1];
  if (pageName === "") {
    pageName = "index.html";
  }
  return pageName;
}

// ---- Active nav link ----
// Highlights the current page in the nav menu
function markActiveNav() {
  var currentPage = getCurrentPage();
  var navLinks = document.querySelectorAll("header nav a");

  for (var i = 0; i < navLinks.length; i++) {
    var link = navLinks[i];
    var href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("active");
    }
  }
}

// ---- Fix header padding ----
// Makes sure the page content isn't hidden behind the fixed header
function fixHeaderPadding() {
  var header = document.querySelector("header");
  if (!header) return;

  var headerHeight = header.getBoundingClientRect().height;
  document.body.style.paddingTop = Math.ceil(headerHeight) + "px";
}

// ---- Menu page filter buttons ----
function setupMenuFilters() {
  var menuGrid = getById("menu-grid");
  if (!menuGrid) return; // not on menu page, stop here

  var allCards = menuGrid.querySelectorAll(".menu-card");

  // When a filter button is clicked, show/hide cards
  function applyFilter(filterValue) {
    // Update which button looks active
    var filterButtons = document.querySelectorAll("[data-menu-filter]");
    for (var i = 0; i < filterButtons.length; i++) {
      var btn = filterButtons[i];
      if (btn.getAttribute("data-menu-filter") === filterValue) {
        btn.classList.add("is-active");
        btn.setAttribute("aria-pressed", "true");
      } else {
        btn.classList.remove("is-active");
        btn.setAttribute("aria-pressed", "false");
      }
    }

    // Show or hide each card based on category
    for (var j = 0; j < allCards.length; j++) {
      var card = allCards[j];
      var cardCategory = card.getAttribute("data-category");

      if (filterValue === "all" || cardCategory === filterValue) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    }
  }

  // Start with all cards showing
  applyFilter("all");

  // Listen for filter button clicks
  var controlsArea = document.querySelector(".menu-controls");
  if (controlsArea) {
    controlsArea.addEventListener("click", function(e) {
      var clicked = e.target;
      if (clicked && clicked.hasAttribute("data-menu-filter")) {
        var filter = clicked.getAttribute("data-menu-filter");
        applyFilter(filter);
      }
    });
  }
}

// ---- Order form validation ----
function setupOrderForm() {
  var orderForm = getById("order-form");
  if (!orderForm) return; // not on order page

  orderForm.addEventListener("submit", function(e) {
    e.preventDefault();

    var isValid = true;

    // Check name
    var nameVal = getVal(getById("full-name"));
    if (nameVal === "") {
      showError("name-error", "Please enter your full name.");
      isValid = false;
    } else {
      clearError("name-error");
    }

    // Check email
    var emailVal = getVal(getById("email"));
    if (emailVal === "" || !looksLikeEmail(emailVal)) {
      showError("email-error", "Please enter a valid email address.");
      isValid = false;
    } else {
      clearError("email-error");
    }

    // Check phone
    var phoneVal = getVal(getById("phone"));
    if (phoneVal === "") {
      showError("phone-error", "Please enter a phone number.");
      isValid = false;
    } else {
      clearError("phone-error");
    }

    // Check item type
    var itemTypeEl = getById("item-type");
    var itemVal = itemTypeEl ? itemTypeEl.value : "";
    if (itemVal === "") {
      showError("item-error", "Please select an item type.");
      isValid = false;
    } else {
      clearError("item-error");
    }

    // Check pickup date
    var dateEl = getById("pickup-date");
    var dateVal = dateEl ? dateEl.value : "";
    if (dateVal === "") {
      showError("date-error", "Please select a pickup date.");
      isValid = false;
    } else {
      clearError("date-error");
    }

    // If everything looks good, show a thank you message
    if (isValid) {
      var friendlyName = itemNames[itemVal] || "Order";
      alert(
        "Thank you, " + nameVal + "!\n\n" +
        "Your request for a " + friendlyName + " has been received.\n" +
        "Requested pickup: " + dateVal + "\n\n" +
        "We'll be in touch within 24 hours to confirm your order.\n" +
        "— Sweet Crumb Bakery"
      );
      orderForm.reset();
    }
  });
}

// ---- Contact form validation ----
function setupContactForm() {
  var contactForm = getById("contact-form");
  if (!contactForm) return; // not on contact page

  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();

    var isValid = true;

    // Check name
    var nameVal = getVal(getById("contact-name"));
    if (nameVal.length < 2) {
      showError("contact-name-error", "Please enter your name.");
      isValid = false;
    } else {
      clearError("contact-name-error");
    }

    // Check email
    var emailVal = getVal(getById("contact-email"));
    if (!looksLikeEmail(emailVal)) {
      showError("contact-email-error", "Please enter a valid email address.");
      isValid = false;
    } else {
      clearError("contact-email-error");
    }

    // Check reason dropdown
    var reasonEl = getById("contact-reason");
    var reasonVal = reasonEl ? reasonEl.value : "";
    if (reasonVal === "") {
      showError("contact-reason-error", "Please choose a reason for reaching out.");
      isValid = false;
    } else {
      clearError("contact-reason-error");
    }

    // Check reply method radio
    var replyPicked = document.querySelector('input[name="reply-method"]:checked');
    if (!replyPicked) {
      showError("contact-reply-error", "Please select how you'd like us to reply.");
      isValid = false;
    } else {
      clearError("contact-reply-error");
    }

    // Check message
    var messageVal = getVal(getById("contact-message"));
    if (messageVal.length < 10) {
      showError("contact-message-error", "Please enter a message (at least 10 characters).");
      isValid = false;
    } else {
      clearError("contact-message-error");
    }

    // If all good, show thank you
    if (isValid) {
      alert(
        "Thank you, " + nameVal + "!\n\n" +
        "We received your message and will get back to you soon.\n" +
        "— SweetCrumbs Bakery"
      );
      contactForm.reset();
    }
  });
}

// ---- Run everything when the page is ready ----
document.addEventListener("DOMContentLoaded", function() {
  markActiveNav();
  fixHeaderPadding();
  setupMenuFilters();
  setupOrderForm();
  setupContactForm();
});

// Also fix padding if the window is resized (the header might change height)
window.addEventListener("resize", fixHeaderPadding);
window.addEventListener("load", fixHeaderPadding);
