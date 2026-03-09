// menu page
// menu filter
function setupMenuFilters() {
  var menuGrid = document.getElementById("menu-grid");
  if (!menuGrid) {
    return;
  }

  var filterButtons = document.querySelectorAll("[data-menu-filter]");

  for (var i = 0; i < filterButtons.length; i++) {
    filterButtons[i].addEventListener("click", function() {
      var clickedFilter = this.getAttribute("data-menu-filter");

      // update active button
      for (var j = 0; j < filterButtons.length; j++) {
        if (filterButtons[j].getAttribute("data-menu-filter") === clickedFilter) {
          filterButtons[j].classList.add("is-active");
          filterButtons[j].setAttribute("aria-pressed", "true");
        } else {
          filterButtons[j].classList.remove("is-active");
          filterButtons[j].setAttribute("aria-pressed", "false");
        }
      }

      // show or hide cards
      var allCards = menuGrid.querySelectorAll(".menu-card");
      for (var k = 0; k < allCards.length; k++) {
        var card = allCards[k];
        var cardCategory = card.getAttribute("data-category");
        var shouldShow = false;
        if (clickedFilter === "all") {
          shouldShow = true;
        } else if (cardCategory === clickedFilter) {
          shouldShow = true;
        }
        if (shouldShow) {
          card.style.display = "";
        } else {
          card.style.display = "none";
        }
      }
    });
  }
}

// run on page load
document.addEventListener("DOMContentLoaded", function() {
  setupMenuFilters();
});
