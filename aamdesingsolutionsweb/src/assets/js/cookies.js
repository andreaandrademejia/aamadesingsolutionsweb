/**
 * Lógica de Consentimiento de Cookies - Versión Optimizada
 * AAM Design & Solutions
 */

document.addEventListener('DOMContentLoaded', () => {
	const consent = localStorage.getItem('aam_consent');
	const banner = document.getElementById('cmplz-cookiebanner');

	if (!consent && banner) {
		banner.style.display = 'block';
	}
});

// Agregamos las funciones al objeto window para que el HTML pueda verlas
// y ESLint sepa que tienen un propósito global.

window.togglePreferences = function () {
	const prefPanel = document.getElementById('cookie-preferences');
	if (prefPanel) prefPanel.classList.toggle('hidden');
};

window.acceptAll = function () {
	const consentData = {
		choice: 'accepted',
		stats: true,
		marketing: true,
		date: new Date().toISOString(),
	};
	finishConsent(consentData);
};

window.denyAll = function () {
	const consentData = {
		choice: 'denied',
		stats: false,
		marketing: false,
		date: new Date().toISOString(),
	};
	finishConsent(consentData);
	console.log('El usuario rechazó cookies, pero puede seguir navegando.');
};

window.savePreferences = function () {
	const stats = document.getElementById('pref-stats')?.checked || false;
	const marketing = document.getElementById('pref-marketing')?.checked || false;

	const consentData = {
		choice: 'custom',
		stats: stats,
		marketing: marketing,
		date: new Date().toISOString(),
	};
	finishConsent(consentData);
};

function finishConsent(data) {
	localStorage.setItem('aam_consent', JSON.stringify(data));

	const banner = document.getElementById('cmplz-cookiebanner');
	if (banner) {
		banner.classList.add('animate__fadeOutDown');
		setTimeout(() => {
			banner.style.display = 'none';
		}, 600);
	}
}

window.validarPrivacidadAntesDeEnviar = function () {
	const consent = JSON.parse(localStorage.getItem('aam_consent'));

	if (!consent) {
		alert(
			'Por favor, selecciona tus preferencias de cookies y privacidad en el banner inferior antes de continuar.',
		);
		return false;
	}
	return true;
};
