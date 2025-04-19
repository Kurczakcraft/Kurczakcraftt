import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
  getFirestore, collection, addDoc, getDocs
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// 🔧 Twoje dane Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBjkWkuC43qRrYrYimohrWSF5r-ZR2-EhQ",
  authDomain: "kurczakcraft-34cf6.firebaseapp.com",
  projectId: "kurczakcraft-34cf6",
  storageBucket: "kurczakcraft-34cf6.firebasestorage.app",
  messagingSenderId: "523073421401",
  appId: "1:523073421401:web:14640c7431dd9e8cb27148",
  measurementId: "G-H2G0L57J1Q"
};

// 🔌 Połączenie z Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🔽 Ładowanie opinii
async function loadOpinie() {
  const snapshot = await getDocs(collection(db, "opinie"));
  const container = document.getElementById("opinie");
  container.innerHTML = "";
  snapshot.forEach(doc => {
    const data = doc.data();
    const el = document.createElement("div");
    el.className = "opinion";
    el.innerHTML = `<strong>${data.nick}</strong><br>${data.tekst}`;
    container.appendChild(el);
  });
}

// ✅ Obsługa dodawania opinii
window.handleOpinie = async () => {
  const nick = document.getElementById("opNick").value;
  const tekst = document.getElementById("opTekst").value;
  if (!nick || !tekst) return alert("Wypełnij oba pola");
  await addDoc(collection(db, "opinie"), { nick, tekst, data: new Date().toISOString() });
  document.getElementById("opNick").value = "";
  document.getElementById("opTekst").value = "";
  loadOpinie();
};

// ✅ Obsługa zamówienia
window.handleZamow = async () => {
  const nick = document.getElementById("nick").value;
  const email = document.getElementById("email").value;
  const ranga = document.getElementById("ranga").value;
  const metoda = document.getElementById("metoda").value;
  if (!nick || !email || !ranga || !metoda) return alert("Wypełnij wszystkie pola");
  await addDoc(collection(db, "zamowienia"), { nick, email, ranga, metoda, data: new Date().toISOString() });
  alert("Zamówienie zapisane!");
};

// 📦 Ładowanie opinii przy starcie
loadOpinie();

