
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import { getFirestore, collection, addDoc, getDocs } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyBjkWkuC43qRrYrYimohrWSF5r-ZR2-EhQ",
  authDomain: "kurczakcraft-34cf6.firebaseapp.com",
  projectId: "kurczakcraft-34cf6",
  storageBucket: "kurczakcraft-34cf6.appspot.com",
  messagingSenderId: "523073421401",
  appId: "1:523073421401:web:14640c7431dd9e8cb27148",
  measurementId: "G-H2G0L57J1Q"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Obsługa popupu
document.getElementById("buyBtn").onclick = () => {
  document.getElementById("popupForm").style.display = "flex";
};

document.getElementById("orderForm").onsubmit = async (e) => {
  e.preventDefault();
  const nick = document.getElementById("nick").value;
  const ranga = document.getElementById("ranga").value;
  const metoda = document.getElementById("metoda").value;
  await addDoc(collection(db, "zamowienia"), { nick, ranga, metoda });
  alert("Zamówienie zapisane!");
};

document.getElementById("opiniaForm").onsubmit = async (e) => {
  e.preventDefault();
  const nick = document.getElementById("opiniaNick").value;
  const tekst = document.getElementById("opiniaText").value;
  await addDoc(collection(db, "opinie"), { nick, tekst });
  location.reload();
};

async function loadOpinie() {
  const container = document.getElementById("opinieContainer");
  const snapshot = await getDocs(collection(db, "opinie"));
  snapshot.forEach(doc => {
    const data = doc.data();
    const div = document.createElement("div");
    div.className = "opinia";
    div.innerHTML = `<strong>${data.nick}:</strong><p>${data.tekst}</p>`;
    container.appendChild(div);
  });
}
loadOpinie();
