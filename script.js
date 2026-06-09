// =========================
// PRIVATE EYE — FINAL
// script.js (1/2)
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
let usedClues=new Set();
let score=0;

// =========================
// STORY DATABASE
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
profile:"교수의 연구 조교",
answers:[
"저는 도서관에서 논문을 정리 중이었습니다.",
"USB를 본 적은 있지만 가져가진 않았습니다.",
"교수님과 마지막으로 이야기한 건 전날입니다.",
"메일 내용을 저는 몰랐습니다.",
"왜 다들 연구실 쪽만 보는 거죠?",
"자료 삭제는 제가 할 이유가 없습니다."
]
},

"박서연":{
role:"공동 연구자",
profile:"피해자와 공동 프로젝트 진행",

answers:[
"회의 때문에 자리를 비웠습니다.",
"연구 데이터 접근은 누구나 가능했습니다.",
"그 시간엔 사무실에 있었습니다.",
"USB는 본 적 없습니다.",
"교수님과 의견 충돌은 있었지만 개인적인 감정은 없었습니다.",
"로그 기록은 오류일 수도 있죠.",
"누군가 저를 의심하게 만들고 있습니다."
]
},

"최현우":{
role:"기자",
profile:"연구 부정 취재",

answers:[
"취재 요청만 했습니다.",
"교수님 인터뷰를 기다리고 있었습니다.",
"연구실 내부는 모릅니다.",
"메일 관련 내용은 몰랐습니다.",
"누가 화를 냈다는 이야기는 들었습니다."
]
},

"정지민":{
role:"대학생",
profile:"피해자 제자",

answers:[
"그날 강의가 있었습니다.",
"교수님이 최근 예민하셨습니다.",
"연구실에 자주 가진 않았습니다.",
"무슨 일이 있었는진 모르겠습니다.",
"전혀 예상 못 했습니다."
]
},

"이유진":{
role:"경쟁 연구원",
profile:"연구비 경쟁 관계",

answers:[
"연구비 문제로 갈등은 있었습니다.",
"하지만 사건과 무관합니다.",
"메일은 업무적인 내용이었습니다.",
"교수님과 마지막 통화는 일주일 전입니다.",
"데이터를 노릴 이유가 없습니다."
]
},

"강민석":{
role:"후원사 직원",
profile:"연구 후원 담당",

answers:[
"예산 회의 중이었습니다.",
"교수님과 최근 접촉은 없었습니다.",
"프로젝트 일정만 논의했습니다.",
"저는 사건 당일 방문하지 않았습니다."
]
}

},

clues:[

{
title:"USB",
desc:
"삭제된 연구 파일이 발견됨. 최근 접속자는 김도윤 계정."
},

{
title:"통화 기록",
desc:
"사건 직전 피해자와 박서연 사이 17분 통화."
},

{
title:"출입 로그",
desc:
"23:14 연구실 출입 기록 존재."
},

{
title:"연구 노트",
desc:
"박서연 필체와 동일한 수정 흔적."
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
profile:"행사 참석",

answers:[
"로비에 있었습니다.",
"배우를 본 적은 있습니다.",
"룸서비스와는 무관합니다.",
"독극물은 모릅니다."
]
},

"박서연":{
role:"기획자",
profile:"행사 진행",

answers:[
"행사 준비 중이었습니다.",
"피해자와 대화한 적 없습니다.",
"객실엔 안 갔습니다."
]
},

"최현우":{
role:"기자",
profile:"인터뷰 진행",

answers:[
"인터뷰 후 바로 이동했습니다.",
"통화 기록은 업무였습니다.",
"객실 출입은 하지 않았습니다.",
"독살이라는 말은 처음 듣습니다."
]
},

"정지민":{
role:"호텔 직원",
profile:"객실 담당",

answers:[
"청소만 했습니다.",
"수상한 사람은 못 봤습니다.",
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
"객실 방문은 업무였습니다.",
"독성 물질은 모릅니다.",
"왜 저만 의심하시죠?",
"저는 아무 잘못 없습니다.",
"그 잔은 원래 있던 겁니다."
]
}

},

clues:[

{
title:"독성 잔",
desc:
"잔 내부에서 독성 성분 검출."
},

{
title:"CCTV",
desc:
"강민석 객실 층 이동 확인."
},

{
title:"통화 기록",
desc:
"피해자 마지막 통화 상대 최현우."
},

{
title:"발자국",
desc:
"객실 앞 구두 자국."
}

]

}

];

// =========================
// START
// =========================

function startGame(){

document.getElementById(
"gameArea"
).style.display="block";

generate();

goStep(1);

}
// =========================
// GENERATE
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

usedClues.clear();

score=0;

// 사건 표시
document.getElementById(
"caseTitle"
).innerHTML=
current.case.title;

document.getElementById(
"caseLocation"
).innerHTML=
"📍 장소: "
+
current.case.location;

document.getElementById(
"caseVictim"
).innerHTML=
"👤 피해자: "
+
current.case.victim;

document.getElementById(
"caseMotive"
).innerHTML=
"⚠ 동기: "
+
current.case.motive;

// 초기화
document.getElementById(
"clueDetail"
).innerHTML=
"단서를 선택하세요.";

document.getElementById(
"detectiveNotes"
).innerHTML="";

document.getElementById(
"discussionLog"
).innerHTML="";

document.getElementById(
"resultArea"
).innerHTML="";

// =========================
// 단서 렌더
// =========================

let clueHTML="";

current.clues.forEach(
(c)=>{

clueHTML+=`
<div class="clue-item"
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

suspectsList.forEach(
(name)=>{

const s=
current.suspects[name];

suspectHTML+=`

<div class="suspect-card">

<h3>${name}</h3>

<p>
${s.role}
</p>

<p>
${s.profile}
</p>

<button
onclick="
question(
'${name}'
)">
질문
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

}

// =========================
// STEP
// =========================

function goStep(step){

document
.querySelectorAll(
".step"
)
.forEach(
e=>e.style.display=
"none"
);

document
.getElementById(
"step"+step
)
.style.display=
"block";

}

// =========================
// 단서 분석
// =========================

function showClue(
title,
desc
){

document
.getElementById(
"clueDetail"
)
.innerHTML=

`
<h3>${title}</h3>
<p>${desc}</p>
`;

if(
!usedClues.has(
title
)
){

usedClues.add(
title
);

score+=10;

document
.getElementById(
"detectiveNotes"
)
.innerHTML

+=

`
<div>
✔ ${title}
</div>
`;

}

}

// =========================
// 인터뷰
// =========================

function question(
name
){

const s=
current
.suspects
[name];

let answer=

s.answers[
Math.floor(
Math.random()
*
s.answers.length
)
];

// 범인 흔들림

if(
name===murderer
&&
Math.random()
<0.3
){

const nervous=[

"...그건 왜 물으시죠?",

"그 단서는 중요하지 않습니다.",

"그 시간은 기억 안 납니다.",

"누가 그런 걸 말했나요?"

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

score+=5;

document
.getElementById(
"discussionLog"
)
.innerHTML

+=

`
<div
class="chat-card">

<b>
${name}
</b>

<br>

${answer}

</div>
`;

}

// =========================
// 투표
// =========================

function vote(){

const selected=

document
.getElementById(
"voteSelect"
)
.value;

let ending="";

if(
selected===
murderer
){

if(
score>=60
){

ending=
`
🏆
명탐정 엔딩

완벽하게
사건을 해결했습니다.

범인:
${murderer}
`;

}

else{

ending=
`
✅
사건 해결

범인:
${murderer}

추리가 조금 부족했습니다.
`;

}

}

else{

if(
score>=50
){

ending=
`
⚠
근접 추리

증거는 좋았지만
범인을 놓쳤습니다.

진범:
${murderer}
`;

}

else{

ending=
`
❌
오판 엔딩

잘못된 용의자를
지목했습니다.

진범:
${murderer}
`;

}

}

document
.getElementById(
"resultArea"
)
.innerHTML=

`
<div>

${ending}

<br><br>

추리 점수:
${score}

</div>
`;

}

// =========================
// 사건 다시 생성
// =========================

function resetCase(){

generate();

document
.getElementById(
"caseStatus"
)
.innerHTML=

"새로운 사건 생성 완료";

goStep(1);

}
