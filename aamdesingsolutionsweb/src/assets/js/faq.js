document.addEventListener('DOMContentLoaded', () => {
	const categoryFilter = document.getElementById('categoryFilter');
	const faqItems = document.querySelectorAll('.accordion-item');

	// Funcionalidad de filtrado por categoría
	if (categoryFilter) {
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

	// Funcionalidad del acordeón con clases de Tailwind
	faqItems.forEach((item) => {
		const header = item.querySelector('h3');
		const content = item.querySelector('.accordion-content');
		const icon = item.querySelector('i');

		if (header && content && icon) {
			header.addEventListener('click', () => {
				const isHidden = content.classList.contains('hidden');
				if (isHidden) {
					// Ocultar todos los demás contenidos
					faqItems.forEach((otherItem) => {
						const otherContent = otherItem.querySelector('.accordion-content');
						const otherIcon = otherItem.querySelector('i');
						if (otherContent !== content) {
							otherContent.classList.add('hidden');
							otherIcon.classList.remove('rotate-180');
						}
					});

					// Mostrar el contenido seleccionado
					content.classList.remove('hidden');
					icon.classList.add('rotate-180');
				} else {
					content.classList.add('hidden');
					icon.classList.remove('rotate-180');
				}
			});
		}
	});
});
