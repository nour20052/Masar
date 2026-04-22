let totalSteps = document.querySelectorAll(".step-card").length;

function loadRoadmap() {
  let completed = 0;
  let foundCurrent = false;

  for (let i = 1; i <= totalSteps; i++) {
    let step = document.getElementById("step_" + i);
    if (!step) continue;

    let badge = step.querySelector(".badge");
    let btn = step.querySelector("button");
    let circle = step.querySelector(".circle");
    let notes = step.querySelector(".note-btn"); 

    let isDone;

    if (i === 1) {
      isDone = localStorage.getItem("step_1_reset") !== "true";
    } else {
      isDone = localStorage.getItem("step_" + i) === "done";
    }

   
    if (isDone) {
      completed++;

      badge.textContent = "Completed";
      badge.classList.remove("current", "locked");
      badge.classList.add("completed");

      btn.textContent = "Review";
      btn.disabled = false;

      circle.classList.add("done");
      circle.textContent = "✔";

      step.classList.remove("locked");

      
      if (notes) notes.style.display = "inline-flex";
    }

   
    else if (!foundCurrent) {
      badge.textContent = "Start";
      badge.classList.remove("completed", "locked");
      badge.classList.add("current");

      btn.textContent = "Start Quiz";
      btn.disabled = false;

      circle.classList.remove("done");
      circle.textContent = i;

      step.classList.remove("locked");

      foundCurrent = true;

      
      if (notes) notes.style.display = "inline-flex";
    }

    
    else {
      badge.textContent = "Locked";
      badge.classList.remove("completed", "current");
      badge.classList.add("locked");

      btn.textContent = "Locked";
      btn.disabled = true;

      circle.classList.remove("done");
      circle.textContent = i;

      step.classList.add("locked");

     
      if (notes) notes.style.display = "none";
    }
  }

  let percent = totalSteps ? (completed / totalSteps) * 100 : 0;

  document.getElementById("progressBar").style.width = percent + "%";
  document.getElementById("progressText").innerText = Math.round(percent) + "%";
  document.getElementById("progressStatus").innerText =
    `${completed} skills completed out of ${totalSteps}`;
}


window.onload = loadRoadmap;








