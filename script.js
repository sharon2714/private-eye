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

const suspects = ["김도윤","박서연","최현우","정지민","이유진","강민석"];

const clues = {
    lab:["찢어진 메모","열쇠 발견","연구 기록 조작 흔적"],
    hall:["CCTV 영상","발자국","급히 지나간 흔적"],
    storage:["혈흔","장갑","수상한 상자"],
    office:["통화 기록","협박 메일","일정표"]
};

let murderer = "";
let currentCase = null;

// ================= START =================
function startGame(){
    document.querySelector(".mode-box").style.display = "none";
    document.getElementById("gameArea").style.display = "block";
    goStep(1);
    generateCase();
}

// ================= STEP =================
function goStep(step){

    document.querySelectorAll(".step").forEach(s=>{
        s.style.display = "none";
    });

    const target = document.getElementById("step"+step);
    if(target) target.style.display = "block";
}

// ================= CASE =================
function generateCase(){

    currentCase = cases[Math.floor(Math.random()*cases.length)];
    murderer = suspects[Math.floor(Math.random()*suspects.length)];

    document.getElementById("caseTitle").innerText =
        "사건: " + currentCase.title;

    document.getElementById("caseLocation").innerText =
        "장소: " + currentCase.location;

    document.getElementById("caseVictim").innerText =
        "피해자: " + currentCase.victim;

    document.getElementById("caseMotive").innerText =
        "동기: " + currentCase.motive;

    console.log("범인:", murderer);

    document.getElementById("clueArea").innerHTML = "";
    document.getElementById("discussionLog").innerHTML = "";
    document.getElementById("resultArea").innerHTML = "";
}

// ================= INVESTIGATE =================
function investigate(place){

    const list = clues[place];
    const clue = list[Math.floor(Math.random()*list.length)];

    document.getElementById("clueArea").innerHTML +=
    `<p>📄 ${clue}</p>`;

    document.getElementById("detectiveNotes").innerHTML +=
    `<p>✔ ${clue}</p>`;
}

// ================= DISCUSSION =================
function askQuestion(){
    addLog("의문 제기", "저는 관련 없습니다.");
}

function pressureSuspect(){
    addLog("압박", "왜 저를 의심하죠?");
}

function accuseSuspect(){
    addLog("추궁", "증거 있나요?");
}

function addLog(name, text){
    document.getElementById("discussionLog").innerHTML +=
    `<p><strong>${name}</strong>: ${text}</p>`;
}

// ================= VOTE =================
function voteMurderer(){

    const pick = document.getElementById("voteSelect").value;

    if(pick === murderer){
        document.getElementById("resultArea").innerHTML =
        `<h2>SUCCESS</h2><p>범인: ${murderer}</p>`;
    }else{
        document.getElementById("resultArea").innerHTML =
        `<h2>FAIL</h2><p>범인: ${murderer}</p>`;
    }
}
