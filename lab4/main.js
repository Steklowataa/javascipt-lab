document.addEventListener("DOMContentLoaded", function () {
    const notesContainer = document.getElementById("notes-container");
    const noteForm = document.getElementById("note-form");
    const searchInput = document.getElementById("search");

    let notes = JSON.parse(localStorage.getItem("notes")) || [];

    function saveNotes() {
        localStorage.setItem("notes", JSON.stringify(notes));
    }

    function renderNotes(filteredNotes = null) {
        notesContainer.innerHTML = "";
        let displayNotes = filteredNotes || [...notes].sort((a, b) => b.pinned - a.pinned);

        displayNotes.forEach((note, index) => {
            const noteElement = document.createElement("div");
            noteElement.classList.add("note");
            noteElement.style.backgroundColor = note.color;
            noteElement.innerHTML = `
                <h3>${note.title}</h3>
                <p>${note.content}</p>
                <p><small>${note.date}</small></p>
                <p><strong>Tags:</strong> ${note.tags.join(", ")}</p>
                <button onclick="togglePin(${index})">${note.pinned ? "Unpin" : "Pin"}</button>
                <button onclick="editNote(${index})">Edit</button>
                <button onclick="deleteNote(${index})">Delete</button>
            `;
            notesContainer.appendChild(noteElement);
        });
    }

    function addNote(title, content, color, tags, pinned) {
        notes.push({
            title,
            content,
            color,
            tags,
            pinned,
            date: new Date().toLocaleString(),
        });
        saveNotes();
        renderNotes();
    }

    window.deleteNote = function(index) {
        notes.splice(index, 1);
        saveNotes();
        renderNotes();
    }

    window.editNote = function(index) {
        let note = notes[index];
        let newTitle = prompt("Edit Title:", note.title);
        let newContent = prompt("Edit Content:", note.content);
        let newTags = prompt("Edit Tags (comma separated):", note.tags.join(", ")).split(",").map(tag => tag.trim());

        if (newTitle && newContent) {
            notes[index] = { ...note, title: newTitle, content: newContent, tags: newTags };
            saveNotes();
            renderNotes();
        }
    }

    window.togglePin = function(index) {
        notes[index].pinned = !notes[index].pinned;
        saveNotes();
        renderNotes();
    }

    noteForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const title = document.getElementById("title").value;
        const content = document.getElementById("content").value;
        const color = document.getElementById("color").value;
        const tags = document.getElementById("tags").value.split(",").map(tag => tag.trim());
        const pinned = document.getElementById("pin").checked;

        if (title && content) {
            addNote(title, content, color, tags, pinned);
            noteForm.reset();
        }
    });

    searchInput.addEventListener("input", function () {
        let query = searchInput.value.toLowerCase();
        let filteredNotes = notes.filter(note => 
            note.title.toLowerCase().includes(query) ||
            note.content.toLowerCase().includes(query) ||
            note.tags.some(tag => tag.toLowerCase().includes(query))
        );
        renderNotes(filteredNotes);
    });

    renderNotes();
});
