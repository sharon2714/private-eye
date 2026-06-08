const cases = [
{
title:"사라진 연구자료 사건",
location:"대학교 연구실",
victim:"김민수 교수",
motive:"연구비 경쟁"
},
{
title:"호텔 살인 사건",
location:"시내 호텔",
victim:"배우 이현우",
motive:"복수"
}
];

const clues = {
lab:{
"열쇠":"연구실 서랍 열쇠 (누군가 접근 가능)",
"메모":"피해자와 공동 연구 흔적 존재"
},
hall:{
"CCTV":"박서연이 사건 직전 이동",
"발자국":"김도윤 신발과 일치"
},
storage:{
"혈흔":"강한 저항 흔적",
"장갑":"이유진 DNA 검출"
},
office:{
"통화기록":"사망 직전 강민석과 통화",
"메일":"최현우 협박 메시지"
}
};

const suspects = {
"김도윤":["저는 연구실에 없었습니다","모릅니다","결백합니다"],
"박서연":["회의 중이었습니다","기억 안 납니다","아닙니다"],
"최현우":["취재 중이었습니다","무관합니다","오해입니다"],
"정지민":["강의실에 있었습니다","모릅니다","아닙니다"],
"이유진":["실험 중이었습니다","기억이 없습니다","결백합니다"],
"강민석":["회의실에 있었습니다","모릅니다","아닙니다"]
};

let currentCase;
let murderer;

function startGame(){
document.getElementById("gameArea").style.display="block";
goStep(1);
generateCase();
}

function resetCase(){
generateCase();
goStep(1);
}

function generateCase(){
currentCase = cases[Math.floor(Math.random()*cases.length)];
murderer = Object.keys(suspects)[Math.floor(Math.random()*6)];

document.getElementById("caseTitle").innerText=currentCase.title;
document.getElementById("caseLocation").innerText=currentCase.location;
document.getElementById("caseVictim").innerText=currentCase.victim;
document.getElementById("caseMotive").innerText=currentCase.motive;

document.getElementById("clueArea").innerHTML="";
document.getElementById("detectiveNotes").innerHTML="";
document.getElementById("discussionLog").innerHTML="";
document.getElementById("resultArea").innerHTML="";
}

function goStep(step){
for(let i=1;i<=4;i++){
let el=document.getElementById("step"+i);
if(el) el.style.display="none";
}
document.getElementById("step"+step).style.display="block";
}

function investigate(place){
const keys=Object.keys(clues[place]);

keys.forEach(k=>{
let div=document.createElement("div");
div.className="clue-item";
div.innerText=k;

div.onclick=function(){
document.getElementById("clueDetail").innerHTML =
`<b>${k}</b><br>${clues[place][k]}`;

document.getElementById("detectiveNotes").innerHTML +=
`<div>${k}</div>`;
};

document.getElementById("clueArea").appendChild(div);
});
}

function question(name){
let msg = suspects[name][Math.floor(Math.random()*3)];

document.getElementById("discussionLog").innerHTML +=
`<div><b>${name}</b>: ${msg}</div>`;
}

function vote(){
let pick=document.getElementById("voteSelect").value;

document.getElementById("resultArea").innerHTML =
(pick===murderer)
? "정답"
: "오답 (범인: " + murderer + ")";
}
