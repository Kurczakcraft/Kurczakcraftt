function openPopup() {
  document.getElementById('popup').style.display = 'block';
}
document.getElementById('rankForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const nick = e.target.nick.value;
  const ranga = e.target.ranga.value;
  const opinia = e.target.opinia.value;
  const opinieDiv = document.getElementById('opinie');
  const nowaOpinia = document.createElement('div');
  nowaOpinia.textContent = `${nick} (${ranga}): ${opinia}`;
  nowaOpinia.style.background = 'rgba(0,0,0,0.5)';
  nowaOpinia.style.padding = '10px';
  nowaOpinia.style.margin = '10px';
  opinieDiv.appendChild(nowaOpinia);
  e.target.reset();
  document.getElementById('popup').style.display = 'none';
});