let apiQuotes = []

const newQuote = () => {
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    console.log(quote);
}

// Get Quotes from API
const getQuotes = async () => {
    const apiUrl = 'https://type.fit/api/quotes'

    try {
        const response = await fetch(apiUrl)
        apiQuotes = await response.json()
        newQuote()
    } catch (error) {
        // Catch error here
    }
}


// On Load
getQuotes()