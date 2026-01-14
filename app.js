// ===============================
// SAFETY CHECK
// ===============================
if (typeof fitnessPlan === "undefined") {
  alert("fitnessPlan not found. Check data.js");
  throw new Error("fitnessPlan missing");
}

// ===============================
// DATE SETUP
// ===============================
const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
const todayDate = new Date().toISOString().split("T")[0];
const yesterdayDate = new Date(Date.now() - 86400000)
  .toISOString()
  .split("T")[0];

const todayKey = `completed-${today}`;
const postureKey = `posture-${todayDate}`;

// ===============================
// DOM ELEMENTS
// ===============================
const dayEl = document.getElementById("day");
const workoutTypeEl = document.getElementById("workoutType");
const exerciseList = document.getElementById("exerciseList");
const statusEl = document.getElementById("status");
const masaiDiv = document.getElementById("masaiJumps");
const streakEl = document.getElementById("streakCount");
const postureList = document.getElementById("postureList");
const postureStatus = document.getElementById("postureStatus");

// ===============================
// STREAK INIT
// ===============================
let streak = Number(localStorage.getItem("streak")) || 0;
let lastCompletedDate = localStorage.getItem("lastCompletedDate");

if (
  lastCompletedDate &&
  lastCompletedDate !== yesterdayDate &&
  lastCompletedDate !== todayDate
) {
  streak = 0;
  localStorage.setItem("streak", streak);
}

// ===============================
// LOAD TODAY DATA
// ===============================
const todayData =
  fitnessPlan.weeklyPlan[today] || {
    workoutType: "No Workout",
    exercises: [],
    masaiJumps: null
  };

dayEl.textContent = today;
workoutTypeEl.textContent = todayData.workoutType;

// ===============================
// REST DAY
// ===============================
if (todayData.exercises.length === 0) {
  statusEl.textContent = "Rest Day ✅ Automatically Completed";
  localStorage.setItem(todayKey, "true");

  if (lastCompletedDate !== todayDate) {
    streak++;
    localStorage.setItem("streak", streak);
    localStorage.setItem("lastCompletedDate", todayDate);
    localStorage.setItem(
  `history-${todayDate}`,
  JSON.stringify({
    date: todayDate,
    workout: true,
    posture: localStorage.getItem(postureKey) === "true",
    nutrition: true
  })
);

  }
}

// ===============================
// WORKOUT CHECKLIST
// ===============================
const workoutCompleted = localStorage.getItem(todayKey) === "true";

const workoutCheckboxes = [];
todayData.exercises.forEach((ex, index) => {
  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = workoutCompleted;

  checkbox.addEventListener("change", checkWorkoutCompletion);
  workoutCheckboxes.push(checkbox);

  const label = document.createElement("label");
  label.textContent = ` ${ex.name} — ${ex.sets} × ${ex.reps}`;

  li.appendChild(checkbox);
  li.appendChild(label);
  exerciseList.appendChild(li);
});

// ===============================
// MASAI JUMPS
// ===============================
if (todayData.masaiJumps) {
  masaiDiv.textContent =
    `Masai Jumps: ${todayData.masaiJumps.sets} × ${todayData.masaiJumps.reps}`;
}

// ===============================
// WORKOUT COMPLETION
// ===============================
function checkWorkoutCompletion() {
  const allChecked = workoutCheckboxes.every(cb => cb.checked);

  if (allChecked) {
    localStorage.setItem(todayKey, "true");

    if (lastCompletedDate !== todayDate) {
      streak++;
      localStorage.setItem("streak", streak);
      localStorage.setItem("lastCompletedDate", todayDate);
    }

    statusEl.textContent = "Workout Completed ✅";
  } else {
    localStorage.removeItem(todayKey);
    statusEl.textContent = "Workout Incomplete ❌";
  }
  const historyKey = `history-${todayDate}`;
localStorage.setItem(
  historyKey,
  JSON.stringify({
    date: todayDate,
    workout: true,
    posture: localStorage.getItem(postureKey) === "true",
    nutrition: true
  })
);


  streakEl.textContent = streak;
}

// ===============================
// POSTURE ROUTINE
// ===============================
const postureCompleted = localStorage.getItem(postureKey) === "true";

const postureCheckboxes = [];
fitnessPlan.dailyPostureRoutine.forEach((ex, index) => {
  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = postureCompleted;

  checkbox.addEventListener("change", checkPostureCompletion);
  postureCheckboxes.push(checkbox);

  const label = document.createElement("label");
  let details = "";
  if (ex.sets) details += `${ex.sets} sets `;
  if (ex.reps) details += `× ${ex.reps} `;
  if (ex.duration) details += `(${ex.duration})`;
  label.textContent = ` ${ex.name} ${details}`;

  li.appendChild(checkbox);
  li.appendChild(label);
  postureList.appendChild(li);
});

// ===============================
// POSTURE COMPLETION
// ===============================
function checkPostureCompletion() {
  const allChecked = postureCheckboxes.every(cb => cb.checked);

  postureStatus.textContent = allChecked
    ? "Posture Routine Completed ✅"
    : "Posture Routine Incomplete ❌";

  if (allChecked) localStorage.setItem(postureKey, "true");
  else localStorage.removeItem(postureKey);
}

// ===============================
// FINAL UI STATE
// ===============================
streakEl.textContent = streak;
postureStatus.textContent = postureCompleted
  ? "Posture Routine Completed ✅"
  : "Posture Routine Incomplete ❌";
// ===============================
// NUTRITION TIMELINE
// ===============================
const nutritionList = document.getElementById("nutritionList");

fitnessPlan.nutritionSchedule.forEach(item => {
  const li = document.createElement("li");

  const time = document.createElement("strong");
  time.textContent = item.time + " - ";

  const title = document.createElement("span");
  title.textContent = item.title + ": ";

  const details = document.createElement("span");
  details.textContent = item.details;

  li.appendChild(time);
  li.appendChild(title);
  li.appendChild(details);

  nutritionList.appendChild(li);
});
// ===============================
// WEEKLY MON–SUN VIEW
// ===============================
const weeklyView = document.getElementById("weeklyView");

const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

weekDays.forEach(day => {
  const dayData = fitnessPlan.weeklyPlan[day];
  const li = document.createElement("li");

  // Completion check (by weekday)
  const completed = localStorage.getItem(`completed-${day}`) === "true";

  let status = "❌ Pending";
  if (dayData.exercises.length === 0) status = "🟢 Rest";
  else if (completed) status = "✅ Completed";

  let masaiText = "";
  if (dayData.masaiJumps) {
    masaiText = ` | Masai Jumps: ${dayData.masaiJumps.sets} × ${dayData.masaiJumps.reps}`;
  }

  li.textContent =
    `${day} — ${dayData.workoutType} ${masaiText} → ${status}`;

  weeklyView.appendChild(li);
});
// ===============================
// DAILY BADGES
// ===============================
const badgeList = document.getElementById("badgeList");
badgeList.innerHTML = "";

const workoutDone = localStorage.getItem(todayKey) === "true";
const postureDone = localStorage.getItem(postureKey) === "true";

// Nutrition badge (view-based)
const nutritionViewedKey = `nutrition-${todayDate}`;
localStorage.setItem(nutritionViewedKey, "true");
const nutritionDone = true;

function addBadge(label, done) {
  const li = document.createElement("li");
  li.textContent = done ? `✅ ${label}` : `❌ ${label}`;
  badgeList.appendChild(li);
}

addBadge("Workout Completed", workoutDone);
addBadge("Posture Routine Completed", postureDone);
addBadge("Nutrition Followed", nutritionDone);
// ===============================
// HISTORY VIEW
// ===============================
const historyList = document.getElementById("historyList");

for (let key in localStorage) {
  if (key.startsWith("history-")) {
    const record = JSON.parse(localStorage.getItem(key));
    const li = document.createElement("li");

    li.textContent =
      `${record.date} → ` +
      `Workout: ${record.workout ? "✅" : "❌"}, ` +
      `Posture: ${record.posture ? "✅" : "❌"}, ` +
      `Nutrition: ${record.nutrition ? "✅" : "❌"}`;

    historyList.appendChild(li);
  }
}
