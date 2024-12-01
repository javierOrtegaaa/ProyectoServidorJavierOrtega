export function showContactCards() {
  // Este estado puede ser actualizado por un evento o lógica del formulario
  const contactCards = document.getElementById("contact-cards");
  if (contactCards) {
    contactCards.classList.remove("hidden");
  }
}
