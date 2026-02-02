import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface Joke {
	type: string;
	setup: string;
	punchline: string;
	id: number;
}

export default function FrontPage() {
	const [joke, setJoke] = useState<Joke | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [fetchTrigger, setFetchTrigger] = useState<number>(0);

	useEffect(() => {
		if (fetchTrigger === 0) return;

		const controller = new AbortController();

		const fetchJoke = async () => {
			setLoading(true);
			try {
				const response = await fetch('https://official-joke-api.appspot.com/random_joke', { signal: controller.signal });
				const data: Joke = await response.json();
				setJoke(data);
			} catch (e) {
				console.log('Error fetching joke: ' + e);
			} finally {
				setLoading(false);
			}
		};

		fetchJoke();

		return () => {
			controller.abort();
		};
	}, [fetchTrigger]);

	const handleFetchJoke = () => {
		setFetchTrigger((prev) => prev + 1);
	};

	return (
		<div style={{ padding: '2rem', textAlign: 'center' }}>
			<Button variant="contained" onClick={handleFetchJoke}>
				Get Random Joke
			</Button>

			{loading && (
				<Typography variant="h6" sx={{ marginTop: 2 }}>
					Loading a joke...
				</Typography>
			)}

			{!loading && joke && (
				<Card key={joke.id} sx={{ maxWidth: 400, margin: '2rem auto' }}>
					<CardContent>
						<Typography variant="h6" gutterBottom>
							{joke.setup}
						</Typography>
						<Typography variant="body1" color="text.secondary">
							{joke.punchline}
						</Typography>
					</CardContent>
				</Card>
			)}
		</div>
	);
}
