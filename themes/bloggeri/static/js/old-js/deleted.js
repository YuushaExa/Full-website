// save data
async function fetchDataAndSendToGitHub() {
try {
const response = await fetch('https://link-968.pages.dev/test.txt');
const data = await response.text();
const toktp = LZString.decompressFromBase64(data);

const owner = 'YuushaExa';
const repo = 'v';
const branch = 'master';
const directory = 'dev/json/favfiles';
const filename = firebase.auth().currentUser.uid;

const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${directory}/${filename}.json`;

const fileContent = {
  message: 'Update data.json from local storage',
  content: btoa(LZString.compressToBase64(JSON.stringify(localStorage))),
};

const existingFileResponse = await fetch(apiUrl, {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${toktp}`,
  },
});
const existingFileData = await existingFileResponse.json();

fileContent.sha = existingFileData.sha;

const updateResponse = await fetch(apiUrl, {
  method: 'PUT',
  headers: {
    Authorization: `Bearer ${toktp}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(fileContent),
});
const updateData = await updateResponse.json();

console.log('File created or updated successfully:', updateData);

const currentTime = new Date().toLocaleString();
localStorage.setItem('LastSync', currentTime);
updateLastSavedData();
document.getElementById('inputTextFavSet').style.backgroundColor = '#21b921';
setTimeout(() => {
  document.getElementById('inputTextFavSet').style.backgroundColor = '';
}, 2000);
} catch (error) {
console.error('Error occurred:', error);
document.getElementById('inputTextFavSet').style.backgroundColor = 'red';
}
}
document.getElementById("CloudSave").addEventListener("click", fetchDataAndSendToGitHub);

 
//

    var firebaseConfig = {
    apiKey: "AIzaSyCP3lyYIs5GjA6XYS9aSdaz5X6-ru3Fxeo",
    authDomain: "gamedb-95862.firebaseapp.com",
    databaseURL: "https://gamedb-95862-default-rtdb.firebaseio.com",
    projectId: "gamedb-95862",
    storageBucket: "gamedb-95862.appspot.com",
    messagingSenderId: "788250168154",
    appId: "1:788250168154:web:b6573c45a909fc09694163"
  };
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
  
  // auth console
  function dailylogin() {
firebase.auth().onAuthStateChanged((user) => {
if (user) {
const displayName = user.displayName || 'Nameless';
const today = new Date().toDateString(); // Get today's date in the format "Day Month Date Year"

const lastVisitStamp = localStorage.getItem('lastVisitStamp');
if (lastVisitStamp === today) {
  console.log('Script already executed today. Aborting...');
  return; // Abort the script if it has already been executed today
}

const timestamp = firebase.firestore.FieldValue.serverTimestamp();
const userRef = db.collection('users').doc(user.uid);

userRef.get()
  .then((doc) => {
    const lastVisit = doc.exists ? doc.data().lastVisit : null;
    const qi = doc.exists ? doc.data().qi : 1;
    const name = user.displayName;
                localStorage.setItem('name', name);
            localStorage.setItem('Qi', qi);
    
    if (lastVisit) {
      const lastVisitDate = lastVisit.toDate().toDateString(); 
      if (lastVisitDate !== today) {
        console.log('Welcome, ' + displayName + '!');
        userRef.set({ lastVisit: timestamp, qi: firebase.firestore.FieldValue.increment(1), name: user.displayName }, { merge: true })
          .then(() => {
            console.log('Timestamp and qi updated in Firestore.');
            localStorage.setItem('lastVisitStamp', today); 
          })
          .catch((error) => {
            console.error('Failed to update timestamp and qi in Firestore:', error);
          });
      } else {
        console.log('Script already executed today based on Firestore data. Aborting...');
        localStorage.setItem('lastVisitStamp', today);
      }
    } else {
      console.log('First visit of the user. Welcome, ' + displayName + '!');

      userRef.set({ lastVisit: timestamp, qi: firebase.firestore.FieldValue.increment(1), name: user.displayName }, { merge: true })
        .then(() => {
          console.log('Timestamp updated in Firestore.');
          localStorage.setItem('lastVisitStamp', today); // Save today's date in localStorage
          console.cong('Dantian Unlocked, now you can store Qi energy');
        })
        .catch((error) => {
          console.error('Failed to update timestamp and Qi in Firestore:', error);
        });
    }
  })
  .catch((error) => {
    console.error('Error getting user document:', error);
  });
} 
});
  }
  dailylogin();

//

  function showErrorToast(message) {
Toastify({
  text: "This is a success message.",
  duration: 3000,
  close: true,
  gravity: "top",
  position: "left",
  backgroundColor: "#4caf50",
  stopOnFocus: true,
  containerClass: "toastify-container",
  className: "toastify toastify-success",
}).showToast();
}
  
  (function () {
  var originalLog = console.log;
  var originalError = console.error;
    
  console.log = function () {
    // Convert arguments to an array
    var args = Array.prototype.slice.call(arguments);
    // Join arguments into a single string
    var message = args.join(' ');
    // Display the toast notification
    showLogToast(message);
    // Call the original console.log function
    originalLog.apply(console, args);
  };

  console.error = function () {
    // Convert arguments to an array
    var args = Array.prototype.slice.call(arguments);
    // Join arguments into a single string
    var message = args.join(' ');
    // Display the toast notification
    showErrorToast(message);
    // Call the original console.error function
    originalError.apply(console, args);
  };

      console.info = function () {
    // Convert arguments to an array
    var args = Array.prototype.slice.call(arguments);
    // Join arguments into a single string
    var message = args.join(' ');
    // Display the toast notification
    showInfoToast(message);
    // Call the original console.log function
    originalLog.apply(console, args);
  };

            console.welcome = function () {
    // Convert arguments to an array
    var args = Array.prototype.slice.call(arguments);
    // Join arguments into a single string
    var message = args.join(' ');
    // Display the toast notification
    showWelcomeToast(message);
    // Call the original console.log function
    originalLog.apply(console, args);
  };

            console.cong = function () {
    var args = Array.prototype.slice.call(arguments);
    var message = args.join(' ');
    showCongToast(message);
    originalLog.apply(console, args);
  };
})();

// Toast notification functions
function showLogToast(message) {
  Toastify({
    text: message,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "center",
    style: {
      background: "#E6F5FF",
      color: "#003366",
    },
    stopOnFocus: true,
  }).showToast();
}

function showErrorToast(message) {
  Toastify({
    text: message,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "center",
      style: {
      background: "#bb0606e6",
    },
    stopOnFocus: true,
  }).showToast();
}

  function showInfoToast(message) {
  Toastify({
    text: message,
    duration: 4000,
    close: true,
    gravity: "top",
    position: "center",
    stopOnFocus: true,
  }).showToast();
}

    function showWelcomeToast(message) {
  Toastify({
    text: message,
    duration: 2000,
    close: true,
    gravity: "top",
    position: "center",
         style: {
         background: "#f0fff0",
         color: "#006400",
    },
    stopOnFocus: true,
  }).showToast();
}

function showCongToast(message) {
  Toastify({
    text: message,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "center",
      style: {
 backgroundImage: "linear-gradient(to right, #FFD700, #ffffffcc)",
      textShadow: "1px 1px 2px rgb(0 0 0 / 30%)",
      color: "rgb(0 0 0)",
    },
    stopOnFocus: true,
  }).showToast();
}

  // send data


  // show last sync data
function updateLastSavedData() {
const lastSyncTime = localStorage.getItem("LastSync");
if (lastSyncTime) {
  document.getElementById("lastsaveddata").textContent = `Last sync time: ${lastSyncTime}`;
} else {
  document.getElementById("lastsaveddata").textContent = `No save files, press load`;
}
}
 updateLastSavedData();
