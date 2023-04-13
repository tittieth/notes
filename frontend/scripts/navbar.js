import { printLoginForm } from "./login.js";
import { printDocuments } from "./documents.js";
import printTextEditor from "./texteditor.js";

const nav = document.getElementById("nav");
const app = document.getElementById("app");
const txtArea = document.getElementById("textArea");

export default function printNavBar() {
  const navLinks = document.createElement("ul");
  navLinks.classList.add("nav-ul")
  navLinks.innerHTML = `
    <li class="show-documents-link"><a href="#">Visa Dokument</a></li>
    <li class="create-new-document-link"><a href="#">Skapa nytt dokument</a></li>
    <li class="log-out"><a href="#">Logga ut</a></li>
    `;

  nav.append(navLinks);

  navLinks.addEventListener("click", (e) => {
    if (e.target.parentNode.classList.contains("show-documents-link")) {
      console.log("show document button clicked");
      app.innerHTML = ""; 
      txtArea.innerHTML = "";
      printDocuments();
    }
    if (e.target.parentNode.classList.contains("create-new-document-link")) {
      console.log("new document button clicked");
      app.innerHTML = "";
      printTextEditor();
    }
    if (e.target.parentNode.classList.contains("log-out")) {
      console.log("logout button clicked");

      localStorage.removeItem("username");
      userMsg.innerText = "";
      txtArea.innerHTML = "";
      loggedInMsg.innerHTML = "";
      printLoginForm();

      nav.innerHTML = "";
      app.innerHTML = `<h1>Mina Dokument</h1>
      <div class="folder-img"><img src="./img/logo-folder.png" alt="" width="850" height="700"></div>`;
    }
  });
}
