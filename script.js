// =========================
// 게임 상태
// =========================

let current;
let murderer;

let score = 100;

let clueUsed = 0;
let questionUsed = 0;

let foundClues = new Set();

const suspectsList = [

"김도윤",
"박서연",
"최현우",
"정지민",
"이유진",
"강민석"

];

// =========================
// 사건 데이터
// =========================

const stories = [

{

case:{
title:"사라진 연구 데이터 사건",
location:"세명대학교 연구동",
victim:"김민수 교수",
motive:"연구비 경쟁"
},

scene:{

location:
"연구동 4층 개인 연구실",

time:
"23:30 ~ 00:00",

cause:
"둔기에 의한 두부 손상",

condition:
"피해자는 책상 옆 바닥에서 발견됨",

description:

`연구실 내부는 심하게 어질러져 있었다.

책상 위에는 열린 노트북이 켜져 있었고
중요 연구 데이터 일부가 삭제된 상태였다.

바닥에는 깨진 머그컵 조각이 흩어져 있었으며
피해자는 책상 모서리 근처에 쓰러져 있었다.

현장에는 외부 침입 흔적이 없었으며
범인은 피해자가 알고 있던 인물일 가능성이 높다고 판단되었다.`

},

suspects:{

"김도윤":{

role:"대학원생",

profile:
"피해자의 연구 조교",

answers:[

`질문:
사건 당일 밤 무엇을 하고 있었습니까?

답변:
저는 도서관에서 논문 자료를 찾고 있었습니다.
교수님 연구 데이터를 정리하라는 지시를 받았지만
그날은 연구실에 가지 않았습니다.`,

`질문:
삭제된 연구 데이터에 접근할 수 있었습니까?

답변:
접근 권한은 있었습니다.
하지만 데이터를 삭제할 이유는 없습니다.
오히려 저는 데이터를 복구하려고 노력했습니다.`,

`질문:
피해자와 갈등은 없었습니까?

답변:
최근 연구 일정 때문에 다툰 적은 있습니다.
하지만 그런 이유로 범죄를 저지를 생각은 전혀 없었습니다.`

]

},

"박서연":{

role:"공동 연구자",

profile:
"연구비 경쟁 관계",

answers:[

`질문:
사건 당일 피해자와 통화했습니까?

답변:
네.
연구비 문제 때문에 통화했습니다.
그 과정에서 의견 충돌은 있었지만
그게 범죄와 연결되는 것은 아닙니다.`,

`질문:
연구실에 방문한 적 있습니까?

답변:
잠시 들른 적은 있습니다.
하지만 교수님을 만나지는 못했습니다.
곧바로 돌아갔습니다.`,

`질문:
최근 연구비 선정 결과에 불만이 있었다고 하는데요?

답변:
불만은 있었습니다.
제가 주도한 연구 성과가 제대로 인정받지 못했다고 생각했으니까요.
하지만 그게 살인의 동기가 되진 않습니다.`

]

},

"최현우":{

role:"기자",

profile:
"연구 부정 의혹 취재",

answers:[

`질문:
왜 피해자를 취재하고 있었습니까?

답변:
연구비 사용 내역에 대한 제보가 들어왔습니다.
그래서 사실 여부를 확인 중이었습니다.`,

`질문:
사건 당일 어디 있었습니까?

답변:
카페에서 기사 초안을 작성하고 있었습니다.
결제 기록으로 확인 가능합니다.`

]

},

"정지민":{

role:"대학생",

profile:
"피해자의 제자",

answers:[

`질문:
교수님과 어떤 관계였습니까?

답변:
졸업 논문 지도를 받고 있었습니다.
최근 성적 문제로 상담을 받은 적은 있습니다.`,

`질문:
사건 당일 밤 어디 있었습니까?

답변:
기숙사에서 과제를 하고 있었습니다.
룸메이트가 증언할 수 있습니다.`

]

},

"이유진":{

role:"경쟁 연구원",

profile:
"연구비 경쟁자",

answers:[

`질문:
피해자와 경쟁 관계였습니까?

답변:
같은 정부 과제에 지원하고 있었습니다.
하지만 학문적 경쟁일 뿐 개인적 원한은 없습니다.`,

`질문:
협박 메일을 보냈습니까?

답변:
강한 항의 메일은 보냈습니다.
그러나 협박 의도는 아니었습니다.`

]

},

"강민석":{

role:"기업 직원",

profile:
"후원사 담당자",

answers:[

`질문:
피해자와 무슨 관계였습니까?

답변:
산학협력 후원 계약을 담당했습니다.
사건과 직접 관련은 없습니다.`,

`질문:
사건 당일 방문 기록이 있습니까?

답변:
오후에만 방문했습니다.
밤에는 건물에 없었습니다.`

]

}

},
// =========================
// 연구실 사건 단서
// =========================

clues:[

{
title:"삭제된 USB",

desc:

`USB 복구 결과
사건 발생 약 1시간 전
연구 데이터 일부가 삭제된 흔적이 발견되었다.

삭제된 데이터는 차기 연구비 심사와 관련된 내용이었다.

USB 접근 권한은
김도윤과 박서연에게 있었다.`
},

{
title:"통화 기록",

desc:

`사망 40분 전

피해자와 박서연 사이에
17분간 통화가 이루어졌다.

통화 직후
피해자는 연구실로 이동한 것으로 확인되었다.

연구비 문제로 언쟁이 있었다는 정황이 발견되었다.`
},

{
title:"출입 기록",

desc:

`23시 14분

연구실 출입 시스템에
박서연의 카드키 사용 기록이 남아있다.

이후 별도의 출입 기록은 발견되지 않았다.`
},

{
title:"협박 메일",

desc:

`이유진이 보낸 메일.

'이번 연구비 결과가
공정하지 않다면
가만있지 않겠습니다.'

라는 문구가 포함되어 있었다.

하지만 직접적인 범행 증거는 발견되지 않았다.`
}

],

// =========================
// 사건의 전말
// =========================

endingStory:

`사건 당일 밤.

김민수 교수는 연구실에서
연구비 심사 자료를 검토하고 있었다.

공동 연구자 박서연은
자신이 주도한 연구 성과가
교수의 이름으로 발표되는 것에
오랫동안 불만을 품고 있었다.

최근 차기 연구비 사업에서도
자신이 제외될 수 있다는 사실을 알게 되면서
분노는 더욱 커졌다.

밤 10시 30분경.

박서연은 피해자와 통화한 뒤
직접 연구실을 찾아갔다.

두 사람은 연구비 배분 문제로
격렬하게 언쟁을 벌였고

그 과정에서 박서연은
연구 데이터를 삭제하려 했다.

이를 막으려던 피해자와 몸싸움이 벌어졌고

피해자는 책상 모서리에
머리를 강하게 부딪혀 쓰러졌다.

박서연은 현장을 정리한 뒤
연구실을 떠났고

이후 피해자는
과다출혈로 사망하였다.`,

timeline:[

"22:31 피해자와 박서연 통화",

"22:49 박서연 연구실 방문",

"23:05 연구비 문제로 언쟁",

"23:11 연구 데이터 삭제 시도",

"23:14 출입 기록 확인",

"23:18 몸싸움 발생",

"23:26 피해자 의식 상실",

"23:42 박서연 현장 이탈"

],

suspectSummary:{

"김도윤":

"연구 조교로 USB 접근 권한이 있었기 때문에 의심받았다. 그러나 삭제된 데이터를 복구하려고 했던 사실이 확인되었으며 범행과는 관련이 없었다.",

"최현우":

"피해자의 연구비 사용 의혹을 취재 중이었다. 사건 당일 카페 결제 기록과 기사 작성 기록이 확인되었다.",

"정지민":

"최근 논문 평가 문제로 교수에게 불만이 있었지만 사건 당시 기숙사에 있었던 사실이 확인되었다.",

"이유진":

"연구비 경쟁 관계였으며 협박성 메일을 보낸 사실이 발견되었다. 그러나 실험실 CCTV로 알리바이가 입증되었다.",

"강민석":

"후원사 계약 문제로 피해자와 연락을 주고받았지만 사건과 직접적인 관련은 없었다.",

"박서연":

"연구비 배분 문제에 대한 불만과 연구 성과 인정 문제로 인해 범행을 저질렀다."

},

murderer:"박서연"

},

// =========================
// 호텔 독살 사건
// =========================

{

case:{
title:"호텔 독살 사건",
location:"그랜드 시티 호텔",
victim:"배우 이현우",
motive:"복수"
},

scene:{

location:
"그랜드 시티 호텔 VIP 스위트룸",

time:
"22:00 ~ 23:00",

cause:
"독성 물질 중독",

condition:
"피해자는 객실 소파에서 발견됨",

description:

`호텔 객실 내부에는
강제 침입 흔적이 없었다.

테이블 위에는
반쯤 비어 있는 와인잔 두 개가 놓여 있었으며

피해자는 소파 옆 바닥에 쓰러져 있었다.

현장 감식 결과
잔 내부에서 독성 물질이 검출되었다.

객실은 내부에서 잠겨 있었으며

피해자는 범인을
경계하지 않았던 것으로 보인다.`

},

suspects:{

"최현우":{

role:"기자",

profile:"연예계 스캔들 취재",

answers:[

`질문:
피해자를 취재하고 있었습니까?

답변:
네.
최근 광고 계약 관련 의혹을 조사 중이었습니다.
하지만 그건 기자로서의 업무였습니다.`,

`질문:
사건 당일 어디 있었습니까?

답변:
호텔 로비 카페에서 기사 초안을 작성하고 있었습니다.
카드 결제 내역으로 확인 가능합니다.`

]

},

"강민석":{

role:"기업 직원",

profile:"피해자와 계약 갈등",

answers:[

`질문:
피해자와 어떤 관계였습니까?

답변:
광고 계약을 진행했습니다.
계약이 파기되면서 회사가 큰 손실을 입은 것은 사실입니다.`,

`질문:
사건 당일 객실을 방문했습니까?

답변:
행사 때문에 잠시 만났습니다.
하지만 오래 머무르진 않았습니다.`,

`질문:
피해자에게 원한이 있었습니까?

답변:
솔직히 말하면 화가 났던 건 사실입니다.
하지만 그게 범죄를 의미하진 않습니다.`

]

},
"김도윤":{

role:"대학원생",

profile:"행사 보조 인력",

answers:[

`질문:
행사 당일 어떤 일을 했습니까?

답변:
행사 진행 보조를 맡고 있었습니다.
VIP 구역 출입은 하지 않았습니다.`,

`질문:
피해자를 만난 적 있습니까?

답변:
행사장에서 잠깐 인사한 정도입니다.
개인적인 관계는 없었습니다.`

]

},

"정지민":{

role:"대학생",

profile:"팬클럽 운영진",

answers:[

`질문:
왜 호텔에 있었습니까?

답변:
팬미팅 행사 스태프로 참여했습니다.
행사가 끝난 뒤 바로 귀가했습니다.`,

`질문:
피해자와 갈등이 있었습니까?

답변:
전혀 없습니다.
오히려 존경하던 배우였습니다.`

]

},

"이유진":{

role:"연구원",

profile:"피해자 지인",

answers:[

`질문:
피해자를 알고 있었습니까?

답변:
몇 년 전 행사에서 알게 되었습니다.
가끔 연락은 주고받았습니다.`,

`질문:
사건 당일 연락했습니까?

답변:
행사 축하 메시지를 보낸 것이 전부입니다.`

]

},

"박서연":{

role:"행사 기획자",

profile:"행사 총괄 담당",

answers:[

`질문:
행사 준비는 어땠습니까?

답변:
전체 진행을 맡고 있어서 정신이 없었습니다.
객실까지 따라가지는 않았습니다.`,

`질문:
피해자를 마지막으로 본 시점은?

답변:
행사가 끝난 직후였습니다.
이후 일정은 알지 못합니다.`

]

}

},

// =========================
// 단서
// =========================

clues:[

{

title:"독성 성분 검출",

desc:

`피해자가 사용한 와인잔에서
고농도 독성 물질이 검출되었다.

독성 물질은 일반인이 구하기 어려운 종류이며

사전에 준비된 범행일 가능성이 높다.`

},

{

title:"호텔 출입 기록",

desc:

`사건 발생 약 30분 전

강민석이 피해자 객실이 있는 층으로
이동한 기록이 확인되었다.

이후 15분 뒤
혼자 내려온 모습이 CCTV에 포착되었다.`

},

{

title:"계약 문서",

desc:

`피해자가 일방적으로 광고 계약을 파기하면서

강민석이 담당하던 프로젝트는
막대한 손실을 입었다.

회사 내부 보고서에는
수억 원 규모의 피해가 기록되어 있었다.`

},

{

title:"객실 CCTV",

desc:

`피해자는 사건 직전
누군가와 함께 와인을 마시고 있었다.

영상 품질이 좋지 않아
얼굴은 식별되지 않았지만

체형과 복장이
강민석과 유사한 것으로 분석되었다.`

}

],

// =========================
// 사건의 전말
// =========================

endingStory:

`강민석은 대형 광고 계약을 담당하던 직원이었다.

그러나 배우 이현우가
광고 계약을 일방적으로 파기하면서

회사는 막대한 손실을 입었고

그 책임 상당 부분이
강민석에게 돌아갔다.

결국 그는 승진 기회를 잃었고

회사 내부에서도 입지가 크게 흔들렸다.

강민석은 피해자에 대한 원망을
오랫동안 품게 되었다.

행사 당일.

그는 피해자가 묵고 있던 호텔 객실을 찾아갔다.

표면적으로는
행사 성공을 축하하기 위한 방문이었다.

그러나 미리 준비한 독성 물질을
와인잔에 넣은 뒤

피해자와 함께 술을 마셨다.

피해자는 아무런 의심 없이
와인을 마셨고

약 30분 후 독성이 발현되기 시작했다.

강민석은 피해자가 이상 증세를 보이기 시작하자
객실을 떠났고

결국 피해자는
객실 안에서 사망하였다.`,

// =========================
// 타임라인
// =========================

timeline:[

"21:42 행사 종료",

"21:55 피해자 객실 복귀",

"22:07 강민석 객실 방문",

"22:12 와인 제공",

"22:31 독성 물질 체내 반응 시작",

"22:44 강민석 객실 이탈",

"22:57 피해자 쓰러짐",

"23:18 시신 발견"

],

// =========================
// 용의자 정리
// =========================

suspectSummary:{

"김도윤":

"행사 진행 보조 인력이었으며 현장에 있었기 때문에 의심받았다. 그러나 VIP 구역 출입 기록이 없어 범행과는 관련이 없었다.",

"정지민":

"팬클럽 운영진으로 사건 현장 근처에 있었으나 행사 종료 후 귀가한 사실이 확인되었다.",

"이유진":

"피해자와 개인적 친분이 있었지만 단순 지인 관계였으며 범행 동기는 발견되지 않았다.",

"박서연":

"행사 총괄 담당으로 피해자와 접촉했지만 행사 운영 업무 외 특이 사항은 없었다.",

"최현우":

"피해자를 취재 중이던 기자였다. 사건 당일 로비 카페 이용 기록으로 알리바이가 확인되었다.",

"강민석":

"광고 계약 파기로 인해 거액의 손실을 입었고 오랜 원한 끝에 독살을 계획하였다."

},

murderer:"강민석"

}

];

// =========================
// stories 종료
// =========================
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
// 새 사건 생성
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
// 상태 표시
// =========================

function updateStatus(){

const clueRemain=
Math.max(0,2-clueUsed);

const questionRemain=
Math.max(0,4-questionUsed);

const clueText=
`남은 단서 분석 : ${clueRemain}/2`;

const questionText=
`남은 질문 : ${questionRemain}/4`;

const scoreText=
`점수 : ${score}`;

[
"clueCount",
"questionCount",
"scoreBoard",
"clueCountStep4",
"questionCountStep4",
"scoreBoardStep4"

].forEach(id=>{

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

// 사건파일

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

// 현장보고서

document.getElementById(
"sceneLocation"
).innerText=
current.scene.location;

document.getElementById(
"sceneTime"
).innerText=
"사망 추정 시각 : "
+
current.scene.time;

document.getElementById(
"sceneCause"
).innerText=
"사인 : "
+
current.scene.cause;

document.getElementById(
"sceneCondition"
).innerText=
current.scene.condition;

document.getElementById(
"sceneDescription"
).innerText=
current.scene.description;

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
// 단서
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
// 용의자
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
`<option>${name}</option>`;

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
// 단서
// =========================

function showClue(
title,
desc
){

if(
!foundClues.has(title)
){

foundClues.add(title);

clueUsed++;

if(clueUsed>2){

alert(
"⚠ 단서 분석 2회를 초과했습니다.\n점수 -5"
);

score-=5;

}

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
// 인터뷰
// =========================

function question(name){

questionUsed++;

if(questionUsed>4){

alert(
"⚠ 질문 4회를 초과했습니다.\n점수 -5"
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
questionUsed>=3
&&
Math.random()<0.5
){

const nervous=[

`질문:
그 시간에 정확히 무엇을 했습니까?

답변:
...왜 계속 저를 의심하는 거죠?
이미 말씀드렸잖습니까.`,

`질문:
이 단서를 설명할 수 있습니까?

답변:
그건...
잘 기억나지 않습니다.
중요한 내용은 아닙니다.`,

`질문:
피해자와 갈등이 있었습니까?

답변:
누구나 갈등은 있습니다.
하지만 그게 범죄를 의미하는 건 아니잖습니까.`

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

${answer}

</div>
`;

updateStatus();

}

// =========================
// 투표
// =========================

let selectedMurderer="";

function vote(){

selectedMurderer=

document.getElementById(
"voteSelect"
).value;

// 사건의 전말로 이동

document.getElementById(
"endingStory"
).innerHTML=
current.endingStory;

let timelineHTML="";

current.timeline.forEach(t=>{

timelineHTML+=
`
<div class="timeline-event">
${t}
</div>
`;

});

document.getElementById(
"timelineArea"
).innerHTML=
timelineHTML;

// 용의자 정리

let summaryHTML="";

for(
const name
in
current.suspectSummary
){

summaryHTML+=

`
<div class="summary-card">

<b>${name}</b>

<br><br>

${current.suspectSummary[name]}

</div>
`;

}

document.getElementById(
"suspectSummary"
).innerHTML=
summaryHTML;

goStep(6);

}

// =========================
// 결과
// =========================

function showResult(){

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

if(
selectedMurderer
===
murderer
){

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

</div>
`;

}else{

score=
Math.max(
0,
score-30
);

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
당신이 지목한 인물 :
${selectedMurderer}
</p>

<p>
진범 :
${murderer}
</p>

<p>
진범은 완전 범죄에 성공했습니다.
</p>

</div>
`;

}

document.getElementById(
"finalScore"
).innerText=
`최종 점수 : ${score}`;

document.getElementById(
"finalGrade"
).innerText=
grade;

goStep(7);

}
