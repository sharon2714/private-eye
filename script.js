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
"열쇠":"연구실 서랍을 여는 열쇠 (범행 접근 가능)",
"메모":"피해자의 마지막 연구 기록"
},
hall:{
"CCTV":"사건 당시 이동 기록",
"발자국":"급히 이동한 흔적"
},
storage:{
"혈흔":"범행 가능 흔적",
"장갑":"버려진 장갑"
},
office:{
"통화기록":"마지막 통화 대상",
"메일":"협박 메시지"
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
let notes = [];

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
murderer = Object.keys(suspects)[Math.floor(Math.random()*Object.keys(suspects).length)];

document.getElementById("caseTitle").innerText=currentCase.title;
document.getElementById("caseLocation").innerText=currentCase.location;
document.getElementById("caseVictim").innerText=currentCase.victim;
document.getElementById("caseMotive").innerText=currentCase.motive;

document.getElementById("clueArea").innerHTML="";
document.getElementById("detectiveNotes").innerHTML="";
document.getElementById("discussionLog").innerHTML="";
document.getElementById("resultArea").innerHTML="";

notes=[];
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
alert(clues[place][k]);
notes.push(k);
document.getElementById("detectiveNotes").innerHTML += `<div class='note'>${k}</div>`;
};

document.getElementById("clueArea").appendChild(div);
});
}

function question(name){
let msg = suspects[name][Math.floor(Math.random()*suspects[name].length)];

document.getElementById("discussionLog").innerHTML +=
`<div class='chat'><b>${name}</b>: ${msg}</div>`;
}

function vote(){
let pick=document.getElementById("voteSelect").value;

document.getElementById("resultArea").innerHTML =
(pick===murderer)
? "정답!"
: "오답! 정답: " + murderer;
}
