document.addEventListener('DOMContentLoaded', () => {
	// Funcionalidad del slider de imágenes
	const aboutImageSection = document.getElementById('about-image-section');
	if (aboutImageSection) {
		const sliderContainer =
			aboutImageSection.querySelector('#slider-container');
		const slides = aboutImageSection.querySelectorAll('#slider-container img');
		const controls = aboutImageSection.querySelectorAll('ul li');

		if (sliderContainer && slides && slides.length > 0) {
			const numberOfSlides = slides.length;
			let currentIndex = 0;
			const slideInterval = 3000;

			sliderContainer.style.width = `${numberOfSlides * 100}%`;
			slides.forEach((slide) => {
				slide.style.width = `${100 / numberOfSlides}%`;
			});

			function updateSlider(index = currentIndex) {
				currentIndex = index;
				sliderContainer.style.transform = `translateX(-${
					currentIndex * (100 / numberOfSlides)
				}%)`;

				if (controls) {
					controls.forEach((control) => control.classList.remove('active'));
					if (controls.length > 0 && controls.hasOwnProperty(currentIndex)) {
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
						updateSlider(index);
						clearInterval(autoSlide);
						autoSlide = setInterval(nextSlide, slideInterval);
					});
				});
			}
			updateSlider(0);
		}
	}

	// Funcionalidad para el formulario de contacto
	const form = document.getElementById('form');
	const nameInput = document.getElementById('name');
	const emailInput = document.getElementById('email');
	const modal = document.getElementById('modal');
	const closeModalBtn = document.getElementById('btn_close-modal');

	// Asegúrate de que todos los elementos existen antes de agregar los eventos
	if (form && nameInput && emailInput && modal && closeModalBtn) {
		// 1. Validar el formato del correo
		const validateEmail = (email) => {
			const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			return re.test(String(email).toLowerCase());
		};

		// 2. Restricción para solo letras en el nombre
		nameInput.addEventListener('input', (e) => {
			e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
		});

		// 3. Manejar el envío del formulario
		form.addEventListener('submit', (e) => {
			e.preventDefault(); // Detiene el envío del formulario

			// Validar nombre (solo letras y no vacío)
			const name = nameInput.value.trim();
			if (name === '' || name.length > 20 || /[^a-zA-Z\s]/.test(name)) {
				alert(
					'Por favor, ingresa un nombre válido (solo letras, máximo 20 caracteres).',
				);
				return; // Detiene el proceso si el nombre es inválido
			}

			// Validar correo electrónico
			const email = emailInput.value.trim();
			if (!validateEmail(email)) {
				alert(
					'Por favor, ingresa un correo electrónico con un formato válido.',
				);
				return; // Detiene el proceso si el correo es inválido
			}

			// Si todas las validaciones pasan, muestra el modal de éxito
			modal.showModal();
		});

		// 4. Cerrar el modal y recargar la página
		closeModalBtn.addEventListener('click', () => {
			modal.close();
			window.location.reload(); // Recarga la página
		});
	}
});
