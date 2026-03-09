/* Site JavaScript (loaded on every page) */
(function () {
  "use strict";

  /* =========================================================
   * Shared helpers (small, reusable building blocks)
   * ========================================================= */
  function byId(id) {
    return document.getElementById(id);
  }

  function qs(selector, root) {
    return (root || document).querySelector(selector);
  }

  function qsa(selector, root) {
    return (root || document).querySelectorAll(selector);
  }

  function trimValue(el) {
    return el && typeof el.value === "string" ? el.value.trim() : "";
  }

  function show(el) {
    if (el) el.style.display = "block";
  }

  function hide(el) {
    if (el) el.style.display = "none";
  }

  function isProbablyEmail(email) {
    // Simple check (good enough for friendly client-side validation).
    return email.indexOf("@") !== -1 && email.indexOf(".") !== -1;
  }

  function getCurrentPageName() {
    var path = window.location.pathname;
    var fileName = path.split("/").pop();
    return fileName || "index.html";
  }

  /* =========================================================
   * Layout + navigation (runs on every page)
   * ========================================================= */
  function setBodyOffsetForFixedHeader() {
    var header = qs("header");
    if (!header) return;

    var headerStyle = window.getComputedStyle(header);
    var isFixedLike =
      headerStyle.position === "fixed" || headerStyle.position === "sticky";
    if (!isFixedLike) return;

    var height = header.getBoundingClientRect().height;
    document.body.style.paddingTop = Math.ceil(height) + "px";
  }

  function markActiveNavLink() {
    var current = getCurrentPageName();
    var links = qsa("header nav a[href]");

    for (var i = 0; i < links.length; i++) {
      var href = links[i].getAttribute("href");
      if (href === current) links[i].classList.add("active");
    }
  }

  function addBackToTop() {
    if (byId("back-to-top")) return;

    var button = document.createElement("button");
    button.type = "button";
    button.id = "back-to-top";
    button.className = "back-to-top";
    button.textContent = "Top";
    button.style.display = "none";
    document.body.appendChild(button);

    button.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener("scroll", function () {
      button.style.display = window.scrollY > 300 ? "block" : "none";
    });
  }

  /* Contact page (contact.html) */
  function initContactPage() {
    var form = byId("contact-form");
    if (!form) return;

    function setErrorText(errorId, message) {
      var el = byId(errorId);
      if (!el) return;
      el.textContent = message;
      show(el);
    }

    function clearError(errorId) {
      hide(byId(errorId));
    }

    function validate() {
      var ok = true;

      var nameEl = byId("contact-name");
      var emailEl = byId("contact-email");
      var reasonEl = byId("contact-reason");
      var msgEl = byId("contact-message");

      var name = trimValue(nameEl);
      var email = trimValue(emailEl);
      var reason = reasonEl ? reasonEl.value : "";
      var msg = trimValue(msgEl);
      var reply = qs('input[name="reply-method"]:checked');

      if (name.length < 2) {
        setErrorText("contact-name-error", "Please enter your name.");
        ok = false;
      } else clearError("contact-name-error");

      if (!isProbablyEmail(email)) {
        setErrorText("contact-email-error", "Please enter a valid email address.");
        ok = false;
      } else clearError("contact-email-error");

      if (!reason) {
        setErrorText("contact-reason-error", "Please choose a reason for reaching out.");
        ok = false;
      } else clearError("contact-reason-error");

      if (!reply) {
        setErrorText("contact-reply-error", "Please select how you'd like us to reply.");
        ok = false;
      } else clearError("contact-reply-error");

      if (msg.length < 10) {
        setErrorText(
          "contact-message-error",
          "Please enter a message (at least 10 characters)."
        );
        ok = false;
      } else clearError("contact-message-error");

      return ok;
    }

    function onSubmit(e) {
      e.preventDefault();
      if (!validate()) return;

      var name = trimValue(byId("contact-name"));
      alert(
        "Thank you, " +
          name +
          "!\n\n" +
          "We received your message and will get back to you soon.\n" +
          "— SweetCrumbs Bakery"
      );
      form.reset();
    }

    form.addEventListener("submit", onSubmit);
  }

  /* Menu page (menu.html) */
  function initMenuPage() {
    var grid = byId("menu-grid");
    if (!grid) return;

    var cards = qsa(".menu-card", grid);
    function setActiveButton(filter) {
      var btns = qsa("[data-menu-filter]");
      for (var i = 0; i < btns.length; i++) {
        var isActive = btns[i].getAttribute("data-menu-filter") === filter;
        btns[i].classList.toggle("is-active", isActive);
        btns[i].setAttribute("aria-pressed", isActive ? "true" : "false");
      }
    }

    function applyFilter(filter) {
      for (var i = 0; i < cards.length; i++) {
        var card = cards[i];
        var category = card.getAttribute("data-category") || "treats";
        var shouldShow = !filter || filter === "all" || category === filter;
        card.style.display = shouldShow ? "" : "none";
      }
      setActiveButton(filter || "all");
    }

    applyFilter("all");

    var controls = qs(".menu-controls");
    if (controls) {
      controls.addEventListener("click", function (e) {
        var target = e.target;
        if (!target) return;
        if (!target.matches("[data-menu-filter]")) return;

        var filter = target.getAttribute("data-menu-filter");
        applyFilter(filter);
      });
    }
  }

  /* Order page (order.html) */
  function initOrderPage() {
    var form = byId("order-form");
    if (!form) return;

    function setVisibleById(id, shouldShow) {
      var el = byId(id);
      if (!el) return;
      if (shouldShow) show(el);
      else hide(el);
    }

    function validateOrderForm() {
      var name = trimValue(byId("full-name"));
      var email = trimValue(byId("email"));
      var phone = trimValue(byId("phone"));
      var itemType = byId("item-type") ? byId("item-type").value : "";
      var pickupDate = byId("pickup-date") ? byId("pickup-date").value : "";

      var valid = true;

      if (name === "") valid = false;
      setVisibleById("name-error", name === "");

      var emailInvalid = email === "" || !isProbablyEmail(email);
      if (emailInvalid) valid = false;
      setVisibleById("email-error", emailInvalid);

      if (phone === "") valid = false;
      setVisibleById("phone-error", phone === "");

      if (itemType === "") valid = false;
      setVisibleById("item-error", itemType === "");

      if (pickupDate === "") valid = false;
      setVisibleById("date-error", pickupDate === "");

      return valid;
    }

    var itemTypeLabels = {
      "custom-cake": "Custom Cake",
      cupcakes: "Cupcakes (Dozen)",
      "pastry-platter": "Pastry Platter",
      "bread-assortment": "Bread Assortment",
      other: "Custom Request"
    };

    function handleSubmit(event) {
      event.preventDefault();

      if (!validateOrderForm()) return;

      var selectedEl = byId("item-type");
      var selectedValue = selectedEl ? selectedEl.value : "";
      var friendlyLabel = itemTypeLabels[selectedValue] || "Order";

      var customerName = trimValue(byId("full-name"));

      var dateEl = byId("pickup-date");
      var pickupDate = dateEl ? dateEl.value : "";

      alert(
        "Thank you, " +
          customerName +
          "! \n\n" +
          "Your request for a " +
          friendlyLabel +
          " has been received.\n" +
          "Requested pickup: " +
          pickupDate +
          "\n\n" +
          "We'll be in touch within 24 hours to confirm your order.\n" +
          "— Sweet Crumb Bakery"
      );

      form.reset();
    }

    form.addEventListener("submit", handleSubmit);
  }

  /* App bootstrap */
  function init() {
    markActiveNavLink();
    setBodyOffsetForFixedHeader();
    addBackToTop();

    initMenuPage();
    initOrderPage();
    initContactPage();
  }

  window.addEventListener("load", setBodyOffsetForFixedHeader);
  window.addEventListener("resize", setBodyOffsetForFixedHeader);
  document.addEventListener("DOMContentLoaded", init);
})();

