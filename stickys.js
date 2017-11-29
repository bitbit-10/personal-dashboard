$(document).ready(function(){
  //Open database
  var request = indexedDB.open("stickys", 1);

  request.onupgradeneeded = function(e){
    var db = e.target.result;

    if(!db.objectStoreNames.contains('notes')){
      var objectStore = db.createObjectStore('notes', {keyPath:'id', autoIncrement: true});
      objectStore.createIndex("text", "text", {unique: false});
      objectStore.createIndex("timestamp", "timestamp", {unique: false});
      objectStore.createIndex("top", "top", {unique: false});
      objectStore.createIndex("left", "left", {unique: false});
      objectStore.createIndex("zIndex", "zIndex", {unique: false});
    }
  };

  // success
  request.onsuccess = function(e){
    console.log("success: Opened Database");
    db = e.target.result;
    // Show Notes
    showNotes(db);
  };
  // Error
  request.onerror = function(e){
    console.log('Error: Could not Open Database...');

  };
  // $(document).ready
});

  // Update customers - on keyup
  function updateNote(id){

  // 1) Newly entered text
  // var dataId = "[data-id=\"" + id + "\"]";
  var newText = $("[data-id=\"" + id + "\"]").text();
  console.log("[data-id=\"" + id + "\"]");
  console.log("Modified Text : " + newText);
  // 2) Timestamp of modification
  var date = new Date();
  var dateTime = "Last Saved: " + date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + ", " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

  var newTimestamp = dateTime;

  // Get transaction - FInd customer record
  var transaction = db.transaction(["notes"], "readwrite");
  // Ask for objectStore
  var store = transaction.objectStore("notes");
  var request = store.get(id);

  // onsuccess
  request.onsuccess = function(e){
    var data = request.result;
    console.log("Get request : " + data);
    data.text = newText;
    data.timestamp = newTimestamp;
  // Put - Store Updated Text
  var requestUpdate = store.put(data);

  requestUpdate.onsuccess = function(){
    console.log('Customer data updated');
    // update the timestamp div on the note shown
    $("#"+id+">.timestamp").text(newTimestamp);
  };

  requestUpdate.onerror = function(){
    console.log('Error: Customer data not updated');
  };
  };
  }

  // Update note
  function updateNoteNew(id, top, left, text, timestamp, zIndex){

  // Newly entered text, position and others
  var newTop = top;
  var newLeft = left;
  var newText = text;
  var newTimestamp = timestamp;
  var newzIndex = zIndex;

  // Get transaction - FInd customer record
  var transaction = db.transaction(["notes"], "readwrite");
  // Ask for objectStore
  var store = transaction.objectStore("notes");
  var request = store.get(id);

  // onsuccess
  request.onsuccess = function(e){
    var data = request.result;
    console.log("Get request : " + data);
    data.top = newTop;
    data.left = newLeft;
    data.text = newText;
    data.timestamp = newTimestamp;
    data.zIndex = newzIndex;

  // Put - Store Updated Text
  var requestUpdate = store.put(data);

  requestUpdate.onsuccess = function(){
    console.log('Customer data updated');
  };

  requestUpdate.onerror = function(){
    console.log('Error: Customer data not updated');
  };
  };
  }

// Add Customers
function addNote(){
  // setting Timestamp
  var date = new Date();
  var dateTime = "Last Saved: " + date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + ", " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  var timeStamp = dateTime;

// Create new row entry for note
  var transaction = db.transaction(["notes"], "readwrite");
  // Ask for objectStore
  var store = transaction.objectStore("notes");
  // Define Note
  var note = {
    top: "",
    left: "",
    text: "",
    timestamp: "",
    zIndex: ""
  };
  // Perform the add
  var request = store.add(note);

  // success
  request.onsuccess = function(e){

    var id = e.target.result;
    newNote(id, timeStamp);
    // properties of newNote
    var pos = $('#'+id).position();
    var idString = id.toString();
    console.log("idString" + typeof idString);
    var zIndex = document.getElementById(idString).style.zIndex;

      var top = pos.top;
      var left = pos.left;
      var text = "";
      var timestamp = timeStamp;
      var zIndex = "";
    console.log("position: Top = " + pos.top + ", Left = " + pos.left);
    var text = $('#'+id).children(".text").html();
    console.log("text : " + text);
    console.log("zIndex : " + zIndex);
    // Update db with the note id, top/left positions and timestamp info
    updateNoteNew(id, top, left, text, timestamp, zIndex);

  };
  // Error
  request.onerror = function(e){
    alert('Sorry, the customer was not added');
    console.log('Error', e.target.name);
  };

}

// =========
function newNote(id, timeStamp){
  var newNote = document.createElement("div");
  var board = document.getElementById("stickysContainer");
  newNote.className = "sticky";
  newNote.id = id;
  // console.log("newNote.previousSibling - sticky : " + newNote.previousSibling);

  // position of each new sticky
  var top = Math.round(Math.random() * 60) + "%";
  var left = Math.round(Math.random() * 60) + "%";
  newNote.style.top = top;
  newNote.style.left = left;
  // newNote.style.zIndex = "-1";
  // var rect = newNote.getBoundingClientRect();
  // console.log("Rect Left :" + rect.top);

  // create closeButton
  var closeButton = document.createElement("div");
  closeButton.className = "closeButton";
  newNote.appendChild(closeButton);

  // create timestamp portion
  var timestamp = document.createElement("div");
  timestamp.className = "timestamp";
  timestamp.innerHTML = timeStamp;
  newNote.appendChild(timestamp);

  // append new note with close button to board
  board.appendChild(newNote);

  // edit text content
  var text = document.createElement("div");
  text.className = "text";
  text.setAttribute('contenteditable', true);
  text.setAttribute('data-id', id);
  text.setAttribute('onkeyup', "updateNote(" + id + ")");
  newNote.appendChild(text);

// ===click note, bring focus to text - indicate able to type text - idea? use id="..." or id from db
  // newNote.addEventListener("click", function(e){
  //   var x = newNote.previousSibling.id;
  //   console.log("newNote.previousSibling - click : " + x);
  //   var div = document.getElementsByClassName("text")[0];
  //   setTimeout(function(){
  //     div.focus();
  //   }, 0);
  // });
// ====end==
  // remove sticky
  closeButton.addEventListener("click", function(e){
    newNote.parentNode.removeChild(newNote);
    removeNote(id);
  });
}
// delete a note
function removeNote(id){
  var transaction = db.transaction(["notes"], "readwrite");
  // Ask for objectStore
  var store = transaction.objectStore("notes");
  var request = store.delete(id);

  // success
  request.onsuccess = function(){
    console.log('note ' + id + ' Deleted');
    // $('.customer_'+id).remove();
  };
  // Error
  request.onerror = function(e){
    alert('Sorry, the note was not deleted');
    console.log('Error', e.target.name);
  };
}

function showNotes(db){
  var transaction = db.transaction(["notes"], "readonly");
  // Ask for objectStore
  var store = transaction.objectStore("notes");
  var index = store.index('text');

  index.openCursor().onsuccess = function(e){
    var cursor = e.target.result;
    if(cursor) {

      existingNotes(cursor.value.id, cursor.value.top, cursor.value.left, cursor.value.text, cursor.value.timestamp, cursor.value.zIndex);

      cursor.continue();

    }
  };
}

function existingNotes(id, top, left, textContent, timeStamp, zIndex){
  var newNote = document.createElement("div");
  var board = document.getElementById("stickysContainer");
  newNote.className = "sticky";
  newNote.id = id;

  // position of each new sticky
  newNote.style.top = top + "px";
  newNote.style.left = left + "px";
  newNote.style.zIndex = zIndex;

  // create closeButton
  var closeButton = document.createElement("div");
  closeButton.className = "closeButton";
  newNote.appendChild(closeButton);

  // create timestamp portion
  var timestamp = document.createElement("div");
  timestamp.className = "timestamp";
  timestamp.innerHTML = timeStamp;
  newNote.appendChild(timestamp);

  // append new note with close button to board
  board.appendChild(newNote);

  // edit text content
  var text = document.createElement("div");
  text.className = "text";
  text.setAttribute('contenteditable', true);
  text.setAttribute('onkeyup', "updateNote(" + id + ")");
  text.setAttribute('data-id', id);
  text.innerHTML = textContent;
  newNote.appendChild(text);

  // remove sticky
  closeButton.addEventListener("click", function(e){
    newNote.parentNode.removeChild(newNote);
    removeNote(id);
  });

}
