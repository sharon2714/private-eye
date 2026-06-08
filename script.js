const suspectsList = [
"김도윤","박서연","최현우","정지민","이유진","강민석"
];

// =========================
// 🎮 FULL STORY DATA
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
"김도윤":{
role:"대학원생",
statements:[
"저는 도서관에 있었습니다.",
"그 시간엔 연구실에 없었습니다.",
"자료 정리 중이었습니다."
]
},

"박서연":{
role:"공동 연구자",
statements:[
"회의 중이었습니다.",
"저는 데이터 작업 중이었습니다.",
"그 일과 관련 없습니다."
]
},

"이유진":{
role:"경쟁 연구원",
statements:[
"장비 점검 중이었습니다.",
"실험 중이었습니다.",
"저는 연구실에 있었어요."
]
},

"최현우":{
role:"기자",
statements:[
"취재 중이었습니다.",
"카페에 있었어요.",
"기사 작성 중이었습니다."
]
},

"정지민":{
role:"대학생",
statements:[
"강의 중이었습니다.",
"과제 중이었어요.",
"학교에 있었습니다."
]
},

"강민석":{
role:"기업 직원",
statements:[
"회의 중이었습니다.",
"호텔 방문은 업무였습니다.",
"출장 중이었습니다."
]
}
},

// 🔥 단서 = 처음부터 분석용 구조
clues:[
{
title:"USB",
desc:"삭제된 연구 데이터 흔적 (김도윤 접근 가능)"
},
{
title:"노트",
desc:"박서연 수정 흔적 발견"
},
{
title:"로그 기록",
desc:"23:14 연구실 접근 기록"
},
{
title:"메일",
desc:"이유진과 연구비 갈등 정황"
}
],

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
role:"기자",
statements:[
"취재 중이었습니다.",
"카페에 있었습니다.",
"기사 작성 중이었습니다."
]
},

"정지민":{
role:"대학생",
statements:[
"강의 중이었습니다.",
"과제 중이었습니다.",
"학교에 있었습니다."
]
},

"강민석":{
role:"기업 직원",
statements:[
"회의 중이었습니다.",
"호텔 방문은 업무였습니다.",
"출장 중이었습니다."
]
},

"김도윤":{
role:"대학원생",
statements:[
"저는 그 시간에 다른 연구 중이었습니다.",
"현장과 무관합니다.",
"도서관에 있었습니다."
]
},

"이유진":{
role:"연구원",
statements:[
"실험 중이었습니다.",
"장비 점검 중이었습니다.",
"저는 관련 없습니다."
]
},

"박서연":{
role:"연구자",
statements:[
"저는 그날 회의 중이었습니다.",
"호텔에는 없었습니다.",
"오해입니다."
]
}
},

clues:[
{
title:"CCTV",
desc:"강민석 호텔 출입 확인"
},
{
title:"발자국",
desc:"정지민 신발 패턴 일치"
},
{
title:"독성 잔",
desc:"고농도 독성 물질 검출"
},
{
title:"통화 기록",
desc:"최현우 마지막 통화"
}
],

murderer:"강민석"
}
];

// =========================
// STATE
// =========================

let current;
let murderer;
let usedClues = new Set();

// =========================
// START
// =========================

function startGame(){
document.getElementById("gameArea").style.display="block";
generate();
goStep(1);
}

// =========================
// RESET
// =========================

function resetCase(){
generate();
document.getElementById("caseStatus").innerText="🔄 새로운 사건 생성";
goStep(1);
}

// =========================
// GENERATE
// =========================

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
document.getElementById("clueDetail").innerText="단서를 선택하세요";
document.getElementById("detectiveNotes").innerHTML="";
document.getElementById("discussionLog").innerHTML="";
document.getElementById("resultArea").innerHTML="";

// =========================
// SUSPECT RENDER (항상 6명)
// =========================

let suspectHTML="";
let voteHTML="";

suspectsList.forEach(name=>{

suspectHTML+=`
<div class="suspect-card">
<h3>${name}</h3>
<p>${current.suspects[name]?.role || "불명"}</p>
<button onclick="question('${name}')">질문</button>
</div>
`;

voteHTML+=`<option>${name}</option>`;
});

document.getElementById("suspectArea").innerHTML=suspectHTML;
document.getElementById("voteSelect").innerHTML=voteHTML;

// =========================
// CLUE RENDER (처음부터 보이게)
// =========================

let clueHTML="";
current.clues.forEach(c=>{
clueHTML+=`
<div class="clue-item" onclick="showClue('${c.title}','${c.desc}')">
<b>${c.title}</b>
</div>
`;
});

document.getElementById("clueArea").innerHTML=clueHTML;
}

// =========================
// STEP
// =========================

function goStep(n){
for(let i=1;i<=4;i++){
let el=document.getElementById("step"+i);
if(el) el.style.display="none";
}
document.getElementById("step"+n).style.display="block";
}

// =========================
// CLUE DETAIL (핵심)
// =========================

function showClue(title,desc){

document.getElementById("clueDetail").innerHTML=
`<b>${title}</b><br>${desc}`;

if(!usedClues.has(title)){
usedClues.add(title);
let note=document.createElement("div");
note.innerText="✔ "+title;
document.getElementById("detectiveNotes").appendChild(note);
}
}

// =========================
// INTERVIEW (완전 사건 기반)
// =========================

function question(name){

let data=current.suspects[name];
let msg=data.statements[Math.floor(Math.random()*data.statements.length)];

document.getElementById("discussionLog").innerHTML+=
`<div><b>${name} (${data.role})</b>: ${msg}</div>`;
}

// =========================
// VOTE
// =========================

function vote(){

let pick=document.getElementById("voteSelect").value;

document.getElementById("resultArea").innerHTML=
(pick===murderer)
?"✅ 정답"
:"❌ 오답 / 범인: "+murderer;
}
