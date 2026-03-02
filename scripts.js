let dialogues = {};
const jsonURL = "https://guitareren.github.io/data/dialogues.json";

function loadDialogues() {
  fetch(jsonURL)
    .then(response => response.json())
    .then(data => {
      dialogues = data;
      console.log("Dialogues loaded:", Object.keys(dialogues));

      // Combobox'ı JSON'daki kelimelerle doldur
      const select = document.getElementById("word-select");
      select.innerHTML = ""; // önce temizle
      Object.keys(dialogues).forEach(word => {
        const option = document.createElement("option");
        option.value = word;
        option.textContent = word;
        select.appendChild(option);
      });
    })
    .catch(error => {
      console.error("Error loading dialogues:", error);
    });
}

function randomWord() {
  const words = Object.keys(dialogues);
  if (words.length === 0) {
    alert("Dialogues not loaded yet.");
    return;
  }
  const randomIndex = Math.floor(Math.random() * words.length);
  const randomWord = words[randomIndex];
  document.getElementById("word-select").value = randomWord;
}

function showDialogue() {
  const word = document.getElementById("word-select").value;

  if (!dialogues[word]) {
    document.getElementById("dialogue-box").innerHTML = "No dialogues found for this word.";
    return;
  }

  const wordDialogues = dialogues[word];
  const randomIndex = Math.floor(Math.random() * wordDialogues.length);
  const d = wordDialogues[randomIndex];

  document.getElementById("dialogue-box").innerHTML = `
    <div class="english"><strong>English</strong><br>
      A: ${d.englishA}<br>
      B: ${d.englishB}
    </div>
    <div class="turkish"><strong>Türkçe</strong><br>
      A: ${d.turkishA}<br>
      B: ${d.turkishB}
    </div>
  `;
}

document.getElementById("show-btn").addEventListener("click", showDialogue);
document.getElementById("random-word-btn").addEventListener("click", randomWord);

loadDialogues();