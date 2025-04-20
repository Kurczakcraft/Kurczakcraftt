
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", async () => {
  const form = document.getElementById("zamowienie-form");
  const opinieContainer = document.getElementById("opinie-lista");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const nick = document.getElementById("nick").value;
    const ranga = document.getElementById("wybranaRanga").value;
    const metoda = document.getElementById("metoda").value;

    await addDoc(collection(db, "zamowienia"), {
      nick, ranga, metoda
    });

    closeForm();
    alert("Zamówienie złożone!");
  });

  const opinieSnap = await getDocs(collection(db, "opinie"));
  opinieSnap.forEach(doc => {
    const p = document.createElement("p");
    p.textContent = `${doc.data().nick}: ${doc.data().tekst}`;
    opinieContainer.appendChild(p);
  });
});

window.openForm = (ranga) => {
  document.getElementById("wybranaRanga").value = ranga;
  document.getElementById("popup-form").classList.remove("hidden");
};

window.closeForm = () => {
  document.getElementById("popup-form").classList.add("hidden");
};

window.prevOpinion = () => {};
window.nextOpinion = () => {};
