// Select all images in the gallery
const galleryImages = document.querySelectorAll('.gallery-item img');
// Select the elements for the lightbox
const lightboxOverlay = document.getElementById('lightbox-overlay');
const lightboxContainer = document.getElementById('lightbox-container');
const lightboxImage = document.getElementById('lightbox-image');
const closeLightboxButton = document.getElementById('close-lightbox');

// Open the lightbox with the clicked image
function openLightbox(imageSrc) {
  lightboxImage.src = imageSrc;
  lightboxOverlay.style.display = 'block';
}

// Close the lightbox
function closeLightbox() {
  lightboxOverlay.style.display = 'none';
}

// Add event listener to each image in the gallery
galleryImages.forEach(image => {
  image.addEventListener('click', function() {
    openLightbox(this.src);
  });
});

// Close the lightbox when the close button is clicked
closeLightboxButton.addEventListener('click', closeLightbox);

// Close the lightbox if the overlay is clicked
lightboxOverlay.addEventListener('click', function(event) {
  if (event.target === lightboxOverlay) {
    closeLightbox();
  }
});

// Modal functionality for contact section
var modal = document.getElementById("contactModal");
var contactLink = document.getElementById("contactLink");
var span = document.getElementsByClassName("close")[0];

// Open the modal
contactLink.onclick = function() {
  modal.style.display = "block";
}

// Close the modal when the "x" is clicked
span.onclick = function() {
  modal.style.display = "none";
}

// Close the modal if clicked outside
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Open project links in a new tab when clicked
const projectThumbnails = document.querySelectorAll('.project-thumbnails img');
projectThumbnails.forEach(thumbnail => {
  thumbnail.addEventListener('click', function() {
    window.open(this.parentElement.href, '_blank');
  });
});
