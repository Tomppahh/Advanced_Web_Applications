import '../styles/aboutpage.css';
const data = {
	title: 'About Us',
	content: 'this is aboutpage content',
};
function About() {
	return (
		<div className="aboutpage-bg">
			<h1>{data.title}</h1>
			<p>{data.content}</p>
		</div>
	);
}

export default About;
