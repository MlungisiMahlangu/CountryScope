# Country Explorer

A beautiful web application to explore countries, their landmarks, and neighboring nations.

## Features

- Search for any country and view detailed information
- See beautiful landmark photos as backgrounds
- View neighboring/bordering countries with their flags
- Responsive design that works on all devices
- Animated earth globe on the home screen

## Setup

### Get Your Free API Key

This app uses the REST Countries API v5, which requires a free API key.

1. Sign up at [restcountries.com/sign-up](https://restcountries.com/sign-up)
2. Get your free API key (1,000 requests/month - plenty for personal use)
3. Open `script.js` and replace `YOUR_API_KEY_HERE` on line 5 with your actual API key:

```javascript
const RESTCOUNTRIES_API_KEY = "your_actual_api_key_here";
```

### Run the App

Simply open `index.html` in your browser, or use a local server:

```bash
# Using Python
python -m http.server 8080

# Using Node.js
npx http-server -p 8080
```

Then visit `http://localhost:8080`

## Technologies

- HTML5, CSS3, JavaScript (Vanilla)
- REST Countries API v5
- Pexels API for beautiful photos
- Google Fonts (Playfair Display & DM Sans)

## Notes

- The Pexels API key is included for demo purposes
- The REST Countries API free tier allows 1,000 requests per month
- All country data includes: name, capital, population, region, flag, and borders
