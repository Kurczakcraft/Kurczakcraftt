document.getElementById('buyButton').addEventListener('click', () => {
  document.getElementById('popup').classList.add('show');
});

document.getElementById('orderForm').addEventListener('submit', (e) => {
  e.preventDefault();
  alert("Zamówienie wysłane!");
});

document.getElementById('opinionForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const nick = document.getElementById('nick').value;
  const text = document.getElementById('text').value;
  const el = document.createElement('div');
  el.textContent = `${nick}: ${text}`;
  document.getElementById('opinie-list').appendChild(el);
  document.getElementById('opinionForm').reset();
});