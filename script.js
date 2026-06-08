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

const suspects = [
    "김도윤","박서연","최현우","정지민","이유진","강민석"
];

const clues = {
    lab:["찢어진 메모","열쇠","연구 기록"],
    hall:["CCTV","발자국","복도 흔적"],
    storage:["혈흔","장갑","상자"],
    office:["통화 기록","협박 메일","일정표"]
};

let murderer = "";
let currentCase = null;

function startGame(){
    document.querySelector(".mode-box").style.display = "none";
    document.getElementById("gameArea").style.display = "block";
    goStep(1);
    generateCase();
}

function goStep(step){
    document.querySelectorAll(".step").forEach(e=>{
        e.style.display = "none";
    });

    const target = document.getElementById("step"+step);
    if(target) target.style.display = "block";
}

function generateCase(){
    currentCase = cases[Math.floor(Math.random()*cases.length)];
    murderer = suspects[Math.floor(Math.random()*suspects.length)];

    document.getElementById("caseTitle").innerText = currentCase.title;
    document.getElementById("caseLocation").innerText = currentCase.location;
    document.getElementById("caseVictim").innerText = currentCase.victim;
    document.getElementById("caseMotive").innerText = currentCase.motive;

    document.getElementById("clueArea").innerHTML = "";
    document.getElementById("discussionLog").innerHTML = "";
    document.getElementById("resultArea").innerHTML = "";
}

function investigate(place){
    const clue = clues[place][Math.floor(Math.random()*clues[place].length)];
    document.getElementById("clueArea").innerHTML += `<p>📄 ${clue}</p>`;
}

function askQuestion(){ addLog("질문","저는 아닙니다."); }
function pressureSuspect(){ addLog("압박","저는 결백합니다."); }
function accuseSuspect(){ addLog("의심","증거 있나요?"); }

function addLog(t,m){
    document.getElementById("discussionLog").innerHTML += `<p><strong>${t}</strong>: ${m}</p>`;
}

function voteMurderer(){
    const pick = document.getElementById("voteSelect").value;

    document.getElementById("resultArea").innerHTML =
    (pick === murderer)
    ? `<h2>SUCCESS</h2><p>정답: ${murderer}</p>`
    : `<h2>FAIL</h2><p>정답: ${murderer}</p>`;
}
