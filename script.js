import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";

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
