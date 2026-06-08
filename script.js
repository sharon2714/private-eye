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
"열쇠":"연구실 서랍을 여는 열쇠 (특정 연구실 접근 가능)",
"메모":"피해자와 특정 인물 공동 연구 흔적"
},
hall:{
"CCTV":"박서연이 사건 직전 복도 이동",
"발자국":"김도윤 신발 사이즈와 일치"
},
storage:{
"혈흔":"강한 저항 흔적",
"장갑":"이유진 DNA 검출"
},
office:{
"통화기록":"강민석과 마지막 통화",
"메일":"최현우 협박 정황"
}
};

const suspects = {
"김도윤":["논문 작업 중이었습니다","연구실에 없었습니다","확실한 알리바이 있습니다"],
"박서연":["회의 중이었습니다","연구실에 있었어요","기억이 확실하지 않습니다"],
"최현우":["취재 중이었습니다","카페에 있었습니다","그건 오해입니다"],
"정지민":["강의 중이었습니다","과제하고 있었습니다","학교에 있었습니다"],
"이유진":["실험 중이었습니다","장비 점검 중이었습니다","연구실에 있었습니다"],
"강민석":["회의 중이었습니다","업무 중이었습니다","통화는 업무였습니다"]
};

let murderer="";
let currentCase;

function startGame(){
document.getElementById("gameArea").style.display="block";
generateCase();
goStep(1);
}

function resetCase(){
generateCase();
document.getElementById("caseStatus").innerText =
"🔄 새로운 사건이 생성되었습니다";
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

// 용의자 UI 생성
let suspectHTML="";
let voteHTML="";

Object.keys(suspects).forEach(name=>{
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
document.getElementById("clueDetail").innerText =
k + " : " + clues[place][k];

document.getElementById("detectiveNotes").innerHTML +=
`<div>${k}</div>`;
};

document.getElementById("clueArea").appendChild(div);
});
}

function question(name){
let pool=suspects[name];
let msg=pool[Math.floor(Math.random()*pool.length)];

document.getElementById("discussionLog").innerHTML +=
`<div><b>${name}</b>: ${msg}</div>`;
}

function vote(){
let pick=document.getElementById("voteSelect").value;

document.getElementById("resultArea").innerHTML =
(pick===murderer)
? "정답 - 범인 검거 성공"
: "오답 - 진범: " + murderer;
}
