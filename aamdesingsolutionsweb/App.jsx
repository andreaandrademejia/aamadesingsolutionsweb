import React, { useState, useEffect } from 'react';

// Firebase Imports
import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInAnonymously,
	signInWithCustomToken,
	onAuthStateChanged,
} from 'firebase/auth';
import {
	getFirestore,
	doc,
	setDoc,
	onSnapshot,
	collection,
	query,
	addDoc,
} from 'firebase/firestore';

// Main App component
const App = () => {
	const [projects, setProjects] = useState([]);
	const [newProject, setNewProject] = useState({
		title: '',
		description: '',
		imageUrl: '',
	});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [db, setDb] = useState(null);
	const [userId, setUserId] = useState('');
	const [isAuthReady, setIsAuthReady] = useState(false);

	// Firestore & Auth initialization
	useEffect(() => {
		try {
			// Initialize Firebase with global configs
			const firebaseConfig =
				typeof __firebase_config !== 'undefined'
					? JSON.parse(__firebase_config)
					: {};
			const app = initializeApp(firebaseConfig);
			const firestore = getFirestore(app);
			const auth = getAuth(app);
			setDb(firestore);

			const appId =
				typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

			// Authentication listener
			const unsubscribe = onAuthStateChanged(auth, async (user) => {
				if (user) {
					setUserId(user.uid);
					setIsAuthReady(true);
					console.log('Authenticated user:', user.uid);
				} else {
					// If no user, sign in anonymously or with custom token
					try {
						const initialAuthToken =
							typeof __initial_auth_token !== 'undefined'
								? __initial_auth_token
								: null;
						if (initialAuthToken) {
							const userCredential = await signInWithCustomToken(
								auth,
								initialAuthToken,
							);
							setUserId(userCredential.user.uid);
						} else {
							const userCredential = await signInAnonymously(auth);
							setUserId(userCredential.user.uid);
						}
						setIsAuthReady(true);
					} catch (e) {
						console.error('Error signing in:', e);
						setError('Failed to authenticate with Firebase.');
					}
				}
			});

			return () => unsubscribe();
		} catch (e) {
			console.error('Firebase Initialization Error:', e);
			setError('Failed to initialize Firebase.');
		}
	}, []);

	// Firestore data listener
	useEffect(() => {
		if (db && isAuthReady && userId) {
			const appId =
				typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
			const q = query(
				collection(db, `artifacts/${appId}/users/${userId}/projects`),
			);

			const unsubscribe = onSnapshot(
				q,
				(snapshot) => {
					const projectsData = [];
					snapshot.forEach((doc) => {
						projectsData.push({ id: doc.id, ...doc.data() });
					});
					setProjects(projectsData);
					setLoading(false);
				},
				(e) => {
					console.error('Firestore Snapshot Error:', e);
					setError('Failed to fetch projects.');
					setLoading(false);
				},
			);

			return () => unsubscribe();
		} else if (!isAuthReady) {
			setLoading(true);
		}
	}, [db, isAuthReady, userId]);

	const handleAddProject = async (e) => {
		e.preventDefault();
		if (db && userId) {
			setLoading(true);
			try {
				const appId =
					typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
				await addDoc(
					collection(db, `artifacts/${appId}/users/${userId}/projects`),
					newProject,
				);
				setNewProject({ title: '', description: '', imageUrl: '' });
			} catch (e) {
				console.error('Error adding project:', e);
				setError('Failed to add project.');
			}
			setLoading(false);
		}
	};

	const services = [
		{
			title: 'Diseño Web',
			description:
				'Creación de sitios web modernos, responsivos y optimizados para una experiencia de usuario excepcional.',
			icon: '🌐',
		},
		{
			title: 'Desarrollo de Software',
			description:
				'Desarrollo de aplicaciones a la medida para resolver problemas complejos y automatizar procesos.',
			icon: '💻',
		},
		{
			title: 'Diseño Gráfico',
			description:
				'Creación de identidad de marca, logotipos, folletos y otros materiales gráficos de alta calidad.',
			icon: '🎨',
		},
		{
			title: 'Consultoría',
			description:
				'Análisis y consultoría para optimizar la presencia digital y la estrategia tecnológica de tu negocio.',
			icon: '📈',
		},
	];

	return (
		<div className="bg-white text-gray-800 font-sans leading-normal tracking-normal antialiased">
			{/* Navbar */}
			<nav className="bg-white shadow-lg sticky top-0 z-50">
				<div className="container mx-auto px-6 py-4 flex justify-between items-center">
					<a href="#" className="text-2xl font-bold text-gray-800">
						AAM Design Solutions
					</a>
					<div className="md:flex items-center space-x-6 hidden">
						<a
							href="#servicios"
							className="text-gray-600 hover:text-gray-900 transition-colors"
						>
							Servicios
						</a>
						<a
							href="#proyectos"
							className="text-gray-600 hover:text-gray-900 transition-colors"
						>
							Proyectos
						</a>
						<a
							href="#contacto"
							className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
						>
							Contacto
						</a>
					</div>
					<div className="md:hidden">
						{/* Mobile menu button */}
						<button className="text-gray-600 focus:outline-none">
							<svg
								className="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h16m-7 6h7"
								></path>
							</svg>
						</button>
					</div>
				</div>
			</nav>

			<main className="container mx-auto px-6 py-12">
				{/* Hero Section */}
				<section className="text-center py-12 md:py-24">
					<h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4">
						Transformando Ideas en{' '}
						<span className="text-gray-500">Realidad Digital</span>
					</h1>
					<p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
						En AAM Design Solutions, creamos experiencias digitales únicas y
						funcionales que impulsan el crecimiento de tu negocio.
					</p>
					<a
						href="#servicios"
						className="bg-gray-800 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-700 transition-colors shadow-lg"
					>
						Explora mis servicios
					</a>
				</section>

				{/* Services Section */}
				<section id="servicios" className="py-12 md:py-24">
					<h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
						Mis Servicios
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						{services.map((service, index) => (
							<div
								key={index}
								className="bg-gray-100 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1 duration-300"
							>
								<div className="text-4xl mb-4 text-center">{service.icon}</div>
								<h3 className="text-xl font-bold text-center mb-2">
									{service.title}
								</h3>
								<p className="text-gray-600 text-center">
									{service.description}
								</p>
							</div>
						))}
					</div>
				</section>

				{/* Projects Section */}
				<section id="proyectos" className="py-12 md:py-24">
					<div className="flex justify-between items-center mb-8">
						<h2 className="text-3xl md:text-4xl font-bold">
							Proyectos Recientes
						</h2>
						{userId && (
							<span className="text-sm text-gray-500">
								ID de Usuario: {userId}
							</span>
						)}
					</div>

					{loading ? (
						<p className="text-center text-gray-500">Cargando proyectos...</p>
					) : error ? (
						<p className="text-center text-red-500">{error}</p>
					) : projects.length === 0 ? (
						<div className="text-center p-8 bg-gray-100 rounded-lg">
							<p className="text-gray-600 mb-4">
								¡Aún no hay proyectos! Usa el formulario de abajo para agregar
								el primero.
							</p>
							<p className="text-sm text-gray-500">
								Los proyectos que agregues se guardarán en tu propia base de
								datos de Firestore.
							</p>
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							{projects.map((project) => (
								<div
									key={project.id}
									className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
								>
									<img
										src={
											project.imageUrl ||
											'https://placehold.co/600x400/E5E7EB/9CA3AF?text=Proyecto'
										}
										alt={project.title}
										className="w-full h-48 object-cover"
									/>
									<div className="p-6">
										<h3 className="text-2xl font-bold mb-2">{project.title}</h3>
										<p className="text-gray-600">{project.description}</p>
									</div>
								</div>
							))}
						</div>
					)}
				</section>

				{/* Project Add Form */}
				<section className="py-12">
					<h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
						Agrega un Nuevo Proyecto
					</h2>
					<form
						onSubmit={handleAddProject}
						className="max-w-xl mx-auto p-8 bg-gray-100 rounded-xl shadow-lg"
					>
						<div className="mb-4">
							<label
								htmlFor="title"
								className="block text-gray-700 font-bold mb-2"
							>
								Título del Proyecto
							</label>
							<input
								type="text"
								id="title"
								value={newProject.title}
								onChange={(e) =>
									setNewProject({ ...newProject, title: e.target.value })
								}
								className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
								required
							/>
						</div>
						<div className="mb-4">
							<label
								htmlFor="description"
								className="block text-gray-700 font-bold mb-2"
							>
								Descripción
							</label>
							<textarea
								id="description"
								value={newProject.description}
								onChange={(e) =>
									setNewProject({ ...newProject, description: e.target.value })
								}
								className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
								required
							/>
						</div>
						<div className="mb-4">
							<label
								htmlFor="imageUrl"
								className="block text-gray-700 font-bold mb-2"
							>
								URL de la Imagen
							</label>
							<input
								type="url"
								id="imageUrl"
								value={newProject.imageUrl}
								onChange={(e) =>
									setNewProject({ ...newProject, imageUrl: e.target.value })
								}
								className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
								placeholder="https://example.com/imagen.jpg"
							/>
						</div>
						<button
							type="submit"
							className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors disabled:opacity-50"
							disabled={loading}
						>
							{loading ? 'Agregando...' : 'Agregar Proyecto'}
						</button>
					</form>
				</section>

				{/* Contact Section */}
				<section id="contacto" className="py-12 md:py-24 text-center">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						¡Hablemos de tu próximo proyecto!
					</h2>
					<p className="text-lg md:text-xl text-gray-600 mb-8">
						Estoy disponible para colaborar en proyectos de diseño web y
						desarrollo.
					</p>
					<a
						href="mailto:tu-email@example.com"
						className="bg-gray-800 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-700 transition-colors shadow-lg"
					>
						Contáctame
					</a>
				</section>
			</main>

			{/* Footer */}
			<footer className="bg-gray-800 text-white py-8">
				<div className="container mx-auto text-center">
					<p>
						&copy; {new Date().getFullYear()} AAM Design Solutions. Todos los
						derechos reservados.
					</p>
				</div>
			</footer>
		</div>
	);
};

export default App;
