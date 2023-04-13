import { printDocuments } from "./documents.js";
import printNavBar from "./navbar.js";

let loginApp = document.querySelector("#loginApp");
let userMsg = document.querySelector("#userMsg");
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
    nameInput.placeholder = "name";
    let span = document.createElement("span");
    let labelName = document.createElement("label");

    let inputDivPassword = document.createElement("div");
    inputDivPassword.classList.add("txt_field");
    let passwordInput = document.createElement("input");
    passwordInput.setAttribute("type", "password");
    passwordInput.setAttribute("name", "password");
    passwordInput.setAttribute("id", "password");
    passwordInput.placeholder = "password";
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

    signUpBtn.addEventListener("click", () => {
        loggedInMsg.innerHTML = "";
        printSignUpForm();
    });

    loginBtn.addEventListener("click", () => {

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
                    userMsg.innerHTML = "";
                    loginApp.innerHTML = "";
                    loggedInMsg.innerHTML = `<h3>Du är nu inloggad ${data[0].userName}!<br>
                    Hoppas du har en fin dag!</h3>`;
                    localStorage.setItem("username", data[0].userName);
                    printDocuments();
                    printNavBar();
                }
                else {
                    userMsg.innerText = "Inloggning misslyckades, var vänlig och kontrollera användarnamn och lösenord."
                }
           });
        });

        loginApp.innerHTML = "";
        userMsg.innerText = "";
        loginApp.append(formDiv);
}

    function printSignUpForm() {
    loginApp.innerHTML = "";
    userMsg.innerText = "";

    let signupFormDiv = document.createElement("div");
    signupFormDiv.classList.add("signup-form");

    let signupHeader = document.createElement("h1");
    signupHeader.innerText = "Signup!";

    let newUserName = document.createElement("input");
    newUserName.setAttribute("type", "text");
    newUserName.setAttribute("name", "name");
    newUserName.setAttribute("id", "newUserName");
    newUserName.placeholder= "name";

    let newUserPassword = document.createElement("input");
    newUserPassword .setAttribute("type", "password");
    newUserPassword .setAttribute("name", "password");
    newUserPassword .setAttribute("id", "newUserpassword");
    newUserPassword.placeholder = "password";

    let newUserEmail = document.createElement("input");
    newUserEmail.setAttribute("type", "text");
    newUserEmail.setAttribute("name", "email");
    newUserEmail.setAttribute("id", "newUserEmail");
    newUserEmail.placeholder= "email";

    let saveNewUserBtn = document.createElement("button");
    saveNewUserBtn.setAttribute("id", "newUserBtn");
    saveNewUserBtn.classList.add("new-user-btn");
    saveNewUserBtn.innerText = "Save";

    signupFormDiv.append(signupHeader, newUserName, newUserPassword, newUserEmail, saveNewUserBtn);
    loginApp.append(signupFormDiv);

    saveNewUserBtn.addEventListener("click", () => {
        // SKAPA EN NY ANVÄNDARE
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
       });
    })
}   

