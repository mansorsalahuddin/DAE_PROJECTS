// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_-4MB0Z_E75d5CiyI7yOeykcrXlG5BuE",
  authDomain: "task-orginazer.firebaseapp.com",
  projectId: "task-orginazer",
  storageBucket: "task-orginazer.firebasestorage.app",
  messagingSenderId: "859929308701",
  appId: "1:859929308701:web:f2b71781028f7008fa60f4",
  measurementId: "G-0Y4DWC2G2E",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Handle Sign Up
document.getElementById("signupForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      alert("Sign Up Successful!");
      window.location.href = "dashboard.html"; // or your target page
    })
    .catch((error) => {
      alert("Sign Up Error: " + error.message);
    });
});

// Handle Login
document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      alert("Login Successful!");
      window.location.href = "dashboard.html"; // or your target page
    })
    .catch((error) => {
      alert("Login Error: " + error.message);
    });
});
