import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export default function Header() {
	return (
		<AppBar position="static">
			<Toolbar sx={{ display: 'flex', gap: 2 }}>
				<Typography variant="h5" sx={{ marginRight: 'auto' }}>
					Pelipaja.net
				</Typography>

				<Button variant="contained" component={Link} to="/">
					Home
				</Button>

				<Button variant="contained" component={Link} to="/saved">
					Saved
				</Button>
			</Toolbar>
		</AppBar>
	);
}
