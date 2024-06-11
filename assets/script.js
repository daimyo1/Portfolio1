
const galleryImages = document.querySelectorAll('.gallery-item img');
const lightboxOverlay = document.getElementById('lightbox-overlay');
const lightboxContainer = document.getElementById('lightbox-container');
const lightboxImage = document.getElementById('lightbox-image');
const closeLightboxButton = document.getElementById('close-lightbox');


function openLightbox(imageSrc) {
  lightboxImage.src = imageSrc;
  lightboxOverlay.style.display = 'block';
}


function closeLightbox() {
  lightboxOverlay.style.display = 'none';
}


galleryImages.forEach(image => {
  image.addEventListener('click', function() {
    openLightbox(this.src);
  });
});


closeLightboxButton.addEventListener('click', closeLightbox);


lightboxOverlay.addEventListener('click', function(event) {
  if (event.target === lightboxOverlay) {
    closeLightbox();
  }
});



var modal = document.getElementById("contactModal");


var contactLink = document.getElementById("contactLink");


var span = document.getElementsByClassName("close")[0];

contactLink.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

const projectThumbnails = document.querySelectorAll('.project-thumbnails img');

projectThumbnails.forEach(thumbnail => {
  thumbnail.addEventListener('click', function() {
    window.open(this.parentElement.href, '_blank'); // Open link in a new tab
  });
});