console.log("hello world");

import { printLoginForm, printLogoutBtn} from "./login.js";

if (localStorage.getItem("username")) {
    console.log("ÄR INLOGGAD");
    printLogoutBtn();
} else {
    console.log("ÄR EJ INLOGGAD");
    printLoginForm();
}
