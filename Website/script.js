/* 
   ALWAYS & FOREVER BLOOMS - COMPLETE FUNCTIONALITY (PART 3)
   */

document.addEventListener("DOMContentLoaded", () => {

  /*
     1. DYNAMIC SHOPPING CART & STEM PRICING CALCULATION
    */
  const productForm = document.querySelector("form[action='cart.html']");
  if (productForm) {
    const stemRadios = productForm.querySelectorAll("input[name='stem_count']");
    const gypCheckbox = productForm.querySelector("input[name='addon_gyp']");
    const vaseCheckbox = productForm.querySelector("input[name='addon_vase']");
    const priceDisplay = document.querySelector(".product-price") || document.querySelector("h2[style*='color']");

    const calculatePrice = () => {
      let basePrice = 550;
      let selectedStems = 20;

      stemRadios.forEach(radio => {
        if (radio.checked) {
          selectedStems = parseInt(radio.value);
          // Pricing scale based on stem count
          basePrice = 550 + ((selectedStems - 20) / 20) * 300;
        }
      });

      if (gypCheckbox && gypCheckbox.checked) {
        basePrice += (selectedStems / 20) * 200;
      }
      if (vaseCheckbox && vaseCheckbox.checked) {
        basePrice += 150;
      }

      if (priceDisplay) {
        priceDisplay.textContent = `R ${basePrice.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`;
      }
    };

    stemRadios.forEach(r => r.addEventListener("change", calculatePrice));
    if (gypCheckbox) gypCheckbox.addEventListener("change", calculatePrice);
    if (vaseCheckbox) vaseCheckbox.addEventListener("change", calculatePrice);
  }

  /* 
     2. DYNAMIC CONTENT FILTERING (Menu & Reviews)
     */
  const filterPills = document.querySelectorAll(".filter-pill");
  const reviewArticles = document.querySelectorAll(".grid-2 article, .grid-3 article");

  filterPills.forEach(pill => {
    pill.addEventListener("click", (e) => {
      e.preventDefault();
      filterPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");

      const category = pill.getAttribute("href").replace("#", "").toLowerCase();

      reviewArticles.forEach(article => {
        const text = article.textContent.toLowerCase();
        if (category === "all" || text.includes(category.replace("-", " "))) {
          article.style.display = "block";
        } else {
          article.style.display = "none";
        }
      });
    });
  });

  /* 
     3. DYNAMIC SUBURB & DELIVERY FEE LOOKUP (FAQ & Homepage)
  */
  const suburbForms = document.querySelectorAll("form[action='faq.html'], form[action='faq.html?']");
  suburbForms.forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector("input[type='text']");
      if (!input || !input.value.trim()) return;

      const query = input.value.trim().toLowerCase();
      const metros = ["sandton", "pretoria", "centurion", "midrand", "johannesburg", "rosebank", "mamelodi", "hatfield"];
      const isMetro = metros.some(m => query.includes(m));

      let resultBox = form.querySelector(".lookup-result");
      if (!resultBox) {
        resultBox = document.createElement("div");
        resultBox.className = "lookup-result";
        resultBox.style.cssText = "margin-top: 15px; padding: 14px 18px; border-radius: 14px; font-size: 14px;";
        form.appendChild(resultBox);
      }

      if (isMetro) {
        resultBox.style.background = "rgba(94, 112, 96, 0.2)";
        resultBox.style.color = "#1f1f23";
        resultBox.innerHTML = `<strong>✓ Metro Zone Confirmed:</strong> Same-day delivery fee for <em>"${input.value}"</em> is <strong>R 120.00</strong>.`;
      } else {
        resultBox.style.background = "rgba(158, 27, 34, 0.1)";
        resultBox.style.color = "#9E1B22";
        resultBox.innerHTML = `<strong>ℹ Outlying Regional Zone:</strong> Special courier rate for <em>"${input.value}"</em> is <strong>R 220.00</strong>.`;
      }
    });
  });

  /* 
     4. CONTACT FORM EMAIL COMPILATION (Mailto Handler)
   */
  const contactForm = document.querySelector("#contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = contactForm.querySelector("#contact-name").value;
      const email = contactForm.querySelector("#contact-email").value;
      const subjectType = contactForm.querySelector("#contact-subject").value;
      const message = contactForm.querySelector("#contact-message").value;

      const mailtoLink = `mailto:support@alwaysforeverblooms.co.za?subject=${encodeURIComponent(subjectType + " - " + name)}&body=${encodeURIComponent("From: " + name + " (" + email + ")\n\n" + message)}`;
      window.location.href = mailtoLink;
    });
  }

  /*
     5. IMAGE LIGHTBOX FOR REVIEWS GALLERY
  */
  const galleryImgs = document.querySelectorAll(".grid-2 article img, .grid-3 article img");
  if (galleryImgs.length > 0) {
    const lightbox = document.createElement("div");
    lightbox.id = "image-lightbox";
    lightbox.style.cssText = "display:none; position:fixed; z-index:9999; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); justify-content:center; align-items:center; cursor:pointer;";
    
    const lightboxImg = document.createElement("img");
    lightboxImg.style.cssText = "max-width:90%; max-height:85vh; border-radius:16px; object-fit:contain;";
    lightbox.appendChild(lightboxImg);
    document.body.appendChild(lightbox);

    galleryImgs.forEach(img => {
      img.style.cursor = "pointer";
      img.addEventListener("click", () => {
        lightboxImg.src = img.src;
        lightbox.style.display = "flex";
      });
    });

    lightbox.addEventListener("click", () => {
      lightbox.style.display = "none";
    });
  }

  /*
   6. DYNAMIC CUSTOMER REVIEW SUBMISSION BLOCKS
   */
const reviewForm = document.querySelector("#review-form");

if (reviewForm) {
  reviewForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Stop page from reloading

    const nameInput = document.querySelector("#reviewer-name");
    const ratingSelect = document.querySelector("#rating");
    const fileInput = document.querySelector("#photo-upload");
    const textInput = document.querySelector("#review-text");

    const name = nameInput.value.trim();
    const ratingNum = parseInt(ratingSelect.value);
    const reviewText = textInput.value.trim();

    const stars = "★".repeat(ratingNum) + "☆".repeat(5 - ratingNum);

    let imageUrl = "images/pinkroses.jpeg";
    if (fileInput.files && fileInput.files[0]) {
      imageUrl = URL.createObjectURL(fileInput.files[0]); 
    }

    // Finds the Target Review Container
    const reviewContainer = document.querySelector("section.grid-2");

    if (reviewContainer) {
      //Creates the New Review Article Card
      const newCard = document.createElement("article");
      newCard.className = "review-card";

      newCard.innerHTML = `
        <div class="review-card-content">
          <img src="${imageUrl}" alt="Customer Uploaded Photo" class="review-img">
          
          <div class="review-details">
            <h3><span class="stars">${stars}</span> "${reviewText.substring(0, 30)}..."</h3>
            <p class="review-quote"><em>"${reviewText}"</em></p>
            <p class="reviewer-info"><strong>- ${name}</strong> (Verified Buyer)</p>
            <a href="menu.html" class="button review-btn">Order From Menu</a>
          </div>
        </div>
      `;

      //this prepends New Review to the Top of the Gallery
      reviewContainer.prepend(newCard);

      //this re-attaches the lightbox Click Listener to the new image
      const newImg = newCard.querySelector("img");
      if (newImg && typeof setupLightbox === "function") {
        setupLightbox(newImg);
      }

      //This resets the form & shows Success Feedback
      reviewForm.reset();
      alert("Thank you! Your review and photo have been posted successfully.");
    }
  });
}

});