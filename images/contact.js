// contact page
// contact form validation
function setupContactForm() {
  var contactForm = document.getElementById("contact-form");
  if (!contactForm) {
    return;
  }

  contactForm.addEventListener("submit", function(event) {
    event.preventDefault();
    var formIsValid = true;

    // validate name
    var nameInput = document.getElementById("contact-name");
    var nameError = document.getElementById("contact-name-error");
    if (nameInput.value.trim().length < 2) {
      nameError.textContent = "Please enter your name.";
      nameError.style.display = "block";
      formIsValid = false;
    } else {
      nameError.style.display = "none";
    }

    // validate email
    var emailInput = document.getElementById("contact-email");
    var emailError = document.getElementById("contact-email-error");
    var emailValue = emailInput.value.trim();
    var hasAtSymbol = emailValue.indexOf("@") > -1;
    var hasDot = emailValue.indexOf(".") > -1;
    if (hasAtSymbol === false || hasDot === false) {
      emailError.textContent = "Please enter a valid email address.";
      emailError.style.display = "block";
      formIsValid = false;
    } else {
      emailError.style.display = "none";
    }

    // validate reason
    var reasonSelect = document.getElementById("contact-reason");
    var reasonError = document.getElementById("contact-reason-error");
    if (reasonSelect.value === "") {
      reasonError.textContent = "Please choose a reason for reaching out.";
      reasonError.style.display = "block";
      formIsValid = false;
    } else {
      reasonError.style.display = "none";
    }

    // validate reply method
    var replyOptions = document.querySelectorAll('input[name="reply-method"]');
    var replyError = document.getElementById("contact-reply-error");
    var replyChecked = false;
    for (var i = 0; i < replyOptions.length; i++) {
      if (replyOptions[i].checked === true) {
        replyChecked = true;
        break;
      }
    }
    if (replyChecked === false) {
      replyError.textContent = "Please select how you'd like us to reply.";
      replyError.style.display = "block";
      formIsValid = false;
    } else {
      replyError.style.display = "none";
    }

    // validate message length
    var messageInput = document.getElementById("contact-message");
    var messageError = document.getElementById("contact-message-error");
    if (messageInput.value.trim().length < 10) {
      messageError.textContent = "Please enter a message (at least 10 characters).";
      messageError.style.display = "block";
      formIsValid = false;
    } else {
      messageError.style.display = "none";
    }

    // show thank you and reset
    if (formIsValid) {
      var userName = nameInput.value.trim();
      alert(
        "Thank you, " + userName + "!\n\n" +
        "We received your message and will get back to you soon.\n" +
        "SweetCrumbs Bakery"
      );
      contactForm.reset();
    }
  });
}

// run on page load
document.addEventListener("DOMContentLoaded", function() {
  setupContactForm();
});
