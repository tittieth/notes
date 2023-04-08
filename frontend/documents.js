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

        documentsWrapper.appendChild(documentsList);

        documents.map(post => {
            let li = document.createElement("li");
            li.id = post.documentTitle;

            let title = document.createElement("h2");
            let content = document.createElement("p");
            let readMoreBtn = document.createElement("button");
            readMoreBtn.innerText = "Läs mer"

            title.innerHTML = `${post.documentTitle}`
            content.innerHTML = `${post.documentContent}`
            li.append(title, content, readMoreBtn)
            documentsList.append(li);

            readMoreBtn.addEventListener("click", () => {
                console.log("clicked");
            })
    })

    app.innerHTML = "";
    app.appendChild(documentsWrapper);
    });  
}