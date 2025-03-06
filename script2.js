const tmdbApiKey = '620fa332cef19145ab2e0327a6a71a0a'; // Replace with your TMDb API key
const image_path = "https://image.tmdb.org/t/p/w1280"
const Apiurl = `https://api.themoviedb.org/3/discover/movie?api_key=${tmdbApiKey}&with_genres=16`; // Genre 16 corresponds to 'Animation'

async function fetchAnimationMovies() {
try {
    const response = await fetch(Apiurl);
    const result = await response.json();

    console.log(result); // Log the result to inspect the movie data
    const moviesContainer = document.querySelector('.movies-container2');

    if (result.results && result.results.length > 0) {
    result.results.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.setAttribute('data-id', movie.id);
    
        movieCard.innerHTML = `
            <div class="movie-card-img">
            <img src="${image_path + movie.poster_path}" alt="${movie.title}">
            </div>
            <div class="movie-card-info">
            <h3 class="movie-title">${movie.title}</h3>
            <div class="movie-info-item">
                <span>Rating: </span>
                <span class="rating">${movie.vote_average} / 10</span>
            </div>
            <div class="movie-info-item">
                <span>Release Date: </span>
                <span class="release-date">${movie.release_date}</span>
            </div>
            </div>
        `;
        
            moviesContainer.appendChild(movieCard);
        
    });
    } else {
    console.log('No animation movies found.');
    }
} catch (error) {
    console.error('Error fetching animation movies:', error);
}
}

fetchAnimationMovies(); // Call the function to fetch and display animation movies
