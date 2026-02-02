import { Routes, Route } from 'react-router-dom';
import '../styles/App.css';
import Header from '../components/Header';
import Home from '../components/FrontPage';
import Saved from '../components/SavedPage';
import { useJokes } from '../hooks/useJokes';

function App() {
	const { savedJokes, saveJoke, deleteJoke } = useJokes();

	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<Home saveJoke={saveJoke} />} />
				<Route path="/saved" element={<Saved savedJokes={savedJokes} deleteJoke={deleteJoke} />} />
			</Routes>
		</>
	);
}

export default App;
