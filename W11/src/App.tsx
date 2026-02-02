import { Routes, Route } from 'react-router-dom';
import FrontPage from './components/FrontPage';
import SavedPage from './components/SavedPage';
import useJokes from './hooks/useJokes';

function App() {
	const { savedJokes, saveJoke, deleteJoke } = useJokes();

	return (
		<>
			<Routes>
				<Route path="/" element={<FrontPage saveJoke={saveJoke} />} />
				<Route path="/saved" element={<SavedPage savedJokes={savedJokes} deleteJoke={deleteJoke} />} />
			</Routes>
		</>
	);
}

export default App;
