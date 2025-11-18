// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Servicios from './pages/Servicios';
import Contacto from './pages/Contacto';
import AcercaDe from './pages/AcercaDe';

const App = () => {
	return (
		<Router>
			<Header />
			<main className="pt-16 min-h-screen">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/servicios" element={<Servicios />} />
					<Route path="/acerca-de" element={<AcercaDe />} />
					<Route path="/contacto" element={<Contacto />} />

					{/* Ruta para el nivel de detalle:
          :categoria puede ser 'web', 'tramites', etc.
          :servicio puede ser 'landing', 'pyme', 'sat-citas', etc.
        */}
					<Route
						path="/servicios/:categoria/:servicio"
						element={<ServicioDetalle />}
					/>
				</Routes>
			</main>
			<Footer />
		</Router>
	);
};

export default App;
