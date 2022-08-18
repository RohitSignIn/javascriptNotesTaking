const add = document.querySelector("#addNote");
const main = document.querySelector("#main");

add.addEventListener(
    "click", function() {
        addNote()
    }
);

const saveNotes = () => {
    const notes = document.querySelectorAll(".note textarea");
    const data = [];
    notes.forEach(
        (note) => {
            data.push(note.value);
        }
    )
    localStorage.setItem("notes", JSON.stringify(data)); 
}

const addNote = (text = "") => {
    const note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = `
        <div class="tool">
                <label for="save" class="save"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M433.1 129.1l-83.9-83.9C342.3 38.32 327.1 32 316.1 32H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h320c35.35 0 64-28.65 64-64V163.9C448 152.9 441.7 137.7 433.1 129.1zM224 416c-35.34 0-64-28.66-64-64s28.66-64 64-64s64 28.66 64 64S259.3 416 224 416zM320 208C320 216.8 312.8 224 304 224h-224C71.16 224 64 216.8 64 208v-96C64 103.2 71.16 96 80 96h224C312.8 96 320 103.2 320 112V208z"/></svg></label>
                <label for="trash" class="trash"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z"/></svg></label>
            </div>
        <textarea>${text}</textarea>`;

    note.querySelector(".trash").addEventListener(
        "click", function() {
            note.remove();
            saveNotes();
        }
    )   

    note.querySelector(".save").addEventListener(
        "click", function(){
            saveNotes();
        }
    )

    note.querySelector("textarea").addEventListener(
        "focusout", 
        function() {
            saveNotes();
        }
    )

    main.appendChild(note);
    saveNotes();
}

(
    function() {
        const lsnotes = JSON.parse(localStorage.getItem("notes"));
        if(lsnotes){
            if(lsnotes.length == 0){
                localStorage.removeItem("notes");
                addNote();
            }else{
                lsnotes.forEach(
                    (note) => {
                        addNote(note);
                    }
                )
            }
        }else{
            addNote();
        }                
    }
)();