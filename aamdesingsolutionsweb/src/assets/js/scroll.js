document.addEventListener('DOMContentLoaded', function () {
  // Scroll suave al hacer clic en los enlaces del menú de Bootstrap (directos y desplegables)
  document
    .querySelectorAll(
      '.navbar-nav a.nav-link[href^="#"], .navbar-nav a.dropdown-item[href^="#"]',
    )
    .forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId !== '#') {
          document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth',
          });
        } else {
          // Opcional: Puedes agregar aquí alguna otra acción para el clic en "Home" si es necesario
          window.scrollTo({ top: 0, behavior: 'smooth' }); // Ejemplo: ir al inicio de la página
        }
      });
    });

  // Scroll suave al hacer clic en el botón "Contactame"
  document
    .querySelectorAll('.buttons-contactame a[href^="#"]')
    .forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth',
        });
      });
    });

  // Scroll suave al hacer clic en la flecha "Volver arriba" del footer
  const footerTopAnchor = document.querySelector(
    '.footer-iconTop a[href^="#"]',
  );
  if (footerTopAnchor) {
    footerTopAnchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth',
      });
    });
  }

  // Efecto hover para la sección de Servicios (mantener como está)
  const serviceBoxes = document.querySelectorAll(
    '.services-container .services-box',
  );
  serviceBoxes.forEach((box) => {
    box.addEventListener('mouseenter', () => {
      box.classList.add('hovered');
    });
    box.addEventListener('mouseleave', () => {
      box.classList.remove('hovered');
    });
  });

  // Efecto hover para la sección de Proyectos (mantener como está)
  const portfolioBoxes = document.querySelectorAll('#projects .portfolio-box');
  portfolioBoxes.forEach((box) => {
    box.addEventListener('mouseenter', () => {
      box.classList.add('hovered');
    });
    box.addEventListener('mouseleave', () => {
      box.classList.remove('hovered');
    });
  });
});

// Resaltado de la navegación activa al desplazarse (ajustar selector)
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll(
  '.navbar-nav a.nav-link[href^="#"], .navbar-nav a.dropdown-item[href^="#"]',
);

window.onscroll = () => {
  let scrollY = window.scrollY;

  sections.forEach((sec) => {
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if (scrollY >= offset && scrollY < offset + height) {
      navLinks.forEach((link) => {
        link.classList.remove('active');
      });

      const correspondingNavLink = document.querySelector(
        `.navbar-nav a[href="#${id}"].nav-link, .navbar-nav a[href="#${id}"].dropdown-item`,
      );
      if (correspondingNavLink) {
        correspondingNavLink.classList.add('active');
      }
    }
  });
};