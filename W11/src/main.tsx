import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/index.css';
import App from './App';
import Header from './components/Header';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<Header />
			<App />
		</BrowserRouter>
	</StrictMode>,
);
