// =========================
// PRIVATE EYE
// =========================

const suspectsList=[
"김도윤",
"박서연",
"최현우",
"정지민",
"이유진",
"강민석"
];

let current=null;
let murderer="";

let score=100;

let clueUsed=0;
let questionUsed=0;

let foundClues=new Set();

// =========================
// 사건 데이터
// =========================

const stories=[

{
case:{
title:"사라진 연구 데이터 사건",
location:"대학교 연구실",
victim:"김민수 교수",
motive:"연구비 경쟁"
},

murderer:"박서연",

suspects:{

"김도윤":{
role:"대학원생",
profile:"피해자의 연구 조교",
answers:[
"저는 도서관에서 논문 정리 중이었습니다.",
"USB를 본 적은 있지만 가져가진 않았습니다.",
"교수님과 마지막 통화는 전날이었습니다.",
"최근 연구실 분위기는 좋지 않았습니다.",
"자료 삭제는 제가 할 이유가 없습니다.",
"박서연 연구원과 교수님이 자주 다퉜습니다."
]
},

"박서연":{
role:"공동 연구자",
profile:"피해자와 공동 프로젝트 진행",
answers:[
"회의 때문에 자리를 비웠습니다.",
"연구 데이터 접근은 누구나 가능했습니다.",
"그 시간엔 사무실에 있었습니다.",
"교수님과 의견 충돌은 있었지만 개인적 감정은 없었습니다.",
"USB는 본 적 없습니다.",
"누군가 저를 의심하게 만들고 있습니다."
]
},

"최현우":{
role:"기자",
profile:"연구 부정 의혹 취재",
answers:[
"교수님 인터뷰를 요청했습니다.",
"연구비 문제 이야기를 들은 적 있습니다.",
"사건 당일엔 취재 중이었습니다.",
"누군가 크게 언성을 높였다는 말을 들었습니다."
]
},

"정지민":{
role:"대학생",
profile:"피해자의 제자",
answers:[
"그날은 강의가 있었습니다.",
"교수님이 최근 스트레스를 많이 받으셨습니다.",
"연구실엔 거의 가지 않았습니다.",
"무슨 일이 있었는지 전혀 몰랐습니다."
]
},

"이유진":{
role:"경쟁 연구원",
profile:"연구비 경쟁 관계",
answers:[
"연구비 갈등은 사실입니다.",
"하지만 사건과는 관련 없습니다.",
"교수님과 마지막 통화는 일주일 전입니다.",
"메일은 업무적인 내용이었습니다."
]
},

"강민석":{
role:"후원사 직원",
profile:"프로젝트 예산 담당",
answers:[
"예산 회의 중이었습니다.",
"교수님과 최근 접촉은 없었습니다.",
"일정 관련 논의만 했습니다.",
"사건 당일 방문하지 않았습니다."
]
}

},

clues:[

{
title:"USB",
desc:"삭제된 연구 파일 발견. 최근 접속자는 김도윤 계정."
},

{
title:"통화 기록",
desc:"사건 직전 피해자와 박서연 사이 17분 통화."
},

{
title:"출입 로그",
desc:"23:14 연구실 출입 기록 존재."
},

{
title:"연구 노트",
desc:"박서연 필체와 동일한 수정 흔적 발견."
}

]

},

{
case:{
title:"호텔 독살 사건",
location:"시내 호텔",
victim:"배우 이현우",
motive:"복수"
},

murderer:"강민석",

suspects:{

"김도윤":{
role:"투자자",
profile:"행사 참석자",
answers:[
"로비에 있었습니다.",
"배우를 본 적은 있습니다.",
"룸서비스와는 무관합니다.",
"독극물은 모릅니다."
]
},

"박서연":{
role:"행사 기획자",
profile:"행사 진행 담당",
answers:[
"행사 준비 중이었습니다.",
"피해자와 개인적인 관계는 없습니다.",
"객실엔 가지 않았습니다."
]
},

"최현우":{
role:"기자",
profile:"배우 인터뷰 진행",
answers:[
"인터뷰 후 바로 이동했습니다.",
"마지막 통화는 업무 때문입니다.",
"객실 출입은 하지 않았습니다."
]
},

"정지민":{
role:"호텔 직원",
profile:"객실 관리 담당",
answers:[
"청소 업무만 했습니다.",
"수상한 사람은 보지 못했습니다.",
"잔은 치우지 않았습니다."
]
},

"이유진":{
role:"홍보 담당",
profile:"행사 운영",
answers:[
"로비 운영 중이었습니다.",
"객실에 간 적 없습니다.",
"배우 일정만 관리했습니다."
]
},

"강민석":{
role:"기업 직원",
profile:"후원사 담당",
answers:[
"회의 중이었습니다.",
"객실 방문은 업무 때문이었습니다.",
"독성 물질은 모릅니다.",
"왜 저만 의심하시죠?",
"그 잔은 원래 있던 겁니다."
]
}

},

clues:[

{
title:"독성 잔",
desc:"잔 내부에서 독성 성분 검출."
},

{
title:"CCTV",
desc:"강민석이 객실 층으로 이동하는 장면 확인."
},

{
title:"통화 기록",
desc:"피해자의 마지막 통화 상대는 최현우."
},

{
title:"발자국",
desc:"객실 앞 구두 자국 발견."
}

]

}

];
// =========================
// 시작
// =========================

function startGame(){

document.getElementById(
"gameArea"
).style.display="block";

generate();

goStep(1);

}

// =========================
// 사건 재생성
// =========================

function resetCase(){

generate();

document.getElementById(
"caseStatus"
).innerText=
"🔄 새로운 사건이 생성되었습니다.";

goStep(1);

}

// =========================
// 상태바 갱신
// =========================

function updateStatus(){

let clueRemain =
Math.max(0,2-clueUsed);

let questionRemain =
Math.max(0,4-questionUsed);

const clueText =
`남은 단서 분석 : ${clueRemain}/2`;

const questionText =
`남은 질문 : ${questionRemain}/4`;

const scoreText =
`점수 : ${score}`;

const ids=[
"clueCount",
"questionCount",
"scoreBoard",
"clueCountStep3",
"questionCountStep3",
"scoreBoardStep3"
];

ids.forEach(id=>{

const el=
document.getElementById(id);

if(!el) return;

if(id.includes("clue"))
el.innerText=clueText;

if(id.includes("question"))
el.innerText=questionText;

if(id.includes("score"))
el.innerText=scoreText;

});

}

// =========================
// 사건 생성
// =========================

function generate(){

current=
stories[
Math.floor(
Math.random()*stories.length
)
];

murderer=
current.murderer;

score=100;

clueUsed=0;
questionUsed=0;

foundClues.clear();

// 사건 정보

document.getElementById(
"caseTitle"
).innerText=
current.case.title;

document.getElementById(
"caseLocation"
).innerText=
"📍 장소 : "
+
current.case.location;

document.getElementById(
"caseVictim"
).innerText=
"👤 피해자 : "
+
current.case.victim;

document.getElementById(
"caseMotive"
).innerText=
"⚠ 동기 : "
+
current.case.motive;

// 초기화

document.getElementById(
"discussionLog"
).innerHTML="";

document.getElementById(
"detectiveNotes"
).innerHTML="";

document.getElementById(
"resultArea"
).innerHTML="";

document.getElementById(
"clueDetail"
).innerHTML=
"단서를 선택하세요.";

// =========================
// 단서 렌더
// =========================

let clueHTML="";

current.clues.forEach(c=>{

clueHTML+=`
<div
class="clue-item"
onclick="
showClue(
\`${c.title}\`,
\`${c.desc}\`
)">
${c.title}
</div>
`;

});

document.getElementById(
"clueArea"
).innerHTML=
clueHTML;

// =========================
// 용의자 렌더
// =========================

let suspectHTML="";

let voteHTML="";

suspectsList.forEach(name=>{

const s=
current.suspects[name];

suspectHTML+=`

<div class="suspect-card">

<h3>${name}</h3>

<p>
직업 : ${s.role}
</p>

<p>
특징 : ${s.profile}
</p>

<button
onclick="
question('${name}')
">
질문하기
</button>

</div>

`;

voteHTML+=
`
<option>
${name}
</option>
`;

});

document.getElementById(
"suspectArea"
).innerHTML=
suspectHTML;

document.getElementById(
"voteSelect"
).innerHTML=
voteHTML;

updateStatus();

}

// =========================
// 단계 이동
// =========================

function goStep(step){

document
.querySelectorAll(".step")
.forEach(el=>{
el.style.display="none";
});

document.getElementById(
"step"+step
).style.display="block";

}

// =========================
// 단서 분석
// =========================

function showClue(
title,
desc
){

if(
!foundClues.has(title)
){

clueUsed++;

if(clueUsed>2){

alert(
"⚠ 무료 단서 분석 2회를 초과했습니다.\n점수 -5"
);

score-=5;

}

foundClues.add(title);

document.getElementById(
"detectiveNotes"
).innerHTML

+=

`
<div>
✔ ${title}
</div>
`;

updateStatus();

}

document.getElementById(
"clueDetail"
).innerHTML=

`
<h3>${title}</h3>
<p>${desc}</p>
`;

}

// =========================
// 용의자 질문
// =========================

function question(name){

questionUsed++;

if(questionUsed>4){

alert(
"⚠ 무료 질문 4회를 초과했습니다.\n점수 -5"
);

score-=5;

updateStatus();

}

const suspect=
current.suspects[name];

let answer=
suspect.answers[
Math.floor(
Math.random()
*
suspect.answers.length
)
];

// 범인 흔들림

if(
name===murderer
&&
Math.random()<0.30
){

const nervous=[

"그건 왜 물으시는 거죠?",

"그 시간은 기억나지 않습니다.",

"중요한 내용은 아닙니다.",

"누가 그런 말을 했습니까?",

"그 단서는 오해입니다."

];

answer=
nervous[
Math.floor(
Math.random()
*
nervous.length
)
];

}

document.getElementById(
"discussionLog"
).innerHTML

+=

`
<div class="chat-card">

<b>
${name}
</b>

<br><br>

${answer}

</div>
`;

updateStatus();

}

// =========================
// 최종 투표
// =========================

function vote(){

const selected=

document.getElementById(
"voteSelect"
).value;

let grade="";

if(score>=90)
grade="🏆 S 등급";

else if(score>=75)
grade="🥇 A 등급";

else if(score>=60)
grade="🥈 B 등급";

else if(score>=40)
grade="🥉 C 등급";

else
grade="📄 D 등급";

if(selected===murderer){

document.getElementById(
"resultArea"
).innerHTML=

`
<div class="success-box">

<h2>
CASE CLOSED
</h2>

<p>
범인 검거 성공
</p>

<p>
실제 범인 :
${murderer}
</p>

<p>
최종 점수 :
${score}
</p>

<p>
${grade}
</p>

</div>
`;

}else{

score=
Math.max(
0,
score-30
);

if(score>=90)
grade="🏆 S 등급";

else if(score>=75)
grade="🥇 A 등급";

else if(score>=60)
grade="🥈 B 등급";

else if(score>=40)
grade="🥉 C 등급";

else
grade="📄 D 등급";

document.getElementById(
"resultArea"
).innerHTML=

`
<div class="fail-box">

<h2>
CASE UNSOLVED
</h2>

<p>
범인 검거 실패
</p>

<p>
실제 범인 :
${murderer}
</p>

<p>
최종 점수 :
${score}
</p>

<p>
${grade}
</p>

</div>
`;

}

}
