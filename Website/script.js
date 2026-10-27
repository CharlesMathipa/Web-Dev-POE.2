document.addEventListener("DOMContentLoaded", () => {
  
  // 1. DYNAMIC SUBURB & DELIVERY FEE LOOKUP (Used in faq.html & Homepage.html)
  const suburbForm = document.querySelector("form[action='faq.html']") || document.querySelector("form[action='faq.html?']");
  
  if (suburbForm) {
    suburbForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const inputField = suburbForm.querySelector("input[type='text']");
      if (!inputField) return;
      
      const suburbQuery = inputField.value.trim().toLowerCase();
      if (!suburbQuery) return;

      // Major metropolitan zones for same-day delivery
      const majorMetros = ["sandton", "pretoria", "centurion", "johannesburg", "midrand", "pretoria east", "centurion"];
      const isMetro = majorMetros.some(metro => suburbQuery.includes(metro));

      // Create or update results box dynamically
      let resultBox = suburbForm.querySelector(".lookup-result");
      if (!resultBox) {
        resultBox = document.createElement("div");
        resultBox.className = "lookup-result";
        resultBox.style.cssText = "margin-top: 15px; padding: 14px 18px; border-radius: 14px; font-size: 14px;";
        suburbForm.appendChild(resultBox);
      }

      if (isMetro) {
        resultBox.style.background = "rgba(94, 112, 96, 0.2)";
        resultBox.style.color = "#1f1f23";
        resultBox.style.border = "1px solid rgba(94, 112, 96, 0.4)";
        resultBox.innerHTML = `<strong>✓ Delivery Available:</strong> Standard same-day metro delivery fee for <em>"${inputField.value}"</em> is <strong>R 120.00</strong> (Orders before 12:00 PM).`;
      } else {
        resultBox.style.background = "rgba(158, 27, 34, 0.1)";
        resultBox.style.color = "#9E1B22";
        resultBox.style.border = "1px solid rgba(158, 27, 34, 0.3)";
        resultBox.innerHTML = `<strong>ℹ Outlying Region:</strong> Special courier required for <em>"${inputField.value}"</em>. Estimated fee: <strong>R 200.00 - R 250.00</strong>.`;
      }
    });
  }

  // 2. CLIENT-SIDE FORM VALIDATION (Phone number & required fields)
  const forms = document.querySelectorAll("form");
  forms.forEach(form => {
    form.addEventListener("submit", (e) => {
      const phoneInput = form.querySelector("input[type='tel']");
      
      if (phoneInput) {
        const phoneVal = phoneInput.value.trim();
        // Regex for South African mobile numbers (e.g. 0610667057 or +27610667057)
        const saPhoneRegex = /^(\+27|0)[6-8][0-9]{8}$/;
        
        if (!saPhoneRegex.test(phoneVal)) {
          e.preventDefault();
          alert("Please enter a valid South African mobile number (e.g., 0610667057).");
          phoneInput.focus();
          phoneInput.style.borderColor = "#9E1B22";
        }
      }
    });
  });

  // 3. IMAGE LIGHTBOX FOR REVIEWS & PRODUCT GALLERIES
  const galleryImages = document.querySelectorAll("article img, .grid-2 img, .grid-3 img");
  
  if (galleryImages.length > 0) {
    // Build lightbox overlay dynamically
    const lightbox = document.createElement("div");
    lightbox.id = "image-lightbox";
    lightbox.style.cssText = `
      display: none; position: fixed; z-index: 9999; top: 0; left: 0;
      width: 100%; height: 100%; background: rgba(0, 0, 0, 0.85);
      justify-content: center; align-items: center; cursor: pointer;
    `;
    
    const lightboxImg = document.createElement("img");
    lightboxImg.style.cssText = "max-width: 90%; max-height: 85vh; border-radius: 16px; object-fit: contain; box-shadow: 0 20px 40px rgba(0,0,0,0.5);";
    
    lightbox.appendChild(lightboxImg);
    document.body.appendChild(lightbox);

    galleryImages.forEach(img => {
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

});