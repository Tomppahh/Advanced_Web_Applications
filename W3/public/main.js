function initialize() {
	// sivuvalikko extraa ernon videolta
	const options = {
		edge: "right",
		draggable: false,
		inDuration: 250,
		outDuration: 200,
		onOpenStart: null,
		onOpenEnd: null,
		onCloseStart: null,
		onCloseEnd: null,
		preventScrolling: true,
	};



	// alustetaan käyttäjän lisäys ja näyttöfunktiot
	addNewUser();
	showUsers();
}

function addNewUser() {
	const userForm = document.getElementById("userForm");
    const userinfoPrintfield = document.getElementById("userList")
	userForm.addEventListener("submit", async (event) => {
		event.preventDefault();

		const userName = document.getElementById("name").value;
		const email = document.getElementById("email").value;

		// Tarkasta syöte
		if (!userName || !email) {
			userinfoPrintfield.innerHTML =
				"Please provide both a name and an email.";
			return; 
		}

		const userData = { name: userName, email: email };
		try {
			const response = await fetch("/users", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(userData),
			});

			if (response.ok) {
				const result = await response.json();
				userinfoPrintfield.innerHTML = result.message;
				// tyhjennä formi sendin jälkeen
				userForm.reset();
			} else {
				userinfoPrintfield.innerHTML = "Error: Unable to add user.";
			}
		} catch (error) {
			console.error("Error:", error);
			userinfoPrintfield.innerHTML =
				"Error: Could not connect to server.";
		}
	});
}

function showUsers() {
	const showUsersButton = document.getElementById("getUsers");
    const userinfoPrintfield = document.getElementById("userList");
	showUsersButton.addEventListener("click", async () => {
		try {
			// käyttäjät palvelimelta
			const response = await fetch("/users");
    
			if (response.ok) {
				const users = (await response.json()).users;
				// tyhjennä kenttä 
				userinfoPrintfield.innerHTML = "";

				// Lisää uusi käyttäjä databaseen
				users.forEach((user) => {
					const aUser = document.createElement("li");
					aUser.textContent = `${user.name} - ${user.email}`;
					userinfoPrintfield.appendChild(aUser);
				});
			} else {
				console.error("Error: Unable to fetch users.");
				userinfoPrintfield.innerHTML = "Error: Unable to fetch users.";
			}
		} catch (error) {
			console.error("Error:", error);
			userinfoPrintfield.innerHTML = "Error: Could not connect to server.";
		}
	});
}

initialize();
