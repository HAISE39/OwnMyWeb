// ============================================================
// VELLIXAO OFFICIAL — Sonicj-style interactions (multi-page)
// ============================================================

function LoadThis() {
  // Init cursor
  var Cursor = document.querySelectorAll(".mouse-cursor");
  if (Cursor.length) {
    var innerElement = document.querySelector(".cursor-inner");
    var outerElement = document.querySelector(".cursor-outer");
    window.onmousemove = function (x) {
      if (innerElement) {
        innerElement.style.transform = "translate(" + x.clientX + "px, " + x.clientY + "px)";
      }
      if (outerElement) {
        outerElement.style.transform = "translate(" + x.clientX + "px, " + x.clientY + "px)";
      }
    };
    innerElement.classList.add("cursor-hover");
    outerElement.classList.add("cursor-hover");
    innerElement.style.visibility = "visible";
    outerElement.style.visibility = "visible";
  }

  // Copyright year
  var yearEl = document.getElementById("current-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mixitup filter (web page)
  var portfolio = document.querySelector(".portfolio-list");
  if (portfolio && typeof mixitup !== "undefined") {
    mixitup(portfolio);
  }

  // Trigger funfact boxes count on visible
  var funBox = document.querySelector(".funfacts-box");
  if (funBox) onVisible(funBox, countFun);
}

docReady(LoadThis);

// Fancybox gallery (auto-builds thumbnails like the reference)
var fancybox_items = document.querySelectorAll("a[data-caption]");
fancybox_items.forEach(function (item) {
  item.setAttribute("data-fancybox", "gallery");
  item.setAttribute("data-type", "image");

  var currentImg = item.querySelector("img");
  if (!currentImg) {
    currentImg = document.createElement("img");
    currentImg.src = item.href;
    currentImg.alt = item.dataset.caption;
    item.appendChild(currentImg);
  }

  var currentDiv = document.createElement("div");
  currentDiv.className = "info";
  item.appendChild(currentDiv);

  var currentH3 = document.createElement("h3");
  currentH3.className = "title";
  currentH3.textContent = item.dataset.caption;
  currentDiv.appendChild(currentH3);

  var currentSpan = document.createElement("span");
  currentSpan.className = "post";
  currentSpan.textContent += "View";
  currentDiv.appendChild(currentSpan);

  if (item.dataset.link) {
    var currentA = document.createElement("a");
    currentA.href = item.dataset.link;
    currentA.setAttribute("target", "_blank");
    currentDiv.appendChild(currentA);

    var currentButton = document.createElement("span");
    currentButton.className = "post";
    currentButton.textContent += "Link";
    currentA.appendChild(currentButton);
  }
});

// Fancybox bind (safe if present)
if (typeof Fancybox !== "undefined" && document.querySelectorAll("[data-fancybox]").length) {
  Fancybox.bind('[data-fancybox="gallery"]', {
    Image: { zoom: false },
  });
}

// Contact form handler (FormSubmit.co AJAX endpoint)
var contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    var status = document.getElementById("contact-status");
    var btn = contactForm.querySelector("button[type='submit']");
    if (status) {
      status.className = "form-status";
      status.textContent = "Sending...";
    }
    if (btn) btn.disabled = true;

    var payload = {};
    var data = new FormData(contactForm);
    data.forEach(function (value, key) {
      payload[key] = value;
    });

    var endpoint = contactForm.getAttribute("action").replace("formsubmit.co/", "formsubmit.co/ajax/");

    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then(function (response) {
        return response.text().then(function (text) {
          var res;
          try {
            res = JSON.parse(text);
          } catch (err) {
            throw new Error("Service returned an unexpected response. Please try again.");
          }
          if (!response.ok || res.success === "false") {
            throw new Error(res.message || "Failed to send. Please try again.");
          }
          return res;
        });
      })
      .then(function () {
        if (status) {
          status.className = "form-status success";
          status.textContent = "Message sent! I'll reply as soon as possible.";
        }
        contactForm.reset();
      })
      .catch(function (err) {
        if (status) {
          status.className = "form-status error";
          status.textContent = err.message || "Something went wrong. Please try again.";
        }
      })
      .finally(function () {
        if (btn) btn.disabled = false;
      });
  });
}
