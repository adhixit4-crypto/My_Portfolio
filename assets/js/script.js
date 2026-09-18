const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector("#nav-menu");
const navLinks = [...document.querySelectorAll("[data-nav-link]")];
const menuLabel = navToggle?.querySelector(".sr-only");
const desktopBreakpoint = window.matchMedia("(min-width: 1001px)");

function setMenuState(isOpen) {
  if (!navToggle || !navMenu) {
    return;
  }

  navMenu.classList.toggle("open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("nav-open", isOpen && !desktopBreakpoint.matches);

  if (menuLabel) {
    menuLabel.textContent = isOpen ? "Close navigation" : "Open navigation";
  }
}

navToggle?.addEventListener("click", () => {
  setMenuState(navToggle.getAttribute("aria-expanded") !== "true");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => setMenuState(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navToggle?.getAttribute("aria-expanded") === "true") {
    setMenuState(false);
    navToggle.focus();
  }
});

document.addEventListener("click", (event) => {
  if (
    navToggle?.getAttribute("aria-expanded") === "true" &&
    !navMenu?.contains(event.target) &&
    !navToggle.contains(event.target)
  ) {
    setMenuState(false);
  }
});

desktopBreakpoint.addEventListener("change", () => setMenuState(false));

const sections = [...document.querySelectorAll("main section[id]")];

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visibleEntry = entries.find((entry) => entry.isIntersecting);

      if (!visibleEntry) {
        return;
      }

      navLinks.forEach((link) => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${visibleEntry.target.id}`
        );
      });
    },
    { rootMargin: "-35% 0px -55% 0px", threshold: 0.01 }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

const revealItems = [...document.querySelectorAll("[data-reveal]")];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reducedMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

const year = document.querySelector("#current-year");

if (year) {
  year.textContent = String(new Date().getFullYear());
}
