/* ===================================
        ADMIN LOGIN SCRIPT
=================================== */

const adminForm = document.getElementById("adminForm");

const passwordInput = document.getElementById("adminPassword");

const errorMsg = document.getElementById("errorMsg");

const togglePassword = document.getElementById("togglePassword");

/* ===================================
        SHOW / HIDE PASSWORD
=================================== */

togglePassword.addEventListener("click", () => {

    if(passwordInput.type === "password"){

        passwordInput.type = "text";

        togglePassword.classList.remove("fa-eye");

        togglePassword.classList.add("fa-eye-slash");

    }

    else{

        passwordInput.type = "password";

        togglePassword.classList.remove("fa-eye-slash");

        togglePassword.classList.add("fa-eye");

    }

});

/* ===================================
        ADMIN LOGIN
=================================== */

adminForm.addEventListener("submit", function(e){

    e.preventDefault();

    const password = passwordInput.value.trim();

    /* Change Password Here */

    const adminPassword = "TIT@2026";

    if(password === ""){

        errorMsg.innerHTML =
        "⚠ Please enter Admin Password.";

        passwordInput.focus();

        return;

    }

    if(password !== adminPassword){

        errorMsg.innerHTML =
        "❌ Invalid Admin Password.";

        passwordInput.value = "";

        passwordInput.focus();

        return;

    }

    errorMsg.style.color = "#00ff99";

    errorMsg.innerHTML =
    "✅ Login Successful...";

    setTimeout(function(){

        window.location.href = "admin-dashboard.html";

    },1000);

});

/* ===================================
        ENTER KEY SUPPORT
=================================== */

passwordInput.addEventListener("keypress",function(e){

    if(e.key === "Enter"){

        adminForm.requestSubmit();

    }

});