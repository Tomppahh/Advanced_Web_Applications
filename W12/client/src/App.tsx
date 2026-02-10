import { useState } from 'react';
import './App.css';

function App() {
	const [name, setName] = useState<string>('');
	const [author, setAuthor] = useState<string>('');
	const [pages, setNumber] = useState<number>(0);

	const handleSubmission = async (name: string, author: string, pages: number) => {
		try {
			const response = await fetch('/api/book', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: name,
					author: author,
					pages: pages,
				}),
			});
			console.log(response + ' RESPONSE DEBUG:');
			if (!response.ok) {
				throw new Error('Error fetching data');
			}
			const data = await response.json();
			console.log(data);
			if (data.token) {
				localStorage.setItem('token', data.token);
				window.location.href = '/';
			}
		} catch (error) {
			if (error instanceof Error) {
				console.log(`Error when trying to add book: ${error.message}`);
			}
		}
	};

	return (
		<>
			<h1>books</h1>
			<div className="inputDiv">
				<input type="text" id="name" onChange={(e) => setName(e.target.value)}></input>
				<input type="text" id="author" onChange={(e) => setAuthor(e.target.value)}></input>
				<input type="number" id="pages" onChange={(e) => setNumber(e.target.valueAsNumber)}></input>
				<button onClick={() => handleSubmission(name, author, pages)} type="submit" id="submit">
					SUBMIT
				</button>
			</div>
		</>
	);
}

export default App;
