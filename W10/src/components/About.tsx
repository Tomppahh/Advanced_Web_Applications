import { useEffect, useState } from 'react';
import '../styles/aboutpage.css';

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
			<h1>About Us</h1>
			<p>liirum laarum</p>
			<ul>
				{APIdata.slice(0, 5).map((post: Post) => (
					<div key={post.id}>
						<h3>{post.title}</h3>
						<p>{post.body}</p>
					</div>
				))}
			</ul>
		</div>
	);
}

export default About;
