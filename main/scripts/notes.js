/**
 * Function to create and display a popup for creating a new note.
 * The popup includes a textarea for the note content and two buttons:
 * "Create Note" to save the note and "Close" to close the popup.
 */
function popup() {
    // Create a new div element for the popup container
    const popupContainer = document.createElement("div");
    // Set the innerHTML of the popup container to the HTML template for the popup
    popupContainer.innerHTML = `
    <div id="popupContainer">
        <h1>New Note</h1>
        <textarea id="note-text" placeholder="Enter your note..."></textarea>
        <div id="btn-container">
            <button id="submitBtn" onclick="createNote()">Create Note</button>
            <button id="closeBtn" onclick="closePopup()">Close</button>
        </div>
    </div>
    `;
    // Append the popup container to the body of the document
    document.body.appendChild(popupContainer);
}

/**
 * Function to close the popup container.
 * Removes the popup container from the document.
 */
function closePopup() {
    // Get the popup container element
    const popupContainer = document.getElementById("popupContainer");
    // If the popup container exists, remove it from the document
    if(popupContainer) {
        popupContainer.remove();
    }
}

/**
 * Function to create a new note and save it to local storage.
 */
function createNote() {
    // Get the popup container element
    const popupContainer = document.getElementById('popupContainer');
    // Get the text from the note textarea
    const noteText = document.getElementById('note-text').value;
    // If the note text is not empty, create a new note object and add it to existing notes
    if (noteText.trim() !== '') {
        const note = {
            // Generate a unique id for the note using the current timestamp
            id: new Date().getTime(),
            // Set the note text to the value from the note textarea
            text: noteText
        };
        // Get the existing notes from local storage or initialize an empty array
        const existingNotes = JSON.parse(localStorage.getItem('notes')) || [];
        // Add the new note to the existing notes array
        existingNotes.push(note);
        // Save the updated notes array to local storage
        localStorage.setItem('notes', JSON.stringify(existingNotes));
        // Clear the note textarea
        document.getElementById('note-text').value = '';
        // Remove the popup container from the document
        popupContainer.remove();
        // Display the updated notes
        displayNotes();
    }
}

function displayNotes() {
    const notesList = document.getElementById('notes-list');
    notesList.innerHTML = '';

    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    notes.forEach(note => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
        <span>${note.text}</span>
        <div id="noteBtns-container">
            <button id="editBtn" onclick="editNote(${note.id})"><i class="fa-solid fa-pen"></i></button>
            <button id="deleteBtn" onclick="deleteNote(${note.id})"><i class="fa-solid fa-trash"></i></button>
        </div>
        `;
        notesList.appendChild(listItem);
    });
}

function editNote(noteId) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const noteToEdit = notes.find(note => note.id == noteId);
    const noteText = noteToEdit ? noteToEdit.text : '';
    const editingPopup = document.createElement("div");
    
    editingPopup.innerHTML = `
    <div id="editing-container" data-note-id="${noteId}">
        <h1>Edit Note</h1>
        <textarea id="note-text">${noteText}</textarea>
        <div id="btn-container">
            <button id="submitBtn" onclick="updateNote()">Done</button>
            <button id="closeBtn" onclick="closeEditPopup()">Cancel</button>
        </div>
    </div>
    `;

    document.body.appendChild(editingPopup);
}

function closeEditPopup() {
    const editingPopup = document.getElementById("editing-container");

    if(editingPopup) {
        editingPopup.remove();
    }
}

function updateNote() {
    const noteText = document.getElementById('note-text').value.trim();
    const editingPopup = document.getElementById('editing-container');

    if (noteText !== '') {
        const noteId = editingPopup.getAttribute('data-note-id');
        let notes = JSON.parse(localStorage.getItem('notes')) || [];

        // Find the note to update
        const updatedNotes = notes.map(note => {
            if (note.id == noteId) {
                return { id: note.id, text: noteText };
            }
            return note;
        });

        // Update the notes in local storage
        localStorage.setItem('notes', JSON.stringify(updatedNotes));

        // Close the editing popup
        editingPopup.remove();

        // Refresh the displayed notes
        displayNotes();
    }
}

function deleteNote(noteId) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes = notes.filter(note => note.id !== noteId);

    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
}

displayNotes();