const PEXELS_API_KEY = "2mVsfSZy6UN2ygi0dPccozqOgvrV9NgC2Iy8iPKT6NKWyuXGvzOWwF7H";

const input = document.getElementById("country-input");
const button = document.getElementById("search-btn");
const spinner = document.getElementById("loading-spinner");
const countryInfo = document.getElementById("country-info");
const borderSection = document.getElementById("bordering-countries");
const errorMessage = document.getElementById("error-message");
const bgImage = document.getElementById("bg-image");
const landmarkLabel = document.getElementById("landmark-label");

// ── Landmark map ─
const landmarkMap = {
    // Europe
    "france": { label: "Eiffel Tower, Paris", query: "Eiffel Tower Paris" },
    "italy": { label: "Colosseum, Rome", query: "Colosseum Rome" },
    "united kingdom": { label: "Big Ben, London", query: "Big Ben London" },
    "germany": { label: "Brandenburg Gate, Berlin", query: "Brandenburg Gate Berlin" },
    "spain": { label: "Sagrada Família, Barcelona", query: "Sagrada Familia Barcelona" },
    "greece": { label: "Acropolis, Athens", query: "Acropolis Athens" },
    "russia": { label: "St. Basil's Cathedral, Moscow", query: "Saint Basil Cathedral Moscow" },
    "netherlands": { label: "Dutch Windmills", query: "windmills Netherlands" },
    "portugal": { label: "Pena Palace, Sintra", query: "Pena Palace Sintra" },
    "switzerland": { label: "Swiss Alps", query: "Swiss Alps mountains" },
    "austria": { label: "Vienna Opera House", query: "Vienna opera house" },
    "sweden": { label: "Stockholm Old Town", query: "Stockholm old town" },
    "norway": { label: "Norwegian Fjords", query: "Norway fjords" },
    "iceland": { label: "Northern Lights", query: "Iceland northern lights aurora" },
    "czechia": { label: "Prague Castle", query: "Prague Castle" },
    "poland": { label: "Wawel Castle, Krakow", query: "Wawel Castle Krakow" },
    "hungary": { label: "Parliament, Budapest", query: "Budapest Parliament" },
    "turkey": { label: "Hagia Sophia, Istanbul", query: "Hagia Sophia Istanbul" },
    "croatia": { label: "Dubrovnik Old City", query: "Dubrovnik Croatia" },
    "ireland": { label: "Cliffs of Moher", query: "Cliffs of Moher Ireland" },
    "denmark": { label: "Nyhavn, Copenhagen", query: "Nyhavn Copenhagen Denmark" },
    "finland": { label: "Helsinki Cathedral", query: "Helsinki Cathedral Finland" },
    "belgium": { label: "Grand Place, Brussels", query: "Grand Place Brussels" },
    "romania": { label: "Bran Castle, Transylvania", query: "Bran Castle Romania" },
    "ukraine": { label: "Kyiv Pechersk Lavra", query: "Kyiv Pechersk Lavra" },
    "serbia": { label: "Belgrade Fortress", query: "Belgrade Fortress Serbia" },

    // Africa
    "egypt": { label: "Pyramids of Giza", query: "Pyramids Giza Egypt" },
    "south africa": { label: "Table Mountain, Cape Town", query: "Table Mountain Cape Town" },
    "morocco": { label: "Medina of Marrakech", query: "Marrakech Morocco" },
    "tanzania": { label: "Mount Kilimanjaro", query: "Mount Kilimanjaro Tanzania" },
    "kenya": { label: "Maasai Mara Safari", query: "Maasai Mara Kenya safari" },
    "ethiopia": { label: "Lalibela Rock Churches", query: "Lalibela Ethiopia" },
    "nigeria": { label: "Lagos Cityscape", query: "Lagos Nigeria" },
    "ghana": { label: "Cape Coast Castle", query: "Cape Coast Castle Ghana" },
    "zimbabwe": { label: "Victoria Falls", query: "Victoria Falls" },
    "zambia": { label: "Victoria Falls", query: "Victoria Falls Zambia" },
    "madagascar": { label: "Avenue of the Baobabs", query: "Baobab trees Madagascar" },
    "namibia": { label: "Sossusvlei Sand Dunes", query: "Sossusvlei dunes Namibia" },
    "botswana": { label: "Okavango Delta", query: "Okavango Delta Botswana" },
    "rwanda": { label: "Volcanoes National Park", query: "Rwanda volcanoes gorillas" },
    "algeria": { label: "Sahara Desert", query: "Sahara desert Algeria" },
    "tunisia": { label: "Carthage Ruins", query: "Carthage ruins Tunisia" },

    // Asia
    "china": { label: "Great Wall of China", query: "Great Wall China" },
    "japan": { label: "Mount Fuji", query: "Mount Fuji Japan" },
    "india": { label: "Taj Mahal, Agra", query: "Taj Mahal India" },
    "jordan": { label: "Petra — The Treasury", query: "Petra Treasury Jordan" },
    "united arab emirates": { label: "Burj Khalifa, Dubai", query: "Burj Khalifa Dubai" },
    "thailand": { label: "Temple of the Emerald Buddha", query: "Bangkok temple Thailand" },
    "cambodia": { label: "Angkor Wat", query: "Angkor Wat Cambodia" },
    "indonesia": { label: "Borobudur Temple", query: "Borobudur temple Indonesia" },
    "vietnam": { label: "Ha Long Bay", query: "Ha Long Bay Vietnam" },
    "nepal": { label: "Himalayas & Everest", query: "Himalaya mountains Nepal" },
    "sri lanka": { label: "Sigiriya Rock Fortress", query: "Sigiriya rock Sri Lanka" },
    "myanmar": { label: "Bagan Temples", query: "Bagan temples Myanmar" },
    "south korea": { label: "Gyeongbokgung Palace", query: "Gyeongbokgung Palace Seoul" },
    "malaysia": { label: "Petronas Twin Towers", query: "Petronas Towers Kuala Lumpur" },
    "singapore": { label: "Gardens by the Bay", query: "Gardens by Bay Singapore" },
    "israel": { label: "Dome of the Rock, Jerusalem", query: "Dome of the Rock Jerusalem" },
    "iran": { label: "Nasir al-Mulk Mosque", query: "Nasir al Mulk mosque Iran" },
    "saudi arabia": { label: "Masjid al-Haram, Mecca", query: "Mecca Grand Mosque" },
    "mongolia": { label: "Mongolian Steppe & Gers", query: "Mongolia steppe landscape" },
    "kazakhstan": { label: "Bayterek Tower, Astana", query: "Bayterek tower Kazakhstan" },
    "uzbekistan": { label: "Registan Square, Samarkand", query: "Registan Samarkand Uzbekistan" },
    "philippines": { label: "Chocolate Hills, Bohol", query: "Chocolate Hills Philippines" },
    "taiwan": { label: "Taipei 101", query: "Taipei 101 Taiwan" },
    "pakistan": { label: "Badshahi Mosque, Lahore", query: "Badshahi Mosque Lahore" },
    "qatar": { label: "Doha Skyline", query: "Doha skyline Qatar" },
    "oman": { label: "Sultan Qaboos Grand Mosque", query: "Sultan Qaboos mosque Oman" },
    "georgia": { label: "Gergeti Trinity Church", query: "Gergeti church Georgia mountains" },
    "armenia": { label: "Garni Temple", query: "Garni Temple Armenia" },
    "azerbaijan": { label: "Flame Towers, Baku", query: "Flame Towers Baku Azerbaijan" },

    // Americas
    "united states": { label: "Statue of Liberty, New York", query: "Statue of Liberty New York" },
    "brazil": { label: "Christ the Redeemer, Rio", query: "Christ Redeemer Rio de Janeiro" },
    "mexico": { label: "Chichen Itza", query: "Chichen Itza Mexico" },
    "peru": { label: "Machu Picchu", query: "Machu Picchu Peru" },
    "canada": { label: "Niagara Falls", query: "Niagara Falls Canada" },
    "argentina": { label: "Perito Moreno Glacier", query: "Perito Moreno glacier Argentina" },
    "colombia": { label: "Cartagena Old City", query: "Cartagena Colombia" },
    "chile": { label: "Torres del Paine", query: "Torres del Paine Chile" },
    "bolivia": { label: "Salar de Uyuni Salt Flat", query: "Salar de Uyuni Bolivia" },
    "ecuador": { label: "Galápagos Islands", query: "Galapagos Islands Ecuador" },
    "cuba": { label: "Havana Classic Cars & Streets", query: "Havana Cuba colourful streets" },
    "venezuela": { label: "Angel Falls", query: "Angel Falls Venezuela" },
    "guatemala": { label: "Tikal Mayan Ruins", query: "Tikal ruins Guatemala" },
    "costa rica": { label: "Arenal Volcano", query: "Arenal Volcano Costa Rica" },
    "panama": { label: "Panama Canal", query: "Panama Canal" },

    // Oceania
    "australia": { label: "Sydney Opera House", query: "Sydney Opera House Australia" },
    "new zealand": { label: "Milford Sound, Fiordland", query: "Milford Sound New Zealand" },
    "fiji": { label: "Fijian Paradise Beaches", query: "Fiji tropical beach" },
    "papua new guinea": { label: "Highland Tribes & Rainforest", query: "Papua New Guinea jungle" },
};

// ── Helper: get landmark info ────────────────────────────────
function getLandmark(countryName) {
    const key = countryName.toLowerCase().trim();
    return landmarkMap[key] || null;
}

// ── Fetch a photo from Pexels and set as background ──────────
async function setBackground(query, labelText) {
    try {
        const res = await fetch(
            `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`, { headers: { Authorization: PEXELS_API_KEY } }
        );
        const data = await res.json();

        if (data.photos && data.photos.length > 0) {
            const photoUrl = data.photos[0].src.large2x;

            const img = new Image();
            img.onload = () => {
                bgImage.style.backgroundImage = `url('${photoUrl}')`;
                landmarkLabel.textContent = `📍 ${labelText}`;
                landmarkLabel.classList.add("visible");
            };
            img.src = photoUrl;
        }
    } catch (err) {
        console.warn("Background image fetch failed:", err);
    }
}

// ── Reset background ─────────────────────────────────────────
function resetBackground() {
    bgImage.style.backgroundImage = "none";
    landmarkLabel.classList.remove("visible");
    document.getElementById("earth-scene").classList.remove("hidden");

}

// ── Main search function ─────────────────────────────────────
async function searchCountry(countryName) {
    try {
        errorMessage.classList.add("hidden");
        countryInfo.classList.add("hidden");
        borderSection.classList.add("hidden");
        borderSection.innerHTML = "";
        spinner.classList.remove("hidden");
        document.getElementById("earth-scene").classList.add("hidden");


        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        if (!response.ok) throw new Error("Country not found. Please check the spelling.");

        const data = await response.json();
        const country = data[0];

        // Set landmark background
        const landmark = getLandmark(country.name.common);
        if (landmark) {
            setBackground(landmark.query, landmark.label);
        } else {
            setBackground(`${country.name.common} landmark`, country.name.common);
        }

        // Build country card
        const knownForHTML = landmark ?
            `<div class="known-for-badge">📍 Known for: ${landmark.label}</div>` :
            "";

        countryInfo.innerHTML = `
            <h2>${country.name.common}</h2>
            <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</p>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <img src="${country.flags.svg}" width="150" alt="Flag of ${country.name.common}">
            ${knownForHTML}
        `;
        countryInfo.classList.remove("hidden");

        // Bordering countries
        if (country.borders && country.borders.length > 0) {
            for (let code of country.borders) {
                const borderRes = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
                const borderData = await borderRes.json();
                const neighbor = borderData[0];
                borderSection.innerHTML += `
                    <div>
                        <p>${neighbor.name.common}</p>
                        <img src="${neighbor.flags.svg}" width="80" alt="Flag of ${neighbor.name.common}">
                    </div>
                `;
            }
        } else {
            borderSection.innerHTML = "<p style='color:rgba(255,255,255,0.7)'>No bordering countries</p>";
        }
        borderSection.classList.remove("hidden");

    } catch (error) {
        errorMessage.textContent = error.message;
        errorMessage.classList.remove("hidden");
        resetBackground();
        document.getElementById("earth-scene").classList.remove("hidden");

    } finally {
        spinner.classList.add("hidden");
    }
}

const starsLayer = document.getElementById("stars-layer");
for (let i = 0; i < 130; i++) {
    const s = document.createElement("div");
    s.className = "star";
    const size = Math.random() * 2 + 0.5;
    s.style.cssText = `width:${size}px;height:${size}px;top:${Math.random()*100}%;left:${Math.random()*100}%;--d:${2+Math.random()*4}s;--min:${0.1+Math.random()*0.4};animation-delay:${Math.random()*4}s`;
    starsLayer.appendChild(s);
}

button.addEventListener("click", () => {
    const country = input.value.trim();
    if (country !== "") searchCountry(country);
});

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const country = input.value.trim();
        if (country !== "") searchCountry(country);
    }
});