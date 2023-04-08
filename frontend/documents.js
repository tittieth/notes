const app = document.getElementById("app");


export default function printDocuments() {
    fetch("http://localhost:3000/documents")
    .then(res => res.json())
    .then(documents => {
        console.log(documents);

        let documentsWrapper = document.createElement("div");
        let documentsList = document.createElement("ul");
        documentsList.classList.add("blogPosts");
        documentsList.innerHTML = "";
        documentsWrapper.appendChild(documentsList);

        documents.map(post => {
            let li = document.createElement("li");
            li.id = post.documentTitle;
            li.innerHTML = `<h1>${post.documentTitle}</h1><p>${post.documentContent}</p>`;
            documentsList.appendChild(li);
    })

    app.innerHTML = "";
    app.appendChild(documentsWrapper);
    });  
}