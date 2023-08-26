// script.js
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const resultsDiv = document.getElementById('results');
const detailsDiv = document.getElementById('detailsSection'); // Add this line

searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query === '') return;

    resultsDiv.innerHTML = 'Loading...';
    detailsDiv.innerHTML = ''; // Clear details when performing a new search

    fetch(`https://openlibrary.org/search.json?q=${query}`)
        .then(response => response.json())
        .then(data => displayResults(data.docs))
        .catch(error => {
            console.error('Error fetching data:', error);
            resultsDiv.innerHTML = 'An error occurred.';
        });
});

// Display book details
function displayBookDetails(bookKey) {
    detailsDiv.innerHTML = 'Loading details...';

    fetch(`https://openlibrary.org${bookKey}.json`)
        .then(response => response.json())
        .then(bookData => {
            detailsDiv.innerHTML = ''; // Clear loading message

            const detailsContainer = document.createElement('div');
            detailsContainer.classList.add('details-container');

            const detailsTitle = document.createElement('h2');
            detailsTitle.textContent = bookData.title;

            const detailsAuthor = document.createElement('p');
            detailsAuthor.textContent = bookData.author_name
                ? `Author: ${bookData.author_name.join(', ')}`
                : 'Author: Unknown';

            const detailsDescription = document.createElement('p'); // Add this line
            detailsDescription.textContent = bookData.description
                ? `Description: ${bookData.description}`
                : 'Description: Not available';

            detailsContainer.appendChild(detailsTitle);
            detailsContainer.appendChild(detailsAuthor);
            detailsContainer.appendChild(detailsDescription); // Add this line

            detailsDiv.appendChild(detailsContainer);
        })
        .catch(error => {
            console.error('Error fetching book details:', error);
            detailsDiv.innerHTML = 'An error occurred while fetching book details.';
        });
}

// Rest of your existing code...
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const resultsDiv = document.getElementById('results');
const detailsDiv = document.getElementById('detailsSection'); // Add this line

searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query === '') return;

    resultsDiv.innerHTML = 'Loading...';
    detailsDiv.innerHTML = ''; // Clear details when performing a new search

    fetch(`https://openlibrary.org/search.json?q=${query}`)
        .then(response => response.json())
        .then(data => displayResults(data.docs))
        .catch(error => {
            console.error('Error fetching data:', error);
            resultsDiv.innerHTML = 'An error occurred.';
        });
});

// Inside the displayResults function
function displayResults(docs) {
    resultsDiv.innerHTML = '';

    docs.forEach(doc => {
        const title = doc.title;
        const author = doc.author_name ? doc.author_name.join(', ') : 'Unknown Author';
        const year = doc.first_publish_year || 'N/A';
        const coverId = doc.cover_i;

        const resultDiv = document.createElement('div');
        resultDiv.classList.add('result');

        const titleElement = document.createElement('h2');
        titleElement.textContent = title;

        const authorElement = document.createElement('p');
        authorElement.textContent = `Author(s): ${author}`;

        const yearElement = document.createElement('p');
        yearElement.textContent = `Year: ${year}`;

        const coverElement = document.createElement('img');
        coverElement.classList.add('cover'); // Add this line
        
        if (coverId) {
            coverElement.src = `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
            coverElement.alt = `${title} Cover`;
        } else {
            coverElement.src = 'white-book-cover-dark_125540-753.jpg'; // You can provide a placeholder image
            coverElement.alt = 'No Cover Available';
        }

        resultDiv.appendChild(titleElement);
        resultDiv.appendChild(authorElement);
        resultDiv.appendChild(yearElement);
        resultDiv.appendChild(coverElement);

        resultsDiv.appendChild(resultDiv);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    fetchTopRatedBooks();
    setupFilters();
});

function setupFilters() {
    const filterAuthor = document.getElementById('filterAuthor');
    const filterGenre = document.getElementById('filterGenre');
    const filterYear = document.getElementById('filterYear');

    filterAuthor.addEventListener('change', fetchTopRatedBooks);
    filterGenre.addEventListener('change', fetchTopRatedBooks);
    filterYear.addEventListener('change', fetchTopRatedBooks);
}

function fetchTopRatedBooks() {
    const topRatedDiv = document.getElementById('topRated');
    topRatedDiv.innerHTML = 'Loading...';

    const filterAuthor = document.getElementById('filterAuthor'); // Define filterAuthor here
    const filterGenre = document.getElementById('filterGenre'); // Define filterGenre here
    const filterYear = document.getElementById('filterYear'); // Define filterYear here

    let url = 'https://openlibrary.org/works.json?type=/type/work&sort=popular';
    
    if (filterAuthor.checked) {
        url += '&author=AuthorName';
    }
    if (filterGenre.checked) {
        url += '&subject=GenreName';
    }
    if (filterYear.checked) {
        url += '&publish_date=Year';
    }

    fetch(url)
        .then(response => response.json())
        .then(data => displayTopRatedBooks(data.entries))
        .catch(error => {
            console.error('Error fetching top rated books:', error);
            topRatedDiv.innerHTML = 'An error occurred.';
        });
}

// script.js
// Your existing code for fetching and displaying results remains unchanged

function displayBookDetails(bookKey) {
    detailsDiv.innerHTML = 'Loading details...'; // Show loading message

    fetch(`https://openlibrary.org${bookKey}.json`)
        .then(response => response.json())
        .then(bookData => {
            detailsDiv.innerHTML = ''; // Clear loading message

            const detailsContainer = document.createElement('div');
            detailsContainer.classList.add('details-container');

            const detailsTitle = document.createElement('h2');
            detailsTitle.textContent = bookData.title;

            const detailsAuthor = document.createElement('p');
            detailsAuthor.textContent = bookData.author_name
                ? `Author: ${bookData.author_name.join(', ')}`
                : 'Author: Unknown';

            // Additional details
            const detailsPublished = document.createElement('p');
            detailsPublished.textContent = bookData.publish_date
                ? `Published: ${bookData.publish_date}`
                : 'Published: Unknown';

            const detailsDescription = document.createElement('p');
            detailsDescription.textContent = bookData.description
                ? `Description: ${bookData.description}`
                : 'Description: Not available';

            // Append all details to the detailsContainer
            detailsContainer.appendChild(detailsTitle);
            detailsContainer.appendChild(detailsAuthor);
            detailsContainer.appendChild(detailsPublished);
            detailsContainer.appendChild(detailsDescription);

            detailsDiv.appendChild(detailsContainer);
        })
        .catch(error => {
            console.error('Error fetching book details:', error);
            detailsDiv.innerHTML = 'An error occurred while fetching book details.';
        });
}
