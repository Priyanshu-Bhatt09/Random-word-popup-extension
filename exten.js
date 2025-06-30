// Function to fetch a RANDOM word using Datamuse API
function getRandomWord() {
  fetch(`https://random-word-api.herokuapp.com/word?length=4`)
    .then(response => response.json())
    .then(data => {
      if (data.length === 0) {
        throw new Error("No words found");
      }
      const word = data[0]; // Get the random word
      fetchWordDetails(word); // Fetch details for this word
    })
    .catch(error => {
      console.error("Error fetching random word:", error);
      document.getElementById("word").textContent = "Error loading word.";
    });
}

// Function to fetch word details
function fetchWordDetails(word) {
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(response => {
      if (!response.ok) throw new Error("Word not found");
      return response.json();
    })
    .then(data => {
      const entry = data[0];
      const meanings = entry.meanings || [];

      // Extract simple definitions
      const allDefinitions = meanings.flatMap(m => m.definitions?.map(d => d.definition) || []);
      const simpleDefinition = allDefinitions.find(def => def.length < 80) || "No simple definition available";


      // Update the webpage
      document.getElementById("word").textContent = `Word: ${word}`;
      document.getElementById("meaning-en").textContent = `Meaning: ${simpleDefinition}`;
    })
    .catch(error => {
      console.error("Error:", error);
      document.getElementById("word").textContent = "Word details not found.";
    });
}

// Run on page load
document.addEventListener('DOMContentLoaded', getRandomWord);
