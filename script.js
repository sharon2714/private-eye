const suspects = {
"김도윤":[
"저는 그 시간에 도서관에서 논문 작업 중이었습니다.",
"그 시간엔 연구실에 들어가지도 않았습니다.",
"증거가 있다면 제시해 주세요."
],

"박서연":[
"저는 연구실에서 데이터 정리 중이었습니다.",
"회의 중이라 현장에는 없었습니다.",
"그 단서는 연구에 사용된 것입니다."
],

"최현우":[
"저는 카페에서 인터뷰 기사 작성 중이었습니다.",
"취재 일정 때문에 이동 중이었어요.",
"그건 제 취재 자료와 관련된 겁니다."
],

"정지민":[
"강의 듣고 과제하고 있었습니다.",
"그 시간엔 학교 안에 있었어요.",
"저는 그런 일과 무관합니다."
],

"이유진":[
"실험실에서 장비 점검 중이었습니다.",
"그건 연구 과정에서 생긴 흔적입니다.",
"저는 그 시간 알리바이가 확실합니다."
],

"강민석":[
"회의 및 보고 업무 중이었습니다.",
"통화는 업무 관련이었습니다.",
"그건 단순 업무 기록입니다."
]
};

let murderer = "";
let currentCase;

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
murderer = Object.keys(suspects)[Math.floor(Math.random()*6)];
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

function question(name){
let pool = suspects[name];
let msg = pool[Math.floor(Math.random()*pool.length)];

document.getElementById("discussionLog").innerHTML +=
`<div class="chat"><b>${name}</b>: ${msg}</div>`;
}

function vote(){
let pick=document.getElementById("voteSelect").value;

document.getElementById("resultArea").innerHTML =
(pick===murderer)
? "정답 (범인 검거 성공)"
: "오답 (진범: " + murderer + ")";
}
