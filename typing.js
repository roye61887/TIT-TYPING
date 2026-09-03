// =====================================================
// TYPING COMPETITION 2026
// TYPING TEST - FINAL JAVASCRIPT
// =====================================================


// =====================================================
// GET HTML ELEMENTS
// =====================================================

const paragraph = document.getElementById("paragraph");
const paragraphBox = document.getElementById("paragraphBox");
const typingInput = document.getElementById("typingInput");

const timer = document.getElementById("timer");
const wpm = document.getElementById("wpm");
const accuracy = document.getElementById("accuracy");
const mistakes = document.getElementById("mistakes");
const characters = document.getElementById("characters");

const startBtn = document.getElementById("startBtn");
const logoutBtn = document.getElementById("logoutBtn");


// =====================================================
// RESULT POPUP ELEMENTS
// =====================================================

const resultPopup = document.getElementById("resultPopup");

const finalWPM = document.getElementById("finalWPM");
const finalAccuracy = document.getElementById("finalAccuracy");
const finalMistakes = document.getElementById("finalMistakes");
const finalCharacters = document.getElementById("finalCharacters");

const closePopup = document.getElementById("closePopup");


// =====================================================
// STUDENT INFORMATION
// =====================================================

const studentName = localStorage.getItem("studentName");
const studentMobile = localStorage.getItem("studentMobile");


// If student is not logged in
if (!studentName || !studentMobile) {

    window.location.href = "login.html";

}


// Display student name
const usernameElement = document.getElementById("username");

if (usernameElement) {

    usernameElement.textContent =
        "Welcome, " + studentName;

}


// =====================================================
// TYPING PARAGRAPH
// =====================================================

// Paragraph saved by Admin
let savedParagraph =
    localStorage.getItem("typingParagraph");


// Default paragraph
if (!savedParagraph || savedParagraph.trim() === "") {

    savedParagraph =
        "Education is the most powerful tool that can transform lives and build a better future. Every student should develop knowledge, confidence, discipline and practical skills to achieve success in life.";

}


// Clean paragraph
savedParagraph =
    savedParagraph.replace(/\s+/g, " ").trim();


// =====================================================
// LOAD PARAGRAPH
// =====================================================

function loadParagraph() {

    paragraph.textContent = savedParagraph;

    if (paragraphBox) {

        paragraphBox.scrollTop = 0;

    }

}


// Load paragraph
loadParagraph();


// =====================================================
// TEST VARIABLES
// =====================================================

const TEST_DURATION = 600; // 10 Minutes = 600 Seconds

let timeLeft = TEST_DURATION;

let timerInterval = null;

let gameStarted = false;

let testFinished = false;

let startTime = null;

let correctCharacters = 0;

let wrongCharacters = 0;

let totalCharacters = 0;


// =====================================================
// RESET TEST
// =====================================================

function resetTest() {

    clearInterval(timerInterval);

    timeLeft = TEST_DURATION;

    gameStarted = false;

    testFinished = false;

    startTime = null;

    correctCharacters = 0;

    wrongCharacters = 0;

    totalCharacters = 0;


    timer.textContent = "10:00";

    wpm.textContent = "0";

    accuracy.textContent = "100%";

    mistakes.textContent = "0";

    characters.textContent = "0";


    typingInput.value = "";

    typingInput.disabled = true;


    loadParagraph();

}


// =====================================================
// START TEST
// =====================================================

startBtn.addEventListener("click", function () {

    // Prevent multiple starts
    if (gameStarted) {

        return;

    }


    // Reset values
    resetTest();


    // Start game
    gameStarted = true;

    testFinished = false;

    startTime = Date.now();


    // Enable typing box
    typingInput.disabled = false;


    // Focus typing box
    typingInput.focus();


    // Start timer
    startTimer();

});


// =====================================================
// TIMER
// =====================================================

function startTimer() {

    clearInterval(timerInterval);


    timerInterval = setInterval(function () {

        timeLeft--;


        // Calculate minutes
        let minutes =
            Math.floor(timeLeft / 60);


        // Calculate seconds
        let seconds =
            timeLeft % 60;


        // Show timer
        timer.textContent =
            minutes + ":" +
            String(seconds).padStart(2, "0");


        // Time finished
        if (timeLeft <= 0) {

            clearInterval(timerInterval);

            finishTest("time");

        }


    }, 1000);

}


// =====================================================
// LIVE TYPING
// =====================================================

typingInput.addEventListener("input", function () {

    if (!gameStarted || testFinished) {

        return;

    }


    const originalText =
        paragraph.textContent;

    const typedText =
        typingInput.value;


    // Total characters typed
    totalCharacters =
        typedText.length;


    correctCharacters = 0;

    wrongCharacters = 0;


    let html = "";


    // =================================================
    // CHECK EACH CHARACTER
    // =================================================

    for (
        let i = 0;
        i < originalText.length;
        i++
    ) {

        const originalChar =
            originalText[i];


        // Character already typed
        if (i < typedText.length) {

            if (
                typedText[i] === originalChar
            ) {

                html +=
                    `<span class="correct">${escapeHTML(originalChar)}</span>`;

                correctCharacters++;


            } else {

                html +=
                    `<span class="incorrect">${escapeHTML(originalChar)}</span>`;

                wrongCharacters++;

            }


        // Current character
        } else if (
            i === typedText.length
        ) {

            html +=
                `<span class="current">${escapeHTML(originalChar)}</span>`;


        // Remaining characters
        } else {

            html +=
                escapeHTML(originalChar);

        }

    }


    // Update paragraph
    paragraph.innerHTML = html;


    // =================================================
    // CHARACTER
    // =================================================

    characters.textContent =
        totalCharacters;


    // =================================================
    // MISTAKES
    // =================================================

    mistakes.textContent =
        wrongCharacters;


    // =================================================
    // ACCURACY
    // =================================================

    let accuracyValue = 100;


    if (totalCharacters > 0) {

        accuracyValue =
            (
                correctCharacters /
                totalCharacters
            ) * 100;

    }


    accuracyValue =
        accuracyValue.toFixed(1);


    accuracy.textContent =
        accuracyValue + "%";


    // =================================================
    // WPM
    // =================================================

    updateWPM();


    // =================================================
    // AUTO SCROLL
    // =================================================

    const currentLetter =
        paragraph.querySelector(".current");


    if (currentLetter && paragraphBox) {

        paragraphBox.scrollTop =
            currentLetter.offsetTop - 100;

    }


    // =================================================
    // PARAGRAPH COMPLETED
    // =================================================

    if (
        typedText.length >=
        originalText.length
    ) {

        clearInterval(timerInterval);

        finishTest("completed");

    }

});


// =====================================================
// WPM CALCULATION
// =====================================================

function updateWPM() {

    if (!startTime) {

        wpm.textContent = "0";

        return;

    }


    // Time already used
    const elapsedSeconds =
        (Date.now() - startTime) / 1000;


    if (elapsedSeconds <= 0) {

        wpm.textContent = "0";

        return;

    }


    // Standard typing formula:
    // 5 characters = 1 word

    const words =
        correctCharacters / 5;


    const currentWPM =
        (words / elapsedSeconds) * 60;


    wpm.textContent =
        Math.max(
            0,
            Math.round(currentWPM)
        );

}


// =====================================================
// FINISH TEST
// =====================================================

function finishTest(reason) {

    // Prevent duplicate save
    if (testFinished) {

        return;

    }


    testFinished = true;

    gameStarted = false;


    clearInterval(timerInterval);


    typingInput.disabled = true;


    // Final WPM
    updateWPM();


    const finalWPMValue =
        Number(wpm.textContent) || 0;


    const finalAccuracyValue =
        parseFloat(
            accuracy.textContent
        ) || 0;


    const finalMistakesValue =
        Number(mistakes.textContent) || 0;


    const finalCharactersValue =
        Number(characters.textContent) || 0;


    // =================================================
    // SAVE RESULT
    // =================================================

    saveAttempt({

        name: studentName,

        mobile: studentMobile,

        wpm: finalWPMValue,

        accuracy: finalAccuracyValue,

        mistakes: finalMistakesValue,

        characters: finalCharactersValue,

        timeUsed:
            TEST_DURATION - timeLeft,

        timeRemaining:
            timeLeft,

        finishReason: reason,

        date:
            new Date().toLocaleString()

    });


    // =================================================
    // SHOW FINAL RESULT
    // =================================================

    if (finalWPM) {

        finalWPM.textContent =
            finalWPMValue;

    }


    if (finalAccuracy) {

        finalAccuracy.textContent =
            finalAccuracyValue + "%";

    }


    if (finalMistakes) {

        finalMistakes.textContent =
            finalMistakesValue;

    }


    if (finalCharacters) {

        finalCharacters.textContent =
            finalCharactersValue;

    }


    // Show popup
    if (resultPopup) {

        resultPopup.style.display =
            "flex";

    }

}


// =====================================================
// SAVE ATTEMPT FOR ADMIN
// =====================================================

function saveAttempt(result) {

    let typingResults =
        JSON.parse(
            localStorage.getItem(
                "typingResults"
            )
        ) || [];


    // Create unique attempt ID
    result.attemptId =
        "ATT-" +
        Date.now();


    // Save newest attempt
    typingResults.push(result);


    // Store all attempts
    localStorage.setItem(
        "typingResults",
        JSON.stringify(typingResults)
    );


    // Last result
    localStorage.setItem(
        "lastWPM",
        result.wpm
    );

    localStorage.setItem(
        "lastAccuracy",
        result.accuracy
    );

    localStorage.setItem(
        "lastMistakes",
        result.mistakes
    );

    localStorage.setItem(
        "lastCharacters",
        result.characters
    );

}


// =====================================================
// CLOSE RESULT POPUP
// =====================================================

if (closePopup) {

    closePopup.addEventListener(
        "click",
        function () {

            resultPopup.style.display =
                "none";

            window.location.href =
                "home.html";

        }
    );

}


// =====================================================
// LOGOUT
// =====================================================

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        function () {

            if (
                confirm(
                    "Do you really want to logout?"
                )
            ) {

                localStorage.removeItem(
                    "studentName"
                );

                localStorage.removeItem(
                    "studentMobile"
                );

                window.location.href =
                    "login.html";

            }

        }
    );

}


// =====================================================
// PREVENT COPY / PASTE
// =====================================================

typingInput.addEventListener(
    "paste",
    function (e) {

        e.preventDefault();

        alert(
            "Paste is not allowed during the typing test."
        );

    }
);


// =====================================================
// PREVENT COPY
// =====================================================

typingInput.addEventListener(
    "copy",
    function (e) {

        e.preventDefault();

    }
);


// =====================================================
// PREVENT CUT
// =====================================================

typingInput.addEventListener(
    "cut",
    function (e) {

        e.preventDefault();

    }
);


// =====================================================
// DISABLE RIGHT CLICK
// =====================================================

document.addEventListener(
    "contextmenu",
    function (e) {

        e.preventDefault();

    }
);


// =====================================================
// ESCAPE HTML
// =====================================================

function escapeHTML(text) {

    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


// =====================================================
// PAGE LOAD
// =====================================================

window.addEventListener(
    "load",
    function () {

        resetTest();

    }
);