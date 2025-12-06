
document.addEventListener("DOMContentLoaded", () => {

  /* ==================================================
       SAFE QUERY HELPERS
  ================================================== */
  const $  = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  /* ==================================================
       AGE GATE
  ================================================== */
  const ageOverlay = $("#age-overlay");
  const btnConfirm = $("#age-confirm");
  const btnDeny    = $("#age-deny");

  if (ageOverlay && btnConfirm && btnDeny) {
    btnConfirm.addEventListener("click", () => {
      ageOverlay.style.display = "none";
    });

    btnDeny.addEventListener("click", () => {
      alert("Lo siento bro, vuelve cuando tengas 18+ 😎");
      window.location.href = "https://google.com";
    });
  }

  /* ==================================================
       PRODUCT IMAGE SWAP (Hover / Touch)
  ================================================== */
  $$(".product-img").forEach(box => {
    const img = box.querySelector("img");
    const altSrc = box.dataset.alt;
    if (!img || !altSrc) return;

    const original = img.src;

    // preload
    const preload = new Image();
    preload.src = altSrc;

    box.addEventListener("mouseenter", () => { img.src = altSrc; });
    box.addEventListener("mouseleave", () => { img.src = original; });

    box.addEventListener("touchstart", (e) => {
      e.preventDefault();
      img.src = img.src.includes(altSrc) ? original : altSrc;
    }, { passive: false });
  });

  /* ==================================================
       RAFFLE POPUP
  ================================================== */
  /* ==================================================
     RAFFLE POPUP — SE ABRE AL LLEGAR A LA MITAD
================================================== */

// elementos
const raffleModal  = $("#raffle-modal");
const closeButtons = $$(".close-raffle");

// evita que aparezca más de una vez por sesión
let raffleShown = false;

function checkScrollForRaffle() {
  if (raffleShown) return;

  const scrollY = window.scrollY;
  const pageHeight = document.documentElement.scrollHeight;
  const half = pageHeight / 4;

  if (scrollY >= half) {
    raffleShown = true;

    if (raffleModal) {
      raffleModal.style.display = "flex";

      // Inserta anuncio y condiciones dentro del modal
      const content = raffleModal.querySelector(".raffle-content");
      if (content) {
        content.innerHTML = `
          <h2 class="gold">🎟 Rifa Exclusiva ZipaKings 🎟</h2>
          <p>
            Participa en la rifa oficial enviando tu <strong>comprobante de pago por Nequi</strong>.<br><br>
            📸 Envía un <strong>screenshot</strong> del pago al WhatsApp.<br>
            🎁 Entra automáticamente a la lista de participantes.<br>
            🔥 Premio anunciado en nuestras historias.<br><br>
            ¡Gracias por apoyar el proyecto, parce! 💛✨
          </p>
        `;
      }
    }

    // Remover listener después de activarse
    window.removeEventListener("scroll", checkScrollForRaffle);
  }
}

// ejecutar en scroll
window.addEventListener("scroll", checkScrollForRaffle);

// cerrar popup
closeButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    raffleModal.style.display = "none";
  });
});

  /* ==================================================
       VIP SIGNUP
  ================================================== */
  const vipEmail  = $("#vip-email");
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

  /* ==================================================
       WHATSAPP PRODUCT MESSAGE
       - Reads data-* attributes from .product-card
       - Sends auto message to your WhatsApp
       - Includes free delivery reminder
  ================================================== */
  $$(".product-btn").forEach(btn => {
  btn.addEventListener("click", () => {

    const card = btn.closest(".product-card");
    if (!card) return;

    // TITLE
    const name = card.querySelector("h3")?.textContent.trim() || "Producto sin nombre";

    // DESCRIPTION (first <p>)
    const desc = card.querySelector("p")?.textContent.trim() || "Sin descripción";

    // PRICE (looks for .price element)
    const price = card.querySelector(".gold")?.textContent.split("small")[0] || "Precio no disponible";

    // IMAGES
    const mainImg = card.querySelector("img")?.src || "";
    const altImg  = card.querySelector(".product-img")?.dataset?.alt || "";

    const msg =
      `👑 Hola! Estoy interesado en este producto de *ZipaKings*:\n\n` +
      `🏆 *${name}*\n\n` +
      `📄 *Descripción:*\n${desc}\n\n` +
      `💰 *Precio:* ${price}\n\n` +
      `\n🚚 *En compras de $20 Lukas o Más dentro de Zipaquirá, la entrega es GRATIS!*` +
      `\n\n📍 Envíame tu ubicación para coordinar entrega 🙌`;

    const encoded = encodeURIComponent(msg);

    const phone = "573238119340"; // <-- cámbialo si quieres

    window.open(`https://wa.me/${phone}?text=${encoded}`, "_blank");
  });
});

});

