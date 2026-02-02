import '../styles/App.css';
import Header from '../components/Header';

function App() {
	return (
		<>
			<Header />
			<div style={{ color: '#fff', padding: '2rem', textAlign: 'center' }}>
				<h1>Site is working!</h1>
				<p>If you see this message, your React app is rendering correctly.</p>
			</div>
		</>
	);
}

export default App;
