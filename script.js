const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote');
const authorText = document.querySelector('#author');
const twitterBtn = document.querySelector('#twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes;

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner () {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

function showNewQuotes() {
    showLoadingSpinner();
    // Pick a random quote from the apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if Author field is blank and replace it with 'Unknown'
    authorText.textContent = !quote.author ? 'Unknown' : quote.author;
    // Dynamically reduce font size for long quotes
    quoteText.classList.toggle('long-quote', quote.text.length > 120);
    // Set Quote
    quoteText.textContent = quote.text;

    removeLoadingSpinner();
}

async function getQuoteFromAPI() {
    showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        showNewQuotes();
    } catch (error) {
        console.log('whoops, no quote', error);
    }
}

function tweeQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

newQuoteBtn.addEventListener('click', getQuoteFromAPI);
twitterBtn.addEventListener('click', tweeQuote);

// On Load
getQuoteFromAPI();

// function newQuote() {
//     // Pick a random quite from the apiQuotes array
//     const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)]
//     console.log(quote);
// }

// newQuote();