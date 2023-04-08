const app = document.getElementById("app");


export default function printDocuments() {
    fetch("http://localhost:3000/documents")
    .then(res => res.json())
    .then(documents => {
        console.log(documents);

        let documentsWrapper = document.createElement("div");
        documentsWrapper.classList.add("documents-wrapper");

        let documentsList = document.createElement("ul");
        documentsList.classList.add("blogPosts");
        documentsList.innerHTML = "";

        let readMoreBtn = document.createElement("button");
        readMoreBtn.innerText = "Läs mer"

        documentsWrapper.appendChild(documentsList);

        documents.map(post => {
            let li = document.createElement("li");
            li.id = post.documentTitle;
            li.innerHTML = `<h2>${post.documentTitle}</h2><p>${post.documentContent}</p><button>Läs mer</button>`;
            documentsList.append(li);
    })

    app.innerHTML = "";
    app.appendChild(documentsWrapper);
    });  
}