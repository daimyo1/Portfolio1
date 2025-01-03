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

// Access the canvas and its context
const pongCanvas = document.getElementById("pong-game-canvas");
const pongCtx = pongCanvas.getContext("2d");

// Define the game area aspect ratio (width to height)
const aspectRatio = 3;  // 3:1 ratio (300px width to 100px height)

// Function to resize canvas dynamically
function resizeCanvas() {
  const canvasWidth = window.innerWidth < 600 ? window.innerWidth * 0.8 : 300; // 80% of screen width for small screens, 300px for larger screens
  const canvasHeight = canvasWidth / aspectRatio;  // Maintain aspect ratio
  pongCanvas.width = canvasWidth;
  pongCanvas.height = canvasHeight;
}

// Initial resize
resizeCanvas();

// Resize the canvas on window resize
window.addEventListener("resize", resizeCanvas);

// Create paddle and ball properties
const paddleWidth = 6, paddleHeight = 30;
const ballRadius = 5;

let ballX = pongCanvas.width / 2, ballY = pongCanvas.height / 2;
let ballSpeedX = 0.8, ballSpeedY = 0.8; // Slower ball speed

let leftPaddleY = pongCanvas.height / 2 - paddleHeight / 2;
let rightPaddleY = pongCanvas.height / 2 - paddleHeight / 2;

// Control paddles with mouse
let mouseY = pongCanvas.height / 2;

// Track mouse movement
pongCanvas.addEventListener('mousemove', function(event) {
  mouseY = event.offsetY; // Get the mouse Y position relative to the canvas
});

// Hover-to-start game logic
pongCanvas.addEventListener('mouseenter', function() {
  gameLoop(); // Start the game when hovered
});

// Game drawing function
function drawPong() {
  pongCtx.clearRect(0, 0, pongCanvas.width, pongCanvas.height);

  // Draw paddles
  pongCtx.fillStyle = "#fff";
  pongCtx.fillRect(0, leftPaddleY, paddleWidth, paddleHeight); // Left paddle
  pongCtx.fillRect(pongCanvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight); // Right paddle

  // Draw the ball
  pongCtx.beginPath();
  pongCtx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  pongCtx.fillStyle = "#fff";
  pongCtx.fill();
  pongCtx.closePath();

  // Left paddle movement based on mouse position
  leftPaddleY = mouseY - paddleHeight / 2;

  // Prevent left paddle from going out of bounds
  if (leftPaddleY < 0) leftPaddleY = 0;
  if (leftPaddleY + paddleHeight > pongCanvas.height) leftPaddleY = pongCanvas.height - paddleHeight;

  // Enhanced AI logic for the computer paddle (right paddle)
  const ballFutureY = ballY + ballSpeedY * 15; // Predict where the ball will be 15 frames from now
  const aiPaddleCenter = rightPaddleY + paddleHeight / 2;
  const predictedErrorMargin = 10; // A small margin to make the AI miss sometimes

  if (ballX > pongCanvas.width / 2 && ballSpeedX > 0) { // The ball is on the AI side
    // If the ball's future position is above the center of the AI paddle, move it up
    if (ballFutureY < aiPaddleCenter - predictedErrorMargin) {
      rightPaddleY -= 4;
    }
    // If the ball's future position is below the center of the AI paddle, move it down
    else if (ballFutureY > aiPaddleCenter + predictedErrorMargin) {
      rightPaddleY += 4;
    }
  }

  // Prevent the right paddle from going out of bounds
  if (rightPaddleY < 0) rightPaddleY = 0;
  if (rightPaddleY + paddleHeight > pongCanvas.height) rightPaddleY = pongCanvas.height - paddleHeight;

  // Ball movement logic
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Ball bounce off top and bottom
  if (ballY - ballRadius <= 0 || ballY + ballRadius >= pongCanvas.height) {
    ballSpeedY = -ballSpeedY;
  }

  // Ball bounce off paddles
  if (ballX - ballRadius <= paddleWidth && ballY >= leftPaddleY && ballY <= leftPaddleY + paddleHeight) {
    ballSpeedX = -ballSpeedX;
  }
  if (ballX + ballRadius >= pongCanvas.width - paddleWidth && ballY >= rightPaddleY && ballY <= rightPaddleY + paddleHeight) {
    ballSpeedX = -ballSpeedX;
  }

  // Ball out of bounds (reset position)
  if (ballX - ballRadius <= 0 || ballX + ballRadius >= pongCanvas.width) {
    ballX = pongCanvas.width / 2;
    ballY = pongCanvas.height / 2;
    ballSpeedX = -ballSpeedX; // Reset ball direction
  }
}

// Start the game loop for Pong
function gameLoop() {
  drawPong();
  requestAnimationFrame(gameLoop); // Keep the game running
}
