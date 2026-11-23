/* Diffusion Without Equations — small progressive enhancements, no dependencies. */
(function () {
  "use strict";

  /* ---- Scaled iframe (Part 2 animation): keep a fixed-size page legible at any width ---- */
  function fitFrames() {
    document.querySelectorAll(".scale-frame").forEach(function (box) {
      var frame = box.querySelector("iframe");
      var w = +box.dataset.width, h = +box.dataset.height;
      var scale = Math.min(1, box.clientWidth / w);
      frame.style.width = w + "px";
      frame.style.height = h + "px";
      frame.style.transform = "scale(" + scale + ")";
      box.style.height = Math.ceil(h * scale) + "px";
    });
  }
  if (document.querySelector(".scale-frame")) {
    fitFrames();
    window.addEventListener("resize", fitFrames);
  }

  /* ---- Lazy YouTube players: only load the iframe when asked ---- */
  document.addEventListener("click", function (e) {
    var btn = e.target.closest(".load-video");
    if (!btn) return;
    var slot = btn.parentElement;
    var src = "https://www.youtube-nocookie.com/embed/" + slot.dataset.video +
      "?start=" + slot.dataset.start + "&autoplay=1&rel=0";
    slot.innerHTML = '<div class="video"><iframe src="' + src + '" title="Lecture video" ' +
      'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ' +
      'allowfullscreen></iframe></div>';
  });

  /* ---- Quiz ---- */
  var quizzes = document.querySelectorAll(".quiz");
  if (!quizzes.length) return;
  var scorebar = document.querySelector(".scorebar");
  var scoreText = scorebar && scorebar.querySelector(".score-text");
  var total = quizzes.length;

  function updateScore() {
    if (!scorebar) return;
    var answered = document.querySelectorAll(".quiz.is-correct, .quiz.is-wrong").length;
    var right = document.querySelectorAll(".quiz.is-correct").length;
    scorebar.hidden = answered === 0;
    scoreText.textContent = right + " correct out of " + answered + " answered (" + total + " questions)";
  }

  document.addEventListener("click", function (e) {
    var btn = e.target.closest(".answer");
    if (!btn || btn.disabled) return;
    var quiz = btn.closest(".quiz");
    var buttons = quiz.querySelectorAll(".answer");
    var ok = btn.hasAttribute("data-correct");
    buttons.forEach(function (b) {
      b.disabled = true;
      if (b.hasAttribute("data-correct")) b.classList.add("reveal-correct");
    });
    if (!ok) btn.classList.add("chosen-wrong");
    quiz.classList.add(ok ? "is-correct" : "is-wrong");
    var fb = quiz.querySelector(".feedback");
    fb.className = "feedback " + (ok ? "good" : "bad");
    fb.textContent = ok ? "Correct!" :
      "Not quite. The correct answer is highlighted in green" +
      (quiz.querySelector(".video-slot") ? ". The video below explains why." : ".");
    updateScore();
  });

  if (scorebar) {
    scorebar.querySelector("button").addEventListener("click", function () {
      quizzes.forEach(function (q) {
        q.classList.remove("is-correct", "is-wrong");
        q.querySelectorAll(".answer").forEach(function (b) {
          b.disabled = false;
          b.classList.remove("reveal-correct", "chosen-wrong");
        });
        var fb = q.querySelector(".feedback");
        fb.textContent = "";
        fb.className = "feedback";
      });
      updateScore();
    });
  }
})();
