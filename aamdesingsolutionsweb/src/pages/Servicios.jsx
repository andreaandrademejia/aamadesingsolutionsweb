// src/pages/CategoryPage.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { SERVICES_DATA } from '../data/servicesData';
// Importamos algunos iconos de ejemplo (deberías instalarlos: npm install react-icons)
import {
	FaLaptopCode,
	FaBuilding,
	FaShoppingCart,
	FaPaintBrush,
	FaBirthdayCake,
	FaFileInvoiceDollar,
	FaPlane,
	FaReceipt,
	FaTasks,
} from 'react-icons/fa';

// Mapeo simple de nombres a componentes de icono para que sean dinámicos
const IconMap = {
	FaLaptopCode,
	FaBuilding,
	FaShoppingCart,
	FaPaintBrush,
	FaBirthdayCake,
	FaFileInvoiceDollar,
	FaPlane,
	FaReceipt,
	FaTasks,
	FaChartBar: FaTasks, // Usamos FaTasks como fallback
};

// Componente para una tarjeta de servicio individual
const ServicioCard = ({ categoriaSlug, servicio }) => {
	const IconComponent = IconMap[servicio.icon] || FaLaptopCode; // Fallback

	return (
		<Link
			to={`/servicios/${categoriaSlug}/${servicio.id}`} // Enlace a la página de detalle
			className="group block overflow-hidden rounded-lg shadow-xl bg-white transition duration-300 ease-in-out transform hover:scale-[1.03] hover:shadow-2xl"
		>
			<div className="p-6 h-full flex flex-col justify-between">
				<div className="mb-4">
					<IconComponent className="text-4xl text-blue-600 group-hover:text-amber-500 transition-colors" />
				</div>
				<h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600">
					{servicio.title}
				</h3>
				<p className="text-gray-600 text-sm">{servicio.short_description}</p>
			</div>
		</Link>
	);
};

// Componente principal para mostrar la cuadrícula de una categoría
const CategoryPage = () => {
	// 1. Obtener el slug de la URL (ej: 'web', 'tramites')
	const { categoria } = useParams();

	// 2. Buscar los datos de esa categoría
	const categoryData = SERVICES_DATA[categoria];

	if (!categoryData) {
		return (
			<div className="container mx-auto p-8 text-center min-h-screen">
				<h1 className="text-2xl font-bold text-red-600">
					¡Error! Categoría no encontrada.
				</h1>
				<p className="text-gray-600 mt-4">
					La URL ingresada no corresponde a ninguna de nuestras categorías de
					servicio.
				</p>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-16 min-h-screen">
			<h1 className="text-4xl font-extrabold text-gray-900 mb-4 border-b-4 border-blue-600 inline-block">
				{categoryData.title}
			</h1>
			<p className="text-xl text-gray-600 mb-10">{categoryData.description}</p>

			{/* La Cuadrícula que solicitaste */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{categoryData.options.map((servicio) => (
					<ServicioCard
						key={servicio.id}
						categoriaSlug={categoria}
						servicio={servicio}
					/>
				))}
			</div>
		</div>
	);
};

export default Servicios;
