import { printDocuments } from "./documents.js";
import printNavBar from "./navbar.js";

let loginApp = document.querySelector("#loginApp");
export let userMsg = document.querySelector("#userMsg");
let loggedInMsg = document.querySelector("#loggedInMsg");

export function printLoginForm() {
    // SKAPA VY FÖR ATT LOGGA IN
    let formDiv = document.createElement("div");
    formDiv.classList.add("log-in-form");

    let formWrapper = document.createElement("div");
    formWrapper.setAttribute("id", "formId");
    formWrapper.classList.add("form-wrapper")

    let loginDiv = document.createElement("div");
    loginDiv.classList.add("login-div")

    let inputDivName = document.createElement("div");
    inputDivName.classList.add("txt_field");
    let nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("name", "name");
    nameInput.setAttribute("id", "name");
    nameInput.placeholder = "Användarnamn";
    let span = document.createElement("span");
    let labelName = document.createElement("label");

    let inputDivPassword = document.createElement("div");
    inputDivPassword.classList.add("txt_field");
    let passwordInput = document.createElement("input");
    passwordInput.setAttribute("type", "password");
    passwordInput.setAttribute("name", "password");
    passwordInput.setAttribute("id", "password");
    passwordInput.placeholder = "Lösenord";
    let spanTwo = document.createElement("span");
    let labelPassword = document.createElement("label");

    let loginBtn = document.createElement("button");
    loginBtn.setAttribute("id", "loginBtn");
    loginBtn.classList.add("login-btn");
    loginBtn.innerText = "Logga in";

    let signUpDiv = document.createElement("div");
    signUpDiv.classList.add("signup-div");

    let signUpBtn = document.createElement("button");
    signUpBtn.setAttribute("id", "signUpBtn");
    signUpBtn.classList.add("signup-btn")
    signUpBtn.innerText = "Skapa konto";

    inputDivName.append(nameInput, span, labelName);
    inputDivPassword.append(passwordInput, spanTwo, labelPassword);
    loginDiv.append(inputDivName, inputDivPassword, loginBtn)
    signUpDiv.append(signUpBtn);
    formWrapper.append(loginDiv, signUpDiv);
    formDiv.append(formWrapper);

    signUpBtn.addEventListener("click", (e) => {
        e.preventDefault();
        loggedInMsg.innerHTML = "";
        printSignUpForm();
    });

    loginBtn.addEventListener("click", (e) => {
        e.preventDefault();

        let loginUser = {
            userName: nameInput.value,
            userPassword: passwordInput.value
        }

        console.log(loginUser);
        
        fetch("http://localhost:3000/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }, 
            body: JSON.stringify(loginUser)
           })
           .then(res => res.json())
           .then(data => {
                if (data[0].userName) {
                    console.log(data);
                    console.log(data.userName);
                    localStorage.setItem("username", data[0].userName);
                    userMsg.innerText = "";
                    userMsg.style.display = "none";
                    loginApp.innerHTML = "";
                    loggedInMsg.innerHTML = `<h3>Du är nu inloggad ${data[0].userName}!<br>
                    Välkommen tillbaka!</h3><div><img src="./img/logo-folder.png" alt="" width="250" height="200"</div>`;
                    printDocuments();
                    printNavBar();
                }
                else {
                    userMsg.innerText = "Inloggning misslyckades, var vänlig och kontrollera användarnamn och lösenord."
                    userMsg.style.display = "block";
                }
           });
        });

        loginApp.innerHTML = "";
        loginApp.append(formDiv);
}

    function printSignUpForm() {
    loginApp.innerHTML = "";
    userMsg.innerText = "";
    userMsg.style.display = "none";

    let signupFormDiv = document.createElement("div");
    signupFormDiv.classList.add("signup-form");

    let signupHeader = document.createElement("h1");
    signupHeader.innerText = "Skapa konto!";

    let newUserName = document.createElement("input");
    newUserName.setAttribute("type", "text");
    newUserName.setAttribute("name", "name");
    newUserName.setAttribute("id", "newUserName");
    newUserName.placeholder= "Användarnamn";

    let newUserPassword = document.createElement("input");
    newUserPassword .setAttribute("type", "password");
    newUserPassword .setAttribute("name", "password");
    newUserPassword .setAttribute("id", "newUserpassword");
    newUserPassword.placeholder = "Lösenord";

    let newUserEmail = document.createElement("input");
    newUserEmail.setAttribute("type", "text");
    newUserEmail.setAttribute("name", "email");
    newUserEmail.setAttribute("id", "newUserEmail");
    newUserEmail.placeholder= "Email";

    let saveNewUserBtn = document.createElement("button");
    saveNewUserBtn.setAttribute("id", "newUserBtn");
    saveNewUserBtn.classList.add("new-user-btn");
    saveNewUserBtn.innerText = "Spara";

    signupFormDiv.append(signupHeader, newUserName, newUserPassword, newUserEmail, saveNewUserBtn);
    loginApp.append(signupFormDiv);

    saveNewUserBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const validateEmail= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!validateEmail.test(newUserEmail.value)) {
            userMsg.innerText = "Ogiltig emailadress"
            userMsg.style.display = "block";
            return;
        }
        if (newUserPassword.value.trim() === "") {
            userMsg.innerText = "Du måste fylla i lösenord";
            userMsg.style.display = "block";
            return;
        }

        saveNewUser(newUserName, newUserPassword, newUserEmail);
    })
}   


function saveNewUser(newUserName, newUserPassword, newUserEmail) {
    // Kontrollera om användarnamet redan finns
    fetch("http://localhost:3000/users/" + newUserName.value)
        .then(res => res.json())
        .then(data => {
            if (data.length > 0) {
                userMsg.innerText = "Användarnamnet är upptaget, var god välj ett annat";
                userMsg.style.display = "block";
                return;
            }

            let user = { newUserName: newUserName.value, newUserPassword: newUserPassword.value, newUserEmail: newUserEmail.value };
            console.log(user);

            // SKICKA TILL SERVERN
            fetch("http://localhost:3000/users/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    printLoginForm();
                    userMsg.innerText = "Ny användare skapad";
                    userMsg.style.display = "block";
                });
        });
}

