const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

let apiQuotes = []

const showLoadingSpinner = () => {
    loader.hidden = false
    quoteContainer.hidden = true
}

const hideLoadingSpinner = () => {
    quoteContainer.hidden = false
    loader.hidden = true
}

const newQuote = () => {
    showLoadingSpinner()
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]

    // Check if author is null and replace with "unknown"
    if (!quote.author) {
        authorText.textContent = "Unkown"
    } else {
        authorText.textContent = quote.author
    }

    // Check quote length to determine styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }

    // Set the quote text and hide the loader
    quoteText.textContent = quote.text
    hideLoadingSpinner()
}

// Get Quotes from API
const getQuotes = async () => {
    showLoadingSpinner()
    const apiUrl = 'https://type.fit/api/quotes'

    try {
        const response = await fetch(apiUrl)
        apiQuotes = await response.json()
        newQuote()
    } catch (error) {
        // Catch error here
        console.log('Something went wrong:', error);
    }
}

// Tweet Quote
const tweetQuote = () => {
    const twitterUrl = `http://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
    window.open(twitterUrl, '_blank')
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)

// On Load
getQuotes()