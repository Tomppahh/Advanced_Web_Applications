import '../styles/index.css';
import { useTranslation } from 'react-i18next';
function MyContainer() {
	const { t } = useTranslation();
	return (
		<div className="container">
			<header>{t('content')}</header>
		</div>
	);
}

export default MyContainer;
