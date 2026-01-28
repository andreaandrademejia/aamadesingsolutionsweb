import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Componentes SVG en línea para reemplazar FaBars y FaTimes
const MenuIcon = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="currentColor"
		{...props}
	>
		<path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
	</svg>
);

const CloseIcon = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="currentColor"
		{...props}
	>
		<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
	</svg>
);

const Header = () => {
	const [isOpen, setIsOpen] = useState(false);

	// Los enlaces del menú se basan en tu estructura de carpetas
	const navItems = [
		{ name: 'Inicio', path: '/' },
		{ name: 'Acerca de Mí', path: '/acerca-de' },
		{ name: 'Servicios', path: '/servicios/web' }, // Enlazar a la primera categoría
		{ name: 'Portafolio', path: '/portafolio' }, // Asumimos esta ruta
		{ name: 'Herramientas', path: '/herramientas' }, // Asumimos esta ruta
		{ name: 'Contacto', path: '/contacto' },
	];

	return (
		<header className="absolute top-0 left-0 right-0 z-50 p-6">
			<div className="container mx-auto flex justify-between items-center">
				{/* Logo o Nombre de la Empresa */}
				<Link
					to="/"
					className="text-3xl font-extrabold text-white tracking-widest bg-blue-600 p-2 rounded-lg shadow-lg"
				>
					AAM Design
				</Link>

				{/* Desktop Navigation */}
				<nav className="hidden lg:flex space-x-8">
					{navItems.map((item) => (
						<Link
							key={item.name}
							to={item.path}
							className="text-white text-lg font-medium hover:text-blue-400 transition duration-300 relative group"
						>
							{item.name}
							{/* Línea animada bajo el texto */}
							<span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
						</Link>
					))}
				</nav>

				{/* Mobile Menu Button */}
				<button
					className="lg:hidden text-white text-2xl"
					onClick={() => setIsOpen(!isOpen)}
					aria-label="Abrir menú"
				>
					{isOpen ? (
						<CloseIcon className="w-6 h-6" />
					) : (
						<MenuIcon className="w-6 h-6" />
					)}
				</button>
			</div>

			{/* Mobile Menu (Dropdown) */}
			<div
				className={`lg:hidden fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-95 z-40 transform ${
					isOpen ? 'translate-x-0' : 'translate-x-full'
				} transition-transform duration-500 ease-in-out`}
			>
				<div className="flex justify-end p-6">
					<button
						className="text-white text-3xl"
						onClick={() => setIsOpen(false)}
						aria-label="Cerrar menú"
					>
						<CloseIcon className="w-8 h-8" />
					</button>
				</div>
				<nav className="flex flex-col items-center space-y-6 mt-10">
					{navItems.map((item) => (
						<Link
							key={item.name}
							to={item.path}
							onClick={() => setIsOpen(false)}
							className="text-white text-3xl font-semibold hover:text-blue-400 transition duration-300"
						>
							{item.name}
						</Link>
					))}
				</nav>
			</div>
		</header>
	);
};

export default Header;
