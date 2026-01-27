import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import Header from './components/Header';
import MyContainer from './components/MyContainer';
import About from './components/About';

function App() {
	return (
		<Router>
			<Header />
			<Routes>
				<Route path="/" element={<MyContainer />} />
				<Route path="/about" element={<About />} />
			</Routes>
		</Router>
	);
}

export default App;
