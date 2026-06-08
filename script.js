
const cases = [
{
title:"사라진 연구자료 사건",
location:"대학교 연구실",
victim:"김민수 교수",
motive:"연구비 경쟁"
},
{
title:"별장 살인 사건",
location:"외곽 별장",
victim:"사업가 박준혁",
motive:"금전 갈등"
},
{
title:"호텔 독살 사건",
location:"시내 호텔",
victim:"배우 이현우",
motive:"복수"
}
];

const suspects = [
"김도윤",
"박서연",
"최현우",
"정지민",
"이유진",
"강민석"
];

let currentCase = null;
let murderer = "";

// =======================
// START GAME (핵심)
// =======================
function startGame(){

document.querySelector(".mode-box").style.display = "none";
document.getElementById("gameArea").style.display = "block";

goStep(1);
generateCase();

}

// =======================
// STEP SYSTEM (핵심)
// =======================
function goStep(step){

for(let i=1;i<=5;i++){
let el = document.getElementById("step"+i);
if(el) el.style.display = "none";
}

let current = document.getElementById("step"+step);
if(current) current.style.display = "block";

}

// =======================
// CASE GENERATION
// =======================
function generateCase(){

currentCase = cases[Math.floor(Math.random()*cases.length)];
murderer = suspects[Math.floor(Math.random()*suspects.length)];

document.getElementById("caseTitle").innerText =
"사건명: " + currentCase.title;

document.getElementById("caseLocation").innerText =
"장소: " + currentCase.location;

document.getElementById("caseVictim").innerText =
"피해자: " + currentCase.victim;

document.getElementById("caseMotive").innerText =
"동기: " + currentCase.motive;

console.log("범인:", murderer);

}

const suspects = [
"김도윤",
"박서연",
"최현우",
"정지민",
"이유진",
"강민석"
];

const clues = {

lab:[
"찢어진 메모 발견",
"피해자와 누군가 약속한 흔적 발견",
"책상 서랍에서 의문의 열쇠 발견"
],

hall:[
"CCTV 영상 발견",
"사건 직전 누군가 복도를 지나감",
"바닥에서 신발 자국 발견"
],

storage:[
"혈흔 발견",
"수상한 상자 발견",
"버려진 장갑 발견"
],

office:[
"통화 기록 발견",
"피해자의 일정표 발견",
"협박 메일 발견"
]

};

let murderer = "";
let currentCase = null;

function goStep(){

document.querySelector(".mode-box").style.display = "none";

document.getElementById("gameArea").style.display = "block";

generateCase();

}

function generateCase(){

currentCase =
cases[Math.floor(Math.random()*cases.length)];

document.getElementById("caseTitle").innerHTML =
"<strong>사건명:</strong> " + currentCase.title;

document.getElementById("caseLocation").innerHTML =
"<strong>장소:</strong> " + currentCase.location;

document.getElementById("caseVictim").innerHTML =
"<strong>피해자:</strong> " + currentCase.victim;

document.getElementById("caseMotive").innerHTML =
"<strong>동기:</strong> " + currentCase.motive;

murderer =
suspects[Math.floor(Math.random()*suspects.length)];

console.log("범인:", murderer);

document.getElementById("clueArea").innerHTML = "";
document.getElementById("discussionLog").innerHTML = "";
document.getElementById("resultArea").innerHTML = "";

}

function investigate(place){

const clueList = clues[place];

const randomClue =
clueList[Math.floor(Math.random()*clueList.length)];

document.getElementById("clueArea").innerHTML +=
`
<div class="clue-card">
📄 ${randomClue}
</div>
`;
document.getElementById("detectiveNotes").innerHTML +=
`
<p>✔ ${randomClue}</p>
`;
}

function askQuestion(){

const randomSuspect =
suspects[Math.floor(Math.random()*suspects.length)];

let response = "";

if(randomSuspect === murderer){

response =
"저는 사건 당시 다른 건물에 있었습니다.";

}else{

const innocentResponses = [

"저는 피해자와 친한 사이였습니다.",

"사건 당시 저는 도서관에 있었습니다.",

"그 단서는 처음 보네요.",

"저도 범인을 찾고 싶습니다."

];

response =
innocentResponses[
Math.floor(Math.random()*innocentResponses.length)
];

}

addDiscussion(
randomSuspect,
response
);

}

function pressureSuspect(){

const randomSuspect =
suspects[Math.floor(Math.random()*suspects.length)];

let response = "";

if(randomSuspect === murderer){

response =
"왜 자꾸 저를 의심하시죠? 저는 결백합니다.";

}else{

response =
"저는 숨기는 것이 없습니다.";

}

addDiscussion(
randomSuspect,
response
);

}

function accuseSuspect(){

const randomSuspect =
suspects[Math.floor(Math.random()*suspects.length)];

let response = "";

if(randomSuspect === murderer){

response =
"증거도 없으면서 왜 저를 범인이라고 생각하나요?";

}else{

response =
"저는 아닙니다. 다른 사람을 조사해보세요.";

}

addDiscussion(
randomSuspect,
response
);

}

function addDiscussion(name, text){

document.getElementById("discussionLog").innerHTML +=
`
<div class="chat-card">
<strong>${name}</strong><br>
${text}
</div>
`;

}

function voteMurderer(){

const selected =
document.getElementById("voteSelect").value;

if(selected === murderer){

document.getElementById("resultArea").innerHTML =
`
<div class="success-box">
<h2>CASE CLOSED</h2>
<p>범인 검거 성공</p>
<p>실제 범인: ${murderer}</p>
</div>
`;

}else{

document.getElementById("resultArea").innerHTML =
`
<div class="fail-box">
<h2>CASE UNSOLVED</h2>
<p>범인 검거 실패</p>
<p>실제 범인: ${murderer}</p>
</div>
`;

}

}


function goStep(step){

document.querySelectorAll(".step").forEach(s=>{
    s.style.display = "none";
});

document.getElementById("step" + step).style.display = "block";

}
