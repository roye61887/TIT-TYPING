// ===================================
// ADMIN DASHBOARD
// ===================================

const tableBody = document.getElementById("tableBody");

const searchInput = document.getElementById("searchStudent");

const logoutBtn = document.getElementById("logoutBtn");

const refreshBtn = document.getElementById("refreshBtn");

const totalParticipants =
    document.getElementById("totalParticipants");

const leaderboardCount =
    document.getElementById("leaderboardCount");

const resultCount =
    document.getElementById("resultCount");

const averageWpm =
    document.getElementById("averageWpm");


// ===================================
// PARAGRAPH MANAGER
// ===================================

const paragraphInput =
    document.getElementById("paragraphInput");

const saveParagraphBtn =
    document.getElementById("saveParagraphBtn");


// ===================================
// LOAD SAVED PARAGRAPH
// ===================================

const savedParagraph =
    localStorage.getItem("typingParagraph");

if (savedParagraph) {

    paragraphInput.value = savedParagraph;

}


// ===================================
// SAVE PARAGRAPH
// ===================================

if (saveParagraphBtn) {

    saveParagraphBtn.addEventListener("click", () => {

        let text =
            paragraphInput.value.trim();


        if (text === "") {

            alert("Please enter a paragraph.");

            return;

        }


        // Remove Enter
        text =
            text.replace(/\r?\n+/g, " ");


        // Remove extra spaces
        text =
            text.replace(/\s+/g, " ").trim();


        localStorage.setItem(
            "typingParagraph",
            text
        );


        paragraphInput.value = text;


        alert(
            "Paragraph saved successfully."
        );

    });

}


// ===================================
// LOAD STUDENT RESULTS
// ===================================

let students =
    JSON.parse(
        localStorage.getItem("typingResults")
    ) || [];


// ===================================
// FORMAT TIME
// ===================================

function formatTime(seconds) {

    seconds = Number(seconds) || 0;


    let minutes =
        Math.floor(seconds / 60);


    let secs =
        seconds % 60;


    return (
        minutes +
        ":" +
        String(secs).padStart(2, "0")
    );

}


// ===================================
// GET STUDENT TIME
// ===================================

function getStudentTime(student) {

    /*
       New typing.js stores:

       timeUsed

       Example:
       114 seconds
       = 1:54
    */


    if (
        student.timeUsed !== undefined &&
        student.timeUsed !== null
    ) {

        return formatTime(
            student.timeUsed
        );

    }


    // Old data compatibility
    if (
        student.time !== undefined &&
        student.time !== null
    ) {

        return formatTime(
            student.time
        );

    }


    return "0:00";

}


// ===================================
// RENDER TABLE
// ===================================

function renderTable(data) {

    tableBody.innerHTML = "";


    if (data.length === 0) {

        tableBody.innerHTML = `

            <tr>

                <td colspan="8">

                    No Student Found

                </td>

            </tr>

        `;


        updateDashboard([]);

        return;

    }


    // Sort by WPM
    data.sort(
        (a, b) =>
            Number(b.wpm) -
            Number(a.wpm)
    );


    data.forEach(
        (student, index) => {

            tableBody.innerHTML += `

                <tr>

                    <td>
                        ${index + 1}
                    </td>

                    <td>
                        ${student.name || "-"}
                    </td>

                    <td>
                        ${student.mobile || "-"}
                    </td>

                    <td>
                        ${student.wpm || 0}
                    </td>

                    <td>
                        ${student.accuracy || 0}%
                    </td>

                    <td>
                        ${student.mistakes || 0}
                    </td>

                    <td>
                        ${getStudentTime(student)}
                    </td>

                    <td>

                        <button
                            class="deleteBtn"
                            onclick="deleteStudent(${students.indexOf(student)})"
                        >

                            <i class="fa-solid fa-trash"></i>

                            Delete

                        </button>

                    </td>

                </tr>

            `;

        }
    );


    updateDashboard(data);

}


// ===================================
// UPDATE DASHBOARD
// ===================================

function updateDashboard(data) {

    totalParticipants.textContent =
        data.length;

    leaderboardCount.textContent =
        data.length;

    resultCount.textContent =
        data.length;


    if (data.length === 0) {

        averageWpm.textContent = 0;

        return;

    }


    let totalWpm = 0;


    data.forEach(student => {

        totalWpm +=
            Number(student.wpm) || 0;

    });


    averageWpm.textContent =
        Math.round(
            totalWpm / data.length
        );

}


// ===================================
// SEARCH STUDENT
// ===================================

searchInput.addEventListener(
    "keyup",
    () => {

        const value =
            searchInput.value
                .toLowerCase()
                .trim();


        const filtered =
            students.filter(student => {

                const name =
                    String(
                        student.name || ""
                    ).toLowerCase();


                const mobile =
                    String(
                        student.mobile || ""
                    );


                return (
                    name.includes(value) ||
                    mobile.includes(value)
                );

            });


        renderTable(filtered);

    }
);


// ===================================
// DELETE STUDENT
// ===================================

function deleteStudent(index) {

    if (
        confirm(
            "Are you sure you want to delete this student?"
        )
    ) {

        students.splice(index, 1);


        localStorage.setItem(
            "typingResults",
            JSON.stringify(students)
        );


        renderTable(students);


        alert(
            "Student deleted successfully."
        );

    }

}


// ===================================
// REFRESH
// ===================================

if (refreshBtn) {

    refreshBtn.onclick = function () {

        location.reload();

    };

}


// ===================================
// ADMIN LOGOUT
// ===================================

if (logoutBtn) {

    logoutBtn.onclick = function () {

        if (
            confirm(
                "Logout Admin?"
            )
        ) {

            window.location.href =
                "home.html";

        }

    };

}


// ===================================
// EXPORT PDF
// ===================================

const pdfBtn =
    document.getElementById("pdfBtn");

if (pdfBtn) {

    pdfBtn.addEventListener(
        "click",
        () => {

            window.print();

        }
    );

}


// ===================================
// EXPORT EXCEL / CSV
// ===================================

const excelBtn =
    document.getElementById("excelBtn");

if (excelBtn) {

    excelBtn.addEventListener(
        "click",
        () => {

            let csv =
                "Rank,Name,Mobile,WPM,Accuracy,Mistakes,Time Used,Date\n";


            let sortedStudents =
                [...students].sort(
                    (a, b) =>
                        Number(b.wpm) -
                        Number(a.wpm)
                );


            sortedStudents.forEach(
                (student, index) => {

                    csv +=
                        `${index + 1},` +
                        `"${student.name || ""}",` +
                        `"${student.mobile || ""}",` +
                        `${student.wpm || 0},` +
                        `${student.accuracy || 0}%,` +
                        `${student.mistakes || 0},` +
                        `${getStudentTime(student)},` +
                        `"${student.date || ""}"\n`;

                }
            );


            const blob =
                new Blob(
                    [csv],
                    {
                        type:
                            "text/csv;charset=utf-8;"
                    }
                );


            const url =
                URL.createObjectURL(blob);


            const a =
                document.createElement("a");


            a.href = url;


            a.download =
                "Typing_Competition_Result.csv";


            document.body.appendChild(a);


            a.click();


            document.body.removeChild(a);


            URL.revokeObjectURL(url);

        }
    );

}


// ===================================
// SORT LEADERBOARD
// ===================================

function sortLeaderboard() {

    students.sort(
        (a, b) =>
            Number(b.wpm) -
            Number(a.wpm)
    );


    renderTable(students);

}


// ===================================
// AUTO UPDATE
// ===================================

setInterval(() => {

    students =
        JSON.parse(
            localStorage.getItem(
                "typingResults"
            )
        ) || [];


    renderTable(students);

}, 3000);


// ===================================
// PAGE LOAD
// ===================================

window.addEventListener(
    "load",
    () => {

        students =
            JSON.parse(
                localStorage.getItem(
                    "typingResults"
                )
            ) || [];


        renderTable(students);

    }
);