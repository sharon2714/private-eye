// ==========================
// 🎮 FIXED CORE GAME SYSTEM
// ==========================

const suspectsList = [
"김도윤","박서연","최현우","정지민","이유진","강민석"
];

const stories = [
{
case:{
title:"사라진 연구 데이터 사건",
location:"대학교 연구실",
victim:"김민수 교수",
motive:"연구비 경쟁"
},
suspects:{
"김도윤":{
base:"논문을 준비 중이던 대학원생",
lies:["저는 도서관에 있었습니다","그 시간엔 연구실에 없었습니다","자료 정리 중이었어요"]
},
"박서연":{
base:"공동 연구자",
lies:["회의 중이었습니다","저는 관련 없습니다","데이터 작업 중이었어요"]
},
"이유진":{
base:"경쟁 연구원",
lies:["장비 점검 중이었습니다","실험하고 있었어요","그건 오해입니다"]
}
},
clues:{
lab:{
"USB":"삭제된 연구 데이터 흔적 (김도윤 접근 가능)",
"노트":"박서연 수정 흔적 발견"
},
office:{
"메일":"이유진과 연구비 갈등",
"로그":"23:14 접근 기록"
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
"최현우":{
base:"기자",
lies:["취재 중이었습니다","카페에 있었어요","기사 작성 중"]
},
"정지민":{
base:"대학생",
lies:["강의 중이었습니다","과제 중이었어요","학교에 있었어요"]
},
"강민석":{
base:"기업 직원",
lies:["회의 중이었습니다","출장 중이었어요","호텔 방문은 업무였습니다"]
}
},
clues:{
hall:{
"CCTV":"강민석 호텔 출입 확인",
"발자국":"정지민 신발 패턴"
},
room:{
"잔":"독성 물질 검출",
"전화":"최현우 마지막 통화"
}
},
murderer:"강민석"
}
];

let current;
let murderer;
let usedClues = new Set();

// ==========================
// START
// ==========================

function startGame(){
document.getElementById("gameArea").style.display="block";
generate();
goStep(1);
}

// ==========================
// RESET
// ==========================

function resetCase(){
generate();
document.getElementById("caseStatus").innerText="🔄 사건 재생성 완료";
goStep(1);
}

// ==========================
// GENERATE
// ==========================

function generate(){

current = stories[Math.floor(Math.random()*stories.length)];
murderer = current.murderer;
usedClues.clear();

// case info
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

// ==========================
// SUSPECT UI (무조건 6명 고정)
// ==========================

let suspectHTML="";
let voteHTML="";

suspectsList.forEach(name=>{

suspectHTML+=`
<div class="suspect-card">
<h3>${name}</h3>
<button onclick="question('${name}')">질문</button>
</div>`;

voteHTML+=`<option>${name}</option>`;
});

document.getElementById("suspectArea").innerHTML=suspectHTML;
document.getElementById("voteSelect").innerHTML=voteHTML;
}

// ==========================
// STEP CONTROL
// ==========================

function goStep(n){
for(let i=1;i<=4;i++){
let el=document.getElementById("step"+i);
if(el) el.style.display="none";
}
document.getElementById("step"+n).style.display="block";
}

// ==========================
// INVESTIGATION (FIXED)
// ==========================

function investigate(area){

const clueArea=document.getElementById("clueArea");
clueArea.innerHTML="";

const clues=current.clues[area];
if(!clues){
clueArea.innerHTML="<div>단서 없음</div>";
return;
}

Object.keys(clues).forEach(k=>{

let div=document.createElement("div");
div.className="clue-item";
div.innerText=k;

div.onclick=function(){

document.getElementById("clueDetail").innerHTML=
`<b>${k}</b><br>${clues[k]}`;

if(!usedClues.has(k)){
usedClues.add(k);
let note=document.createElement("div");
note.innerText="✔ "+k;
document.getElementById("detectiveNotes").appendChild(note);
}
};

clueArea.appendChild(div);
});
}

// ==========================
// INTERVIEW (고급형 복구)
// ==========================

function question(name){

let data=current.suspects[name];
if(!data){
document.getElementById("discussionLog").innerHTML+=
`<div><b>${name}</b>: 저는 관련 없습니다.</div>`;
return;
}

let msg=data.lies[Math.floor(Math.random()*data.lies.length)];

document.getElementById("discussionLog").innerHTML+=
`<div><b>${name}</b> (${data.base}): ${msg}</div>`;
}

// ==========================
// VOTE
// ==========================

function vote(){

let pick=document.getElementById("voteSelect").value;

document.getElementById("resultArea").innerHTML=
(pick===murderer)
?"✅ 정답"
:"❌ 오답 / 범인: "+murderer;
}
