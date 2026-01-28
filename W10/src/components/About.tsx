import { useEffect, useState } from 'react';
import '../styles/About.css';

function About() {
	const dataURL = 'https://jsonplaceholder.typicode.com/posts';
	const [APIdata, setAPIdata] = useState([]);

	type Post = {
		id: number;
		title: string;
		body: string;
		userId: number;
	};
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(dataURL);
				const data = await response.json();
				setAPIdata(data);
			} catch (e) {
				console.log('Error fetching API data: ' + e);
			}
		};
		fetchData();
	}, []); // tähän arrayhyn täytettä jos dataURL olis esim dynaaminen ja vois vaihtua!
	// https://react.dev/reference/react/useEffect#usage

	return (
		<div className="aboutpage-bg">
			<div className="grid-container">
				{APIdata.map((post: Post) => (
					<div className="grid-item" key={post.id}>
						<h3>{post.title}</h3>
						<p>{post.body}</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default About;
