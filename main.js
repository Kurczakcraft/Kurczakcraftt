
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById('orderForm');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const nick = document.getElementById('nick').value;
  const rank = document.getElementById('rank').value;
  await addDoc(collection(db, "zamowienia"), { nick, rank });
  alert("Zamówienie wysłane!");
});

async function loadOpinions() {
  const querySnapshot = await getDocs(collection(db, "opinie"));
  const container = document.getElementById('opinionsList');
  container.innerHTML = "";
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const div = document.createElement("div");
    div.textContent = `${data.nick}: ${data.text}`;
    container.appendChild(div);
  });
}
loadOpinions();

window.showForm = () => {
  document.getElementById("formContainer").style.display = "block";
};
