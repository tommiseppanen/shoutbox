var config = {
    apiKey: "AIzaSyDvAa0JAemTE7qtm4X7okfr2D2HxwHuy5c",
    authDomain: "shoutbox-test.firebaseapp.com",
    projectId: "shoutbox-test"
};

firebase.initializeApp(config);
var db = firebase.firestore();

var messagesDiv = document.getElementById('messages');
db.collection("messages").orderBy('time').onSnapshot(function(snapshot) {     
    snapshot.docChanges.forEach(function(change) {
        if (change.type === "added") {
            console.log(change.doc.id, " => ", change.doc.data());
            var newDiv = document.createElement("div");
            newDiv.className = "message";
            var time = change.doc.data().time == null ? new Date(Date.now()) : change.doc.data().time;
            
            newDiv.innerHTML = `
            <span class="name">${escapeHtml(change.doc.data().name)}</span> <span class="time">${getTimeString(time)}</span>
            <p class="text">${escapeHtml(change.doc.data().message)}</p>`;
            messagesDiv.appendChild(newDiv);
        }
    });    
});

function getTimeString(time) {
    var minutePart = time.getMinutes() < 10 ? "0"+time.getMinutes() : time.getMinutes();
    return time.getDate()+"."+(time.getMonth()+1)+". "+time.getHours()+":"+minutePart;
}

function sendMessage() {
    db.collection("messages").add({
        name: document.getElementById("name").value,
        message: document.getElementById("message").value,
        time: firebase.firestore.FieldValue.serverTimestamp()
    });
    document.getElementById("name").value = "";
    document.getElementById("message").value = "";
    return false;
}

function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;")
         .replace(/\n/g, '<br/>');
 }