document.addEventListener("DOMContentLoaded", function() {
    // Seleccionar todos los elementos que deben tener animación
    const title = document.getElementById("experience-title");
    const experienceCards = document.querySelectorAll(".experience-card");
    const experienceImages = document.querySelectorAll(".experience-image");
    const experienceNames = document.querySelectorAll(".experience-name");
  
    // Función para verificar si el elemento está en el viewport
    function isElementInView(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }
  
    // Función para manejar el scroll y las animaciones
    function handleScrollAnimations() {
      // Animación para el título
      if (isElementInView(title)) {
        title.classList.remove("opacity-0", "translate-x-10");
        title.classList.add("opacity-100", "translate-x-0");
      }
  
      // Animación para las tarjetas de experiencia
      experienceCards.forEach((card) => {
        if (isElementInView(card)) {
          card.classList.remove("opacity-0", "translate-x-10");
          card.classList.add("opacity-100", "translate-x-0");
        }
      });
  
      // Animación para las imágenes de experiencia
      experienceImages.forEach((image) => {
        if (isElementInView(image)) {
          image.classList.remove("opacity-0", "translate-x-10");
          image.classList.add("opacity-100", "translate-x-0");
        }
      });
  
      // Animación para los nombres de las experiencias
      experienceNames.forEach((name) => {
        if (isElementInView(name)) {
          name.classList.remove("opacity-0", "translate-x-10");
          name.classList.add("opacity-100", "translate-x-0");
        }
      });
    }
  
    // Ejecutamos la función cuando la página se desplaza
    window.addEventListener("scroll", handleScrollAnimations);
  
    // También la ejecutamos cuando la página cargue
    handleScrollAnimations();
  });
  