import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

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

window.openForm = function(ranga) {
  document.getElementById("formPopup").classList.add("active");
  document.getElementById("formRanga").innerText = ranga;
}

window.closeForm = function() {
  document.getElementById("formPopup").classList.remove("active");
}

window.handleZamow = async function() {
  const nick = document.getElementById("nick").value;
  const email = document.getElementById("email").value;
  const metoda = document.getElementById("metoda").value;
  const ranga = document.getElementById("formRanga").innerText;

  await addDoc(collection(db, "zamowienia"), {
    nick, email, metoda, ranga, timestamp: Date.now()
  });

  alert("Zamówienie zostało zapisane!");
  closeForm();
}

window.handleOpinie = async function() {
  const nick = document.getElementById("opNick").value;
  const tekst = document.getElementById("opTekst").value;

  await addDoc(collection(db, "opinie"), {
    nick, tekst, timestamp: Date.now()
  });

  loadOpinie();
}

async function loadOpinie() {
  const opinieContainer = document.getElementById("opinieList");
  opinieContainer.innerHTML = "";
  const snapshot = await getDocs(collection(db, "opinie"));
  snapshot.forEach(doc => {
    const op = doc.data();
    const div = document.createElement("div");
    div.className = "opinia";
    div.innerHTML = `<strong>${op.nick}</strong><p>${op.tekst}</p>`;
    opinieContainer.appendChild(div);
  });
}

loadOpinie();
