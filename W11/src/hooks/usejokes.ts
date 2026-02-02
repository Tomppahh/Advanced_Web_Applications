import { useState } from 'react';

export type IJoke = {
	type: string;
	setup: string;
	punchline: string;
	id: number;
};

export function useJokes() {
	const [savedJokes, setSavedJokes] = useState<IJoke[]>([]);

	const saveJoke = (joke: IJoke): boolean => {
		if (savedJokes.some((j) => j.id === joke.id)) {
			return false;
		}
		setSavedJokes((prev) => [...prev, joke]);
		return true;
	};

	const deleteJoke = (id: number): void => {
		setSavedJokes((prev) => prev.filter((joke) => joke.id !== id));
	};

	return { savedJokes, saveJoke, deleteJoke };
}

export default useJokes;
