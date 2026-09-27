function showPage(pageId) {

    const pages = document.querySelectorAll(".page");

    pages.forEach(function(page) {

        page.classList.add("hidden");

    });

    const selectedPage =
        document.getElementById(pageId);

    selectedPage.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ==========================================
// NO BUTTON
// ==========================================

const noButton =
    document.getElementById("noButton");

const cuteMessage =
    document.getElementById("cuteMessage");


const messages = [

    "Are you sure? 🥺💕",

    "Think again, babyy 😭",

    "Nope! You can't catch me! 😆",

    "Try again! 👀",

    "The NO button is shy 👉👈",

    "You really want to say no? 🥺",

    "I'll keep running! 😂💕",

    "Nice try! 😭❤️",

    "Just click YES already! 🥰"

];


function moveNoButton() {

    const buttonWidth =
        noButton.offsetWidth;

    const buttonHeight =
        noButton.offsetHeight;


    const maxX =
        window.innerWidth -
        buttonWidth -
        20;


    const maxY =
        window.innerHeight -
        buttonHeight -
        20;


    const randomX =
        Math.floor(
            Math.random() * maxX
        );


    const randomY =
        Math.floor(
            Math.random() * maxY
        );


    noButton.style.position = "fixed";

    noButton.style.left =
        Math.max(10, randomX) + "px";

    noButton.style.top =
        Math.max(10, randomY) + "px";


    const randomMessage =
        messages[
            Math.floor(
                Math.random() * messages.length
            )
        ];


    cuteMessage.textContent =
        randomMessage;
}


// When mouse touches NO
noButton.addEventListener(
    "mouseenter",
    moveNoButton
);


// For phones
noButton.addEventListener(
    "touchstart",
    function(event) {

        event.preventDefault();

        moveNoButton();

    }
);


// ==========================================
// NAME
// ==========================================

function saveName() {

    const name =
        document
            .getElementById("name")
            .value
            .trim();


    if (!name) {

        alert(
            "Please enter your name 💕"
        );

        return;
    }


    localStorage.setItem(
        "dateName",
        name
    );


    showPage("datetimePage");
}


// ==========================================
// DATE & TIME
// ==========================================

function saveDateTime() {

    const date =
        document
            .getElementById("date")
            .value;


    const time =
        document
            .getElementById("time")
            .value;


    if (!date || !time) {

        alert(
            "Please choose a date and time 📅"
        );

        return;
    }


    localStorage.setItem(
        "dateDate",
        date
    );


    localStorage.setItem(
        "dateTime",
        time
    );


    showPage("locationPage");
}


// ==========================================
// LOCATION
// ==========================================

function saveLocation() {

    const location =
        document
            .getElementById("location")
            .value
            .trim();


    if (!location) {

        alert(
            "Please enter a location 📍"
        );

        return;
    }


    localStorage.setItem(
        "dateLocation",
        location
    );


    showPage("messagePage");
}


// ==========================================
// MESSAGE
// ==========================================

function saveMessage() {

    const message =
        document
            .getElementById("message")
            .value
            .trim();


    localStorage.setItem(
        "dateMessage",
        message
    );


    loadReview();

    showPage("reviewPage");
}


// ==========================================
// REVIEW
// ==========================================

function loadReview() {

    const review =
        document.getElementById("review");


    const name =
        localStorage.getItem(
            "dateName"
        ) || "";


    const date =
        localStorage.getItem(
            "dateDate"
        ) || "";


    const time =
        localStorage.getItem(
            "dateTime"
        ) || "";


    const location =
        localStorage.getItem(
            "dateLocation"
        ) || "";


    const message =
        localStorage.getItem(
            "dateMessage"
        ) || "No message";


    review.innerHTML = `

        <div class="review-item">

            <div class="review-label">
                👤 NAME
            </div>

            <div class="review-value">
                ${escapeHTML(name)}
            </div>

        </div>


        <div class="review-item">

            <div class="review-label">
                📅 DATE
            </div>

            <div class="review-value">
                ${formatDate(date)}
            </div>

        </div>


        <div class="review-item">

            <div class="review-label">
                ⏰ TIME
            </div>

            <div class="review-value">
                ${formatTime(time)}
            </div>

        </div>


        <div class="review-item">

            <div class="review-label">
                📍 LOCATION
            </div>

            <div class="review-value">
                ${escapeHTML(location)}
            </div>

        </div>


        <div class="review-item">

            <div class="review-label">
                💌 MESSAGE
            </div>

            <div class="review-value">
                ${escapeHTML(message)}
            </div>

        </div>

    `;
}


// ==========================================
// SUBMIT
// ==========================================

function submitDate() {

    const submission = {

        id: Date.now(),

        name:
            localStorage.getItem(
                "dateName"
            ),

        date:
            localStorage.getItem(
                "dateDate"
            ),

        time:
            localStorage.getItem(
                "dateTime"
            ),

        location:
            localStorage.getItem(
                "dateLocation"
            ),

        message:
            localStorage.getItem(
                "dateMessage"
            ),

        submittedAt:
            new Date().toLocaleString()

    };


    let submissions =
        JSON.parse(
            localStorage.getItem(
                "dateSubmissions"
            )
        ) || [];


    submissions.push(
        submission
    );


    localStorage.setItem(
        "dateSubmissions",
        JSON.stringify(
            submissions
        )
    );


    // Clear current form
    localStorage.removeItem(
        "dateName"
    );

    localStorage.removeItem(
        "dateDate"
    );

    localStorage.removeItem(
        "dateTime"
    );

    localStorage.removeItem(
        "dateLocation"
    );

    localStorage.removeItem(
        "dateMessage"
    );


    showPage("thanksPage");
}


// ==========================================
// FORMAT DATE
// ==========================================

function formatDate(date) {

    if (!date) {

        return "Not selected";

    }


    const d =
        new Date(
            date + "T00:00:00"
        );


    return d.toLocaleDateString(
        "en-US",
        {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        }
    );
}


// ==========================================
// FORMAT TIME
// ==========================================

function formatTime(time) {

    if (!time) {

        return "Not selected";

    }


    const parts =
        time.split(":");


    const d =
        new Date();


    d.setHours(
        Number(parts[0])
    );


    d.setMinutes(
        Number(parts[1])
    );


    return d.toLocaleTimeString(
        "en-US",
        {
            hour: "numeric",
            minute: "2-digit"
        }
    );
}


// ==========================================
// SECURITY
// ==========================================

function escapeHTML(value) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        value || "";


    return div.innerHTML;
}


// ==========================================
// RESTART
// ==========================================

function restart() {

    showPage("welcomePage");

}