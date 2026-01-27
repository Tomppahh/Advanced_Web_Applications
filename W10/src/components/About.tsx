import '../styles/aboutpage.css';
import data from '../data/aboutpagecontent.json';
function About() {
	return (
		<div className="aboutpage-bg">
			<h1>{data.title}</h1>
			<p>{data.content}</p>
		</div>
	);
}

export default About;
