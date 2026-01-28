import React from 'react';
// Importamos el video desde la ruta especificada
import bgVideo from '/7101913-uhd_2560_1440_25fps.mp4';

const Contacto = () => {
	return (
		<div className="w-full bg-black min-h-screen font-sans text-gray-300">
			{/* 1. SECCIÓN DE VIDEO (HERO) */}
			<div className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
				{/* Overlay oscuro para contraste */}
				<div className="absolute inset-0 bg-black/30 z-10"></div>
				<video
					autoPlay
					loop
					muted
					playsInline
					className="w-full h-full object-cover"
				>
					<source src={bgVideo} type="video/mp4" />
					Tu navegador no soporta videos HTML5.
				</video>

				{/* Título sobre el video */}
				<div className="absolute inset-0 z-20 flex items-center justify-center">
					<h1 className="text-4xl md:text-5xl font-light text-white tracking-widest uppercase">
						Contacto
					</h1>
				</div>
			</div>

			{/* 2. SECCIÓN DE FORMULARIO E INFORMACIÓN */}
			<div className="max-w-7xl mx-auto px-4 py-16 md:py-20">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
					{/* Columna Izquierda: Información de Texto */}
					<div className="flex flex-col justify-start space-y-8">
						<div>
							<h2 className="text-3xl md:text-4xl font-light text-[#3b82f6] mb-6">
								Impulsa tu proyecto
							</h2>
							<p className="text-gray-300 leading-relaxed text-lg mb-8">
								Ya sea una Landing Page veloz, una tienda en línea segura con
								Stripe o herramientas administrativas a medida. Cuéntanos tu
								idea y construyamos una solución digital sólida y escalable.
							</p>
						</div>

						<div className="space-y-2 text-base">
							<p>
								<span className="font-bold text-white">Email:</span>{' '}
								<a
									href="mailto:tuemail@dominio.com"
									className="text-[#3b82f6] hover:underline"
								>
									tuemail@dominio.com
								</a>
							</p>
							<p>
								<span className="font-bold text-white">Teléfono/WhatsApp:</span>{' '}
								<a
									href="tel:+525500000000"
									className="text-[#3b82f6] hover:underline"
								>
									(55) 0000 0000
								</a>
							</p>
						</div>

						<div className="text-gray-400 text-sm leading-relaxed">
							<p>Atención personalizada para tu negocio.</p>
							<p>Ciudad de México / Remoto</p>
						</div>
					</div>

					{/* Columna Derecha: El Formulario */}
					<div>
						<form className="space-y-6">
							{/* Fila 1: Nombre y Email */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="flex flex-col">
									<label className="text-sm text-white mb-2">
										Nombre:<span className="text-[#3b82f6]">*</span>
									</label>
									<input
										type="text"
										placeholder="Tu nombre completo"
										className="w-full p-3 bg-white text-gray-900 border-none focus:ring-2 focus:ring-[#3b82f6] outline-none placeholder-gray-400"
									/>
								</div>
								<div className="flex flex-col">
									<label className="text-sm text-white mb-2">
										Email:<span className="text-[#3b82f6]">*</span>
									</label>
									<input
										type="email"
										placeholder="ejemplo@correo.com"
										className="w-full p-3 bg-white text-gray-900 border-none focus:ring-2 focus:ring-[#3b82f6] outline-none placeholder-gray-400"
									/>
								</div>
							</div>

							{/* Fila 2: Teléfono y Empresa/Negocio */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="flex flex-col">
									<label className="text-sm text-white mb-2">
										Teléfono:<span className="text-[#3b82f6]">*</span>
									</label>
									<input
										type="tel"
										placeholder="(55) ..."
										className="w-full p-3 bg-white text-gray-900 border-none focus:ring-2 focus:ring-[#3b82f6] outline-none placeholder-gray-400"
									/>
								</div>
								<div className="flex flex-col">
									<label className="text-sm text-white mb-2">
										Empresa / Negocio:<span className="text-[#3b82f6]">*</span>
									</label>
									<input
										type="text"
										placeholder="Nombre de tu proyecto"
										className="w-full p-3 bg-white text-gray-900 border-none focus:ring-2 focus:ring-[#3b82f6] outline-none placeholder-gray-400"
									/>
								</div>
							</div>

							{/* Selección ACTUALIZADA con tus servicios */}
							<div className="flex flex-col">
								<label className="text-sm text-white mb-2">
									Me interesa:<span className="text-[#3b82f6]">*</span>
								</label>
								<select className="w-full p-3 bg-white text-gray-900 border-none focus:ring-2 focus:ring-[#3b82f6] outline-none">
									<option value="">- Selecciona una opción -</option>

									<optgroup label="Webs de Presentación">
										<option value="landing">Landing Page / Web Sencilla</option>
										<option value="menu">Menú Digital / Catálogo QR</option>
										<option value="portfolio">
											Portafolio / Personal Branding (CV)
										</option>
									</optgroup>

									<optgroup label="Soluciones Completas">
										<option value="web-completa">
											Sitio Web Completo (Multi-sección)
										</option>
										<option value="ecommerce">
											E-commerce / Tienda Online (Stripe)
										</option>
									</optgroup>

									<optgroup label="Servicios Operativos">
										<option value="admin">Sistemas Admin / Facturación</option>
										<option value="mantenimiento">
											Mantenimiento y Soporte Web
										</option>
									</optgroup>

									<option value="otro">Otro / Consultoría General</option>
								</select>
							</div>

							{/* Checkbox */}
							<div className="flex items-start space-x-3 mt-4">
								<input
									type="checkbox"
									className="mt-1 w-4 h-4 accent-[#3b82f6]"
								/>
								<span className="text-xs text-gray-400">
									He leído y acepto los{' '}
									<a href="#" className="text-[#3b82f6] underline">
										Términos y Condiciones
									</a>
									*
								</span>
							</div>
							<p className="text-right text-xs text-[#3b82f6] mt-0">
								* Campos obligatorios
							</p>

							{/* Simulación reCAPTCHA */}
							<div className="bg-[#f9f9f9] text-gray-600 p-3 w-fit border border-gray-300 rounded shadow-sm flex items-center space-x-4 text-xs">
								<div className="w-6 h-6 border-2 border-gray-300 rounded sm:mr-2"></div>
								<span>No soy un robot</span>
								<img
									src="https://www.gstatic.com/recaptcha/api2/logo_48.png"
									alt="captcha"
									className="h-8 ml-auto opacity-50"
								/>
							</div>

							{/* Botón */}
							<button
								type="submit"
								className="w-full bg-[#3b82f6] hover:bg-blue-600 text-white font-bold py-3 px-6 transition duration-300 flex items-center justify-center gap-2"
							>
								🚀 Solicitar cotización
							</button>
						</form>
					</div>
				</div>
			</div>

			{/* 3. SECCIÓN DE MAPA (Centrado y contenido) */}
			<div className="w-full bg-black pb-20 flex justify-center">
				<div className="w-[90%] md:w-[70%] h-[450px] border border-gray-800 shadow-2xl shadow-blue-900/20">
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.469795123519!2d-99.20963542478586!3d19.43527278184473!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d2020251c6576f%3A0x23707010419f8646!2sAv.%20Jaime%20Balmes%2011%2C%20Polanco%2C%20Los%20Morales%2C%20Miguel%20Hidalgo%2C%2011510%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX!5e0!3m2!1ses-419!2smx!4v1709669000000!5m2!1ses-419!2smx"
						width="100%"
						height="100%"
						style={{ border: 0 }}
						allowFullScreen=""
						loading="lazy"
						referrerPolicy="no-referrer-when-downgrade"
						title="Ubicación"
					></iframe>
				</div>
			</div>
		</div>
	);
};

export default Contacto;
