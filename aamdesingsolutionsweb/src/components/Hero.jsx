import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// URL de la imagen principal. Asegúrate de que exista en tu carpeta 'public'
const HERO_IMAGE_URL = '../assets/videos/3141210-uhd_3840_2160_25fps.mp4';

const Hero = () => {
	// Configuración de las animaciones
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
				delayChildren: 0.3,
			},
		},
	};

	const textVariants = {
		hidden: { opacity: 0, y: 50 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { type: 'spring', stiffness: 100, damping: 20 },
		},
	};

	return (
		// Ajusté el min-h-screen para que no ocupe toda la pantalla y permita ver el header
		// Usamos mt-16 para bajarlo del header fijo
		<div className="relative w-full min-h-[calc(100vh-4rem)] pt-16 overflow-hidden bg-gray-900 flex items-center justify-center">
			{/* 1. Fondo de Imagen */}
			<motion.div
				className="absolute inset-0 bg-cover bg-center bg-no-repeat"
				style={{ backgroundImage: `url('${HERO_IMAGE_URL}')` }}
				initial={{ scale: 1.1, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ duration: 1.5, ease: 'easeOut' }}
			>
				{/* Capa oscura para leer el texto */}
				<div className="absolute inset-0 bg-black/60"></div>
			</motion.div>

			{/* 2. Contenido Central */}
			<div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 py-20 text-white">
				{/* Contenedor de textos (Usa motion.div) */}
				<motion.div
					variants={containerVariants}
					initial="hidden"
					animate="visible"
					className="max-w-5xl"
				>
					{/* Título Principal */}
					<motion.h1
						variants={textVariants}
						className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 drop-shadow-lg"
					>
						Tu Marca Digital,{' '}
						<span className="text-blue-400">Simplificada</span>.
					</motion.h1>

					{/* Subtítulo */}
					<motion.p
						variants={textVariants}
						className="text-xl md:text-3xl font-light max-w-4xl mx-auto mb-10 text-gray-200 leading-relaxed"
					>
						Combinamos{' '}
						<strong className="font-semibold text-blue-300">
							diseño creativo
						</strong>{' '}
						y{' '}
						<strong className="font-semibold text-blue-300">
							gestión administrativa
						</strong>{' '}
						para impulsar a profesionistas y pequeñas empresas.
					</motion.p>

					{/* Botón CTA (Llamada a la Acción) */}
					<motion.div variants={textVariants}>
						<Link
							to="/servicios"
							className="inline-block bg-blue-600 text-white hover:bg-blue-700 font-bold py-4 px-10 rounded-full shadow-2xl transition-all transform hover:scale-105 uppercase tracking-widest text-base border-2 border-blue-600 hover:border-blue-700"
						>
							Ver Todas las Soluciones
						</Link>
						<Link
							to="/contacto"
							className="ml-4 inline-block bg-transparent text-white hover:bg-white/10 font-bold py-4 px-10 rounded-full transition-all transform hover:scale-105 uppercase tracking-widest text-base border-2 border-white"
						>
							Contacto Rápido
						</Link>
					</motion.div>
				</motion.div>
			</div>
		</div>
	);
};

export default Hero;
