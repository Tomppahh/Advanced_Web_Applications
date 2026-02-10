import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./App.css"

function App() {
	const [name, setName] = useState<string>('');
	const [author, setAuthor] = useState<string>('');
	const [pages, setNumber] = useState<number>(0);
	type Book = {
		_id: string;
		name: string;
		author: string;
		pages: number;
	};
	const [books, setBooks] = useState<Book[]>([]);
	const navigate = useNavigate();

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
			if (!response.ok) {
				throw new Error('Error fetching data');
			}
			const data = await response.json();
			navigate(`/book/${encodeURIComponent(data.name)}`);
		} catch (error) {
			if (error instanceof Error) {
				console.log(`Error when trying to add book: ${error.message}`);
			}
		}
	};

	const fetchBooks = async () => {
		try {
			const response = await fetch(`/api/getbooks`);
			const data = await response.json();
			setBooks(data);
		} catch (error) {
			console.error('Error: ', error);
		}
	};

	useEffect(() => {
		fetchBooks();
	}, []);

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
			<div className="showBooksDiv">
				<ul>
					{books.map((book) => (
						<li key={book._id}>
							<strong>{book.name}</strong> by {book.author} ({book.pages} pages)
						</li>
					))}
				</ul>
			</div>
		</>
	);
}

export default App;
