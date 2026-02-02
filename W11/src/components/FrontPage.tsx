import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { IJoke } from '../hooks/useJokes';

interface FrontPageProps {
	saveJoke?: (joke: IJoke) => boolean;
}

export default function FrontPage({ saveJoke }: FrontPageProps) {
	const [joke, setJoke] = useState<IJoke | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [fetchTrigger, setFetchTrigger] = useState<number>(0);

	useEffect(() => {
		if (fetchTrigger === 0) return;

		const controller = new AbortController();

		const fetchJoke = async () => {
			setLoading(true);
			try {
				const response = await fetch('https://official-joke-api.appspot.com/random_joke', {
					signal: controller.signal,
				});
				const data: IJoke = await response.json();
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
				Get Joke
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
					{saveJoke && (
						<CardActions sx={{ justifyContent: 'center' }}>
							<Button variant="outlined" onClick={() => saveJoke(joke)}>
								Save joke
							</Button>
						</CardActions>
					)}
				</Card>
			)}
		</div>
	);
}
