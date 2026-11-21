(() => {
  const supported = new Set(["ko", "en"]);
  const preferred = localStorage.getItem("eas-sh-language") || (navigator.language.toLowerCase().startsWith("ko") ? "ko" : "en");

  function setLanguage(language) {
    const lang = supported.has(language) ? language : "ko";
    document.documentElement.lang = lang;
    localStorage.setItem("eas-sh-language", lang);

    document.querySelectorAll("[data-language]").forEach((element) => {
      element.hidden = element.dataset.language !== lang;
    });
    document.querySelectorAll("[data-ko][data-en]").forEach((element) => {
      element.textContent = element.dataset[lang];
    });
    document.querySelectorAll("[data-set-language]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.setLanguage === lang));
    });
  }

  document.querySelectorAll("[data-set-language]").forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.setLanguage));
  });

  setLanguage(preferred);
})();

