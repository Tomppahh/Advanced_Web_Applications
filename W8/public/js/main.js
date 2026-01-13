const token = localStorage.getItem('token');

if (token) {
	createTopicForm();
}

document.addEventListener('DOMContentLoaded', () => {
	const loginForm = document.getElementById('loginForm');
	if (loginForm) {
		loginForm.addEventListener('submit', handleLogin);
	}
	loadTopics();
});

async function handleLogin(event) {
	event.preventDefault();

	const formData = {
		email: event.target.email.value,
		password: event.target.password.value,
	};

	try {
		const response = await fetch('/api/user/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		});

		if (response.ok) {
			const data = await response.json();
			localStorage.setItem('token', data.token);
			location.reload();
		} else {
			alert('Invalid credentials');
		}
	} catch (error) {
		console.log(`Error during login: ${error.message}`);
	}
}

function createTopicForm() {
	const topicFormDiv = document.getElementById('topicForm');

	const input = document.createElement('input');
	input.type = 'text';
	input.id = 'topicTitle';
	input.placeholder = 'Title';

	const textarea = document.createElement('textarea');
	textarea.id = 'topicText';
	textarea.classList.add('materialize-textarea');
	textarea.placeholder = 'Write something here';

	const button = document.createElement('button');
	button.id = 'postTopic';
	button.classList.add('btn', 'waves-effect', 'waves-light');
	button.textContent = 'POST TOPIC';
	button.addEventListener('click', postTopic);

	const logoutBtn = document.createElement('button');
	logoutBtn.classList.add('btn', 'waves-effect', 'waves-light');
	logoutBtn.textContent = 'LOGOUT';
	logoutBtn.addEventListener('click', () => {
		localStorage.removeItem('token');
		location.reload();
	});

	topicFormDiv.appendChild(input);
	topicFormDiv.appendChild(textarea);
	topicFormDiv.appendChild(button);
	topicFormDiv.appendChild(logoutBtn);
}

async function postTopic() {
	const title = document.getElementById('topicTitle').value;
	const content = document.getElementById('topicText').value;

	try {
		const response = await fetch('/api/topic', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ title, content }),
		});

		if (response.ok) {
			document.getElementById('topicTitle').value = '';
			document.getElementById('topicText').value = '';
			loadTopics();
		} else {
			alert('Failed to create topic');
		}
	} catch (error) {
		console.log(`Error posting topic: ${error.message}`);
	}
}

async function loadTopics() {
	try {
		const response = await fetch('/api/topics');
		const topics = await response.json();

		const topicsDiv = document.getElementById('topics');
		topicsDiv.innerHTML = '';

		topics.forEach((topic) => {
			const card = document.createElement('div');
			card.classList.add('card', 'z-depth-2', 'hoverable', 'grey', 'lighten-2');

			const cardContent = document.createElement('div');
			cardContent.classList.add('card-content');

			const title = document.createElement('span');
			title.classList.add('card-title');
			title.textContent = topic.title;

			const content = document.createElement('p');
			content.textContent = topic.content;

			const meta = document.createElement('p');
			meta.classList.add('grey-text', 'text-darken-2');
			const date = new Date(topic.createdAt).toLocaleString();
			meta.textContent = `Posted by ${topic.username} at ${date}`;

			cardContent.appendChild(title);
			cardContent.appendChild(content);
			cardContent.appendChild(meta);

			const cardAction = document.createElement('div');
			cardAction.classList.add('card-action');

			const deleteBtn = document.createElement('button');
			deleteBtn.id = 'deleteTopic';
			deleteBtn.classList.add('btn', 'waves-effect', 'waves-light');
			deleteBtn.textContent = 'DELETE';
			deleteBtn.addEventListener('click', () => deleteTopic(topic._id));

			cardAction.appendChild(deleteBtn);

			card.appendChild(cardContent);
			card.appendChild(cardAction);
			topicsDiv.appendChild(card);
		});
	} catch (error) {
		console.log(`Error loading topics: ${error.message}`);
	}
}

async function deleteTopic(id) {
	try {
		const response = await fetch(`/api/topic/${id}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (response.ok) {
			loadTopics();
		} else {
			const data = await response.json();
			alert(data.message);
		}
	} catch (error) {
		console.log(`Error deleting topic: ${error.message}`);
	}
}
