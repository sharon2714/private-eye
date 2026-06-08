const stories = [
{
case:{
title:"사라진 연구 데이터 사건",
location:"대학교 연구실",
victim:"김민수 교수",
motive:"연구비 경쟁"
},
suspects:{
"김도윤":["도서관에서 논문 작성 중","연구실 출입 안함","자료 정리 중"],
"박서연":["회의 중","실험 데이터 분석","보고서 작성"],
"이유진":["장비 점검","실험 진행","연구실에 있었음"]
},
clues:{
lab:{
"USB":"김도윤 연구 데이터 저장 장치",
"노트":"박서연의 수정 흔적"
},
office:{
"메일":"이유진과 금전 관련 갈등",
"로그":"야간 연구실 접근 기록"
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
"최현우":["취재 중","카페에 있었음","인터뷰 작성"],
"정지민":["강의 중","학교에 있었음","과제 중"],
"강민석":["회의 중","호텔 방문","업무 중"]
},
clues:{
hall:{
"CCTV":"강민석 호텔 출입",
"발자국":"정지민 신발 패턴"
},
room:{
"잔":"독 성분 검출",
"전화":"최현우 마지막 통화"
}
},
murderer:"강민석"
}
];

let current;
let murderer;

function startGame(){
document.getElementById("gameArea").style.display="block";
generate();
goStep(1);
}

function resetCase(){
generate();
document.getElementById("caseStatus").innerText="새 사건 생성됨";
goStep(1);
}

function generate(){

current = stories[Math.floor(Math.random()*stories.length)];
murderer = current.murderer;

document.getElementById("caseTitle").innerText=current.case.title;
document.getElementById("caseLocation").innerText=current.case.location;
document.getElementById("caseVictim").innerText=current.case.victim;
document.getElementById("caseMotive").innerText=current.case.motive;

let s="";
let v="";

Object.keys(current.suspects).forEach(n=>{
s+=`<div class="suspect-card">
<h3>${n}</h3>
<button onclick="question('${n}')">질문</button>
</div>`;

v+=`<option>${n}</option>`;
});

document.getElementById("suspectArea").innerHTML=s;
document.getElementById("voteSelect").innerHTML=v;

document.getElementById("clueArea").innerHTML="";
document.getElementById("discussionLog").innerHTML="";
document.getElementById("resultArea").innerHTML="";
}

function goStep(n){
for(let i=1;i<=4;i++){
let el=document.getElementById("step"+i);
if(el) el.style.display="none";
}
document.getElementById("step"+n).style.display="block";
}

function question(name){
let pool=current.suspects[name];
let msg=pool[Math.floor(Math.random()*pool.length)];

document.getElementById("discussionLog").innerHTML+=
`<div><b>${name}</b>: ${msg}</div>`;
}

function investigate(area){
let keys=Object.keys(current.clues[area]||{});

keys.forEach(k=>{
let div=document.createElement("div");
div.className="clue-item";
div.innerText=k;

div.onclick=()=>{
document.getElementById("clueDetail").innerText=
k+" : "+current.clues[area][k];
};

document.getElementById("clueArea").appendChild(div);
});
}

function vote(){
let pick=document.getElementById("voteSelect").value;

document.getElementById("resultArea").innerHTML=
(pick===murderer)
?"정답"
:"오답 (범인: "+murderer+")";
}
