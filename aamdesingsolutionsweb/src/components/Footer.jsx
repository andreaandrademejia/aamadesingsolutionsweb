import React from 'react';

const Footer = () => {
	return (
		<footer className="bg-gray-800 text-white mt-12">
			<div className="container mx-auto p-8 text-center">
				<p className="text-xl font-bold mb-4">AAM Design Solutions Web</p>

				<div className="flex justify-center space-x-6 text-sm mb-6">
					<a href="/acerca-de" className="hover:text-blue-400 transition">
						Acerca de Mí
					</a>
					<a href="/servicios/web" className="hover:text-blue-400 transition">
						Servicios
					</a>
					<a href="/contacto" className="hover:text-blue-400 transition">
						Contacto
					</a>
					<a href="/portafolio" className="hover:text-blue-400 transition">
						Portafolio
					</a>
				</div>

				<p className="text-gray-400 text-sm">
					© {new Date().getFullYear()} AAM Design. Todos los derechos
					reservados. Creado con React y Tailwind CSS.
				</p>
			</div>
		</footer>
	);
};

export default Footer;
