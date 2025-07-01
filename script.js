document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".mobile-menu");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      menu.classList.toggle("hidden");
    });
    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => menu.classList.add("hidden"));
    });
  }

  function switchLang(lang) {
    // Show/hide lang elements (Esto sigue funcionando para encabezados, párrafos y otros elementos con <span> dentro)
    document.querySelectorAll(".lang").forEach((el) => {
      el.classList.toggle("hidden", !el.classList.contains(`lang-${lang}`));
    });

    // Manejar etiquetas (label) directamente (para el formulario)
    document.querySelectorAll("label[data-es]").forEach((label) => {
      const text = label.getAttribute(`data-${lang}`);
      if (text) {
        label.textContent = text;
      }
    });

    // Manejar botones directamente (para el botón de submit del formulario)
    document.querySelectorAll("button[data-es]").forEach((button) => {
      const text = button.getAttribute(`data-${lang}`);
      if (text) {
        button.textContent = text;
      }
    });

    // Fix <option> translation (Esto ya lo tenías y funciona)
    document.querySelectorAll("select option").forEach((opt) => {
      const text = opt.getAttribute(`data-${lang}`);
      if (text) {
        opt.textContent = text;
      }
    });

    localStorage.setItem("site-lang", lang);
  }

  // **** ¡ESTAS SON LAS LÍNEAS QUE FALTABAN! ****

  // 1. Llamada inicial a switchLang al cargar la página
  const storedLang = localStorage.getItem("site-lang");
  const browserLang = navigator.language.slice(0, 2);
  const currentLang = storedLang || (browserLang === "en" ? "en" : "es");
  switchLang(currentLang); // Esta línea inicia la traducción

  // 2. Event listener para el botón de cambio de idioma
  document.querySelector(".lang-switch a")?.addEventListener("click", (e) => {
    e.preventDefault();
    const newLang = localStorage.getItem("site-lang") === "en" ? "es" : "en";
    switchLang(newLang); // Esta línea cambia el idioma al hacer click
  });

  // Hero slide logic (Tu código existente para el carrusel de texto)
  const slides = document.querySelectorAll(".hero-slide");
  const heroContent = document.getElementById("hero-content");

  const textos = [
    {
      es: {
        h1: "Soluciones Integrales para Activos Electrónicos e Informáticos",
        p: "Gestionamos de forma segura y responsable la recolección, disposición y reciclaje de equipos electrónicos e informáticos.",
        btn: { text: "Explorar servicios", link: "#servicios" },
      },
      en: {
        h1: "Comprehensive Management of Electronic and IT Assets",
        p: "We offer comprehensive solutions for the disposal and recycling of your electronic assets.",
        btn: { text: "Learn more", link: "#services" },
      },
    },
    {
      es: {
        h1: "Eliminación Segura de Información Confidencial",
        p: "Protegemos tus datos con procesos certificados que cumplen con las normativas más exigentes.",
        btn: { text: "Ver detalles", link: "#beneficios" },
      },

      en: {
        h1: "Secure Elimination of Confidential Information",
        p: "We protect your data with certified processes that meet the highest regulatory standards.",
        btn: { text: "View details", link: "#beneficios" },
      },
    },
  ];

  let index = 0;

  function updateHeroContent() {
    const lang = localStorage.getItem("site-lang") || "es";
    const content = textos[index][lang];

    const h1Element = heroContent.querySelector(`h1.lang-${lang}`);
    const pElement = heroContent.querySelector(`p.lang-${lang}`);

    if (h1Element) h1Element.textContent = content.h1;
    if (pElement) pElement.textContent = content.p;

    const btn = heroContent.querySelector(
      `#hero-btn${lang === "en" ? "-en" : ""}`
    );
    if (btn) {
      btn.textContent = content.btn.text;
      btn.setAttribute("href", content.btn.link);
    }
  }

  // Inicialización de slides y contenido del hero
  slides.forEach((s, i) => s.classList.toggle("active", i === index));
  updateHeroContent();

  // Intervalo para cambiar slides
  setInterval(() => {
    index = (index + 1) % slides.length;

    slides.forEach((s, i) => {
      s.classList.toggle("active", i === index);
    });

    updateHeroContent();
  }, 4600);
});
