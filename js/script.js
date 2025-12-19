// Initialize EmailJS
emailjs.init("DOz9Qddk_BiZ8Ovb8");

// email sending function from the contact form:
function sendEmail(event) {
  event.preventDefault();
  emailjs.sendForm("service_m0ma4ei", "template_er99a2z", "#contactForm", "DOz9Qddk_BiZ8Ovb8")
    .then(function (response) {
      alert("Email sent successfully!");
    }, function (error) {
      alert("Failed to send email. Please try again.");
    });
}

$(document).ready(function () {
  // Typed.js initialization for two elements
  $(".typing").typed({
    strings: ["Frontend Developer", "Full Stack Developer Enthusiast"],
    typeSpeed: 100,
    backSpeed: 80,
    loop: true
  });

  $(".typing2").typed({
    strings: ["Frontend Developer", "Full Stack Developer"],
    typeSpeed: 100,
    backSpeed: 80,
    loop: true
  });

  // Waypoints fade-in animation
  $('.fadein').waypoint(function () {
    $(this.element).addClass('animated fadeIn');
  }, {
    offset: '90%'
  });


  // Toggle menu on menu button click
  $('.menu-btn').click(function () {
    $('.navbar .menu').toggle();
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
  // Sticky navbar on scroll
  $(window).scroll(function () {
    if ($(this).scrollTop() > 20) {
      $(".navbar").addClass("sticky");
    } else {
      $(".navbar").removeClass("sticky");
    }

    // Scroll-up button visibility
    if ($(this).scrollTop() > 500) {
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

  // Typing animation configuration for both .typing2 and .typing
  const typingOptions = {
    strings: ["Frontend Developer", "Full Stack Developer"],
    typeSpeed: 90,
    backSpeed: 70,
    loop: true
  };

  // Initialize Typed.js for .typing2
  new Typed(".typing2", typingOptions);

  // Initialize Typed.js for .typing with slightly different settings
  new Typed(".typing", {
    strings: ["Frontend Developer", "Full Stack Developer"],
    typeSpeed: 100,   // Slightly slower typing speed for this element
    backSpeed: 80,    // Slightly slower backspacing speed for this element
    loop: true
  });



  // Toggle navbar/menu
  $(".menu-btn").click(function () {
    $(".navbar .menu").toggleClass("active");
    $(".menu-btn i").toggleClass("active");
  });


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