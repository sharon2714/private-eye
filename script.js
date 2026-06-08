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

function generateCase(){

const randomCase =
cases[Math.floor(Math.random()*cases.length)];

document.getElementById("caseTitle").innerHTML =
"<strong>사건명:</strong> " + randomCase.title;

document.getElementById("caseLocation").innerHTML =
"<strong>장소:</strong> " + randomCase.location;

document.getElementById("caseVictim").innerHTML =
"<strong>피해자:</strong> " + randomCase.victim;

document.getElementById("caseMotive").innerHTML =
"<strong>동기:</strong> " + randomCase.motive;

}

generateCase();
