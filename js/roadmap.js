// ── Section ID → notes page filter mapping ────────────────────
const SECTION_NOTES = {
  1: "programming-basics",
  2: "oop",
  3: "databases",
  4: "csharp",
  5: "csharp",
  6: "entity-framework",
  7: "aspnet",
  8: "aspnet",
  9: "aspnet",
};

// ── Skill names — MUST match roadmap-quizzes.js stepToSkillMap ─
const QUIZ_SKILL_NAMES = {
  1: "programming-basics",
  2: "oop",
  3: "databases",
  4: "csharp-basics",
  5: "advanced-csharp",
  6: "entity-framework",
  7: "aspnet-mvc",
  8: "web-api",
  9: "authentication",
};

// ── Quiz page routes — MUST match roadmap-quizzes.js stepToQuizMap ─
const QUIZ_ROUTES = {
  1: "../Quiz/quiz-programming-basics.html",
  2: "../Quiz/quiz-oop.html",
  3: "../Quiz/quiz-databases.html",
  4: "../Quiz/quiz-csharp-basics.html",
  5: "../Quiz/quiz-advanced-csharp.html",
  6: "../Quiz/quiz-entity-framework.html",
  7: "../Quiz/quiz-aspnet-mvc.html",
  8: "../Quiz/quiz-web-api.html",
  9: "../Quiz/quiz-authentication.html",
};

let totalSteps = document.querySelectorAll(".step-card").length;

function getNotesUrl(stepIndex) {
  const sectionId = SECTION_NOTES[stepIndex] || "general";
 return `/Note/note.html?section=${sectionId}`;
}

// Read latest attempt percentage from quiz_attempts_data_${skillName}
function getQuizResult(stepIndex) {
  const skillName = QUIZ_SKILL_NAMES[stepIndex];
  if (!skillName) return null;

  try {
    const raw = localStorage.getItem(`quiz_attempts_data_${skillName}`);
    if (!raw) return null;
    const attempts = JSON.parse(raw);
    if (!Array.isArray(attempts) || attempts.length === 0) return null;
    const latest = attempts[attempts.length - 1];
    return typeof latest.percentage === "number" ? Math.round(latest.percentage) : null;
  } catch {
    return null;
  }
}

// Larger result badge linked to quiz page
function renderResult(score, stepIndex) {
  const quizUrl = QUIZ_ROUTES[stepIndex] || "#";
  if (score === null) {
    return `<a href="${quizUrl}" class="result-badge result-pending">
      <span>Quiz pending</span>
    </a>`;
  }
  let cls = "result-low", label = "Needs Work";
  if (score >= 90)      { cls = "result-high"; label = "Excellent"; }
  else if (score >= 60) { cls = "result-mid";  label = "Good"; }
  return `<a href="${quizUrl}" class="result-badge ${cls}">
    <span class="result-score">${score}%</span>
    <span class="result-sep">·</span>
    <span>${label}</span>
  </a>`;
}

function loadRoadmap() {
  let completed    = 0;
  let foundCurrent = false;

  for (let i = 1; i <= totalSteps; i++) {
    const step = document.getElementById("step_" + i);
    if (!step) continue;

    const badge  = step.querySelector(".badge:not(.resourc)");
    const left   = step.querySelector(".step-left");
    const right  = step.querySelector(".step-right");
    const circle = step.querySelector(".circle");

    step.querySelectorAll(".step-actions, .step-bottom-row").forEach(el => el.remove());

    const isDone = (i === 1)
      ? localStorage.getItem("step_1_reset") !== "true"
      : localStorage.getItem("step_" + i) === "done";

   
    if (isDone) {
      completed++;

      badge.textContent = "Completed";
      badge.className   = "badge completed";
      circle.classList.add("done");
      circle.textContent = "✔";
      step.classList.remove("locked");

      const bottomRow = document.createElement("div");
      bottomRow.className = "step-bottom-row";
      bottomRow.innerHTML = `
        ${renderResult(getQuizResult(i), i)}
        <div class="completed-btn-group">
          <a href="${getNotesUrl(i)}" class="note-btn">
            <i class="fa-regular fa-newspaper"></i> Notes
          </a>
          <button onclick="window.location.href='${QUIZ_ROUTES[i] || "#"}'">Review</button>
        </div>
      `;
      step.appendChild(bottomRow);

   
    } else if (!foundCurrent) {
      foundCurrent = true;

      badge.textContent = "Start";
      badge.className   = "badge current";
      circle.classList.remove("done");
      circle.textContent = i;
      step.classList.remove("locked");

      const bottomRow = document.createElement("div");
      bottomRow.className = "step-bottom-row current-bottom-row";
      bottomRow.innerHTML = `
        <a href="${getNotesUrl(i)}" class="note-btn">
          <i class="fa-regular fa-newspaper"></i> Notes
        </a>
        <button onclick="window.location.href='${QUIZ_ROUTES[i] || "#"}'">Start Quiz</button>
      `;
      step.appendChild(bottomRow);

   
    } else {
      badge.textContent = "Locked";
      badge.className   = "badge locked";
      circle.classList.remove("done");
      circle.textContent = i;
      step.classList.add("locked");

      const actions = document.createElement("div");
      actions.className = "step-actions locked-actions";
      actions.innerHTML = `<button disabled>Locked</button>`;
      right.appendChild(actions);
    }
  }

  const percent = totalSteps ? (completed / totalSteps) * 100 : 0;
  document.getElementById("progressBar").style.width  = percent + "%";
  document.getElementById("progressText").innerText   = Math.round(percent) + "%";
  document.getElementById("progressStatus").innerText =
    `${completed} skill${completed !== 1 ? "s" : ""} completed out of ${totalSteps}`;
}

window.onload = loadRoadmap;


document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") loadRoadmap();
});
