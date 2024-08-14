document.addEventListener('DOMContentLoaded', function() {
  var spinnerContainer = document.getElementById('spinner-container');
  var content = document.getElementById('content');

  window.addEventListener('load', function() {
    spinnerContainer.style.display = 'none';
    content.style.display = 'block';
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // JavaScript for Lightbox
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const images = document.querySelectorAll('.picha-sanaa img'); // Updated selector
  let currentImageIndex;

  function openLightbox(index) {
    lightbox.style.display = 'block';
    lightboxImg.src = images[index].src;
    currentImageIndex = index;
  }

  function closeLightbox() {
    lightbox.style.display = 'none';
  }

  function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    lightboxImg.src = images[currentImageIndex].src;
  }

  function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    lightboxImg.src = images[currentImageIndex].src;
  }

  images.forEach((img, index) => {
    img.addEventListener('click', () => openLightbox(index));
  });

  document.querySelector('.close').addEventListener('click', closeLightbox);
  document.querySelector('.next').addEventListener('click', showNextImage);
  document.querySelector('.prev').addEventListener('click', showPrevImage);

  // Close lightbox on clicking outside the image
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
});
