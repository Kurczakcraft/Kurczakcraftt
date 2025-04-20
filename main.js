
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, onSnapshot } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBjkWkuC43qRrYrYimohrWSF5r-ZR2-EhQ",
  authDomain: "kurczakcraft-34cf6.firebaseapp.com",
  projectId: "kurczakcraft-34cf6",
  storageBucket: "kurczakcraft-34cf6.firebasestorage.app",
  messagingSenderId: "523073421401",
  appId: "1:523073421401:web:14640c7431dd9e8cb27148",
  measurementId: "G-H2G0L57J1Q"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function handleOpinie() {
  const nick = document.getElementById('opNick').value;
  const tekst = document.getElementById('opTekst').value;
  if (!nick || !tekst) return alert('Wpisz nick i opinię!');
  await addDoc(collection(db, "opinie"), { nick, tekst, data: new Date() });
  document.getElementById('opNick').value = '';
  document.getElementById('opTekst').value = '';
}

async function handleZamow() {
  const nick = document.getElementById('nick').value;
  const email = document.getElementById('email').value;
  const ranga = document.getElementById('ranga').value;
  const metoda = document.getElementById('metoda').value;
  if (!nick || !email || !ranga || !metoda) return alert('Uzupełnij wszystkie pola!');
  await addDoc(collection(db, "zamowienia"), { nick, email, ranga, metoda, data: new Date() });
  alert("Zamówienie zostało złożone!");
}

const opinieDiv = document.getElementById('opinie');
onSnapshot(collection(db, "opinie"), (snapshot) => {
  opinieDiv.innerHTML = "";
  snapshot.forEach(doc => {
    const op = doc.data();
    opinieDiv.innerHTML += `<div class="opinion"><strong>${op.nick}</strong>: ${op.tekst}</div>`;
  });
});
