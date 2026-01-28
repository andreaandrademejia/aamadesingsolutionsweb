import React from 'react';
import Header from '../components/Header.jsx';
import Hero from '../components/Hero.jsx';

export default function Home() {
	return (
		<div className="flex flex-col min-h-screen bg-white">
			{/* Sección de Introducción (Hero) */}
			<Hero />
			<Header />

			{/* Aquí puedes agregar más secciones debajo del Hero en el futuro */}
		</div>
	);
}
