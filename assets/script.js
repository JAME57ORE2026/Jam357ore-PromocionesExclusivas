    document.addEventListener("DOMContentLoaded", () => {

      /* ==================================================
           SAFE QUERY HELPERS
      ================================================== */
      const $ = (sel) => document.querySelector(sel);
      const $$ = (sel) => document.querySelectorAll(sel);

      /* ==================================================
           AGE GATE
      ================================================== */
      const ageOverlay = $("#age-overlay");
      const btnConfirm = $("#age-confirm");
      const btnDeny = $("#age-deny");

      if (ageOverlay && btnConfirm && btnDeny) {
        btnConfirm.addEventListener("click", () => {
          ageOverlay.style.display = "none";
          console.log("Age confirmed (18+)");
        });

        btnDeny.addEventListener("click", () => {
          console.log("User denied age check");
          window.location.href = "https://google.com";
        });
      }


      /* ==================================================
           LANGUAGE TOGGLE (EN / ES)
           — This version swaps text dynamically
           — NO ERRORS if elements are missing
      ================================================== */
      const langBtn = $("#lang-btn");

      // simple language dictionary (expand later)
      const translations = {
        es: {
          heroTitle: "Accesorios Premium y Callejeros",
          heroBtn: "Ver productos",
          vipTitle: "Únete a la Lista VIP",
        },
        en: {
          heroTitle: "Premium & Street Accessories",
          heroBtn: "See products",
          vipTitle: "Join the VIP List",
        }
      };

      let currentLang = "es";

      function applyLanguage(lang) {
        const dict = translations[lang];
        if (!dict) return;

        const map = [
          { selector: "#hero-title", key: "heroTitle" },
          { selector: ".hero-btn", key: "heroBtn" },
          { selector: "#vip-title", key: "vipTitle" }
        ];

        map.forEach(item => {
          const el = $(item.selector);
          if (el) el.textContent = dict[item.key];
        });
      }

      if (langBtn) {
        langBtn.addEventListener("click", () => {
          currentLang = currentLang === "es" ? "en" : "es";
          applyLanguage(currentLang);
          console.log("Language switched to:", currentLang.toUpperCase());
        });
      }


      /* ==================================================
           THEME TOGGLE (LIGHT / DARK)
           — Saves user preference
           — Toggles icon text 
      ================================================== */
      const themeBtn = $("#theme-btn");

      function applyTheme(mode) {
        if (mode === "dark") {
          document.body.classList.add("dark");
          if (themeBtn) themeBtn.textContent = "☀️";
        } else {
          document.body.classList.remove("dark");
          if (themeBtn) themeBtn.textContent = "🌙";
        }
      }

      // load saved theme
      const savedTheme = localStorage.getItem("theme") || "dark";
      applyTheme(savedTheme);

      if (themeBtn) {
        themeBtn.addEventListener("click", () => {
          const newTheme = document.body.classList.contains("dark") ? "light" : "dark";
          applyTheme(newTheme);
          localStorage.setItem("theme", newTheme);
          console.log("Theme toggled:", newTheme);
        });
      }


      /* ==================================================
           PRODUCT IMAGE HOVER SWAP
           — Safe
           — Validated
           — Works with wrapper.data-alt
      ================================================== */
      const productImgs = $$(".product-img img");

      productImgs.forEach(img => {
        const wrapper = img.closest(".product-img");
        if (!wrapper) return;

        const altSrc = wrapper.getAttribute("data-alt");
        if (!altSrc) return;

        const originalSrc = img.src;

        // preload alt image
        const pre = new Image();
        pre.src = altSrc;

        wrapper.addEventListener("mouseenter", () => {
          img.src = altSrc;
        });

        wrapper.addEventListener("mouseleave", () => {
          img.src = originalSrc;
        });

        wrapper.addEventListener("touchstart", (e) => {
          e.preventDefault();
          img.src = img.src.includes(altSrc) ? originalSrc : altSrc;
        }, { passive: false });
      });


      /* ==================================================
           RAFFLE POPUP
      ================================================== */
      
      const rafflePopup = $("#raffle-popup");
      const closeRaffle = $("#close-raffle");

      if (rafflePopup && closeRaffle) {
        closeRaffle.addEventListener("click", () => {
          rafflePopup.style.display = "none";
          console.log("Raffle closed");
        });
      }


      /* ==================================================
           VIP SIGNUP
      ================================================== */
      const vipEmail = $("#vip-email");
      const vipSubmit = $("#vip-submit");
      const vipStatus = $("#vip-status");

      if (vipSubmit && vipEmail && vipStatus) {
        vipSubmit.addEventListener("click", () => {
          const email = vipEmail.value.trim();

          if (!email || !email.includes("@")) {
            vipStatus.textContent = "Ingresa un email válido bro.";
            vipStatus.style.color = "red";
            return;
          }

          vipStatus.textContent = "🔥 Te uniste a la lista VIP bro 🔥";
          vipStatus.style.color = "gold";

          console.log("VIP email submitted:", email);

          vipEmail.value = "";
        });
      }


      /* ==================================================
           HERO BUTTON → SCROLL TO PRODUCTOS
      ================================================== */
      const heroBtn = $(".hero-btn");
      if (heroBtn) {
        heroBtn.addEventListener("click", () => {
          $("#productos")?.scrollIntoView({ behavior: "smooth" });
        });
      }

    });
