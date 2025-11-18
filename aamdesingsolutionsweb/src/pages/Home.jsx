// src/pages/Home.jsx (Fragmento del Hero)
const Home = () => {
	return (
		<section className="bg-white py-20 px-4 md:px-8">
			<div className="max-w-6xl mx-auto text-center">
				{/* Título Persuasivo y Atractivo */}
				<h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
					Impulsa tu Negocio: Diseñamos, Gestionamos y Hacemos Crecer.
				</h1>
				{/* Subtítulo de Confianza */}
				<p className="text-xl text-gray-600 mb-8">
					Soluciones web profesionales y gestoría administrativa, **enfocadas en
					emprendedores y PYMES** en México.
				</p>

				{/* CTA (Botón) */}
				<button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 shadow-lg">
					¡Cotiza tu Proyecto Web Ahora!
				</button>
			</div>
		</section>
		// ... más secciones
	);
};

export default Home;
