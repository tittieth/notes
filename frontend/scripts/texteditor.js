const txtArea = document.getElementById("textArea");

export default function printTextEditor() {
    txtArea.innerHTML = `        <label>Titel:</label><br>
    <input type="text" id="title" name="title"><br>
    <label>Beskrivning:</label><br>
    <input type="text" id="description" name="description"><br>
    <label>Innehåll:</label>
    <textarea id="textContent"></textarea>
    <button id="saveBtn">Spara</button>
    <div id="textResult"></div>`

    tinymce.init({
        selector: "#textContent",
        plugins: "code",
        force_p_newlines : false,
        force_br_newlines : true,
        convert_newlines_to_brs : false,
        remove_linebreaks : true,  
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
            newDocumentDescription: document.getElementById("description").value,
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