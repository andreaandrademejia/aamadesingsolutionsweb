document.addEventListener('DOMContentLoaded', () => {
	const header = document.getElementById('header');
	const body = document.getElementById('body');
	const navbar = document.getElementById('navbar');
	const menuIcon = document.getElementById('menu-icon');

	const homeDropdownToggle = document.getElementById('homeDropdownToggle');
	const homeDropdownMenu = document.getElementById('homeDropdownMenu');
	const contactDropdownButton = document.getElementById(
		'contactDropdownButton',
	);
	const contactDropdownMenu = document.getElementById('contactDropdownMenu');

	const form = document.getElementById('form');
	const modal = document.getElementById('modal');
	const btnCloseModal = document.getElementById('btn_close-modal');
	const currentYearSpan = document.getElementById('year');

	const categoryFilter = document.getElementById('categoryFilter');
	const faqItems = document.querySelectorAll('.accordion-item');

	// --- Función para ajustar el padding-top del body ---
	function adjustBodyPadding() {
		if (header && body) {
			const headerHeight = header.offsetHeight;
			body.style.paddingTop = `${headerHeight}px`;
		}
	}

	// Llama a la función al cargar la página y al redimensionar la ventana
	adjustBodyPadding();
	window.addEventListener('resize', adjustBodyPadding);

	// --- Menú Móvil (Hamburguesa) ---
	if (menuIcon && navbar) {
		// Si la pantalla es móvil, oculta la navbar
		if (window.innerWidth < 768) {
			navbar.classList.add('hidden');
		}

		menuIcon.addEventListener('click', () => {
			// Alterna la visibilidad del menú móvil
			navbar.classList.toggle('hidden');
			navbar.classList.toggle('absolute');
			navbar.classList.toggle('top-full');
			navbar.classList.toggle('bg-gray-800');
			navbar.classList.toggle('flex-col');
			navbar.classList.toggle('p-4');
			navbar.classList.toggle('rounded-b-lg');
			navbar.classList.toggle('w-full');

			// Alterna el icono de hamburguesa a una 'X'
			const iconPath = menuIcon.querySelector('svg path');
			if (navbar.classList.contains('hidden')) {
				iconPath.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
			} else {
				iconPath.setAttribute('d', 'M6 18L18 6M6 6l12 12');
			}
		});

		// Asegura el comportamiento correcto al cambiar de móvil a desktop y viceversa
		window.addEventListener('resize', () => {
			if (window.innerWidth >= 768) {
				navbar.classList.remove(
					'hidden',
					'absolute',
					'top-full',
					'bg-gray-800',
					'flex-col',
					'p-4',
					'rounded-b-lg',
					'w-full',
				);
				navbar.classList.add('flex');
				menuIcon
					.querySelector('svg path')
					.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
			} else {
				navbar.classList.add('hidden');
				navbar.classList.remove('flex');
			}
			adjustBodyPadding();
		});
	}

	// --- Lógica para los Dropdowns (Home y Contact) ---
	function setupDropdown(button, menu) {
		if (!button || !menu) return;

		button.addEventListener('click', (event) => {
			event.stopPropagation(); // Evita que el clic se propague al documento
			menu.classList.toggle('hidden');

			// Cierra el otro dropdown si está abierto
			if (
				menu === homeDropdownMenu &&
				!contactDropdownMenu.classList.contains('hidden')
			) {
				contactDropdownMenu.classList.add('hidden');
			} else if (
				menu === contactDropdownMenu &&
				!homeDropdownMenu.classList.contains('hidden')
			) {
				homeDropdownMenu.classList.add('hidden');
			}
		});

		document.addEventListener('click', (event) => {
			if (!button.contains(event.target) && !menu.contains(event.target)) {
				menu.classList.add('hidden');
			}
		});
	}
	setupDropdown(homeDropdownToggle, homeDropdownMenu);
	setupDropdown(contactDropdownButton, contactDropdownMenu);

	// --- Desplazamiento Suave (Smooth Scroll) ---
	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault();
			const href = this.getAttribute('href');
			const targetElement = document.querySelector(href);
			const headerOffset = header ? header.offsetHeight : 0;

			if (targetElement) {
				const elementPosition =
					targetElement.getBoundingClientRect().top + window.scrollY;
				const offsetPosition = elementPosition - headerOffset;

				window.scrollTo({
					top: offsetPosition,
					behavior: 'smooth',
				});
			}

			// Cierra el menú móvil después de hacer clic en un enlace
			if (window.innerWidth < 768) {
				navbar.classList.add('hidden');
			}
		});
	});

	// --- Lógica del Acordeón y Filtro de FAQ ---
	if (categoryFilter && faqItems.length > 0) {
		categoryFilter.addEventListener('change', function () {
			const selectedCategory = this.value;
			faqItems.forEach((item) => {
				const category = item.dataset.category;
				if (selectedCategory === 'all' || category === selectedCategory) {
					item.style.display = '';
				} else {
					item.style.display = 'none';
				}
			});
		});
	}

	// --- Slider de imágenes en "About me" (si existe) ---
	const aboutImageSection = document.querySelector(
		'.oficina-info .about-image-section',
	);
	if (aboutImageSection) {
		const sliderContainer =
			aboutImageSection.querySelector('.container-slider');
		const slides = aboutImageSection.querySelectorAll('.container-slider img');
		const controls = aboutImageSection.querySelectorAll('.controls ul li');
		let currentIndex = 0;
		const slideInterval = 3000;

		const numberOfSlides = slides.length;
		sliderContainer.style.width = `${numberOfSlides * 100}%`;
		slides.forEach((slide) => (slide.style.width = `${100 / numberOfSlides}%`));

		function updateSlider() {
			sliderContainer.style.transform = `translateX(-${
				currentIndex * (100 / numberOfSlides)
			}%)`;
			if (controls) {
				controls.forEach((control) => control.classList.remove('active'));
				if (controls[currentIndex]) {
					controls[currentIndex].classList.add('active');
				}
			}
		}

		function nextSlide() {
			currentIndex = (currentIndex + 1) % numberOfSlides;
			updateSlider();
		}

		let autoSlide = setInterval(nextSlide, slideInterval);

		if (controls) {
			controls.forEach((control, index) => {
				control.addEventListener('click', () => {
					currentIndex = index;
					updateSlider();
					clearInterval(autoSlide);
					autoSlide = setInterval(nextSlide, slideInterval);
				});
			});
		}
		updateSlider(0); // Inicia el slider
	}

	// --- Lógica para el modal del formulario de contacto ---
	if (form && modal && btnCloseModal) {
		form.addEventListener('submit', (event) => {
			event.preventDefault();
			modal.showModal();
		});

		btnCloseModal.addEventListener('click', () => {
			modal.close();
			form.reset();
		});
	}

	// --- Actualizar año en el footer ---
	if (currentYearSpan) {
		currentYearSpan.textContent = new Date().getFullYear();
	}
});
