const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const currentImageContainer = document.getElementById("current-image-container");
const searchHistory = document.getElementById("search-history");

// Get the current date in yyyy-mm-dd format
const currentDate = new Date().toISOString().split("T")[0];

// Get the saved searches from local storage
let searches = JSON.parse(localStorage.getItem("searches")) || [];
const API_KEY= "LCc8yC3V8qH2zpKDNlqx2G9jEKIw2kwPOhuNCX2a";

// Function to fetch the data for the current date and display it in the UI
function getCurrentImageOfTheDay() {
    const apiUrl = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${API_KEY}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      currentImageContainer.innerHTML = `
        <img src="${data.url}" alt="${data.title}">
        <h2>${data.title}</h2>
        <p>${data.explanation}</p>
      `;
    })
    .catch((error) => console.log(error));
}

// Function to fetch the data for the selected date and display it in the UI
function getImageOfTheDay(date) {
    const apiUrl = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${API_KEY}`;
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      currentImageContainer.innerHTML = `
        <img src="${data.url}" alt="${data.title}">
        <h2>${data.title}</h2>
        <p>${data.explanation}</p>
      `;

      // Save the search to local storage and add it to the search history
      saveSearch(date);
      addSearchToHistory();
    })
    .catch((error) => console.log(error));
}

// Function to save a search to local storage
function saveSearch(date) {
  searches.push(date);
  localStorage.setItem("searches", JSON.stringify(searches));
}

// Function to add a search to the search history
function addSearchToHistory() {
  searchHistory.innerHTML = "";

  searches.forEach((search) => {
    const listItem = document.createElement("li");
    listItem.textContent = search;

    listItem.addEventListener("click", () => {
      getImageOfTheDay(search);
    });

    searchHistory.appendChild(listItem);
  });
}

// Add event listener to the search form
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const searchDate = searchInput.value;
  getImageOfTheDay(searchDate);

  searchInput.value = "";
});

// Display the current image of the day when the page loads
getCurrentImageOfTheDay();

// Display the search history when the page loads
addSearchToHistory();
