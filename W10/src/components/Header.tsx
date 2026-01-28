import '../styles/header.css';
import { useTranslation } from 'react-i18next';

function Header() {
	const { t, i18n } = useTranslation();

	return (
		<div className="header-bg">
			<header className="header">
				<h1>Week 10</h1>
				<nav>
					<ul>
						<li>
							<a href="/">{t('header1')}</a>
						</li>
						<li>
							<a href="/about">{t('header2')}</a>
						</li>
						<li>
							<button id="fi" onClick={() => i18n.changeLanguage('fi')}>
								FI
							</button>
						</li>
						<li>
							<button id="en" onClick={() => i18n.changeLanguage('en')}>
								EN
							</button>
						</li>
					</ul>
				</nav>
			</header>
		</div>
	);
}

export default Header;
