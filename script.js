/**
 * MahadX Projects - Dynamic portfolio marketplace logic
 * Premium dark theme, canvas particles, scroll reveal, iframe demo modal.
 */

// --- Project Data System ---
// --- Project Data System ---
// To add new projects, simply append new objects to the array below following this template format:
/*
  {
    id: UNIQUE_NUMBER,
    title: "Project Name",
    category: "portfolio", // Options: "saas", "ecommerce", "portfolio", "productivity", "web3"
    description: "Short project summary.",
    tags: ["HTML5", "CSS3", "JavaScript"],
    price: "$29",
    featured: true, // Set to true to show in Featured section (Max 6 recomended), false for Marketplace Catalog only
    demoUrl: "https://live-preview-link.com",
    getCodeUrl: "https://get-code-purchase-link.com",
    gradientColors: ["#8b5cf6", "#06b6d4"] // Hex colors for card glow and background thumbnails
  }
*/
const PROJECTS = [
  {
    id: 1,
    title: "Your Project Title 1",
    category: "portfolio",
    description: "Replace this description with details of your coding asset. Let buyers know about key modules and system designs.",
    tags: ["HTML5", "CSS3", "JS"],
    price: "$29",
    featured: true,
    demoUrl: "https://your-preview-url.com",
    getCodeUrl: "https://your-purchase-url.com",
    gradientColors: ["#8b5cf6", "#06b6d4"]
  },
  {
    id: 2,
    title: "Your Project Title 2",
    category: "portfolio",
    description: "Replace this description with details of your coding asset. Let buyers know about key modules and system designs.",
    tags: ["HTML5", "CSS3", "JS"],
    price: "$39",
    featured: true,
    demoUrl: "https://your-preview-url.com",
    getCodeUrl: "https://your-purchase-url.com",
    gradientColors: ["#ec4899", "#8b5cf6"]
  },
  {
    id: 3,
    title: "Your Project Title 3",
    category: "portfolio",
    description: "Replace this description with details of your coding asset. Let buyers know about key modules and system designs.",
    tags: ["HTML5", "CSS3", "JS"],
    price: "$49",
    featured: true,
    demoUrl: "https://your-preview-url.com",
    getCodeUrl: "https://your-purchase-url.com",
    gradientColors: ["#06b6d4", "#ec4899"]
  }
];

// --- Helper: Dynamic Thumbnail Generator using Canvas (so we don't rely on offline network links) ---
function generateCardThumbnail(title, colors) {
  const canvas = document.createElement("canvas");
  canvas.width = 600;
  canvas.height = 340;
  const ctx = canvas.getContext("2d");

  // Create Beautiful Radial Gradient Background
  const grad = ctx.createRadialGradient(300, 170, 50, 300, 170, 350);
  grad.addColorStop(0, "#12082b");
  grad.addColorStop(1, "#03000a");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 600, 340);

  // Add decorative circular grid overlay
  ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
  ctx.lineWidth = 1;
  for (let r = 30; r < 350; r += 30) {
    ctx.beginPath();
    ctx.arc(300, 170, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Draw two glowing mesh gradient circles
  const gradient1 = ctx.createLinearGradient(0, 0, 600, 340);
  gradient1.addColorStop(0, colors[0]);
  gradient1.addColorStop(1, colors[1] || colors[0]);

  ctx.shadowColor = colors[0];
  ctx.shadowBlur = 40;
  ctx.fillStyle = gradient1;
  ctx.beginPath();
  ctx.arc(120, 120, 45, 0, Math.PI * 2);
  ctx.fill();

  ctx.shadowColor = colors[1] || colors[0];
  ctx.shadowBlur = 40;
  ctx.beginPath();
  ctx.arc(480, 220, 35, 0, Math.PI * 2);
  ctx.fill();

  // Draw some code-mockup elements
  ctx.shadowBlur = 0;
  ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
  ctx.beginPath();
  ctx.roundRect(100, 240, 400, 60, 8);
  ctx.fill();

  ctx.fillStyle = colors[0];
  ctx.beginPath();
  ctx.roundRect(120, 260, 160, 20, 4);
  ctx.fill();

  ctx.fillStyle = colors[1] || colors[0];
  ctx.beginPath();
  ctx.roundRect(300, 260, 80, 20, 4);
  ctx.fill();

  // Project Logo Letter Icon inside Card
  ctx.shadowColor = colors[0];
  ctx.shadowBlur = 15;
  ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
  ctx.font = "bold 64px 'Space Grotesk', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const initials = title.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
  ctx.fillText(initials, 300, 150);

  return canvas.toDataURL();
}

// --- Card Generator Utility ---
function createProjectCardHTML(proj) {
  const thumbnailSrc = generateCardThumbnail(proj.title, proj.gradientColors);
  
  return `
    <article class="glass-panel project-card reveal">
      <div class="project-thumb">
        <img src="${thumbnailSrc}" alt="${proj.title}" loading="lazy">
        <span class="project-category">${proj.category.toUpperCase()}</span>
      </div>
      <div class="project-card-info">
        <h3 class="project-card-title">${proj.title}</h3>
        <p class="project-card-desc">${proj.description}</p>
        <div class="project-card-meta">
          <div class="project-card-tech">
            ${proj.tags.map(t => `<span class="tech-tag">${t}</span>`).join("")}
          </div>
          <div class="project-price">${proj.price}</div>
        </div>
        <div class="project-card-actions">
          <button class="btn-card-demo" onclick="openDemoModal('${proj.title}', '${proj.demoUrl}')">
            <i class="fa-solid fa-laptop"></i> Live Demo
          </button>
          <a href="${proj.getCodeUrl}" target="_blank" class="btn-card-buy">
            <i class="fa-solid fa-code"></i> Get Code
          </a>
        </div>
      </div>
    </article>
  `;
}

// --- Render Arrays ---
function renderPortfolio() {
  const featuredContainer = document.getElementById("featured-projects-container");
  const allContainer = document.getElementById("all-projects-container");

  // Render 6 featured projects
  const featuredList = PROJECTS.filter(p => p.featured).slice(0, 6);
  featuredContainer.innerHTML = featuredList.map(p => createProjectCardHTML(p)).join("");

  // Render all projects dynamically
  allContainer.innerHTML = PROJECTS.map(p => createProjectCardHTML(p)).join("");
}

// --- Filter Tab Logic ---
function initFilterSystem() {
  const tabs = document.querySelectorAll(".filter-tab");
  const allContainer = document.getElementById("all-projects-container");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      // Remove active from all tabs
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const category = tab.getAttribute("data-category");
      let filteredProjects = PROJECTS;

      if (category !== "all") {
        filteredProjects = PROJECTS.filter(p => p.category === category);
      }

      // Smooth transition of items
      allContainer.style.opacity = 0;
      setTimeout(() => {
        allContainer.innerHTML = filteredProjects.map(p => createProjectCardHTML(p)).join("");
        allContainer.style.opacity = 1;
        // Re-trigger scroll reveal evaluation
        evaluateScrollReveal();
      }, 200);
    });
  });
}

// --- Fullscreen Live Demo Modal Logic ---
const demoModal = document.getElementById("demo-modal");
const modalTitle = document.getElementById("modal-title");
const demoIframe = document.getElementById("demo-iframe");
const iframeLoader = document.getElementById("iframe-loader");
const iframeWrapper = document.getElementById("iframe-wrapper");
const deviceBtns = document.querySelectorAll(".device-btn");

function openDemoModal(title, url) {
  modalTitle.textContent = title;
  iframeLoader.classList.remove("hidden");
  
  // Set iframe source
  demoIframe.src = url;
  
  // Show modal
  demoModal.classList.add("active");
  document.body.style.overflow = "hidden"; // Disable background scrolling

  // Listen to iframe load event to remove spinner
  demoIframe.onload = function() {
    iframeLoader.classList.add("hidden");
  };
}

function closeDemoModal() {
  demoModal.classList.remove("active");
  document.body.style.overflow = ""; // Re-enable background scrolling
  // Clear source to avoid memory leakage or play audio in background
  setTimeout(() => {
    demoIframe.src = "about:blank";
  }, 400);
}

// Device responsive preview selector inside modal
deviceBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    deviceBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    
    const device = btn.getAttribute("data-device");
    iframeWrapper.className = "modal-iframe-wrapper " + device;
  });
});

// Close modal on escape key
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && demoModal.classList.contains("active")) {
    closeDemoModal();
  }
});

// Close modal on clicking outside container
demoModal.addEventListener("click", (e) => {
  if (e.target === demoModal) {
    closeDemoModal();
  }
});

// Make close function global for inline onclick calls
window.openDemoModal = openDemoModal;
window.closeDemoModal = closeDemoModal;

// --- FAQ Accordion Logic ---
function initFAQ() {
  const headers = document.querySelectorAll(".faq-header");
  headers.forEach(header => {
    header.addEventListener("click", () => {
      const parent = header.parentElement;
      const body = parent.querySelector(".faq-body");
      const isAlreadyActive = parent.classList.contains("active");

      // Close all other items
      document.querySelectorAll(".faq-item").forEach(item => {
        item.classList.remove("active");
        item.querySelector(".faq-body").style.maxHeight = null;
      });

      if (!isAlreadyActive) {
        parent.classList.add("active");
        body.style.maxHeight = body.scrollHeight + "px";
      }
    });
  });
}

// --- Scroll Reveal Logic ---
let revealElements = [];
function initScrollReveal() {
  // Capture elements
  revealElements = document.querySelectorAll(".reveal");
  evaluateScrollReveal();
  
  // Register scroll event
  window.addEventListener("scroll", evaluateScrollReveal, { passive: true });
}

function evaluateScrollReveal() {
  revealElements = document.querySelectorAll(".reveal");
  const triggerPoint = window.innerHeight * 0.85;

  revealElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < triggerPoint) {
      el.classList.add("revealed");
    }
  });
}

// --- Background Particle Canvas Engine ---
function initCanvasParticles() {
  const canvas = document.getElementById("bg-canvas");
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const particles = [];
  const particleCount = Math.min(60, Math.floor((width * height) / 25000)); // Cap particles for optimization

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.radius = Math.random() * 2 + 0.5;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.color = Math.random() > 0.5 ? "rgba(139, 92, 246, 0.15)" : "rgba(6, 182, 212, 0.12)";
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Handle edge collisions smoothly
      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  // Populate particles
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  // Draw connections between nearby particles
  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
        if (dist < 130) {
          const alpha = (1 - dist / 130) * 0.08;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    
    // Draw background subtle radial glow simulation
    const gradient = ctx.createRadialGradient(width/2, height/2, 20, width/2, height/2, Math.max(width, height));
    gradient.addColorStop(0, "rgba(8, 3, 24, 0.95)");
    gradient.addColorStop(1, "rgba(3, 0, 10, 1)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    drawConnections();
    requestAnimationFrame(animate);
  }

  // Window Resize
  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  animate();
}

// --- Header Dynamic Scrolled Visuals ---
function initHeaderScroll() {
  const header = document.querySelector("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }, { passive: true });
}

// --- Mobile Navigation Menu Toggle ---
function initMobileMenu() {
  const toggle = document.querySelector(".mobile-toggle");
  const menu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  toggle.addEventListener("click", () => {
    menu.classList.toggle("active");
    const icon = toggle.querySelector("i");
    if (menu.classList.contains("active")) {
      icon.className = "fa-solid fa-xmark";
    } else {
      icon.className = "fa-solid fa-bars";
    }
  });

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("active");
      toggle.querySelector("i").className = "fa-solid fa-bars";
    });
  });
}

// --- Active Link Observer ---
function initActiveSectionTracker() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - 150) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }, { passive: true });
}

// --- Contact Form Handling & Micro-Interactions ---
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = form.querySelector(".btn-submit");
    const originalText = btn.innerHTML;

    // Trigger loading state micro-interaction
    btn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Sending message...`;
    btn.disabled = true;

    setTimeout(() => {
      // Success interaction
      btn.innerHTML = `<i class="fa-solid fa-check"></i> Message Sent Successfully!`;
      btn.style.background = "linear-gradient(135deg, #10b981 0%, #059669 100%)";
      btn.style.boxShadow = "0 0 20px rgba(16, 185, 129, 0.4)";

      setTimeout(() => {
        form.reset();
        btn.innerHTML = originalText;
        btn.style.background = "";
        btn.style.boxShadow = "";
        btn.disabled = false;
      }, 3000);
    }, 1800);
  });
}

// --- Custom Interactive Cursor Glow ---
function initCursorGlow() {
  const glow = document.createElement("div");
  glow.id = "cursor-glow";
  document.body.appendChild(glow);

  window.addEventListener("mousemove", (e) => {
    glow.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
  }, { passive: true });
}

// --- App Initialization on Page Load ---
window.addEventListener("DOMContentLoaded", () => {
  // Pre-load content templates
  renderPortfolio();

  // Run dynamic setups
  initCanvasParticles();
  initCursorGlow();
  initFilterSystem();
  initFAQ();
  initHeaderScroll();
  initMobileMenu();
  initActiveSectionTracker();
  initContactForm();

  // Initialize Scroll Reveals
  initScrollReveal();

  // Preloader removal timer
  const preloader = document.getElementById("preloader");
  setTimeout(() => {
    preloader.classList.add("fade-out");
    // Evaluate reveals after page loader fades
    setTimeout(evaluateScrollReveal, 200);
  }, 800);
});
