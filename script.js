const API_KEY = '0684fdd8bamshe110cbd879b3c1bp1099adjsnb7dd9679af3f'; // Insert your API key here
const url = 'https://imdb236.p.rapidapi.com/imdb/most-popular-movies';

const popup_container = document.querySelector('.popup-container');
const movieBoxTemplate = document.getElementById('movie-box-template');

// Fetch and display the most popular movies
async function getMovies() {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': 'imdb236.p.rapidapi.com'
        }
    });

    const data = await response.json();
    displayMovies(data.slice(0, 15)); // Display only the first 15 movies
}

function displayMovies(movies) {
    const moviesContainer = document.querySelector('.movies-container1');
    moviesContainer.innerHTML = ''; // Clear any existing movies

    // Loop through the movies and display them
    movies.forEach(movie => {
        const movieBox = movieBoxTemplate.cloneNode(true); // creates a deep clone(all child and content) of a DOM element
        movieBox.classList.add('movie-box');
        
        movieBox.querySelector('img').src = movie.primaryImage;
        movieBox.querySelector('h3').textContent = movie.primaryTitle;
        movieBox.querySelector('span').textContent = `${movie.releaseDate} | ${movie.genres[0]}`;

        // Store the movie ID in the data attribute for later use
        movieBox.setAttribute('data-id', movie.id);

        moviesContainer.appendChild(movieBox);
    });
}


// Fetch movie details by ID
async function getMovieById(id) {
    const response = await fetch(`https://imdb236.p.rapidapi.com/imdb/movie-details?id=${id}`, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': 'imdb236.p.rapidapi.com'
        }
    });
    const data = await response.json();
    return data;
}

// Initial function call to fetch and display movies
getMovies();

document.addEventListener('DOMContentLoaded', () => {
    // Cinema data structure
    const cinemas = {
        regalCinema: {
            name: "Regal Cinema",
            location: "New York, NY",
            movies: [
                { title: "Avengers: Endgame", poster: "https://image.tmdb.org/t/p/w1280/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg" },
                { title: "Spider-Man: No Way Home", poster: "https://image.tmdb.org/t/p/w1280/gh4cZbhZxyTbgxQPxD0dOudNPTn.jpg" },
                { title: "The Batman", poster: "https://image.tmdb.org/t/p/w1280/cij4dd21v2Rk2YtUQbV5kW69WB2.jpg" },
                { title: "Jurassic World: Dominion", poster: "https://image.tmdb.org/t/p/w1280/jbAvCACjLf1ZG0unB2tdmx5HAf1.jpg" },
                { title: "Black Panther: Wakanda Forever", poster: "https://image.tmdb.org/t/p/w1280/sv1xJUazXeYqALzczSZ3O6nkH75.jpg" },
            ]
        },
        amcTheatres: {
            name: "AMC Theatres",
            location: "Los Angeles, CA",
            movies: [
                { title: "Avatar: The Way of Water", poster: "https://image.tmdb.org/t/p/w1280/kyeqWdyUXW608qlYkRqosgbbJyK.jpg" },
                { title: "Dune", poster: "https://image.tmdb.org/t/p/w1280/d5NXSklXo0qyIYkgV94XAgMIckC.jpg" },
                { title: "Top Gun: Maverick", poster: "https://image.tmdb.org/t/p/w1280/xUuHj3CgmZQ9P2cMaqQs4J0d4Zc.jpg" },
                { title: "Doctor Strange in the Multiverse of Madness", poster: "https://image.tmdb.org/t/p/w1280/ddJcSKbcp4rKZTmuyWaMhuwcfMz.jpg" },
                { title: "Shang-Chi and the Legend of the Ten Rings", poster: "https://image.tmdb.org/t/p/w1280/d08HqqeBQSwN8i8MEvpsZ8Cb438.jpg" },
            ]
        },
        cineplexCinemas: {
            name: "Cineplex Cinemas",
            location: "Toronto, Canada",
            movies: [
                { title: "Frozen II", poster: "https://image.tmdb.org/t/p/w1280/mINJaa34MtknCYl5AjtNJzWj8cD.jpg" },
                { title: "Minions: The Rise of Gru", poster: "https://image.tmdb.org/t/p/w1280/wKiOkZTN9lUUUNZLmtnwubZYONg.jpg" },
                { title: "The Lion King (2019)", poster: "https://image.tmdb.org/t/p/w1280/dzBtMocZuJbjLOXvrl4zGYigDzh.jpg" },
                { title: "Sonic the Hedgehog 2", poster: "https://image.tmdb.org/t/p/w1280/6DrHO1jr3qVrViUO6s6kFiAGM7.jpg" },
                { title: "Guardians of the Galaxy Vol. 3", poster: "https://image.tmdb.org/t/p/w1280/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg" },
            ]
        }
    };

    // Load and display cinemas and their movies
    function loadMovies() {
        const cinemasContainer = document.getElementById('cinemas');
        cinemasContainer.innerHTML = ''; // Clear previous content, if any

        // Loop through each cinema and generate content dynamically
        for (const cinemaKey in cinemas) {
            const cinema = cinemas[cinemaKey];

            // Create a cinema container
            const cinemaDiv = document.createElement('div');
            cinemaDiv.classList.add('cinema');
            cinemaDiv.id = cinemaKey;

            // Add Cinema Title and Location
            const cinemaTitle = document.createElement('h2');
            cinemaTitle.textContent = `${cinema.name} - ${cinema.location}`;
            cinemaDiv.appendChild(cinemaTitle);

            // Create a movie grid container
            const movieGrid = document.createElement('div');
          
            movieGrid.classList.add('movie-grid');

            // Loop through each movie in the cinema and create a card
            cinema.movies.forEach(movie => {
                const movieCard = document.createElement('div');
                movieCard.classList.add('movie-card');

                // Movie Poster Image
                const movieImage = document.createElement('img');
                movieImage.src = movie.poster;
                movieImage.alt = movie.title;
                movieImage.classList.add('movie-poster');

                // Movie Title
                const movieTitle = document.createElement('h3');
                movieTitle.textContent = movie.title;

                // Append the movie poster and title to the movie card
                movieCard.appendChild(movieImage);
                movieCard.appendChild(movieTitle);
                movieGrid.appendChild(movieCard);
            });

            // Append the movie grid to the cinema container
            cinemaDiv.appendChild(movieGrid);

            // Finally, append the cinema container to the main cinemas section
            cinemasContainer.appendChild(cinemaDiv);
        }
    }

    // Call the function when the page loads
    loadMovies();
});


