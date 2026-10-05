const PEXELS_API_KEY = "2mVsfSZy6UN2ygi0dPccozqOgvrV9NgC2Iy8iPKT6NKWyuXGvzOWwF7H";

// REST Countries v5 API - Get your free API key at https://restcountries.com/sign-up
// Free tier: 1,000 requests/month
const RESTCOUNTRIES_API_KEY = "rc_live_e0c0fd6f8e6d45b38addaa140d4f2cb4";
const RESTCOUNTRIES_BASE_URL = "https://api.restcountries.com/countries/v5";

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
            `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
            { headers: { Authorization: PEXELS_API_KEY } }
        );
        
        if (!res.ok) {
            console.warn("Pexels API error:", res.status);
            return;
        }
        
        const data = await res.json();

        if (data.photos && data.photos.length > 0) {
            const photoUrl = data.photos[0].src.large2x;

            const img = new Image();
            img.onload = () => {
                bgImage.style.backgroundImage = `url('${photoUrl}')`;
                landmarkLabel.textContent = `📍 ${labelText}`;
                landmarkLabel.classList.add("visible");
            };
            img.onerror = () => {
                console.warn("Failed to load background image");
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
    // Check if API key is configured
    if (RESTCOUNTRIES_API_KEY === "YOUR_API_KEY_HERE") {
        errorMessage.innerHTML = 'Please configure your REST Countries API key.<br><small>Get a free key at <a href="https://restcountries.com/sign-up" target="_blank" style="color:#4da6ff">restcountries.com/sign-up</a></small>';
        errorMessage.classList.remove("hidden");
        return;
    }
    
    try {
        errorMessage.classList.add("hidden");
        countryInfo.classList.add("hidden");
        borderSection.classList.add("hidden");
        borderSection.innerHTML = "";
        spinner.classList.remove("hidden");
        document.getElementById("earth-scene").classList.add("hidden");

        // Fetch country data from v5 API
        const response = await fetch(
            `${RESTCOUNTRIES_BASE_URL}/names.common/${encodeURIComponent(countryName)}`,
            {
                headers: {
                    'Authorization': `Bearer ${RESTCOUNTRIES_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            if (response.status === 401) {
                throw new Error("Invalid API key. Please check your configuration.");
            } else if (response.status === 404) {
                throw new Error("Country not found. Please check the spelling.");
            } else {
                throw new Error(errorData?.errors?.[0]?.message || "Failed to fetch country data.");
            }
        }

        const responseData = await response.json();
        
        // v5 API wraps data in { data: { objects: [...] } }
        if (!responseData.data?.objects || responseData.data.objects.length === 0) {
            throw new Error("Country not found. Please check the spelling.");
        }
        
        const country = responseData.data.objects[0];

        // Set landmark background
        const commonName = country.names?.common || country.name?.common || "Unknown";
        const landmark = getLandmark(commonName);
        if (landmark) {
            setBackground(landmark.query, landmark.label);
        } else {
            setBackground(`${commonName} landmark`, commonName);
        }

        // Extract data from v5 response format
        const capital = country.capitals?.[0]?.name || country.capitals?.[0] || "N/A";
        const population = country.population || 0;
        const region = country.region || "N/A";
        const alpha2Code = country.codes?.alpha_2 || country.codes?.alpha2 || "";
        const flagUrl = alpha2Code ? `https://flagcdn.com/${alpha2Code.toLowerCase()}.svg` : "";
        
        // Build country card
        const knownForHTML = landmark ?
            `<div class="known-for-badge">📍 Known for: ${landmark.label}</div>` :
            "";

        countryInfo.innerHTML = `
            <h2>${commonName}</h2>
            <p><strong>Capital:</strong> ${capital}</p>
            <p><strong>Population:</strong> ${population.toLocaleString()}</p>
            <p><strong>Region:</strong> ${region}</p>
            ${flagUrl ? `<img src="${flagUrl}" width="150" alt="Flag of ${commonName}">` : ""}
            ${knownForHTML}
        `;
        countryInfo.classList.remove("hidden");

        // Bordering countries
        const borders = country.borders || [];
        if (borders.length > 0) {
            let bordersHTML = '<h3 class="border-title">Neighboring Countries</h3>';
            
            for (let code of borders) {
                try {
                    const borderRes = await fetch(
                        `${RESTCOUNTRIES_BASE_URL}/codes.alpha_3/${code}`,
                        {
                            headers: {
                                'Authorization': `Bearer ${RESTCOUNTRIES_API_KEY}`,
                                'Content-Type': 'application/json'
                            }
                        }
                    );
                    
                    if (borderRes.ok) {
                        const borderResponse = await borderRes.json();
                        if (borderResponse.data?.objects?.[0]) {
                            const neighbor = borderResponse.data.objects[0];
                            const neighborName = neighbor.names?.common || neighbor.name?.common || "Unknown";
                            const neighborAlpha2 = neighbor.codes?.alpha_2 || neighbor.codes?.alpha2 || "";
                            const neighborFlag = neighborAlpha2 ? `https://flagcdn.com/${neighborAlpha2.toLowerCase()}.svg` : "";
                            
                            bordersHTML += `
                                <div>
                                    <p>${neighborName}</p>
                                    ${neighborFlag ? `<img src="${neighborFlag}" width="80" alt="Flag of ${neighborName}">` : ""}
                                </div>
                            `;
                        }
                    }
                } catch (err) {
                    console.warn(`Failed to fetch border country ${code}:`, err);
                }
            }
            
            borderSection.innerHTML = bordersHTML;
        } else {
            borderSection.innerHTML = '<h3 class="border-title">Neighboring Countries</h3><p style="color:rgba(255,255,255,0.7); grid-column: 1/-1;">Island nation — no land borders</p>';
        }
        borderSection.classList.remove("hidden");

    } catch (error) {
        errorMessage.textContent = error.message || "An error occurred. Please try again.";
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