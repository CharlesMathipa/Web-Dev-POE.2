document.addEventListener("DOMContentLoaded", () => {
  
  // 1. SUBURB & DELIVERY FEE LOOKUP (FAQ & Homepage Search)
  const suburbForm = document.querySelector("#faq-suburb")?.closest("form") || document.querySelector("form[action='faq.html']");
  
  if (suburbForm) {
    suburbForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const inputField = suburbForm.querySelector("input[type='text']");
      const suburbQuery = inputField.value.trim().toLowerCase();
      
      if (!suburbQuery) return;

      // Define standard metro zones vs outlying zones
      const majorMetros = ["sandton", "pretoria", "centurion", "johannesburg", "midrand", "pretoria east"];
      const isMetro = majorMetros.some(metro => suburbQuery.includes(metro));

      // Create or select a dynamic results container
      let resultBox = suburbForm.querySelector(".lookup-result");
      if (!resultBox) {
        resultBox = document.createElement("div");
        resultBox.className = document.createElement("div");
        resultBox.style.marginTop = "12px";
        resultBox.style.padding = "12px";
        resultBox.style.borderRadius = "12px";
        suburbForm.appendChild(resultBox);
      }

      if (isMetro) {
        resultBox.style.background = "rgba(94, 112, 96, 0.15)";
        resultBox.style.color = "#1f1f23";
        resultBox.innerHTML = `<strong>✓ Delivery Available!</strong> Standard Same-Day Metro Fee for <em>"${inputField.value}"</em> is <strong>R 120.00</strong> (Cutoff: 12:00 PM).`;
      } else {
        resultBox.style.background = "rgba(158, 27, 34, 0.1)";
        resultBox.style.color = "#9E1B22";
        resultBox.innerHTML = `<strong>ℹ Outlying Area:</strong> Special courier arrangement required for <em>"${inputField.value}"</em>. Estimated fee: <strong>R 200.00 - R 250.00</strong>.`;
      }
    });
  }

  // 2. FORM VALIDATION (Checkout / Review / Contact Forms)
  const forms = document.querySelectorAll("form");
  forms.forEach(form => {
    form.addEventListener("submit", (e) => {
      const phoneInput = form.querySelector("input[type='tel']");
      
      // Validate South African phone number format (e.g., starts with 0 or +27, 10 digits)
      if (phoneInput) {
        const phoneVal = phoneInput.value.trim();
        const phoneRegex = /^(\+27|0)[6-8][0-9]{8}$/;
        
        if (!phoneRegex.test(phoneVal)) {
          e.preventDefault();
          alert("Please enter a valid South African mobile number (e.g., 0610667057 or +27610667057).");
          phoneInput.focus();
          phoneInput.style.borderColor = "#9E1B22";
          return;
        }
      }
    });
  });

  // 3. IMAGE LIGHTBOX FOR REVIEWS GALLERY
  const reviewImages = document.querySelectorAll(".grid-2 article img, .grid-3 article img");
  
  // Create lightbox overlay elements dynamically
  const lightbox = document.createElement("div");
  lightbox.id = "image-lightbox";
  lightbox.style.cssText = `
    display: none; position: fixed; z-index: 9999; top: 0; left: 0;
    width: 100%; height: 100%; background: rgba(0,0,0,0.85);
    justify-content: center; align-items: center; cursor: pointer;
  `;
  
  const lightboxImg = document.createElement("img");
  lightboxImg.style.cssText = "max-width: 90%; max-height: 85vh; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);";
  lightbox.appendChild(lightboxImg);
  document.body.appendChild(lightbox);

  reviewImages.forEach(img => {
    img.style.cursor = "pointer";
    img.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightbox.style.display = "flex";
    });
  });

  lightbox.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  // 4. DYNAMIC FILTER PILLS (Reviews Page Filter Interaction)
  const filterPills = document.querySelectorAll(".filter-pill");
  filterPills.forEach(pill => {
    pill.addEventListener("click", (e) => {
      e.preventDefault();
      filterPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      
      const filterValue = pill.getAttribute("href").replace("#", "");
      console.log(`Filtering gallery by: ${filterValue}`);
      // Add custom filtering logic here if sorting specific product categories
    });
  });

});