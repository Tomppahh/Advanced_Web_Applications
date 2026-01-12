
const wikipediaAPIURL = "https://en.wikipedia.org/api/rest_v1/";

async function fetchBreeds() {
    let howmanylistings = 10; // tätä muuttamalla saadaan enemmän koiria sivustolle
    const dogAPIURL = "https://dog.ceo/api/breeds/list/all";
    try {
        console.log(`Fetching from: ${dogAPIURL}`); 
        const dogresponse = await fetch(dogAPIURL);
        console.log(dogresponse)
        if (!dogresponse.ok){ // jos response ei saa dataa, anna error koodi
            throw new Error(`Error with DOG API URL link/HTTP: ${response.status}`)
        }
        const dogData = await dogresponse.json();
       // console.log(Object.keys(dogData.message)); // data consoleen
        const breedArray = Object.keys(dogData.message); // luodaan array roduista
        for (let i = 0; i < howmanylistings; i++){
           rndmInt = Math.floor(Math.random() * breedArray.length)
           console.log(breedArray[rndmInt]);
			breedImage =
				"https://dog.ceo/api/breed/"+breedArray[rndmInt]+"/images/random";
        }
    
        return breedArray, breedImage; // palautetaan rotuarray ulos
        
    } catch (error) {
        console.error("Error fetching data:", error);
        return null; // palauttaa nullin jos try ei mene läpi jos yhteys katkeaa
    }
}

// valitaan img-container div classi ja luodaan muuttuja jonne asetataan juttuja
const imgcontainer = document.querySelector(".img-container")
imgcontainer.appendChild(breedImage)



fetchBreeds()