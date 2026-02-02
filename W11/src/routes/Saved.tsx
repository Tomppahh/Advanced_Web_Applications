import SavedPage from '../components/SavedPage';
import { IJoke } from '../hooks/useJokes';

interface SavedProps {
	savedJokes: IJoke[];
	deleteJoke: (id: number) => void;
}

function Saved({ savedJokes, deleteJoke }: SavedProps) {
	return (
		<>
			<SavedPage savedJokes={savedJokes} deleteJoke={deleteJoke} />
		</>
	);
}

export default Saved;
