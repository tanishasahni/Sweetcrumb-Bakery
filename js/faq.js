// faq page
// accordion close section
function closeAccordionItem(trigger, panel) {
  trigger.setAttribute("aria-expanded", "false");
  panel.hidden = true;
}

// accordion open section
function openAccordionItem(trigger, panel) {
  trigger.setAttribute("aria-expanded", "true");
  panel.hidden = false;
}

// accordion setup click listeners
function setupAccordion(accordionEl) {
  if (!accordionEl) {
    return;
  }

  var onlyOneOpen = accordionEl.getAttribute("data-accordion") === "single";
  var triggers = accordionEl.querySelectorAll(".accordion-trigger[aria-controls]");

  for (var i = 0; i < triggers.length; i++) {
    var trigger = triggers[i];
    var panelId = trigger.getAttribute("aria-controls");
    var panel = document.getElementById(panelId);

    if (!panel) {
      continue;
    }

    closeAccordionItem(trigger, panel);

    trigger.addEventListener("click", function() {
      var clickedButton = this;
      var panelId = clickedButton.getAttribute("aria-controls");
      var panel = document.getElementById(panelId);

      if (!panel) {
        return;
      }

      var isOpen = clickedButton.getAttribute("aria-expanded") === "true";

      if (onlyOneOpen) {
        for (var j = 0; j < triggers.length; j++) {
          var otherPanelId = triggers[j].getAttribute("aria-controls");
          var otherPanel = document.getElementById(otherPanelId);
          if (otherPanel) {
            closeAccordionItem(triggers[j], otherPanel);
          }
        }
      }

      if (isOpen === false) {
        openAccordionItem(clickedButton, panel);
      }
    });
  }
}

// run on page load
document.addEventListener("DOMContentLoaded", function() {
  var accordionContainer = document.querySelector(".faq-accordion[data-accordion]");
  setupAccordion(accordionContainer);
});
