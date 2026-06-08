// =========================
// 🔥 CASE DATA (완전 독립 구조)
// =========================

const stories = [
{
case:{
title:"사라진 연구 데이터 사건",
location:"대학교 연구실",
victim:"김민수 교수",
motive:"연구비 경쟁"
},
suspects:{
"김도윤":["도서관에서 논문 작업 중","연구실 출입 없음","자료 정리 중"],
"박서연":["회의 중 데이터 분석","실험 진행 중","보고서 작성 중"],
"이유진":["장비 점검 중","실험 진행 중","연구실에 있었음"]
},
clues:{
lab:{
"USB":"김도윤 연구 데이터 저장 장치 (삭제 흔적 존재)",
"노트":"박서연의 수정 흔적이 남아 있음"
},
office:{
"메일":"이유진과 연구비 갈등 정황",
"로그":"23:14 연구실 접근 기록"
}
},
murderer:"박서연"
},

{
case:{
title:"호텔 독살 사건",
location:"시내 호텔",
victim:"배우 이현우",
motive:"복수"
},
suspects:{
"최현우":["취재 중 기사 작성","카페에서 인터뷰","자료 정리 중"],
"정지민":["강의 중","과제 제출 중","학교에 있었음"],
"강민석":["회의 중 호텔 방문","업무 보고 중","출장 중"]
},
clues:{
hall:{
"CCTV":"강민석 호텔 3층 출입 확인",
"발자국":"정지민 신발 패턴과 일치"
},
room:{
"잔":"독성 물질 검출 (고농도)",
"전화":"최현우 마지막 통화 기록"
}
},
murderer:"강민석"
}
];

// =========================
// 🔥 GLOBAL STATE
// =========================

let current;
let murderer;
let usedClues = new Set();

// =========================
// 🎮 GAME START
// =========================

function startGame(){
document.getElementById("gameArea").style.display="block";
generate();
goStep(1);
}

function resetCase(){
generate();
document.getElementById("caseStatus").innerText =
"🔄 새로운 사건이 생성되었습니다";
goStep(1);
}

// =========================
// 🧠 CASE GENERATION
// =========================

function generate(){

current = stories[Math.floor(Math.random()*stories.length)];
murderer = current.murderer;
usedClues.clear();

// case UI
document.getElementById("caseTitle").innerText=current.case.title;
document.getElementById("caseLocation").innerText=current.case.location;
document.getElementById("caseVictim").innerText=current.case.victim;
document.getElementById("caseMotive").innerText=current.case.motive;

// reset UI
document.getElementById("clueArea").innerHTML="";
document.getElementById("clueDetail").innerHTML="단서를 클릭하세요";
document.getElementById("detectiveNotes").innerHTML="";
document.getElementById("discussionLog").innerHTML="";
document.getElementById("resultArea").innerHTML="";

// suspects render
let s="";
let v="";

Object.keys(current.suspects).forEach(name=>{
s+=`
<div class="suspect-card">
<h3>${name}</h3>
<button onclick="question('${name}')">질문</button>
</div>
`;
v+=`<option>${name}</option>`;
});

document.getElementById("suspectArea").innerHTML=s;
document.getElementById("voteSelect").innerHTML=v;
}

// =========================
// 📌 STEP CONTROL
// =========================

function goStep(n){
for(let i=1;i<=4;i++){
let el=document.getElementById("step"+i);
if(el) el.style.display="none";
}
document.getElementById("step"+n).style.display="block";
}

// =========================
// 🔍 INVESTIGATION (핵심 FIX)
// =========================

function investigate(area){

const clueArea = document.getElementById("clueArea");

// 👉 중요: 매번 초기화 (안 하면 안 뜨는 문제 발생)
clueArea.innerHTML="";

const clues = current.clues[area];

// 방어
if(!clues){
clueArea.innerHTML="<div>단서 없음</div>";
return;
}

Object.keys(clues).forEach(key=>{

let div=document.createElement("div");
div.className="clue-item";
div.innerText=key;

div.onclick=function(){

// 🔎 단서 분석 표시
document.getElementById("clueDetail").innerHTML=
`<b>${key}</b><br>${clues[key]}`;

// 🗒 수첩 자동 기록 (중복 방지)
if(!usedClues.has(key)){
usedClues.add(key);

let note=document.createElement("div");
note.innerText="✔ "+key;
document.getElementById("detectiveNotes").appendChild(note);
}
};

clueArea.appendChild(div);
});
}

// =========================
// 💬 SUSPECT QUESTION SYSTEM
// =========================

function question(name){

let pool=current.suspects[name];
let msg=pool[Math.floor(Math.random()*pool.length)];

document.getElementById("discussionLog").innerHTML+=
`<div class="chat"><b>${name}</b>: ${msg}</div>`;
}

// =========================
// 🗳 VOTE SYSTEM
// =========================

function vote(){

let pick=document.getElementById("voteSelect").value;

document.getElementById("resultArea").innerHTML=
(pick===murderer)
?"✅ 정답 - 범인 검거 성공"
:"❌ 오답 - 진범: "+murderer;
}
