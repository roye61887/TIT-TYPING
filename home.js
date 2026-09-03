// ===========================
// Get Login User Name
// ===========================

const user = localStorage.getItem("studentName");

// যদি Login না করে Home Page খোলে
if (!user) {
    window.location.href = "login.html";
}

// Welcome Text
document.getElementById("welcome").innerHTML = `Welcome To, ${user}`;

// ===========================
// Start Game Button
// ===========================

document.getElementById("startBtn").addEventListener("click", function () {

    // Typing Test Page
    window.location.href = "typing.html";

});

// ===========================
// Logout Button
// ===========================

document.getElementById("logoutBtn").addEventListener("click", function () {

    let confirmLogout = confirm("Are you sure you want to logout?");

    if (confirmLogout) {

        localStorage.removeItem("studentName");
        localStorage.removeItem("studentMobile");

        window.location.href = "login.html";
    }

});