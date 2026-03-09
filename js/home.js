// home page: load json from external file and build page with arrays of objects

// homegrown object: constructor for featured bakery items
function FeaturedItem(data) {
  this.name = data.name;
  this.description = data.description;
  this.image = data.image;
  this.alt = data.alt || "";
  this.toHtml = function() {
    return '<div class="item-col">' +
      '<img src="' + this.image + '" alt="' + this.alt + '" />' +
      '<div class="item-text"><h3>' + this.name + '</h3>' +
      '<p>' + this.description + '</p></div></div>';
  };
}

function buildFeaturedItems(container, featuredItems) {
  if (!container || !featuredItems || featuredItems.length === 0) return;
  var html = "";
  for (var i = 0; i < featuredItems.length; i++) {
    var item = new FeaturedItem(featuredItems[i]);
    html += item.toHtml();
  }
  container.innerHTML = html;
}

function buildReviews(container, reviews) {
  if (!container || !reviews || reviews.length === 0) return;
  var html = "";
  for (var i = 0; i < reviews.length; i++) {
    var r = reviews[i];
    html += '<div class="review-box">';
    html += '<p>"' + r.quote + '"</p>';
    html += '<span class="author">' + r.author + '</span>';
    html += '</div>';
  }
  container.innerHTML = html;
}

function initHomePage() {
  var featuredEl = document.getElementById("featured-items");
  var reviewsEl = document.getElementById("reviews-container");
  if (!featuredEl || !reviewsEl) return;

  // read json from external file
  fetch("data/data.json")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      // use array of featuredItems objects to construct the page
      buildFeaturedItems(featuredEl, data.featuredItems);
      // use array of reviews objects to construct the page
      buildReviews(reviewsEl, data.reviews);
    })
    .catch(function(err) {
      console.error("Failed to load data:", err);
    });
}

document.addEventListener("DOMContentLoaded", initHomePage);
