const app = document.getElementById("app");

export function printDocuments() {
  let user = localStorage.getItem("username");

  let userName = {
    userName: user
  };

  fetch("http://localhost:3000/documents/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userName),
  })
    .then((res) => res.json())
    .then((documents) => {
      console.log(documents);

      let documentsWrapper = document.createElement("div");
      documentsWrapper.classList.add("documents-wrapper");

      let documentsList = document.createElement("ul");
      documentsList.classList.add("blogPosts");
      documentsList.innerHTML = "";

      documentsWrapper.appendChild(documentsList);

      documents.map((post) => {
        let li = document.createElement("li");
        li.id = post.documentId;

        let title = document.createElement("h2");
        let content = document.createElement("p");
        let editBtn = document.createElement("button");
        editBtn.innerText = "Redigera";

        title.innerHTML = `${post.documentTitle}`;
        content.innerHTML = `${post.documentContent}`;
        li.append(title, content, editBtn);
        documentsList.append(li);

        editBtn.addEventListener("click", () => {
          console.log("clicked" + li.id);
          app.innerHTML = "";
          editDocument(post, li);
        });
      });

      app.innerHTML = "";
      app.appendChild(documentsWrapper);
    });
}

function editDocument(post, li) {
  const txtArea = document.getElementById("textArea");

  txtArea.innerHTML = `        <label>Titel:</label>
          <input type="text" id="title" name="title"><br>
          <label>Innehåll:</label>
          <textarea id="textContent"></textarea>
          <button id="saveBtn">Spara</button>
          <div id="textResult"></div>`;

  const textContent = document.getElementById("textContent");
  const title = document.getElementById("title");

  textContent.innerHTML = `${post.documentContent}`;
  title.value = `${post.documentTitle}`;

  tinymce.init({
    selector: "#textContent",
    plugins: "code",
    toolbar: "undo redo | forecolor backcolor | styles | styleselect bold italic | alignleft alignright | code",

    setup: function (editor) {
      editor.on("change", function () {
        editor.save();
      });
    },
  });

  document.getElementById("saveBtn").addEventListener("click", function (e) {
    e.preventDefault();
    saveUpdatedDocument(textContent, title, li);
  });
}

function saveUpdatedDocument(textContent, title, li) {
  let content = {
    updatedContent: textContent.value,
    updatedTitle: title.value
  };

  console.log(content);

  fetch("http://localhost:3000/documents/" + li.id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(content),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      document.getElementById("textResult").innerHTML =
        "Dina ändringar är sparade!";
    });
}

