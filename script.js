
// =================================
// MOBILE NAVIGATION
// =================================

const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");

if (menuToggle && navbar) {

  menuToggle.addEventListener("click", () => {
    const isOpen = navbar.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  navbar.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navbar.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    });
  });
}


// =================================
// LIGHTBOX GALLERY
// =================================

const galleryItems = document.querySelectorAll(".gallery-item");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxCounter = document.getElementById("lightbox-counter");

const closeButton = document.getElementById("lightbox-close");
const prevButton = document.getElementById("lightbox-prev");
const nextButton = document.getElementById("lightbox-next");

let currentIndex = 0;
let lastFocusedElement = null;


// Open photo
function openLightbox(index) {

  if (!galleryItems.length) return;

  currentIndex = index;
  lastFocusedElement = document.activeElement;

  updateLightbox();

  lightbox.classList.add("active");
  lightbox.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";

  closeButton.focus();
}


// Update photo
function updateLightbox() {

  const photo = galleryItems[currentIndex].querySelector("img");

  lightboxImage.src = photo.src;
  lightboxImage.alt = photo.alt;

  lightboxCounter.textContent =
    `${currentIndex + 1} / ${galleryItems.length}`;
}


// Next photo
function nextPhoto() {

  currentIndex++;

  if (currentIndex >= galleryItems.length) {
    currentIndex = 0;
  }

  updateLightbox();
}


// Previous photo
function prevPhoto() {

  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = galleryItems.length - 1;
  }

  updateLightbox();
}


// Close photo
function closeLightbox() {

  lightbox.classList.remove("active");
  lightbox.setAttribute("aria-hidden", "true");

  lightboxImage.src = "";

  document.body.style.overflow = "";

  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}


// Click gallery
galleryItems.forEach((item, index) => {

  item.addEventListener("click", () => {
    openLightbox(index);
  });

});


// Button events
closeButton.addEventListener("click", closeLightbox);
nextButton.addEventListener("click", nextPhoto);
prevButton.addEventListener("click", prevPhoto);


// Close when clicking background
lightbox.addEventListener("click", (event) => {

  if (event.target === lightbox) {
    closeLightbox();
  }

});


// Keyboard controls
document.addEventListener("keydown", (event) => {

  if (!lightbox.classList.contains("active")) return;

  if (event.key === "Escape") {
    closeLightbox();
  }

  if (event.key === "ArrowRight") {
    nextPhoto();
  }

  if (event.key === "ArrowLeft") {
    prevPhoto();
  }

});
