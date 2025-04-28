// 🛸 Liste principale de SCOOPS
const scoops = [
  { text: "Un homme a gagné à la loterie deux fois en une semaine.", vrai: false },
  { text: "Le son le plus fort jamais enregistré était une éruption volcanique.", vrai: true },
  { text: "La première musique jouée dans l’espace était « Jingle Bells ».", vrai: true },
  { text: "La licorne est l'animal national de l'Écosse.", vrai: true },
  { text: "Le métal attire les baleines sous l’eau.", vrai: false },
  { text: "Michael Jackson détient un brevet pour des chaussures anti-gravité.", vrai: true },
  { text: "Il pleut des diamants sur Saturne et Jupiter.", vrai: true },
  { text: "La chanson « Happy Birthday » est sous copyright jusqu'en 2025.", vrai: false },
  { text: "Mozart a écrit sa première symphonie à 5 ans.", vrai: true },
  { text: "Beyoncé est la chanteuse la plus récompensée de l'histoire.", vrai: true },
  { text: "Le ketchup était vendu comme médicament au XIXe siècle.", vrai: true },
  { text: "La Russie a interdit le rock’n’roll en 1950.", vrai: true },
  { text: "Des chèvres peuvent grimper aux arbres au Maroc.", vrai: true },
  // 🎭 Nouveau scoop Théâtre Toursky
  { text: "Le Théâtre Toursky a été construit dans un ancien hangar et est devenu l’un des lieux emblématiques de la culture alternative à Marseille.", vrai: true },
  // 🍊🔥 Nouveau scoop Pamplemousses Enflammées
  { text: "L'association Les Pamplemousses Enflammées organise chaque année un concours de lancer de fruits enflammés à Marseille.", vrai: false },
];

// 🛸 SCOOPS pour la Finale
const finaleScoops = [
  { text: "Un homme a traversé l'Atlantique à la nage sans escale.", vrai: false },
  { text: "Le miel ne périme jamais.", vrai: true }, // Le seul vrai scoop
  { text: "Les girafes hibernent pendant 6 mois.", vrai: false },
  { text: "En Chine, un pont devient invisible sous la pluie.", vrai: false },
  { text: "Un chat détient le record de marathon en 2h.", vrai: false }
];

// 🎯 Variables globales
let questionIndex = 0;
let shuffledScoops = [];
let score = 0;

// 🎯 Démarrer le jeu
function startGame() {
  shuffledScoops = [...scoops];
  shuffleArray(shuffledScoops);
  questionIndex = 0;
  score = 0;
  document.getElementById('finale').style.display = 'none';
  document.getElementById('game').style.display = 'block';
  showNextScoop();
}

// 🎯 Mélanger un tableau
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// 🎯 Afficher la prochaine question
function showNextScoop() {
  if (questionIndex < shuffledScoops.length) {
    const currentScoop = shuffledScoops[questionIndex];
    document.getElementById('scoop').textContent = currentScoop.text;
    document.getElementById('counter').textContent = `Question ${questionIndex + 1} / ${shuffledScoops.length}`;
  } else {
    startFinale();
  }
}

// 🎯 Vérifier la réponse (Vrai / Faux)
function checkAnswer(isVrai) {
  const currentScoop = shuffledScoops[questionIndex];
  const buttons = document.querySelectorAll('.answer-btn');

  if (currentScoop.vrai === isVrai) {
    score++;
    flashButton(isVrai, true);
  } else {
    flashButton(isVrai, false);
  }

  setTimeout(() => {
    questionIndex++;
    showNextScoop();
  }, 500);
}

// 🎯 Animation bouton correct / incorrect
function flashButton(isVraiClicked, isCorrect) {
  const buttons = document.querySelectorAll('.answer-btn');
  buttons.forEach(button => {
    if ((isVraiClicked && button.innerText === "Vrai") || (!isVraiClicked && button.innerText === "Faux")) {
      button.style.backgroundColor = isCorrect ? "limegreen" : "red";
      setTimeout(() => {
        button.style.backgroundColor = "";
      }, 400);
    }
  });
}

// 🎯 Lancer la grande Finale
function startFinale() {
  document.getElementById('game').style.display = 'none';
  document.getElementById('finale').style.display = 'block';

  // Affiche le score
  const finaleOptions = document.getElementById('finale-options');
  finaleOptions.innerHTML = '';
  const scoreFinal = document.createElement('h3');
  scoreFinal.textContent = `🎉 Tu as eu ${score} bonnes réponses sur ${shuffledScoops.length} questions !`;
  finaleOptions.appendChild(scoreFinal);

  // Mélanger les scoops finale
  shuffleArray(finaleScoops);

  // Afficher les choix pour la finale
  finaleScoops.forEach(option => {
    const button = document.createElement('button');
    button.textContent = option.text;
    button.className = "answer-btn";
    button.onclick = () => checkFinaleAnswer(option.vrai, button);
    finaleOptions.appendChild(button);
  });
}

// 🎯 Vérifier la réponse Finale
function checkFinaleAnswer(isVraiClicked, clickedButton) {
  const allButtons = document.querySelectorAll('#finale-options .answer-btn');

  allButtons.forEach(button => {
    button.disabled = true; // désactiver tous les boutons
  });

  if (isVraiClicked) {
    clickedButton.style.backgroundColor = "limegreen"; // Bonne réponse
    alert("INCROYABLE ! C'était le vrai scoop !");
  } else {
    clickedButton.style.backgroundColor = "red"; // Mauvaise réponse
    // Montrer la bonne réponse
    finaleScoops.forEach((scoop, index) => {
      if (scoop.vrai) {
        allButtons[index].style.backgroundColor = "limegreen";
      }
    });
    alert("Dommage... Voici la bonne réponse !");
  }

  setTimeout(() => {
    const replay = confirm("Veux-tu rejouer ?");
    if (replay) {
      window.location.reload();
    }
  }, 500);
}

// ➡️ Démarrage du jeu au chargement
startGame();