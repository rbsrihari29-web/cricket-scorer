let runs = 0;
let wickets = 0;
let balls = 0;
let history = []; 
let freeHit = false;
let inningsOver=false;

function toggleInnings() {
  inningsOver = document.getElementById("endInnings").checked;
  const buttons=document.getElementById("buttons");
  const ex=document.getElementById("ex");
  const un=document.getElementById("un");
  if (inningsOver) {

    setTimeout(() => {
      document.getElementById("endInnings").checked=false;
      alert("Innings completed!");
      buttons.classList.add("hidden");
      ex.classList.add("ext");
      un.classList.add("unc");
    }, 500);
    
  } else {
    document.getElementById("status").innerText = "";
    buttons.classList.remove("hidden");
    ex.classList.remove("ext");
    un.classList.remove("unc");
  }
}
function addRun(run) {
  if (inningsOver||wickets >= 10) return;
  runs += run;
  balls++;
  history.push({ type: "run", value: run });

  if (freeHit) {
    freeHit = false; 
    document.getElementById("status").innerText = "";
  }

  updateScore();
}

function addWicket() {
  if (inningsOver||wickets >= 10) return;
  if (freeHit) {
    alert("Free Hit! Wicket not counted.");
    freeHit = false;
    document.getElementById("status").innerText = "";
    return; 
  }

  wickets++;
  balls++;
  history.push({ type: "wicket" });

  if (wickets == 10) {
    alert("All Out!");
  }

  updateScore();
}

function addExtra(type) {
  if (inningsOver||wickets >= 10) return;
  runs += 1; 
  history.push({ type: "extras", value: type });

  if (type === "noball") {
    freeHit = true;
    alert("Free Hit Coming!");
  }

  updateScore();
}

function undo() {
  if (inningsOver||history.length === 0) return;

  let last = history.pop();
  if (last.type === "run") {
    runs -= last.value;
    balls--;
  } else if (last.type === "wicket") {
    wickets--;
    balls--;
  } else if (last.type === "extras") {
    runs -= 1;
    if (last.value === "noball") {
      freeHit = false;
      document.getElementById("status").innerText = "";
    }
  }
  updateScore();
}

function resetScore() {
  runs = 0;
  wickets = 0;
  balls = 0;
  history = [];
  freeHit = false;
  document.getElementById("status").innerText = "";
  updateScore();
  document.getElementById("buttons").classList.remove("hidden");
  document.getElementById("ex").classList.remove("ext");
  document.getElementById("un").classList.remove("unc");
  inningsOver=false;
}

function updateScore() {
  document.getElementById("runs").innerText = "Runs: " + runs;
  document.getElementById("wickets").innerText = "Wickets: " + wickets;
  document.getElementById("overs").innerText = "Overs: " + formatOvers(balls);
}

function formatOvers(balls) {
  let over = Math.floor(balls / 6);
  let ball = balls % 6;
  return over + "." + ball;
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  let mb=document.getElementById("mode");
  if (document.body.classList.contains("dark-mode")){
    mode.innerText="☀ Light Mode";
  }
  else{
    mode.innerText="🌙 Dark Mode";
  }
}