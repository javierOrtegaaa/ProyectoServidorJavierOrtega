document.addEventListener("DOMContentLoaded", function() {
  const elements = [
    document.getElementById("about-title"),
    document.getElementById("about-name"),
    document.getElementById("about-description"),
    document.getElementById("about-image"),
    document.getElementById("about-text"),
  ];

  // Función para manejar las animaciones
  function handleScrollAnimations(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("opacity-0", "translate-x-10");
        entry.target.classList.add("opacity-100", "translate-x-0");
        observer.unobserve(entry.target); // Desactiva la observación después de la animación
      }
    });
  }

  // Configuración del Intersection Observer
  const observer = new IntersectionObserver(handleScrollAnimations, {
    threshold: 0.2, // El 20% del elemento debe estar visible para activarse
  });

  // Observar cada elemento
  elements.forEach(element => {
    if (element) observer.observe(element);
  });
});
