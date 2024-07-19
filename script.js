// https://jacintodesign.github.io/quotes-api/data/quotes.json
// https://type.fit/api/quotes

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loaderEl = document.getElementById("loader");

let apiQuotes = [];

// Show loader
function loading() {
  loaderEl.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loader
function completeLoading() {
  loaderEl.hidden = true;
  quoteContainer.hidden = false;
}

//Get new Quote
function newQuote() {
  loading();
  // Pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // Check the length of the quote to set font size
  if (quote.text.length > 100) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  // Check if author name is null and replace it with Anonymous
  if (!quote.author) {
    quoteText.textContent = "Anonymous";
  } else {
    authorText.textContent = quote.author;
  }
  quoteText.textContent = quote.text;
  completeLoading();
}

//Get Quotes from API
// Method 1
async function getQuotes() {
  loading();
  const apiURL = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiURL);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // Handle error here
  }
}
/*
//Method 2
async function getQuotes() {
  loading();
  const proxyURL = "https://cors-anywhere.herokuapp.com/";
  const apiURL =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  try {
    const response = await fetch(proxyURL + apiURL);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    getQuotes();
    console.log("We hit a rock! ", error);
  }
}
*/

// Tweet Quote
function tweetQuote() {
  const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterURL, "_blank ");
}

// Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

getQuotes();
