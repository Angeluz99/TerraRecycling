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
        h1: "Gestión Integral de Activos Electrónicos e Informáticos",
        p: "Ofrecemos soluciones integrales para la disposición y reciclaje de sus activos electrónicos.",
        btn: { text: "Conoce más", link: "#servicios" },
      },
      en: {
        h1: "Comprehensive Management of Electronic and IT Assets",
        p: "We offer comprehensive solutions for the disposal and recycling of your electronic assets.",
        btn: { text: "Learn more", link: "#servicios" },
      },
    },
    {
      es: {
        h1: "Destrucción segura de información",
        p: "Garantizamos la protección de datos y el cumplimiento normativo.",
        btn: { text: "Ver compromiso", link: "#beneficios" },
      },
      en: {
        h1: "Recovery Rate: 95%",
        p: "We recover critical materials and return them to the supply chain.",
        btn: { text: "See commitment", link: "#beneficios" },
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
  }, 5500);
});
