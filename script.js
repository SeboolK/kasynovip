// ====== PANEL LOGOWANIA ======
let balance = 0
let wins = 0
let losses = 0

function register(){
  let user = document.getElementById("username").value
  let pass = document.getElementById("password").value
  if(user === "" || pass === ""){
    document.getElementById("loginMessage").innerText="Wpisz dane"
    return
  }
  // zapis użytkownika w localStorage
  localStorage.setItem("casinoUser", user)
  localStorage.setItem("casinoPass", pass)
  localStorage.setItem("casinoBalance", 0)
  localStorage.setItem("casinoWins", 0)
  localStorage.setItem("casinoLosses", 0)
  document.getElementById("loginMessage").innerText="Konto utworzone"
}

function login(){
  let user = document.getElementById("username").value
  let pass = document.getElementById("password").value
  let savedUser = localStorage.getItem("casinoUser")
  let savedPass = localStorage.getItem("casinoPass")
  if(user === savedUser && pass === savedPass){
    document.getElementById("loginScreen").style.display="none"
    document.getElementById("casino").style.display="block"
    // załaduj saldo i statystyki
    balance = parseFloat(localStorage.getItem("casinoBalance"))
    wins = parseInt(localStorage.getItem("casinoWins"))
    losses = parseInt(localStorage.getItem("casinoLosses"))
    document.getElementById("playerName").innerText = savedUser
    updateBalance()
    updateStats()
    loadLeaderboard()
  } else {
    document.getElementById("loginMessage").innerText="Błędny login"
  }
}

// automatyczne logowanie
window.onload = function(){
  let savedUser = localStorage.getItem("casinoUser")
  if(savedUser){
    document.getElementById("loginScreen").style.display="none"
    document.getElementById("casino").style.display="block"
    balance = parseFloat(localStorage.getItem("casinoBalance"))
    wins = parseInt(localStorage.getItem("casinoWins"))
    losses = parseInt(localStorage.getItem("casinoLosses"))
    document.getElementById("playerName").innerText = savedUser
    updateBalance()
    updateStats()
    loadLeaderboard()
  }
}

function logout(){
  document.getElementById("casino").style.display="none"
  document.getElementById("loginScreen").style.display="flex"
}

// ====== FUNKCJE GLOBALNE ======
function updateBalance(){
  document.getElementById("balance").innerText = balance.toFixed(5)
  localStorage.setItem("casinoBalance", balance)
}

function updateStats(){
  document.getElementById("wins").innerText = wins
  document.getElementById("losses").innerText = losses
  localStorage.setItem("casinoWins", wins)
  localStorage.setItem("casinoLosses", losses)
}

// ====== DASHBOARD ======
function addDemoBalance(){
  balance += 0.001
  updateBalance()
}

// ====== LEADERBOARD ======
function loadLeaderboard(){
  let list = document.getElementById("leaderboardList")
  list.innerHTML=""
  let savedUser = localStorage.getItem("casinoUser")
  let savedBalance = parseFloat(localStorage.getItem("casinoBalance"))
  let players = [{name:savedUser, balance:savedBalance}]
  // przykładowi gracze
  players.push({name:"Player2", balance:0.005})
  players.push({name:"Player3", balance:0.01})
  players.sort((a,b)=>b.balance - a.balance)
  players.forEach(p=>{
    let li = document.createElement("li")
    li.innerText = `${p.name} — ${p.balance.toFixed(5)} BTC`
    list.appendChild(li)
  })
}

// ====== CRASH DEMO ======
let running=false
let multiplier=1

function startCrash(){
  running=true
  multiplier=1
  let interval = setInterval(()=>{
    if(!running){
      clearInterval(interval)
      return
    }
    multiplier += Math.random()*0.05
    document.getElementById("multiplier").innerText = multiplier.toFixed(2)+"x"
    if(Math.random()<0.02){
      running=false
      document.getElementById("multiplier").innerText="CRASH"
      losses++
      updateStats()
      clearInterval(interval)
    }
  },100)
}

function cashout(){
  if(!running) return
  running=false
  balance += multiplier*0.0002
  wins++
  updateBalance()
  updateStats()
}

// ====== DICE ======
function rollDice(){
  let result = Math.floor(Math.random()*100)
  document.getElementById("diceResult").innerText = result
  if(result > 50){
    balance += 0.0002
    wins++
  } else {
    balance -= 0.0001
    losses++
  }
  updateBalance()
  updateStats()
}

// ====== MINES ======
let mines=[]
function createMines(){
  let grid = document.getElementById("mineGrid")
  grid.innerHTML=""
  mines=[]
  for(let i=0;i<25;i++){
    let bomb = Math.random()<0.2
    mines.push(bomb)
    let div = document.createElement("div")
    div.className="mine"
    div.onclick=()=>{
      if(div.innerText!==""){return} // kliknięcie raz
      if(bomb){
        div.innerText="💣"
        balance -= 0.0002
        losses++
      } else {
        div.innerText="💎"
        balance += 0.0001
        wins++
      }
      updateBalance()
      updateStats()
    }
    grid.appendChild(div)
  }
}

// ====== COINFLIP ======
function flipCoin(){
  let result = Math.random()<0.5?"Orzeł":"Reszka"
  document.getElementById("coinResult").innerText=result
  if(result==="Orzeł"){
    balance += 0.0002
    wins++
  } else {
    balance -= 0.0001
    losses++
  }
  updateBalance()
  updateStats()
}

// ====== ROULETTE ======
function spinRoulette(){
  let wheel = document.getElementById("rouletteWheel")
  let deg = Math.random()*3600
  wheel.style.transform="rotate("+deg+"deg)"
  let number = Math.floor(Math.random()*37)
  document.getElementById("rouletteResult").innerText="Wynik: "+number
  if(number===7){ // trafienie przykładowe
    balance += 0.005
    wins++
  } else {
    balance -= 0.0001
    losses++
  }
  updateBalance()
  updateStats()
}
