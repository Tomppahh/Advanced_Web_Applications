import { useState } from 'react';
import MyList from './MyList';

function MyContainer() {
	const headerText = 'Task List Header';
	const [items, setItems] = useState([
		{ id: '1', text: 'This is first task', clicked: false },
		{ id: '2', text: 'This is second task', clicked: false },
	]);
	const [inputText, setInputText] = useState('');

	const addItem = () => {
		if (inputText.trim() === '') return;

		const newItem = {
			id: String(Date.now()),
			text: inputText,
			clicked: false,
		};
		setItems([...items, newItem]);
		setInputText('');
	};

	const toggleItem = (id: string) => {
		setItems(items.map((item) => (item.id === id ? { ...item, clicked: !item.clicked } : item)));
	};

	return (
		<div>
			<MyList header={headerText} items={items} onItemClick={toggleItem} />
			<textarea value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Enter new task:" />
			<button onClick={addItem}>Add Task</button>
		</div>
	);
}

export default MyContainer;
