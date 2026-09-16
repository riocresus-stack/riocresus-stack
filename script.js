// ===============================
// EMAILJS
// ===============================

import emailjs from "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/+esm";

const PUBLIC_KEY = "VDQG-raCbjUrpzw-X";
const SERVICE_ID = "service_soxcrjg";
const TEMPLATE_ID = "template_3d04tbv";

emailjs.init({
  publicKey: PUBLIC_KEY
});


// ===============================
// RÉPONSES
// ===============================

const answers = {
  day: "",
  giftForHer: "",
  giftForMe: "",
  activity: "",
  love: "",
  dislike: "",
  improve: "",
  message: ""
};


// ===============================
// NAVIGATION
// ===============================

function showSection(id) {
  document.querySelectorAll(".card").forEach(card => {
    card.classList.remove("active");
  });

  const section = document.getElementById(id);

  if (section) {
    section.classList.add("active");
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
}


// ===============================
// ACCUEIL
// ===============================

window.nextStep = function () {
  showSection("day");
};


// ===============================
// JOUR
// ===============================

window.saveDay = function () {

  const selected = document.querySelector(
    'input[name="day"]:checked'
  );

  if (!selected) {
    alert("Choisis d'abord un jour ❤️");
    return;
  }

  answers.day = selected.value;

  showSection("giftForHer");
};


// ===============================
// CADEAU POUR ELLE
// ===============================

window.saveGiftForHer = function () {

  const selected = document.querySelector(
    'input[name="giftForHer"]:checked'
  );

  if (!selected) {
    alert("Choisis une option pour ton cadeau 🎁");
    return;
  }

  answers.giftForHer = selected.value;

  showSection("giftForMe");
};


// ===============================
// CADEAU POUR MOI
// ===============================

window.saveGiftForMe = function () {

  const selected = document.querySelector(
    'input[name="giftForMe"]:checked'
  );

  if (!selected) {
    alert("Choisis une option pour ton Chou ❤️");
    return;
  }

  answers.giftForMe = selected.value;

  showSection("activity");
};


// ===============================
// ACTIVITÉ
// ===============================

window.saveActivity = function () {

  const selected = document.querySelector(
    'input[name="activity"]:checked'
  );

  if (!selected) {
    alert("Choisis une activité 🥰");
    return;
  }

  answers.activity = selected.value;

  showSection("couple");
};


// ===============================
// ENVOI FINAL
// ===============================

window.confirmAnswers = async function () {

  // Récupération des textes
  answers.love = document.getElementById("love").value.trim();
  answers.dislike = document.getElementById("dislike").value.trim();
  answers.improve = document.getElementById("improve").value.trim();
  answers.message = document.getElementById("message").value.trim();


  // Vérification
  if (
    !answers.love ||
    !answers.dislike ||
    !answers.improve ||
    !answers.message
  ) {
    alert("Réponds à toutes les questions avant de confirmer ❤️");
    return;
  }


  // Désactiver le bouton pendant l'envoi
  const button = document.querySelector(
    '#couple button'
  );

  if (button) {
    button.disabled = true;
    button.textContent = "Envoi en cours... 💌";
  }


  try {

    // Envoi vers EmailJS
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        day: answers.day,
        giftForHer: answers.giftForHer,
        giftForMe: answers.giftForMe,
        activity: answers.activity,
        love: answers.love,
        dislike: answers.dislike,
        improve: answers.improve,
        message: answers.message
      }
    );


    // Succès
    showSection("thanks");

    console.log("Réponses envoyées avec succès :", answers);

  } catch (error) {

    console.error("Erreur EmailJS :", error);

    alert(
      "Une erreur est survenue pendant l'envoi. Vérifie ta connexion Internet puis réessaie."
    );

    if (button) {
      button.disabled = false;
      button.textContent = "Confirmer mes choix ❤️";
    }
  }
};  activity: "",
  love: "",
  dislike: "",
  improve: "",
  message: ""
};

function showStep(step) {
  document.querySelectorAll(".card").forEach(card => {
    card.classList.remove("active");
  });

  document.getElementById(steps[step]).classList.add("active");
}

window.nextStep = function () {
  currentStep++;

  if (currentStep < steps.length) {
    showStep(currentStep);
  }
};

window.saveDay = function () {
  const selected = document.querySelector(
    'input[name="day"]:checked'
  );

  if (!selected) {
    alert("Choisis d'abord le jour que tu préfères ❤️");
    return;
  }

  answers.day = selected.value;
  nextStep();
};

window.saveGiftForHer = function () {
  const selected = document.querySelector(
    'input[name="giftForHer"]:checked'
  );

  if (!selected) {
    alert("Choisis ce que tu aimerais recevoir 🎁❤️");
    return;
  }

  answers.giftForHer = selected.value;
  nextStep();
};

window.saveGiftForMe = function () {
  const selected = document.querySelector(
    'input[name="giftForMe"]:checked'
  );

  if (!selected) {
    alert("Choisis ce que tu aimerais offrir à ton Chou ❤️");
    return;
  }

  answers.giftForMe = selected.value;
  nextStep();
};

window.saveActivity = function () {
  const selected = document.querySelector(
    'input[name="activity"]:checked'
  );

  if (!selected) {
    alert("Choisis notre activité 🥰");
    return;
  }

  answers.activity = selected.value;
  nextStep();
};

window.confirmAnswers = async function () {

  answers.love = document.getElementById("love").value.trim();
  answers.dislike = document.getElementById("dislike").value.trim();
  answers.improve = document.getElementById("improve").value.trim();
  answers.message = document.getElementById("message").value.trim();

  if (
    !answers.love ||
    !answers.dislike ||
    !answers.improve ||
    !answers.message
  ) {
    alert("Réponds à toutes les questions avant de confirmer ❤️");
    return;
  }

  try {

    const button = document.querySelector("#couple button");

    button.disabled = true;
    button.textContent = "Enregistrement... ❤️";

    await addDoc(collection(db, "reponses_natasha"), {
      ...answers,
      date: serverTimestamp()
    });

    localStorage.setItem(
      "natashaAnswers",
      JSON.stringify(answers)
    );

    showStep(6);

  } catch (error) {

    console.error("Erreur Firebase :", error);

    alert(
      "Une erreur est survenue pendant l'enregistrement. Vérifie ta connexion Internet."
    );

    const button = document.querySelector("#couple button");

    button.disabled = false;
    button.textContent = "Confirmer mes choix ❤️";
  }
};
