import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { IJoke } from '../hooks/useJokes';

interface SavedPageProps {
	savedJokes: IJoke[];
	deleteJoke: (id: number) => void;
}

export default function SavedPage({ savedJokes, deleteJoke }: SavedPageProps) {
	if (savedJokes.length === 0) {
		return (
			<Box sx={{ padding: 4, textAlign: 'center' }}>
				<Typography variant="h6">No saved jokes yet.</Typography>
			</Box>
		);
	}

	return (
		<Box sx={{ padding: 4 }}>
			<Typography variant="h5" gutterBottom sx={{ textAlign: 'center', marginBottom: 3 }}>
				Saved Jokes
			</Typography>
			<Grid container spacing={2} justifyContent="center">
				{savedJokes.map((joke) => (
					<Grid key={joke.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
						<Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
							<CardContent sx={{ flexGrow: 1 }}>
								<Typography variant="h6" gutterBottom>
									{joke.setup}
								</Typography>
								<Typography variant="body1" color="text.secondary">
									{joke.punchline}
								</Typography>
							</CardContent>
							<CardActions sx={{ justifyContent: 'center' }}>
								<Button variant="outlined" color="error" onClick={() => deleteJoke(joke.id)}>
									Delete
								</Button>
							</CardActions>
						</Card>
					</Grid>
				))}
			</Grid>
		</Box>
	);
}
