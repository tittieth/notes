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
      documentsList.classList.add("documents");
      documentsList.innerHTML = "";

      documentsWrapper.appendChild(documentsList);

      documents.map((post) => {
        let li = document.createElement("li");
        li.id = post.documentId;

        let title = document.createElement("h2");
        let content = document.createElement("p");
        // let editBtn = document.createElement("button");
        // editBtn.innerText = "Redigera";
        let showMoreBtn = document.createElement("button");
        showMoreBtn.innerText = "Visa dokument";

        title.innerHTML = `${post.documentTitle}`;
        content.innerHTML = `${post.documentDescription}`;
        li.append(title, content, showMoreBtn);
        documentsList.append(li);

        showMoreBtn.addEventListener("click", (e) => {
          e.preventDefault(); 
          console.log("showmorebutton" + li.id);
          showDocumentContent(post, li);
        })
      });

      app.innerHTML = "";
      app.appendChild(documentsWrapper);
    });
}

function showDocumentContent(post, li) {
  app.innerHTML = "";

  let wrapper = document.createElement("div");
  wrapper.classList.add("document-wrapper");

  let div = document.createElement("div");
  div.classList.add("documentContent");
  div.innerHTML = `${post.documentContent}`;

  let buttonDiv = document.createElement("div");
  buttonDiv.classList.add("buttons-wrapper");

  let editBtn = document.createElement("button");
  editBtn.innerText = "Redigera";

  let eraseBtn = document.createElement("button");
  eraseBtn.innerText = "Radera";

  buttonDiv.append(eraseBtn, editBtn);
  wrapper.append(div, buttonDiv);
  app.append(wrapper);

  editBtn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("clicked" + li.id);
    app.innerHTML = "";
    editDocument(post, li);
  });

  eraseBtn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(("erase" + li.id));

    fetch("http://localhost:3000/documents/" + li.id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        userMsg.innerText = "Dokumentet har blivit raderat!";
        userMsg.style.display = "block";
        app.innerHTML = "";
      });
  });
}

function editDocument(post, li) {
  const txtArea = document.getElementById("textArea");

  txtArea.innerHTML = `        <label>Titel:</label><br>
          <input type="text" id="title" name="title"><br>
          <label>Beskrivning:</label><br>
          <input type="text" id="description" name="description"><br>
          <label>Innehåll:</label>
          <textarea id="textContent"></textarea>
          <button id="saveBtn" class="save-btn">Spara</button>
          <div id="textResult"></div>`;

  const textContent = document.getElementById("textContent");
  const title = document.getElementById("title");
  const documentDescription = document.getElementById("description");

  textContent.innerHTML = `${post.documentContent}`;
  title.value = `${post.documentTitle}`;
  documentDescription.value = `${post.documentDescription}`;

  tinymce.init({
    selector: "#textContent",
    plugins: "code",
    force_br_newlines : true,
    convert_newlines_to_brs : false,
    remove_linebreaks : true,    
    toolbar: "undo redo | forecolor backcolor | styles | styleselect bold italic | alignleft alignright | code",

    setup: function (editor) {
      editor.on("change", function () {
        editor.save();
      });
    },
  });

  document.getElementById("saveBtn").addEventListener("click", function (e) {
    e.preventDefault();
    saveUpdatedDocument(textContent, title, documentDescription, li);
  });
}

function saveUpdatedDocument(textContent, title, documentDescription, li) {
  let content = {
    updatedContent: textContent.value,
    updatedTitle: title.value,
    updatedDescription: documentDescription.value
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
      userMsg.innerText = "Ändringarna sparades!";
      userMsg.style.display = "block";
    });
}

