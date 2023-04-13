const txtArea = document.getElementById("textArea");

export default function printTextEditor() {
    txtArea.innerHTML = `        <label>Titel:</label><br>
    <input type="text" id="title" name="title"><br>
    <label>Innehåll:</label>
    <textarea id="textContent"></textarea>
    <button id="saveBtn">Spara</button>
    <div id="textResult"></div>`

    tinymce.init({
        selector: "#textContent",
        plugins: "code",
        toolbar: "undo redo | forecolor backcolor | styles | styleselect bold italic | alignleft alignright | code",
    
        setup: function(editor) {
            editor.on("change", function() {
                editor.save();
            })
        }
    })

    document.getElementById("saveBtn").addEventListener("click", function(e) {
        e.preventDefault();
    
        let user = localStorage.getItem("username");
        console.log(user);
    
        let newDocument = {
            userName: user,
            newDocumentTitle: document.getElementById("title").value,
            newDocumentContent: tinymce.activeEditor.getContent()
        }
    
        console.log(newDocument);
    
        fetch("http://localhost:3000/documents/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newDocument),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            document.getElementById("textResult").innerHTML = "Dokumentet sparades!";
          });
    })
}