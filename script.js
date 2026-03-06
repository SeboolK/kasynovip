let balance = 0

function saveBalance(){
localStorage.setItem("balance",balance)
}

function loadBalance(){

let saved = localStorage.getItem("balance")

if(saved){
balance = parseFloat(saved)
}

updateBalance()

}

function updateBalance(){
document.getElementById("balance").innerText =
balance.toFixed(5)
}

/* LOGIN */

function login(){

document.getElementById("loginScreen").style.display="none"
document.getElementById("casino").style.display="block"

loadBalance()

}

function register(){

alert("Konto utworzone (demo)")

}

/* PAGE */

function showPage(id){

document.querySelectorAll("section").forEach(sec=>{
sec.style.display="none"
})

document.getElementById(id).style.display="block"

}

/* DEMO BTC */

function addDemoBalance(){

balance += 0.001

updateBalance()

saveBalance()

}

/* CRASH */

let running=false
let multiplier=1

function startCrash(){

running=true
multiplier=1

let interval=setInterval(()=>{

if(!running){
clearInterval(interval)
return
}

multiplier += Math.random()*0.06

document.getElementById("crashMultiplier").innerText =
multiplier.toFixed(2)+"x"

if(Math.random()<0.02){

running=false

document.getElementById("crashMultiplier").innerText="CRASH"

clearInterval(interval)

}

},100)

}

function cashout(){

if(!running) return

running=false

balance += multiplier*0.0002

updateBalance()

saveBalance()

}

/* CHAT */

function sendMessage(){

let msg=document.getElementById("chatInput").value

let div=document.createElement("div")

div.innerText="Ty: "+msg

document.getElementById("chatBox").appendChild(div)

document.getElementById("chatInput").value=""

}
