const audio = document.getElementById("audio");
const cover = document.querySelector('[data-page="cover"]');
const poems = document.querySelector('[data-page="poems"]');

const tracks = ["./assets/track-01.mp3", "./assets/track-02.mp3"];
let track = 0;

function fadeTo(which) {
  const next = which === "poems" ? poems : cover;
  const prev = which === "poems" ? cover : poems;
  if (!next || !prev || next === prev) return;

  prev.classList.add("is-fading");
  setTimeout(() => {
    prev.hidden = true;
    prev.classList.remove("is-fading");

    next.hidden = false;
    next.classList.add("is-fading");
    requestAnimationFrame(() => next.classList.remove("is-fading"));
  }, 220);

  history.replaceState(null, "", which === "poems" ? "#poems" : "#cover");
}

function play() {
  audio?.play().catch(() => {});
  fadeTo("poems");
}

function pause() {
  audio?.pause();
}

function skip() {
  track = (track + 1) % tracks.length;
  if (!audio) return;
  audio.src = tracks[track];
  audio.play().catch(() => {});
}

function back() {
  fadeTo("cover");
}

document.addEventListener("click", (e) => {
  const el = e.target.closest("[data-action]");
  if (!el) return;

  switch (el.dataset.action) {
    case "play":
      play();
      break;
    case "pause":
      pause();
      break;
    case "skip":
      skip();
      break;
    case "back":
      back();
      break;
  }
});

// Start state + browser back/forward support
poems.hidden = true;
cover.hidden = false;
if (location.hash === "#poems") fadeTo("poems");
window.addEventListener("hashchange", () => fadeTo(location.hash === "#poems" ? "poems" : "cover"));

