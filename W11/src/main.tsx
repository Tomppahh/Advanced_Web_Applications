import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './styles/index.css';
import App from './routes/App.tsx';
import Saved from './routes/Saved.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/saved" element={<Saved />} />
			</Routes>
		</BrowserRouter>
	</StrictMode>,
);
