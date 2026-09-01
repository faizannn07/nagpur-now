/* =====================================================
   NAGPUR NOW
   MAIN JAVASCRIPT
===================================================== */


/* ================= LOADER ================= */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        if (loader) {
            loader.classList.add("hide");
        }

        document.body.classList.remove("loading");

    }, 1200);

});


/* ================= NAVBAR ================= */

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


/* ================= MOBILE MENU ================= */

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {

    menuBtn.classList.toggle("open");
    mobileMenu.classList.toggle("open");

});


document
    .querySelectorAll(".mobile-menu a")
    .forEach(link => {

        link.addEventListener("click", () => {

            menuBtn.classList.remove("open");
            mobileMenu.classList.remove("open");

        });

    });


/* ================= SMOOTH SCROLL ================= */

function scrollToSection(id) {

    const section = document.getElementById(id);

    if (!section) return;

    section.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* ================= SCROLL REVEAL ================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* ================= CUSTOM CURSOR ================= */

const cursorDot =
    document.getElementById("cursorDot");

const cursorRing =
    document.getElementById("cursorRing");


if (window.matchMedia("(pointer:fine)").matches) {

    let mouseX = 0;
    let mouseY = 0;

    let ringX = 0;
    let ringY = 0;


    document.addEventListener(
        "mousemove",
        event => {

            mouseX = event.clientX;
            mouseY = event.clientY;

            cursorDot.style.left =
                `${mouseX}px`;

            cursorDot.style.top =
                `${mouseY}px`;

        }
    );


    function animateCursor() {

        ringX +=
            (mouseX - ringX) * 0.14;

        ringY +=
            (mouseY - ringY) * 0.14;


        cursorRing.style.left =
            `${ringX}px`;

        cursorRing.style.top =
            `${ringY}px`;


        requestAnimationFrame(
            animateCursor
        );

    }


    animateCursor();


    document
        .querySelectorAll(
            "button, a, .category-card, .experience-card"
        )
        .forEach(element => {

            element.addEventListener(
                "mouseenter",
                () => {

                    document.body.classList
                        .add("cursor-hover");

                }
            );


            element.addEventListener(
                "mouseleave",
                () => {

                    document.body.classList
                        .remove("cursor-hover");

                }
            );

        });

}


/* ================= VIBE FINDER ================= */

let selectedVibe = "";


function selectVibe(button, vibe) {

    document
        .querySelectorAll(".vibe-options button")
        .forEach(option => {

            option.classList.remove("active");

        });


    button.classList.add("active");

    selectedVibe = vibe;

}


function findVibe() {

    const result =
        document.getElementById("vibeResult");


    if (!selectedVibe) {

        result.innerHTML =
            "Pick a vibe first ✦";

        result.classList.add("show");

        return;

    }


    const recommendations = {

        Chill:
            "Try a peaceful café, sunset spot or relaxed evening walk.",

        Hype:
            "Look for live music, gaming, activities and events happening tonight.",

        Date:
            "Try an aesthetic café, dinner spot and somewhere beautiful to end the evening.",

        Foodie:
            "Follow the food trail — street food, hidden local spots and something sweet.",

        Adventure:
            "Explore somewhere new, try an activity and finish with good food.",

        Creative:
            "Find an art event, workshop, gallery or unusual local experience."

    };


    result.innerHTML = `

        <strong>
            YOUR VIBE: ${selectedVibe.toUpperCase()}
        </strong>

        <br><br>

        ${recommendations[selectedVibe]}

        <br><br>

        <button
            onclick="showToast('Personalized places coming next ✦')"
            style="
                border:0;
                background:white;
                color:black;
                border-radius:50px;
                padding:9px 14px;
                font-size:10px;
                font-weight:700;
            "
        >
            Show me places →
        </button>

    `;


    result.classList.add("show");

}


/* ================= SAVE ================= */

function toggleSave(button, event) {

    event.stopPropagation();


    button.classList.toggle("saved");


    if (button.classList.contains("saved")) {

        button.innerHTML = "♥";

        showToast("Saved to My Nagpur");

    } else {

        button.innerHTML = "♡";

        showToast("Removed from My Nagpur");

    }

}


/* ================= CATEGORY ================= */

function categoryMessage(category) {

    showToast(
        `${category} discovery is coming next ✦`
    );

}


/* ================= DEAL ================= */

let dealSeconds =
    (2 * 60 * 60) +
    (18 * 60) +
    42;


function updateCountdown() {

    dealSeconds--;


    if (dealSeconds < 0) {

        dealSeconds =
            3 * 60 * 60;

    }


    const hours =
        Math.floor(
            dealSeconds / 3600
        );


    const minutes =
        Math.floor(
            (dealSeconds % 3600) / 60
        );


    const seconds =
        dealSeconds % 60;


    const formatted =

        String(hours).padStart(2,"0")
        + ":" +

        String(minutes).padStart(2,"0")
        + ":" +

        String(seconds).padStart(2,"0");


    const countdown =
        document.getElementById("countdown");


    if (countdown) {

        countdown.textContent =
            formatted;

    }

}


setInterval(
    updateCountdown,
    1000
);


function claimDeal() {

    const button =
        document.getElementById("dealButton");


    button.textContent =
        "✓ Drop claimed";


    button.style.background =
        "#11110f";


    button.style.color =
        "white";


    showToast(
        "Deal Drop claimed ✦"
    );

}


/* ================= SEARCH ================= */

const searchBtn =
    document.getElementById("searchBtn");

const searchOverlay =
    document.getElementById("searchOverlay");

const searchClose =
    document.getElementById("searchClose");

const searchInput =
    document.getElementById("searchInput");

const searchResults =
    document.getElementById("searchResults");


const searchableItems = [

    {
        name: "Slow Coffee",
        type: "Café",
        location: "Dharampeth"
    },

    {
        name: "The Food Trail",
        type: "Food",
        location: "Sadar"
    },

    {
        name: "Weekend Energy",
        type: "Experience",
        location: "Nagpur"
    },

    {
        name: "Vibe With AI",
        type: "Event",
        location: "Nagpur"
    },

    {
        name: "Open Mic Night",
        type: "Music",
        location: "Nagpur"
    },

    {
        name: "Art Weekend",
        type: "Culture",
        location: "Nagpur"
    },

    {
        name: "Hidden Nagpur",
        type: "Discovery",
        location: "Nagpur"
    }

];


searchBtn.addEventListener("click", () => {

    searchOverlay.classList.add("open");

    setTimeout(() => {

        searchInput.focus();

    }, 250);

});


searchClose.addEventListener("click", () => {

    searchOverlay.classList.remove("open");

});


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "/" &&
            document.activeElement.tagName !== "INPUT"
        ) {

            event.preventDefault();

            searchOverlay.classList.add("open");

            setTimeout(() => {

                searchInput.focus();

            }, 200);

        }


        if (event.key === "Escape") {

            searchOverlay.classList.remove("open");

        }

    }
);


searchInput.addEventListener(
    "input",
    () => {

        const query =
            searchInput.value
                .trim()
                .toLowerCase();


        if (!query) {

            searchResults.innerHTML =
                "Start typing to explore.";

            return;

        }


        const matches =
            searchableItems.filter(item =>

                item.name
                    .toLowerCase()
                    .includes(query)

                ||

                item.type
                    .toLowerCase()
                    .includes(query)

                ||

                item.location
                    .toLowerCase()
                    .includes(query)

            );


        if (!matches.length) {

            searchResults.innerHTML =
                "Nothing found. Try another search.";

            return;

        }


        searchResults.innerHTML =
            matches
                .map(item => `

                    <div class="search-result">

                        <div>

                            <strong>
                                ${item.name}
                            </strong>

                            <br>

                            <small>
                                ${item.type}
                                ·
                                ${item.location}
                            </small>

                        </div>

                        <span>↗</span>

                    </div>

                `)
                .join("");

    }
);


/* ================= TOAST ================= */

let toastTimeout;


function showToast(message) {

    const toast =
        document.getElementById("toast");

    const toastMessage =
        document.getElementById("toastMessage");


    toastMessage.textContent =
        message;


    toast.classList.add("show");


    clearTimeout(toastTimeout);


    toastTimeout =
        setTimeout(() => {

            toast.classList.remove("show");

        }, 2600);

}
/* =====================================================
   EXPLORE NAGPUR
===================================================== */

const exploreSearch =
    document.getElementById("exploreSearch");

const areaFilter =
    document.getElementById("areaFilter");

const filterButtons =
    document.querySelectorAll(".filter-btn");

const placeCards =
    document.querySelectorAll(".place-card");

const resultCount =
    document.getElementById("resultCount");

const placesEmpty =
    document.getElementById("placesEmpty");


let currentCategory = "all";
let currentArea = "all";


/* ================= FILTER PLACES ================= */

function filterPlaces() {

    const search =
        exploreSearch.value
            .trim()
            .toLowerCase();


    let visibleCount = 0;


    placeCards.forEach(card => {

        const category =
            card.dataset.category;

        const area =
            card.dataset.area;

        const name =
            card.dataset.name.toLowerCase();


        const categoryMatch =
            currentCategory === "all" ||
            category === currentCategory;


        const areaMatch =
            currentArea === "all" ||
            area === currentArea;


        const searchMatch =
            !search ||
            name.includes(search) ||
            category.includes(search) ||
            area.includes(search);


        if (
            categoryMatch &&
            areaMatch &&
            searchMatch
        ) {

            card.classList.remove("hidden");

            visibleCount++;

        } else {

            card.classList.add("hidden");

        }

    });


    resultCount.textContent =
        visibleCount;


    if (visibleCount === 0) {

        placesEmpty.classList.add("show");

    } else {

        placesEmpty.classList.remove("show");

    }

}


/* ================= CATEGORY BUTTONS ================= */

filterButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            filterButtons.forEach(
                item => {

                    item.classList.remove(
                        "active"
                    );

                }
            );


            button.classList.add("active");


            currentCategory =
                button.dataset.category;


            filterPlaces();

        }
    );

});


/* ================= SEARCH ================= */

if (exploreSearch) {

    exploreSearch.addEventListener(
        "input",
        filterPlaces
    );

}


/* ================= AREA ================= */

if (areaFilter) {

    areaFilter.addEventListener(
        "change",
        () => {

            currentArea =
                areaFilter.value;

            filterPlaces();

        }
    );

}


/* ================= KEYBOARD SEARCH ================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "/" &&
            document.activeElement.tagName !== "INPUT"
        ) {

            event.preventDefault();


            if (exploreSearch) {

                exploreSearch.focus();

                scrollToSection(
                    "explore"
                );

            }

        }

    }
);


/* ================= SAVE PLACE ================= */

function savePlace(
    button,
    event,
    placeName
) {

    event.stopPropagation();


    button.classList.toggle(
        "saved"
    );


    if (
        button.classList.contains(
            "saved"
        )
    ) {

        button.innerHTML = "♥";

        showToast(
            `${placeName} saved to My Nagpur`
        );

    } else {

        button.innerHTML = "♡";

        showToast(
            `${placeName} removed`
        );

    }

}


/* ================= PLACE PREVIEW ================= */

const placeData = {

    "Slow Coffee": {
        category: "CAFÉ",
        location: "Dharampeth · ₹₹",
        rating: "4.7",
        area: "Dharampeth",
        goodFor: "Coffee · Chill · Friends",
        description:
            "A relaxed coffee spot for slow mornings, conversations and plans that were supposed to last an hour.",
        image:
            "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1400&q=90"
    },

    "The Food Trail": {
        category: "FOOD",
        location: "Sadar · ₹",
        rating: "4.8",
        area: "Sadar",
        goodFor: "Food · Friends · Exploring",
        description:
            "A food-first stop for discovering something delicious when you don't want the usual plan.",
        image:
            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=90"
    },

    "Weekend Energy": {
        category: "FUN",
        location: "Wardha Road · ₹₹",
        rating: "4.6",
        area: "Wardha Road",
        goodFor: "Friends · Weekend · Fun",
        description:
            "For the days when sitting at home isn't an option. Find something different and make the weekend count.",
        image:
            "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1400&q=90"
    },

    "Green Escape": {
        category: "OUTDOORS",
        location: "Civil Lines · Free",
        rating: "4.5",
        area: "Civil Lines",
        goodFor: "Walks · Nature · Chill",
        description:
            "A quieter side of Nagpur for fresh air, slow walks and getting away from the noise.",
        image:
            "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1400&q=90"
    },

    "The Art Room": {
        category: "CULTURE",
        location: "Sitabuldi · ₹₹",
        rating: "4.9",
        area: "Sitabuldi",
        goodFor: "Art · Creative · Culture",
        description:
            "A creative corner for people who want to discover local talent and get inspired.",
        image:
            "https://images.unsplash.com/photo-1577083552431-6e5fd01988b5?auto=format&fit=crop&w=1400&q=90"
    },

    "After Dark": {
        category: "NIGHTLIFE",
        location: "Dharampeth · ₹₹₹",
        rating: "4.6",
        area: "Dharampeth",
        goodFor: "Night · Music · Friends",
        description:
            "When the city switches moods. Music, conversations and a reason to stay out a little longer.",
        image:
            "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1400&q=90"
    },

    "Orange Kitchen": {
        category: "FOOD",
        location: "Manish Nagar · ₹₹",
        rating: "4.7",
        area: "Manish Nagar",
        goodFor: "Dinner · Food · Friends",
        description:
            "A casual food stop when you're looking for a satisfying meal without overthinking the plan.",
        image:
            "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1400&q=90"
    },

    "Sunday Stories": {
        category: "CAFÉ",
        location: "Civil Lines · ₹₹",
        rating: "4.8",
        area: "Civil Lines",
        goodFor: "Brunch · Coffee · Aesthetic",
        description:
            "A slow Sunday kind of place — coffee, conversations and nowhere else you need to be.",
        image:
            "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1400&q=90"
    }

};


let currentPlace = null;


function openPlace(placeName) {

    const place = placeData[placeName];

    if (!place) {
        showToast(
            `${placeName} information coming soon ✦`
        );
        return;
    }

    currentPlace = placeName;

    const modal =
        document.getElementById("placeModal");

    document.getElementById(
        "placeModalImage"
    ).style.backgroundImage =
        `url("${place.image}")`;

    document.getElementById(
        "placeModalCategory"
    ).textContent =
        place.category;

    document.getElementById(
        "placeModalName"
    ).textContent =
        placeName;

    document.getElementById(
        "placeModalLocation"
    ).textContent =
        place.location;

    document.getElementById(
        "placeModalRating"
    ).textContent =
        `★ ${place.rating}`;

    document.getElementById(
        "placeModalDescription"
    ).textContent =
        place.description;

    document.getElementById(
        "placeModalGoodFor"
    ).textContent =
        place.goodFor;

    document.getElementById(
        "placeModalArea"
    ).textContent =
        place.area;

    updatePlaceSaveButton();

    modal.classList.add("open");

    document.body.style.overflow = "hidden";
}


function closePlace() {

    const modal =
        document.getElementById("placeModal");

    modal.classList.remove("open");

    document.body.style.overflow = "";
}


function updatePlaceSaveButton() {

    const button =
        document.getElementById(
            "placeSaveAction"
        );

    if (!button || !currentPlace) return;

    const savedPlaces =
        JSON.parse(
            localStorage.getItem(
                "nagpurNowSaved"
            ) || "[]"
        );

    const saved =
        savedPlaces.includes(currentPlace);

    button.textContent =
        saved ? "♥ Saved" : "♡ Save";

    button.classList.toggle(
        "primary",
        !saved
    );
}


function saveCurrentPlace() {

    if (!currentPlace) return;

    let savedPlaces =
        JSON.parse(
            localStorage.getItem(
                "nagpurNowSaved"
            ) || "[]"
        );

    if (
        savedPlaces.includes(currentPlace)
    ) {

        savedPlaces =
            savedPlaces.filter(
                place =>
                    place !== currentPlace
            );

        showToast(
            `${currentPlace} removed from My Nagpur`
        );

    } else {

        savedPlaces.push(currentPlace);

        showToast(
            `${currentPlace} saved to My Nagpur`
        );
    }

    localStorage.setItem(
        "nagpurNowSaved",
        JSON.stringify(savedPlaces)
    );

    updatePlaceSaveButton();
}


function openDirections() {

    if (!currentPlace) return;

    const place =
        placeData[currentPlace];

    const query =
        encodeURIComponent(
            `${currentPlace}, ${place.area}, Nagpur`
        );

    window.open(
        `https://www.google.com/maps/search/?api=1&query=${query}`,
        "_blank"
    );
}


async function shareCurrentPlace() {

    if (!currentPlace) return;

    const shareText =
        `${currentPlace} — found on Nagpur Now ✦`;

    if (navigator.share) {

        try {

            await navigator.share({
                title: currentPlace,
                text: shareText,
                url: window.location.href
            });

        } catch (error) {
            // User cancelled sharing.
        }

    } else {

        try {

            await navigator.clipboard.writeText(
                window.location.href
            );

            showToast("Link copied ✦");

        } catch (error) {

            showToast(
                "Share Nagpur Now with your friends ✦"
            );

        }
    }
}


/* ================= CLOSE PLACE ================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {
            closePlace();
        }

    }
);


/* ================= RESET ================= */

function resetExplore() {

    currentCategory = "all";
    currentArea = "all";


    if (exploreSearch) {

        exploreSearch.value = "";

    }


    if (areaFilter) {

        areaFilter.value = "all";

    }


    filterButtons.forEach(
        button => {

            button.classList.remove(
                "active"
            );

        }
    );


    const allButton =
        document.querySelector(
            '.filter-btn[data-category="all"]'
        );


    if (allButton) {

        allButton.classList.add(
            "active"
        );

    }


    filterPlaces();

}


/* ================= SORT ================= */

const sortBtn =
    document.getElementById("sortBtn");


let sortNewest = true;


if (sortBtn) {

    sortBtn.addEventListener(
        "click",
        () => {

            const grid =
                document.getElementById(
                    "placesGrid"
                );


            const cards =
                Array.from(
                    grid.querySelectorAll(
                        ".place-card"
                    )
                );


            cards.sort(
                (a,b) => {

                    const ratingA =
                        parseFloat(
                            a.dataset.rating
                        );

                    const ratingB =
                        parseFloat(
                            b.dataset.rating
                        );


                    return sortNewest
                        ? ratingB - ratingA
                        : ratingA - ratingB;

                }
            );


            cards.forEach(
                card =>
                    grid.appendChild(card)
            );


            sortNewest =
                !sortNewest;


            sortBtn.innerHTML =
                sortNewest
                    ? "Top rated ↕"
                    : "Lowest rated ↕";

        }
    );

}


/* ================= INITIAL FILTER ================= */

filterPlaces();
/* ================= MOBILE BOTTOM NAV ================= */

function openMobileSearch() {
    if (typeof searchBtn !== "undefined") {
        searchBtn.click();
    }
}

function toggleMobileMenu() {
    if (typeof menuBtn !== "undefined") {
        menuBtn.click();
    }
}