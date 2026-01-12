document.addEventListener("DOMContentLoaded", () => {
    addSearchUser();
    addTodo();
});

function addSearchUser() {
    const searchButton = document.getElementById("search");
    const userInput = document.getElementById("searchInput");
    const queriedUserToPage = document.getElementById("queriedUser-field");

    searchButton.addEventListener("click", async (event) => {
        event.preventDefault();

        const userName = userInput.value.trim();

        if (!userName) {
            queriedUserToPage.innerHTML = "Please provide a user name to search.";
            return;
        }

        try {
            const response = await fetch(`/todos/${userName}`, {
                method: "GET",
            });

            if (response.ok) {
                const todos = await response.json();
                queriedUserToPage.innerHTML = "";

                if (todos.length > 0) {
                    const todoList = document.createElement("ul");
                    todoList.id = "todoList";
                    
                    todos.forEach((todoItem) => {
                        const li = document.createElement("li");
                        
                        const label = document.createElement("label");
                        
                        const checkbox = document.createElement("input");
                        checkbox.type = "checkbox";
                        checkbox.id = "myCheckbox";
                        checkbox.className = "checkBoxes";
                        checkbox.checked = todoItem.checked;
                        checkbox.onchange = () => CheckUpdatedTodo(userName, todoItem.todo, checkbox.checked);
                        
                        const span = document.createElement("span");
                        
                        const a = document.createElement("a");
                        a.textContent = todoItem.todo;
                        a.href = "#";
                        a.classList.add("delete-task");
                        a.onclick = async (e) => {
                            e.preventDefault();
                            await deleteTodo(userName, todoItem.todo);
                            li.remove();
                        };
                        
                        span.appendChild(a);
                        label.appendChild(checkbox);
                        label.appendChild(span);
                        li.appendChild(label);
                        todoList.appendChild(li);
                    });
                    
                    queriedUserToPage.appendChild(todoList);

                    const deleteUserButton = document.createElement("button");
                    deleteUserButton.id = "deleteUser";
                    deleteUserButton.className = "btn";
                    deleteUserButton.textContent = "Delete User";
                    deleteUserButton.addEventListener("click", () => deleteUser(userName));
                    queriedUserToPage.appendChild(deleteUserButton);
                } else {
                    queriedUserToPage.innerHTML = "This user has no todos.";
                }
            } else {
                const errorData = await response.json();
                queriedUserToPage.innerHTML = errorData.message;
            }
        } catch (error) {
            console.error("Error:", error);
            queriedUserToPage.innerHTML = "Error: Could not connect to server.";
        }
    });
}

function addTodo() {
    const addButton = document.getElementById("submit-data");
    const todoInput = document.getElementById("todoInput");
    const userInput = document.getElementById("userInput");
    const queriedUserToPage = document.getElementById("queriedUser-field");

    addButton.addEventListener("click", async (event) => {
        event.preventDefault();

        const todo = todoInput.value.trim();
        const userName = userInput.value.trim();

        if (!todo || !userName) {
            queriedUserToPage.innerHTML = "Please provide both user name and todo.";
            return;
        }

        try {
            const response = await fetch("/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: userName,
                    todo: todo,
                }),
            });

            const result = await response.json();
            queriedUserToPage.innerHTML = result.message;
        } catch (error) {
            console.error("Error:", error);
            queriedUserToPage.innerHTML = "Error adding todo.";
        }
    });
}

async function deleteUser(userName) {
    const queriedUserToPage = document.getElementById("queriedUser-field");

    try {
        const response = await fetch("/delete", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: userName }),
        });

        const result = await response.json();
        queriedUserToPage.innerHTML = result.message;
    } catch (error) {
        console.error("Error:", error);
        queriedUserToPage.innerHTML = "Error deleting user.";
    }
}

async function deleteTodo(userName, todo) {
    try {
        const response = await fetch("/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: userName, todo: todo }),
        });

        const result = await response.json();
        console.log(result.message);
    } catch (error) {
        console.error("Error:", error);
    }
}

async function CheckUpdatedTodo(userName, todo, checked) {
    try {
        const response = await fetch("/updateTodo", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: userName, todo: todo, checked: checked }),
        });

        const result = await response.json();
        console.log(result.message);
    } catch (error) {
        console.error("Error:", error);
    }
}
