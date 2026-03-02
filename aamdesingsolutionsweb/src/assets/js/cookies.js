/**
 * Lógica de Consentimiento de Cookies - Versión Ultra-Rápida
 * AAM Design & Solutions - 2026
 */

// 1. EJECUCIÓN INMEDIATA: No esperamos a DOMContentLoaded para mayor velocidad
function checkConsentNow() {
  const consent = localStorage.getItem('aam_consent');
  const banner = document.getElementById('cmplz-cookiebanner');

  if (!consent && banner) {
    // Forzamos la visualización inmediata
    banner.style.display = 'block';
    banner.classList.add('animate__animated', 'animate__fadeInUp');
  }
}

// Intentar ejecutar de inmediato
checkConsentNow();

// Respaldo en caso de que el DOM aún no estuviera listo al cargar el script
document.addEventListener('DOMContentLoaded', checkConsentNow);

// --- FUNCIONES GLOBALES ---

window.togglePreferences = function () {
  const prefPanel = document.getElementById('cookie-preferences');
  if (prefPanel) {
    prefPanel.classList.toggle('hidden');
    prefPanel.classList.toggle('flex');
  }
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
  console.log('El usuario rechazó cookies. Navegación limitada a lo esencial.');
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
    // Animación de salida fluida
    banner.classList.remove('animate__fadeInUp');
    banner.classList.add('animate__fadeOutDown');
    
    setTimeout(() => {
      banner.style.display = 'none';
    }, 600);
  }
}

/**
 * Validación obligatoria para el éxito de AAM Design:
 * Verifica si el usuario ya interactuó con el aviso de privacidad
 */
window.validarPrivacidadAntesDeEnviar = function () {
  const consent = localStorage.getItem('aam_consent');

  if (!consent) {
    const banner = document.getElementById('cmplz-cookiebanner');
    if (banner) {
      banner.style.display = 'block';
      banner.classList.add('animate__shakeX'); // Llama la atención si intentan enviar sin aceptar
      setTimeout(() => banner.classList.remove('animate__shakeX'), 1000);
    }
    alert('Por favor, revisa y acepta nuestras políticas de cookies y privacidad antes de enviar tu solicitud.');
    return false;
  }
  return true;
};