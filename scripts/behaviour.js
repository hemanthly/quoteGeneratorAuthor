const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author-name");
const whatsapp = document.getElementById("whatsapp");
const nextQuote = document.getElementById("next-quote");
const loader = document.getElementById("loader");

//show loading
function loading(){
  loader.hidden = false;
  quoteContainer.hidden = true;
}
function complete(){
  if(!loader.hidden){
    loader.hidden = true;
    quoteContainer.hidden = false;

  }
}
async function getStoicQuote() {
  loading();
  const apiUrl = "https://api.themotivate365.com/stoic-quote";

  try {
    const apiResponse = await fetch(apiUrl);
    if (apiResponse.ok) {
      const data = await apiResponse.json();
      quoteText.innerText = data.quote;
      authorText.innerText =
        data.author === null || data.author === "" ? "Unknown" : data.author;
      if(data.quote.length > 30)
        quoteText.classList.add('long-text');

        complete();
    } else {
      throw new Error("API request failed");
    }
  } catch (error) {
    console.log(error);
  }
}

function shareQuote() {
  takeShot();
  // Replace the placeholders with the actual quote and author
  const quote = quoteText.innerText;
  const author = authorText.innerText;

  // Construct the WhatsApp message
  const message = `Check out this quote:\n\n"${quote}"\n- ${author}`;

  // Encode the message for use in the URL
  const encodedMessage = encodeURIComponent(message);

  // Construct the WhatsApp API URL with the encoded message
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedMessage}`;

  // Open the WhatsApp sharing window
  window.open(whatsappUrl);
}

// Define the function to capture a screenshot of the div
function takeShot() {
  html2canvas(quoteContainer).then(function (canvas) {
    // Create a temporary anchor element to download the image
    const link = document.createElement("a");
    link.href = canvas.toDataURL();
    link.download = "quote-screenshot.png";
    link.click();
  });
}

// Add event listeners to the buttons
nextQuote.addEventListener("click", getStoicQuote); 
whatsapp.addEventListener("click", shareQuote); 

// Load the initial quote
getStoicQuote();
