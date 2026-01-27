import '../styles/index.css';
function MyContainer() {
	const text = 'this is coming from MyContainer';
	return (
		<div className="home-container">
			<header>{text}</header>
		</div>
	);
}

export default MyContainer;
