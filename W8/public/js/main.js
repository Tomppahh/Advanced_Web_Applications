const token = localStorage.getItem('token');

document.addEventListener('DOMContentLoaded', () => {
	if (token) {
		createTopicForm();
	}
	document.getElementById('loginForm')?.addEventListener('submit', handleLogin);
	loadTopics();
});

async function handleLogin(event) {
	event.preventDefault();

	const formData = {
		email: event.target.email.value,
		password: event.target.password.value,
	};

	const response = await fetch('/api/user/login', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(formData),
	});

	if (response.ok) {
		const data = await response.json();
		localStorage.setItem('token', data.token);
		location.reload();
	} else {
		alert('Invalid credentials');
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
	textarea.placeholder = 'Write something here';

	const button = document.createElement('button');
	button.id = 'postTopic';
	button.textContent = 'POST TOPIC';
	button.addEventListener('click', postTopic);

	const logoutBtn = document.createElement('button');
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
	}
}

async function loadTopics() {
	const response = await fetch('/api/topics');
	const topics = await response.json();

	const topicsDiv = document.getElementById('topics');
	topicsDiv.innerHTML = '';

	topics.forEach((topic) => {
		const div = document.createElement('div');

		const title = document.createElement('span');
		title.textContent = topic.title;

		const content = document.createElement('p');
		content.textContent = topic.content;

		const meta = document.createElement('p');
		meta.textContent = `Posted by ${topic.username} at ${new Date(topic.createdAt).toLocaleString()}`;

		const deleteBtn = document.createElement('button');
		deleteBtn.id = 'deleteTopic';
		deleteBtn.textContent = 'DELETE';
		deleteBtn.addEventListener('click', () => deleteTopic(topic._id));

		div.appendChild(title);
		div.appendChild(content);
		div.appendChild(meta);
		div.appendChild(deleteBtn);
		topicsDiv.appendChild(div);
	});
}

async function deleteTopic(id) {
	const response = await fetch(`/api/topic/${id}`, {
		method: 'DELETE',
		headers: { Authorization: `Bearer ${token}` },
	});

	if (response.ok) {
		loadTopics();
	} else {
		const data = await response.json();
		alert(data.message);
	}
}
