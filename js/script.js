// Initialize EmailJS
emailjs.init("DOz9Qddk_BiZ8Ovb8");

// Premium toast helper
var toastTimer;
function showToast(type, title, msg) {
  var toast = document.getElementById('toast-notification');
  var successIcon = document.getElementById('toast-icon-success');
  var errorIcon   = document.getElementById('toast-icon-error');
  var toastTitle  = document.getElementById('toast-title');
  var toastMsg    = document.getElementById('toast-msg');
  var progress    = toast.querySelector('.toast-progress');

  // Reset
  clearTimeout(toastTimer);
  toast.classList.remove('toast-show', 'toast-error');
  progress.style.animation = 'none';
  progress.offsetHeight; // reflow to restart animation

  // Set content
  toastTitle.textContent = title;
  toastMsg.textContent   = msg;

  if (type === 'error') {
    toast.classList.add('toast-error');
    successIcon.classList.add('hidden');
    errorIcon.classList.remove('hidden');
  } else {
    successIcon.classList.remove('hidden');
    errorIcon.classList.add('hidden');
  }

  // Show
  toast.classList.add('toast-show');
  progress.style.animation = 'toast-timer 10s linear forwards';

  // Confetti burst on success
  if (type === 'success') { launchConfetti(); }

  // Auto-dismiss after 10s
  toastTimer = setTimeout(function() { closeToast(); }, 10000);
}

function launchConfetti() {
  var container = document.getElementById('confetti-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'confetti-container';
    container.className = 'confetti-container';
    document.body.appendChild(container);
  }
  container.innerHTML = '';
  var colors = ['#22c55e','#4ade80','#86efac','#fbbf24','#f472b6','#60a5fa','#a78bfa','#34d399','#fff'];
  var shapes = ['2px','50%','0px'];
  for (var i = 0; i < 80; i++) {
    var p = document.createElement('div');
    p.className = 'confetti-piece';
    var size = (Math.random() * 8 + 5) + 'px';
    p.style.cssText = [
      'left:' + (Math.random() * 100) + '%',
      'top:' + (Math.random() * -10 - 2) + '%',
      'width:' + size,
      'height:' + size,
      'background:' + colors[Math.floor(Math.random() * colors.length)],
      'border-radius:' + shapes[Math.floor(Math.random() * shapes.length)],
      'animation-duration:' + (Math.random() * 1.5 + 1.5) + 's',
      'animation-delay:' + (Math.random() * 0.6) + 's',
      'transform:translateX(' + (Math.random() * 200 - 100) + 'px)'
    ].join(';');
    container.appendChild(p);
  }
  setTimeout(function() { container.innerHTML = ''; }, 3500);
}

function closeToast() {
  var toast = document.getElementById('toast-notification');
  toast.classList.remove('toast-show');
}

// email sending function from the contact form:
function sendEmail(event) {
  event.preventDefault();
  var btn = event.target.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-circle-notch fa-spin mr-2"></i>Sending...';

  emailjs.sendForm("service_m0ma4ei", "template_er99a2z", "#contactForm", "DOz9Qddk_BiZ8Ovb8")
    .then(function (response) {
      showToast('success', 'Message Sent!', "Thanks for reaching out — I'll get back to you soon.");
      document.getElementById('contactForm').reset();
      btn.disabled = false;
      btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
    }, function (error) {
      showToast('error', 'Failed to Send', 'Something went wrong. Please try again.');
      btn.disabled = false;
      btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
    });
}

$(document).ready(function () {
  // Custom Cursor - GPU-accelerated, lag-free
  const cursor = document.getElementById('cursor');
  if (cursor && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = 0, mouseY = 0;

    // Track raw mouse position
    document.addEventListener('mousemove', function(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Use translate3d on GPU layer — no layout/paint triggered
      cursor.style.transform = 'translate3d(calc(' + mouseX + 'px - 50%), calc(' + mouseY + 'px - 50%), 0)';
    }, { passive: true });

    // Remove initial CSS transform override from class
    cursor.style.left = '0';
    cursor.style.top = '0';

    // Hover effect on interactive elements
    $(document).on('mouseenter', 'a, button, .project-card-new, .scroll-indicator, .skill-pill, .btn-crimson, .btn-outline', function() {
      cursor.classList.add('hover');
    }).on('mouseleave', 'a, button, .project-card-new, .scroll-indicator, .skill-pill, .btn-crimson, .btn-outline', function() {
      cursor.classList.remove('hover');
    });
  }

  // Typed.js initialization (v2 API)
  if (document.querySelector('.typing')) {
    new Typed('.typing', {
      strings: ['Frontend Developer', 'Full Stack Developer'],
      typeSpeed: 100,
      backSpeed: 80,
      loop: true
    });
  }

  if (document.querySelector('.typing2')) {
    new Typed('.typing2', {
      strings: ['Frontend Developer', 'Full Stack Developer'],
      typeSpeed: 100,
      backSpeed: 80,
      loop: true
    });
  }

  // Waypoints fade-in animation
  $('.fadein').waypoint(function () {
    $(this.element).addClass('animated fadeIn');
  }, {
    offset: '90%'
  });


  // Toggle menu on menu button click
  $('.menu-toggle').click(function () {
    $('.nav-menu').toggleClass('active');
    $(this).find('i').toggleClass('fa-bars fa-times');
  });

  // Close menu when a nav link is clicked
  $('.nav-menu .nav-link').click(function () {
    $('.nav-menu').removeClass('active');
    $('.menu-toggle i').removeClass('fa-times').addClass('fa-bars');
  });

  // Scrollable area drag-scroll functionality
  const scrollableAreas = document.querySelectorAll('.scrollable-area');

  scrollableAreas.forEach(scrollableArea => {
    let isDragging = false;
    let startX, scrollLeft;

    scrollableArea.addEventListener('mousedown', (e) => {
      isDragging = true;
      scrollLeft = scrollableArea.scrollLeft;
      startX = e.pageX - scrollableArea.offsetLeft;
      scrollableArea.style.cursor = 'grabbing';
    });

    scrollableArea.addEventListener('mouseleave', () => {
      isDragging = false;
      scrollableArea.style.cursor = 'grab';
    });

    scrollableArea.addEventListener('mouseup', () => {
      isDragging = false;
      scrollableArea.style.cursor = 'grab';
    });

    scrollableArea.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - scrollableArea.offsetLeft;
      const walk = (x - startX) * 2; //scroll-fast
      scrollableArea.scrollLeft = scrollLeft - walk;
    });
  });
});


$(document).ready(function () {
  var navbar = $(".navbar");
  var scrollTimeout;
  
  // Smart navbar - shrink when scrolling, expand when stopped (always visible)
  $(window).scroll(function () {
    var scrollTop = $(this).scrollTop();
    
    // Add shrunk class when scrolling (creates shrink effect)
    navbar.addClass("shrunk");
    
    // Clear previous timeout
    clearTimeout(scrollTimeout);
    
    // Set timeout to expand when scrolling stops
    scrollTimeout = setTimeout(function() {
      navbar.removeClass("shrunk");
    }, 200);
    
    // Always ensure navbar is visible (remove hidden if present)
    navbar.removeClass("hidden");

    // Scroll-up button visibility
    if (scrollTop > 500) {
      $(".scroll-up-btn").addClass("show");
    } else {
      $(".scroll-up-btn").removeClass("show");
    }

    // Fade-in animation on scroll
    $(".fadein").each(function () {
      const bottomOfElement = $(this).offset().top + $(this).outerHeight();
      const bottomOfWindow = $(window).scrollTop() + $(window).height();

      if (bottomOfWindow > bottomOfElement) {
        $(this).addClass("showme");
      } else {
        $(this).removeClass("showme");
      }
    });
  });

  // Scroll-up functionality
  $(".scroll-up-btn").click(function () {
    $("html, body").scrollTop(0);
  });

  // (Typed.js initialized above)



  // (menu toggle handled above)


  $(document).ready(function () {
    // Initialize Owl Carousel with configuration
    $(".carousel").owlCarousel({
      margin: 20, // Space between items
      loop: true, // Infinite loop
      autoplay: true, // Enable autoplay
      autoplayTimeout: 2000, // Time between autoplay slides (2 seconds)
      autoplayHoverPause: true, // Pause autoplay on hover
      dots: false, // Disable dots navigation
      nav: true, // Enable navigation arrows (previous/next)
      responsive: {
        0: {
          items: 1, // Display 1 item on mobile screens
          nav: false, // Disable navigation on mobile
        },
        600: {
          items: 2, // Display 2 items on tablet screens
          nav: false, // Disable navigation on tablets
        },
        1000: {
          items: 3, // Display 3 items on desktop screens
          nav: true, // Enable navigation on desktops
        },
      },
    });
  });

  // Set the current year in the footer
  const currentYear = new Date().getFullYear();
  $("#year").text(currentYear);

  // Automatic CV download functionality
  $(".cv-download-btn").click(function (e) {
    e.preventDefault();
    const cvPath = "assets/RESUME.pdf"; // Update with the actual CV path
    const a = document.createElement("a");
    a.href = cvPath;
    a.download = "RESUME.pdf"; // Set a default filename
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
});

// My photograpgh tilt effect
const image = document.getElementById('myphoto');

image.addEventListener('mousemove', (e) => {
  const rect = image.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const percentX = (x - centerX) / centerX;
  const percentY = (y - centerY) / centerY;

  const maxTilt = 15;

  const tiltX = maxTilt * percentY * -1;
  const tiltY = maxTilt * percentX;

  image.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
});

image.addEventListener('mouseleave', () => {
  image.style.transform = `rotateX(0deg) rotateY(0deg)`;
});

// Certificates scrollable area drag-scroll functionality
const scrollContainer = document.getElementById("scrollable-area-certificates");

let scrollAmount = 0;
const scrollSpeed = 3;
let isPaused = false;

scrollContainer.addEventListener("mouseenter", () => {
  isPaused = true;
});

scrollContainer.addEventListener("mouseleave", () => {
  isPaused = false;
});

function autoScrollCertificates() {
  if (!isPaused) {
    scrollAmount += scrollSpeed;
    scrollContainer.scrollLeft = scrollAmount;

    if (
      scrollContainer.scrollLeft + scrollContainer.clientWidth >=
      scrollContainer.scrollWidth
    ) {
      scrollAmount = 0;
    }
  }

  requestAnimationFrame(autoScrollCertificates);
}

autoScrollCertificates();