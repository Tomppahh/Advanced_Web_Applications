import '../styles/index.css';
import { useTranslation } from 'react-i18next';
function MyContainer() {
	const { t } = useTranslation();
	return (
		<div className="home-container">
			<header>{t('Frontpagecontent')}</header>
		</div>
	);
}

export default MyContainer;
