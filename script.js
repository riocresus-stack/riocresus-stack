// ==========================================
// FIREBASE
// ==========================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";


// ==========================================
// EMAILJS
// ==========================================

import emailjs from "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/+esm";


// ==========================================
// CONFIGURATION FIREBASE
// ==========================================

const firebaseConfig = {
  apiKey: "AIzaSyDFCrYQ8TAE8KuPssWOcdsKAqQPhyeGVJI",
  authDomain: "notre-rendez-vous-natasha.firebaseapp.com",
  projectId: "notre-rendez-vous-natasha",
  storageBucket: "notre-rendez-vous-natasha.firebasestorage.app",
  messagingSenderId: "61312804214",
  appId: "1:61312804214:web:81f627dae7d704c43c4657"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// ==========================================
// CONFIGURATION EMAILJS
// ==========================================

const EMAILJS_PUBLIC_KEY = "VDQG-raCbjUrpzw-X";
const EMAILJS_SERVICE_ID = "service_soxcrjg";
const EMAILJS_TEMPLATE_ID = "template_3d04tbv";


emailjs.init({
  publicKey: EMAILJS_PUBLIC_KEY
});


// ==========================================
// ÉTAPES DU QUESTIONNAIRE
// ==========================================

let currentStep = 0;

const steps = [
  "welcome",
  "day",
  "giftForHer",
  "giftForMe",
  "activity",
  "couple",
  "thanks"
];


// ==========================================
// RÉPONSES
// ==========================================

let answers = {
  day: "",
  giftForHer: "",
  giftForMe: "",
  activity: "",
  love: "",
  dislike: "",
  improve: "",
  message: ""
};


// ==========================================
// AFFICHER UNE ÉTAPE
// ==========================================

function showStep(step) {

  document.querySelectorAll(".card").forEach(card => {
    card.classList.remove("active");
  });

  const section = document.getElementById(steps[step]);

  if (section) {
    section.classList.add("active");
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


// ==========================================
// COMMENCER
// ==========================================

window.nextStep = function () {

  currentStep++;

  if (currentStep < steps.length) {
    showStep(currentStep);
  }
};


// ==========================================
// CHOIX DU JOUR
// ==========================================

window.saveDay = function () {

  const selected = document.querySelector(
    'input[name="day"]:checked'
  );

  if (!selected) {

    alert(
      "Choisis d'abord le jour que tu préfères ❤️"
    );

    return;
  }

  answers.day = selected.value;

  nextStep();
};


// ==========================================
// CADEAU POUR ELLE
// ==========================================

window.saveGiftForHer = function () {

  const selected = document.querySelector(
    'input[name="giftForHer"]:checked'
  );

  if (!selected) {

    alert(
      "Choisis ce que tu aimerais recevoir 🎁❤️"
    );

    return;
  }

  answers.giftForHer = selected.value;

  nextStep();
};


// ==========================================
// CADEAU POUR MOI
// ==========================================

window.saveGiftForMe = function () {

  const selected = document.querySelector(
    'input[name="giftForMe"]:checked'
  );

  if (!selected) {

    alert(
      "Choisis ce que tu aimerais offrir à ton Chou ❤️"
    );

    return;
  }

  answers.giftForMe = selected.value;

  nextStep();
};


// ==========================================
// ACTIVITÉ
// ==========================================

window.saveActivity = function () {

  const selected = document.querySelector(
    'input[name="activity"]:checked'
  );

  if (!selected) {

    alert(
      "Choisis notre activité 🥰"
    );

    return;
  }

  answers.activity = selected.value;

  nextStep();
};


// ==========================================
// CONFIRMATION FINALE
// ==========================================

window.confirmAnswers = async function () {

  // Récupérer les réponses écrites

  answers.love =
    document.getElementById("love").value.trim();

  answers.dislike =
    document.getElementById("dislike").value.trim();

  answers.improve =
    document.getElementById("improve").value.trim();

  answers.message =
    document.getElementById("message").value.trim();


  // Vérifier que tout est rempli

  if (
    !answers.love ||
    !answers.dislike ||
    !answers.improve ||
    !answers.message
  ) {

    alert(
      "Réponds à toutes les questions avant de confirmer ❤️"
    );

    return;
  }


  // Bouton

  const button =
    document.querySelector("#couple button");


  button.disabled = true;

  button.textContent =
    "Envoi de tes réponses... 💌";


  try {

    // ======================================
    // 1. ENREGISTRER DANS FIREBASE
    // ======================================

    await addDoc(
      collection(db, "reponses_natasha"),
      {
        ...answers,
        date: serverTimestamp()
      }
    );


    // ======================================
    // 2. ENVOYER PAR EMAIL
    // ======================================

    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        day: answers.day,

        giftForHer:
          answers.giftForHer,

        giftForMe:
          answers.giftForMe,

        activity:
          answers.activity,

        love:
          answers.love,

        dislike:
          answers.dislike,

        improve:
          answers.improve,

        message:
          answers.message
      }
    );


    // ======================================
    // 3. SAUVEGARDE LOCALE
    // ======================================

    localStorage.setItem(
      "natashaAnswers",
      JSON.stringify(answers)
    );


    // ======================================
    // 4. AFFICHER LA PAGE MERCI
    // ======================================

    showStep(6);


    console.log(
      "Réponses enregistrées et envoyées par e-mail.",
      answers
    );


  } catch (error) {

    console.error(
      "Erreur lors de l'enregistrement ou de l'envoi :",
      error
    );


    alert(
      "Une erreur est survenue pendant l'envoi. Vérifie ta connexion Internet puis réessaie."
    );


    button.disabled = false;

    button.textContent =
      "Confirmer mes choix ❤️";
  }
};
