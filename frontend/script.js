console.log("hello world");

import { printDocuments } from "./documents.js";
import { printLoginForm} from "./login.js";
import printNavBar from "./navbar.js";

if (localStorage.getItem("username")) {
    console.log("ÄR INLOGGAD");
    printDocuments();
    printNavBar();
} else {
    console.log("ÄR EJ INLOGGAD");
    printLoginForm();
}
