// ==============================
// ELEMENTS
// ==============================

const form = document.getElementById("loginForm");
const nameInput = document.getElementById("name");
const mobileInput = document.getElementById("mobile");

const nameError = document.getElementById("nameError");
const mobileError = document.getElementById("mobileError");

const btn = document.getElementById("loginBtn");
const btnText = document.getElementById("btnText");
const loader = document.getElementById("loader");

const popup = document.getElementById("successPopup");

// ==============================
// REGEX
// ==============================

const nameRegex = /^[A-Za-z ]+$/;
const mobileRegex = /^[6-9]\d{9}$/;

// ==============================
// REMOVE ERROR
// ==============================

function clearErrors() {

    nameError.textContent = "";
    mobileError.textContent = "";

    nameInput.style.borderColor = "#d9d9d9";
    mobileInput.style.borderColor = "#d9d9d9";

}

// ==============================
// SHAKE EFFECT
// ==============================

function shake(element){

    element.classList.add("shake");

    setTimeout(()=>{
        element.classList.remove("shake");
    },300);

}

// ==============================
// NAME VALIDATION
// ==============================

function validateName(){

    let name = nameInput.value.trim();

    if(name===""){

        nameError.textContent="Please Enter Your Full Name";
        nameInput.style.borderColor="red";
        shake(nameInput);
        return false;

    }

    if(name.length<3){

        nameError.textContent="Minimum 3 Characters Required";
        nameInput.style.borderColor="red";
        shake(nameInput);
        return false;

    }

    if(!nameRegex.test(name)){

        nameError.textContent="Only Letters & Spaces Allowed";
        nameInput.style.borderColor="red";
        shake(nameInput);
        return false;

    }

    nameInput.style.borderColor="green";
    nameError.textContent="";
    return true;

}

// ==============================
// MOBILE VALIDATION
// ==============================

function validateMobile(){

    let mobile = mobileInput.value.trim();

    if(mobile===""){

        mobileError.textContent="Please Enter Mobile Number";
        mobileInput.style.borderColor="red";
        shake(mobileInput);
        return false;

    }

    if(!/^\d+$/.test(mobile)){

        mobileError.textContent="Only Numbers Allowed";
        mobileInput.style.borderColor="red";
        shake(mobileInput);
        return false;

    }

    if(mobile.length!==10){

        mobileError.textContent="Mobile Number Must Be 10 Digits";
        mobileInput.style.borderColor="red";
        shake(mobileInput);
        return false;

    }

    if(!mobileRegex.test(mobile)){

        mobileError.textContent="Invalid Mobile Number";
        mobileInput.style.borderColor="red";
        shake(mobileInput);
        return false;

    }

    mobileInput.style.borderColor="green";
    mobileError.textContent="";
    return true;

}

// ==============================
// INPUT EVENTS
// ==============================

nameInput.addEventListener("keyup",validateName);
mobileInput.addEventListener("keyup",validateMobile);

mobileInput.addEventListener("input",()=>{

    mobileInput.value=mobileInput.value.replace(/\D/g,"");

});

// ==============================
// FORM SUBMIT
// ==============================

form.addEventListener("submit",function(e){

    e.preventDefault();

    clearErrors();

    let validName=validateName();
    let validMobile=validateMobile();

    if(validName && validMobile){

        btn.disabled=true;

        btnText.style.display="none";
        loader.style.display="inline-block";

        localStorage.setItem("studentName",nameInput.value.trim());
        localStorage.setItem("studentMobile",mobileInput.value.trim());

        setTimeout(()=>{

            loader.style.display="none";
            btnText.style.display="inline-block";

            popup.style.display="flex";

        },1800);

        setTimeout(()=>{

            window.location.href="home.html";

        },3500);

    }

});

// ==============================
// ENTER KEY
// ==============================

document.addEventListener("keydown",(e)=>{

    if(e.key==="Enter"){

        form.requestSubmit();

    }

});

// ==============================
// AUTO FOCUS
// ==============================

window.onload=()=>{

    nameInput.focus();

};