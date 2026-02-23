document.addEventListener('DOMContentLoaded', () => {
	// ==== Lógica para los menús desplegables del header ====
	const homeDropdownToggle = document.getElementById('homeDropdownToggle');
	const homeDropdownMenu = document.getElementById('homeDropdownMenu');
	const contactDropdownButton = document.getElementById(
		'contactDropdownButton',
	);
	const contactDropdownMenu = document.getElementById('contactDropdownMenu');

	// Función genérica para alternar la visibilidad del menú
	function toggleDropdown(button, menu) {
		// Cierra cualquier otro menú abierto si lo hubiera
		if (button === homeDropdownToggle) {
			contactDropdownMenu.classList.add('hidden');
		} else if (button === contactDropdownButton) {
			homeDropdownMenu.classList.add('hidden');
		}
		menu.classList.toggle('hidden');
	}

	// Event listeners para los botones del header
	if (homeDropdownToggle && homeDropdownMenu) {
		homeDropdownToggle.addEventListener('click', () => {
			toggleDropdown(homeDropdownToggle, homeDropdownMenu);
		});
	}

	if (contactDropdownButton && contactDropdownMenu) {
		contactDropdownButton.addEventListener('click', () => {
			toggleDropdown(contactDropdownButton, contactDropdownMenu);
		});
	}

	// Cierra los menús al hacer clic fuera
	document.addEventListener('click', (event) => {
		if (
			!homeDropdownToggle.contains(event.target) &&
			!homeDropdownMenu.contains(event.target)
		) {
			homeDropdownMenu.classList.add('hidden');
		}
		if (
			!contactDropdownButton.contains(event.target) &&
			!contactDropdownMenu.contains(event.target)
		) {
			contactDropdownMenu.classList.add('hidden');
		}
	});

	// ==== Lógica del menú móvil ====
	const menuIcon = document.getElementById('menu-icon');
	const navbar = document.getElementById('navbar');

	if (menuIcon && navbar) {
		menuIcon.addEventListener('click', () => {
			navbar.classList.toggle('hidden');
			navbar.classList.toggle('flex');
			navbar.classList.toggle('flex-col');
			navbar.classList.toggle('absolute');
			navbar.classList.toggle('top-16');
			navbar.classList.toggle('left-0');
			navbar.classList.toggle('w-full');
			navbar.classList.toggle('bg-gray-800');
			navbar.classList.toggle('p-5');
			navbar.classList.toggle('space-y-4');
			navbar.classList.toggle('shadow-lg');
			navbar.classList.toggle('z-40');
		});
	}

	// Ocultar el menú móvil en desktop
	window.addEventListener('resize', () => {
		if (window.innerWidth >= 768) {
			if (navbar && navbar.classList.contains('hidden')) {
				navbar.classList.remove('hidden');
				navbar.classList.add('flex');
			}
		}
	});

	// ==== Lógica de filtrado y búsqueda de publicaciones del blog ====

	// Referencias a los elementos del DOM
	const searchInput = document.getElementById('searchInput');
	const searchButton = document.getElementById('searchButton');
	const articulos = document.querySelectorAll('.blog-article');
	const categoriasDropdownBtn = document.getElementById(
		'categorias-dropdown-btn',
	);
	const categoriasDropdown = document.getElementById('categorias-dropdown');
	const recientesDropdownBtn = document.getElementById(
		'recientes-dropdown-btn',
	);
	const recientesDropdown = document.getElementById('recientes-dropdown');

	let filtroCategoriaActivo = 'Todos';

	// Función para mostrar/ocultar artículos
	function mostrarArticulos(categoria = 'Todos', textoBusqueda = '') {
		filtroCategoriaActivo = categoria;
		const textoBusquedaLower = textoBusqueda.toLowerCase();

		articulos.forEach((articulo) => {
			const categoriaArticulo = articulo.dataset.tags || '';
			const tituloArticulo =
				articulo.querySelector('h1')?.textContent.toLowerCase() || '';
			const contenidoArticulo =
				articulo.querySelector('p')?.textContent.toLowerCase() || '';

			const coincideCategoria =
				categoria === 'Todos' ||
				categoriaArticulo.includes(categoria.toLowerCase());
			const coincideBusqueda =
				!textoBusquedaLower ||
				tituloArticulo.includes(textoBusquedaLower) ||
				contenidoArticulo.includes(textoBusquedaLower);

			if (coincideCategoria && coincideBusqueda) {
				articulo.style.display = 'block';
			} else {
				articulo.style.display = 'none';
			}
		});
	}

	// Funcionalidad de búsqueda
	if (searchButton && searchInput) {
		searchButton.addEventListener('click', () => {
			const textoBusqueda = searchInput.value.trim();
			mostrarArticulos(filtroCategoriaActivo, textoBusqueda);
		});

		searchInput.addEventListener('keypress', (e) => {
			if (e.key === 'Enter') {
				const textoBusqueda = searchInput.value.trim();
				mostrarArticulos(filtroCategoriaActivo, textoBusqueda);
			}
		});
	}

	// Funcionalidad del menú desplegable de categorías
	if (categoriasDropdownBtn && categoriasDropdown) {
		categoriasDropdownBtn.addEventListener('click', () => {
			categoriasDropdown.classList.toggle('hidden');
		});

		// Funcionalidad para filtrar por categoría al seleccionar del menú
		categoriasDropdown.addEventListener('click', (event) => {
			const item = event.target;
			if (item.tagName === 'LI' && item.dataset.categoria) {
				const categoriaSeleccionada = item.dataset.categoria;
				mostrarArticulos(categoriaSeleccionada);
				categoriasDropdown.classList.add('hidden');
				// Actualiza el texto del botón del dropdown
				categoriasDropdownBtn.querySelector('span').textContent =
					categoriaSeleccionada;
			}
		});
	}

	// Funcionalidad del menú desplegable de recientes
	if (recientesDropdownBtn && recientesDropdown) {
		recientesDropdownBtn.addEventListener('click', () => {
			recientesDropdown.classList.toggle('hidden');
		});
	}

	// Ocultar los menús si se hace clic fuera
	document.addEventListener('click', (event) => {
		if (
			categoriasDropdownBtn &&
			!categoriasDropdownBtn.contains(event.target) &&
			!categoriasDropdown.contains(event.target)
		) {
			categoriasDropdown.classList.add('hidden');
		}
		if (
			recientesDropdownBtn &&
			!recientesDropdownBtn.contains(event.target) &&
			!recientesDropdown.contains(event.target)
		) {
			recientesDropdown.classList.add('hidden');
		}
	});

	// Mostrar todos los artículos al cargar la página
	mostrarArticulos();

	// ==== Lógica del formulario de comentarios y modal ====
	const form = document.getElementById('form');
	const modal = document.getElementById('modal');
	const closeModalBtn = document.getElementById('btn_close-modal');

	// Manejar el envío del formulario
	if (form) {
		form.addEventListener('submit', (event) => {
			// Previene que el formulario se envíe de forma tradicional
			event.preventDefault();

			// Lógica de validación
			const name = document.getElementById('name').value.trim();
			const email = document.getElementById('email').value.trim();
			const message = document.getElementById('message').value.trim();

			if (name && email && message) {
				// Si la validación es exitosa, muestra el modal
				modal.showModal();
				// Limpia el formulario
				form.reset();
			} else {
				// Si la validación falla, puedes mostrar un mensaje de error
				alert('Por favor, rellena todos los campos.');
			}
		});
	}

	// Cerrar el modal al hacer clic en el botón de cerrar
	if (closeModalBtn) {
		closeModalBtn.addEventListener('click', () => {
			modal.close();
		});
	}

	// Cerrar el modal si el usuario hace clic fuera de él
	if (modal) {
		modal.addEventListener('click', (event) => {
			const dialogDimensions = modal.getBoundingClientRect();
			if (
				event.clientX < dialogDimensions.left ||
				event.clientX > dialogDimensions.right ||
				event.clientY < dialogDimensions.top ||
				event.clientY > dialogDimensions.bottom
			) {
				modal.close();
			}
		});
	}
});
