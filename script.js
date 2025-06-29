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
    document.querySelectorAll(".lang").forEach((el) => {
      el.classList.toggle("hidden", !el.classList.contains(`lang-${lang}`));
    });
    localStorage.setItem("site-lang", lang);
  }

  const storedLang = localStorage.getItem("site-lang");
  const browserLang = navigator.language.slice(0, 2);
  const currentLang = storedLang || (browserLang === "en" ? "en" : "es");
  switchLang(currentLang);

  document.querySelector(".lang-switch a")?.addEventListener("click", (e) => {
    e.preventDefault();
    const newLang = localStorage.getItem("site-lang") === "en" ? "es" : "en";
    switchLang(newLang);
  });

  // Hero slide logic
  const slides = document.querySelectorAll(".hero-slide");
  const heroContent = document.getElementById("hero-content");

  const textos = [
    {
      es: {
        h1: "Soluciones Integrales para Activos Electrónicos e Informáticos",
        p: "Gestionamos de forma segura y responsable la recolección, disposición y reciclaje de equipos electrónicos e informáticos.",
        btn: { text: "Explorar servicios", link: "#servicios" },
      },
    },
    {
      es: {
        h1: "Eliminación Segura de Información Confidencial",
        p: "Protegemos tus datos con procesos certificados que cumplen con las normativas más exigentes.",
        btn: { text: "Ver detalles", link: "#beneficios" },
      },
    },
  ];

  let index = 0;

  function updateHeroContent() {
    const lang = localStorage.getItem("site-lang") || "es";
    const content = textos[index][lang];

    heroContent.querySelector(`h1.lang-${lang}`).textContent = content.h1;
    heroContent.querySelector(`p.lang-${lang}`).textContent = content.p;

    const btn = heroContent.querySelector(
      `#hero-btn${lang === "en" ? "-en" : ""}`
    );
    btn.textContent = content.btn.text;
    btn.setAttribute("href", content.btn.link);
  }

  // Inicial
  slides.forEach((s, i) => s.classList.toggle("active", i === index));
  updateHeroContent();

  // Intervalo
  setInterval(() => {
    index = (index + 1) % slides.length;

    slides.forEach((s, i) => {
      s.classList.toggle("active", i === index);
    });

    updateHeroContent();
  }, 4600);
});
