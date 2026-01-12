document.addEventListener("DOMContentLoaded", () => {
	main();
});

function main() {
	try {
		newOffer();
        loadOffers();
	} catch (error) {
		console.error("An error occurred in main():", error);
	}
}

function newOffer() {
	const offerForm = document.getElementById("offerForm");
	const titleInput = document.getElementById("title");
	const descriptionInput = document.getElementById("description");
	const priceInput = document.getElementById("price");
	const imageInput = document.getElementById("image");
	const tellUserField = document.getElementById("wronginputPrompt");

	offerForm.addEventListener("submit", async (event) => {
		event.preventDefault();

		const titleInputValue = titleInput.value.trim();
		const descriptionInputValue = descriptionInput.value.trim();
		const priceInputValue = priceInput.value;

		if (!titleInputValue || !descriptionInputValue || !priceInputValue) {
			tellUserField.innerHTML =
				"<li>Please provide title, description and price for item.</li>";
			return;
		}

		tellUserField.innerHTML = "";

		try {

            const formData = new FormData();
            formData.append("title", titleInputValue);
            formData.append("description", descriptionInputValue);
            formData.append("price", priceInputValue);

            const imageFile = imageInput.files[0];
            if (imageFile) {
                formData.append("image", imageFile);
            }

			const response = await fetch("/upload", {
				method: "POST",
				body: formData,
			});

			const result = await response.json();
			tellUserField.innerHTML = result.message;
			offerForm.reset();
            loadOffers();
		} catch (error) {
			console.error("Error:", error);
			tellUserField.innerHTML = "Error adding item.";
		}
	});
}

async function loadOffers() {
	try {
		const response = await fetch("/offers");
		const offers = await response.json();

		const offersContainer = document.getElementById("offersContainer");
		offersContainer.innerHTML = "";

		for (let i = 0; i < offers.length; i++) {
			const offer = offers[i];

			const offerDiv = document.createElement("div");
			offerDiv.className = "offerDiv";

			if (offer.imagePath) {
				const img = document.createElement("img");
				img.src = `/${offer.imagePath}`;
				img.alt = offer.title;
				offerDiv.appendChild(img);
			}

			const titleP = document.createElement("p");
			titleP.textContent = offer.title;
			offerDiv.appendChild(titleP);

			const descP = document.createElement("p");
			descP.textContent = offer.description;
			offerDiv.appendChild(descP);

			const priceP = document.createElement("p");
			priceP.textContent = `€${offer.price}`;
			offerDiv.appendChild(priceP);

			offersContainer.appendChild(offerDiv);
		}
	} catch (error) {
		console.error("Error loading offers:", error);
	}
}