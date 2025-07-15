document.addEventListener("DOMContentLoaded", function () {
  document.body.classList.add("loaded");
});

// Mobile menu toggle
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
const themeToggle = document.getElementById("theme-toggle");
const prefersDark =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

hamburger.addEventListener("click", function () {
  navMenu.classList.toggle("active");
  hamburger.innerHTML = navMenu.classList.contains("active")
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking a link
document.querySelectorAll("#nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

// Scroll animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.1,
  }
);

document.querySelectorAll(".animate-on-scroll").forEach((el) => {
  observer.observe(el);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));

    window.scrollTo({
      top: target.offsetTop - 80,
      behavior: "smooth",
    });
  });
});

// Header scroll effect
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (window.scrollY > 100) {
    header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)";
    header.style.padding = "0.5rem 0";
  } else {
    header.style.boxShadow = "var(--shadow)";
    header.style.padding = "1rem 0";
  }
});

const setTheme = (isDark) => {
  document.body.classList.toggle("dark", isDark);
  themeToggle.innerHTML = isDark
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
  localStorage.setItem("theme", isDark ? "dark" : "light");
};

// Init on load
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  setTheme(savedTheme === "dark");
} else {
  setTheme(prefersDark);
}

themeToggle.addEventListener("click", () => {
  const isDark = document.body.classList.contains("dark");
  setTheme(!isDark);
});
