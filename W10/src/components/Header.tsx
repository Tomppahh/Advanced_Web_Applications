import '../styles/header.css';

function Header() {
	return (
		<div className="header-bg">
			<header className="header">
				<h1>Week 10</h1>
				<nav>
					<ul>
						<li>
							<a href="/">Home</a>
						</li>
						<li>
							<a href="/about">About</a>
						</li>
						<li>
							<button>FI</button>
						</li>
						<li>
							<button>EN</button>
						</li>
					</ul>
				</nav>
			</header>
		</div>
	);
}

export default Header;
