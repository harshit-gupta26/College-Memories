/* ==================================================
   COLLEGE MEMORIES WEBSITE
   app.js
================================================== */

document.addEventListener("DOMContentLoaded", () => {
  
  /* ==================================================
     LOADER
  ================================================== */
  const loader = document.getElementById("loader");
  if (loader) {
    window.addEventListener("load", () => {
      setTimeout(() => {
        loader.style.opacity = "0";
        setTimeout(() => {
          loader.style.display = "none";
        }, 500);
      }, 1200);
    });
  }

  /* ==================================================
     SCROLL REVEAL
  ================================================== */
  const reveals = document.querySelectorAll(".reveal");

  function revealElements() {
    const windowHeight = window.innerHeight;
    reveals.forEach((element) => {
      const top = element.getBoundingClientRect().top;
      if (top < windowHeight - 100) {
        element.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", revealElements);
  revealElements();

  /* ==================================================
     BACK TO TOP
  ================================================== */
  const backToTop = document.getElementById("backToTop");

  if (backToTop) {
    window.addEventListener("scroll", () => {
      backToTop.style.display = window.scrollY > 500 ? "block" : "none";
    });

    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  /* ==================================================
     MEMORY WALL
  ================================================== */
  const memoryForm = document.getElementById("memoryForm");
  const memoryInput = document.getElementById("memoryInput");
  const memoryContainer = document.getElementById("memoryContainer");

  let memories = JSON.parse(localStorage.getItem("memories")) || [];

  function displayMemories() {
    if (!memoryContainer) return;
    memoryContainer.innerHTML = "";
    memories.forEach((memory) => {
      const card = document.createElement("div");
      card.classList.add("memory-card");
      card.innerHTML = `<p>${memory}</p>`;
      memoryContainer.appendChild(card);
    });
  }

  displayMemories();

  if (memoryForm && memoryInput) {
    memoryForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const text = memoryInput.value.trim();
      if (text === "") return;

      memories.unshift(text);
      localStorage.setItem("memories", JSON.stringify(memories));
      displayMemories();
      memoryInput.value = "";
    });
  }

  /* ==================================================
     GUESTBOOK
  ================================================== */
  const guestbookForm = document.getElementById("guestbookForm");
  const guestMessage = document.getElementById("guestMessage");
  const guestbookEntries = document.getElementById("guestbookEntries");

  let guestbook = JSON.parse(localStorage.getItem("guestbook")) || [];

  function renderGuestbook() {
    if (!guestbookEntries) return;
    guestbookEntries.innerHTML = "";
    guestbook.forEach((entry) => {
      const card = document.createElement("div");
      card.classList.add("guest-entry");
      card.innerHTML = `<p>${entry}</p>`;
      guestbookEntries.appendChild(card);
    });
  }

  renderGuestbook();

  if (guestbookForm && guestMessage) {
    guestbookForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const text = guestMessage.value.trim();
      if (text === "") return;

      guestbook.unshift(text);
      localStorage.setItem("guestbook", JSON.stringify(guestbook));
      renderGuestbook();
      guestMessage.value = "";
    });
  }

  /* ==================================================
     CAROUSEL
  ================================================== */
  const slidesContainer = document.querySelector(".slides");
  const slideImages = document.querySelectorAll(".slides img");
  const prevBtnCarousel = document.querySelector(".prev");
  const nextBtnCarousel = document.querySelector(".next");

  let currentSlide = 0;

  function showSlide(index) {
    if (!slidesContainer || slideImages.length === 0) return;
    if (index < 0) {
      currentSlide = slideImages.length - 1;
    } else if (index >= slideImages.length) {
      currentSlide = 0;
    } else {
      currentSlide = index;
    }
    slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
  }

  if (nextBtnCarousel && prevBtnCarousel) {
    nextBtnCarousel.addEventListener("click", () => showSlide(currentSlide + 1));
    prevBtnCarousel.addEventListener("click", () => showSlide(currentSlide - 1));

    setInterval(() => {
      showSlide(currentSlide + 1);
    }, 5000);
  }

  /* ==================================================
     COUNTDOWN
  ================================================== */
  const countdown = document.getElementById("countdown");
  const graduationDate = new Date("2027-05-31");

  function updateCountdown() {
    if (!countdown) return;
    const now = new Date();
    const diff = graduationDate - now;

    if (diff <= 0) {
      countdown.innerHTML = "🎓 Graduated!";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    countdown.innerHTML = `${days} Days ${hours} Hrs ${minutes} Min`;
  }

  if (countdown) {
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  /* ==================================================
     MUSIC TOGGLE
  ================================================== */
  const musicToggle = document.getElementById("musicToggle");
  const bgMusic = document.getElementById("bgMusic");
  let musicPlaying = false;

  if (musicToggle && bgMusic) {
    musicToggle.addEventListener("click", () => {
      if (!musicPlaying) {
        bgMusic.play();
        musicToggle.innerHTML = "🔊";
        musicPlaying = true;
      } else {
        bgMusic.pause();
        musicToggle.innerHTML = "🎵";
        musicPlaying = false;
      }
    });
  }

  /* ==================================================
     FLOATING PARTICLES
  ================================================== */
  const particles = document.getElementById("particles");

  function createParticle() {
    if (!particles) return;
    const particle = document.createElement("span");
    const size = Math.random() * 8 + 2;

    particle.style.width = size + "px";
    particle.style.height = size + "px";
    particle.style.position = "absolute";
    particle.style.borderRadius = "50%";
    particle.style.background = "rgba(255,255,255,.25)";
    particle.style.left = Math.random() * window.innerWidth + "px";
    particle.style.top = window.innerHeight + "px";
    particle.style.pointerEvents = "none";
    particle.style.animation = `floatParticle ${Math.random() * 8 + 8}s linear forwards`;

    particles.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 15000);
  }

  if (particles) {
    setInterval(createParticle, 300);

    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes floatParticle {
        from { transform: translateY(0); opacity: 1; }
        to { transform: translateY(-120vh); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  /* ==================================================
     SMOOTH ACTIVE NAV LINK
  ================================================== */
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const top = section.offsetTop;
      if (window.scrollY >= top - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  /* ==================================================
     HERO TYPING EFFECT
  ================================================== */
  const typingText = document.querySelector(".typing-text");

  if (typingText) {
    const originalText = typingText.innerText;
    typingText.innerText = "";
    let i = 0;

    function type() {
      if (i < originalText.length) {
        typingText.innerText += originalText.charAt(i);
        i++;
        setTimeout(type, 80);
      }
    }
    type();
  }

  /* ==================================================
     LIGHTBOX MODAL & GALLERY
  ================================================== */
  const cards = document.querySelectorAll(".media-card");
  const modal = document.getElementById("lightboxModal");

  if (modal && cards.length > 0) {
    const modalContent = modal.querySelector(".lightbox-content");
    const closeBtn = modal.querySelector(".close-btn");
    const prevBtn = modal.querySelector(".prev-btn");
    const nextBtn = modal.querySelector(".next-btn");
    
    let currentIndex = 0;

    function showMedia(index) {
      if (index < 0) currentIndex = cards.length - 1;
      else if (index >= cards.length) currentIndex = 0;
      else currentIndex = index;

      const selectedCard = cards[currentIndex];
      const isVideo = selectedCard.classList.contains("video-card");
      const title = selectedCard.querySelector(".media-overlay h3").innerText;
      const desc = selectedCard.querySelector(".media-overlay p").innerText;
      
      let mediaHtml = "";

      if (isVideo) {
        const videoSrc = selectedCard.querySelector("video source").getAttribute("src");
        mediaHtml = `<video controls autoplay muted src="${videoSrc}"></video>`;
      } else {
        const imgSrc = selectedCard.querySelector("img").getAttribute("src");
        mediaHtml = `<img src="${imgSrc}" alt="${title}">`;
      }

      mediaHtml += `
        <div class="lightbox-caption">
            <h3>${title}</h3>
            <p>${desc}</p>
        </div>
      `;

      modalContent.innerHTML = mediaHtml;
    }

    cards.forEach((card, index) => {
      card.addEventListener("click", () => {
        modal.classList.add("active");
        showMedia(index);
      });
    });

    const closeModal = () => {
      modal.classList.remove("active");
      modalContent.innerHTML = "";
    };

    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });

    if (nextBtn && prevBtn) {
      nextBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        showMedia(currentIndex + 1);
      });

      prevBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        showMedia(currentIndex - 1);
      });
    }

    document.addEventListener("keydown", (e) => {
      if (!modal.classList.contains("active")) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") showMedia(currentIndex + 1);
      if (e.key === "ArrowLeft") showMedia(currentIndex - 1);
    });
  }

  console.log("🎓 College Memories Website Loaded Successfully");
});

















const slides = document.querySelectorAll(".showcase-slide");
const nextBtn = document.querySelector(".next-slide");
const prevBtn = document.querySelector(".prev-slide");
const dotsContainer = document.querySelector(".slider-dots");

let currentSlide = 0;

slides.forEach((slide, index) => {

    const dot = document.createElement("span");

    if(index === 0){
        dot.classList.add("active");
    }

    dot.addEventListener("click", () => {
        showSlide(index);
    });

    dotsContainer.appendChild(dot);
});

const dots =
document.querySelectorAll(".slider-dots span");

function showSlide(index){

    slides[currentSlide].classList.remove("active");
    dots[currentSlide].classList.remove("active");

    currentSlide = index;

    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
}

nextBtn.addEventListener("click", () => {

    showSlide(
        (currentSlide + 1) % slides.length
    );
});

prevBtn.addEventListener("click", () => {

    showSlide(
        (currentSlide - 1 + slides.length) % slides.length
    );
});

// setInterval(() => {

//     showSlide(
//         (currentSlide + 1) % slides.length
//     );

// }, 5000);


// nextBtn.addEventListener("click", () => {
//   showSlide(
//       (currentSlide + 1) % slides.length
//   );
// });

// prevBtn.addEventListener("click", () => {
//   showSlide(
//       (currentSlide - 1 + slides.length) % slides.length
//   );
// });

document.addEventListener("keydown", (e) => {

  if(e.key === "ArrowRight"){

      showSlide(
          (currentSlide + 1) % slides.length
      );
  }

  if(e.key === "ArrowLeft"){

      showSlide(
          (currentSlide - 1 + slides.length) % slides.length
      );
  }
});



document.addEventListener("DOMContentLoaded", () => {
  // Select Lightbox Elements
  const lightbox = document.getElementById("lightboxModal");
  const lightboxContent = lightbox.querySelector(".lightbox-content");
  const closeBtn = lightbox.querySelector(".close-btn");
  const prevBtn = lightbox.querySelector(".prev-btn");
  const nextBtn = lightbox.querySelector(".next-btn");
  
  // Select all trigger images in the event grid
  const galleryImages = document.querySelectorAll(".event-grid .lightbox-trigger");
  let currentIndex = 0;

  // Function to open Lightbox
  function openLightbox(index) {
    currentIndex = parseInt(index);
    const targetSrc = galleryImages[currentIndex].getAttribute("src");
    
    // Create or update image inside content container
    lightboxContent.innerHTML = `<img src="${targetSrc}" alt="Enlarged Memory" id="lightboxImg" />`;
    
    // Display modal with transition layer
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent background scrolling

    // Assign Zoom Event Listener immediately to the newly created element
    const imgElement = document.getElementById("lightboxImg");
    imgElement.addEventListener("dblclick", toggleZoom);
  }

  // Function to close Lightbox
  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = ""; // Restore scrolling
    // Clear out zoom flags safely
    const imgElement = document.getElementById("lightboxImg");
    if (imgElement) imgElement.classList.remove("zoomed");
  }

  // Handle image switching (Next / Prev)
  function navigateGallery(direction) {
    if (direction === "next") {
      currentIndex = (currentIndex + 1) % galleryImages.length;
    } else if (direction === "prev") {
      currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    }
    
    const nextSrc = galleryImages[currentIndex].getAttribute("src");
    const imgElement = document.getElementById("lightboxImg");
    
    if (imgElement) {
      imgElement.classList.remove("zoomed"); // Reset zoom on image swap
      imgElement.src = nextSrc;
    }
  }

  // Instagram feel Toggle Zoom (Double tap / Double click)
  function toggleZoom() {
    this.classList.toggle("zoomed");
  }

  // --- EVENT LISTENERS ---

  // Bind clicks to gallery images
  galleryImages.forEach((img) => {
    img.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      openLightbox(index);
    });
  });

  // Controls Event bindings
  closeBtn.addEventListener("click", closeLightbox);
  nextBtn.addEventListener("click", () => navigateGallery("next"));
  prevBtn.addEventListener("click", () => navigateGallery("prev"));

  // Close modal when hitting backdrop overlay area directly
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox || e.target === lightboxContent) {
      closeLightbox();
    }
  });

  // Smooth Hardware Keyboard Navigation Controls
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") navigateGallery("next");
    if (e.key === "ArrowLeft") navigateGallery("prev");
  });
});








document.addEventListener("DOMContentLoaded", () => {
  // --- FAREWELL QUOTE SLIDER CONTEXT ---
  const quotes = document.querySelectorAll(".farewell-quote");
  const dots = document.querySelectorAll(".q-dot");
  let currentQuoteIndex = 0;
  const slideIntervalTime = 4500; // Switches dynamically every 4.5 seconds
  let quoteTimer;

  function showQuote(index) {
    // Clear dynamic states
    quotes.forEach(q => q.classList.remove("active"));
    dots.forEach(d => d.classList.remove("active"));

    // Set new active states
    quotes[index].classList.add("active");
    dots[index].classList.add("active");
    currentQuoteIndex = index;
  }

  function nextQuote() {
    let nextIndex = (currentQuoteIndex + 1) % quotes.length;
    showQuote(nextIndex);
  }

  function startQuoteTimer() {
    quoteTimer = setInterval(nextQuote, slideIntervalTime);
  }

  function resetQuoteTimer() {
    clearInterval(quoteTimer);
    startQuoteTimer();
  }

  // Bind indicator dot tap events
  dots.forEach((dot, idx) => {
    dot.addEventListener("click", () => {
      showQuote(idx);
      resetQuoteTimer(); // Delay auto-sliding when manually used
    });
  });

  // Run Carousel Engine
  if(quotes.length > 0) {
    startQuoteTimer();
  }
});








document.addEventListener("DOMContentLoaded", () => {
  // --- MEMORY WALL COMPONENT MECHANICS ---
  const memoryForm = document.getElementById("memoryForm");
  const memoryInput = document.getElementById("memoryInput");
  const memoryImage = document.getElementById("memoryImage");
  const memoryContainer = document.getElementById("memoryContainer");
  const fileNameDisplay = document.getElementById("fileNameDisplay");
  const imagePreviewContainer = document.getElementById("imagePreviewContainer");
  const imagePreview = document.getElementById("imagePreview");

  // Load baseline collection array out of hardware storage memory structures
  let savedMemories = JSON.parse(localStorage.getItem("collegeMemories")) || [];

  // Initialize display compilation loop on system boot
  renderMemories();

  // Watch for local change patterns on targeted interface control elements
  memoryImage.addEventListener("change", function () {
    if (this.files && this.files[0]) {
      const file = this.files[0];
      
      // Update contextual string values visually
      fileNameDisplay.textContent = file.name;

      // Instantiate structural data streaming modules
      const reader = new FileReader();
      reader.onload = function (e) {
        imagePreview.src = e.target.result;
        imagePreviewContainer.classList.remove("hidden");
      };
      reader.readAsDataURL(file);
    } else {
      clearImagePreview();
    }
  });

  // Handle runtime execution routines during active application submit calls
  memoryForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const textValue = memoryInput.value.trim();
    const targetFile = memoryImage.files[0];

    if (!textValue || !targetFile) return;

    const fileReader = new FileReader();
    fileReader.onload = function (event) {
      const base64ImageString = event.target.result;
      
      // Construct chronological record item metadata payloads
      const newMemoryItem = {
        id: "mem_" + Date.now(),
        text: textValue,
        image: base64ImageString,
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric"
        })
      };

      // Push tracking values out onto running arrays and save
      savedMemories.unshift(newMemoryItem);
      localStorage.setItem("collegeMemories", JSON.stringify(savedMemories));

      // Recompile active display cards and wipe input canvas elements
      renderMemories();
      memoryForm.reset();
      clearImagePreview();
    };

    // Initialize media serialization pipelines 
    fileReader.readAsDataURL(targetFile);
  });

  function clearImagePreview() {
    memoryImage.value = "";
    fileNameDisplay.textContent = "No file selected";
    imagePreview.src = "#";
    imagePreviewContainer.classList.add("hidden");
  }

  function renderMemories() {
    memoryContainer.innerHTML = "";

    if (savedMemories.length === 0) {
      memoryContainer.innerHTML = `
        <div class="glass" style="grid-column: 1/-1; padding: 40px; text-align: center; color: rgba(255,255,255,0.4);">
          <p style="margin: 0; font-size: 1.1rem;">The wall is empty. Be the first to pin a memory! 🌟</p>
        </div>`;
      return;
    }

    savedMemories.forEach((memory) => {
      const card = document.createElement("div");
      card.className = "user-memory-card reveal";
      card.innerHTML = `
        <div class="memory-card-img-holder">
          <img src="${memory.image}" alt="Memory Canvas Artwork" loading="lazy" />
        </div>
        <div class="memory-card-body">
          <p class="memory-card-text">${escapeHTML(memory.text)}</p>
          <div class="memory-card-footer">
            <span class="memory-card-date">📅 ${memory.date}</span>
            <button class="memory-delete-btn" data-id="${memory.id}">Delete 🗑️</button>
          </div>
        </div>
      `;

      // Attach context deletion actions securely directly onto card DOM references
      card.querySelector(".memory-delete-btn").addEventListener("click", function() {
        const idToDelete = this.getAttribute("data-id");
        savedMemories = savedMemories.filter(item => item.id !== idToDelete);
        localStorage.setItem("collegeMemories", JSON.stringify(savedMemories));
        renderMemories();
      });

      memoryContainer.appendChild(card);
    });
  }

  // Sanitization script checking to stop user scripts executing inside generated string inputs
  function escapeHTML(str) {
    return str.replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#039;");
  }
});



const navbar = document.querySelector(".navbar");

// window.addEventListener("scroll", () => {
//   if (window.scrollY > 50) {
//     navbar.classList.add("scrolled");
//   } else {
//     navbar.classList.remove("scrolled");
//   }
// });