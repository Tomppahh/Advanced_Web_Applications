import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NotFound from './NotFound';

function BookDetail() {
	const { bookName } = useParams();
	type Book = {
		name: string;
		author: string;
		pages: number;
	};

	const [book, setBook] = useState<Book | null>(null);

	useEffect(() => {
		const fetchBook = async () => {
			try {
				const response = await fetch(`/api/book/${bookName}`);
				if (!response.ok) {
					throw new Error('Book not found');
				}
				const data = await response.json();
				setBook(data);
			} catch (error) {
				console.error('Error: ', error);
			}
		};
		fetchBook();
	}, [bookName]);

	// if (!book) return <NotFound />;

	return (
		<div>
			<h2>{book.name}</h2>
			<p>Author: {book.author}</p>
			<p>Pages: {book.pages}</p>
		</div>
	);
}

export default BookDetail;
