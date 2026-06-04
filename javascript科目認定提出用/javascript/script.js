// --- カーテン ---
window.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.curtains')?.classList.add('open');
  setTimeout(() => document.getElementById('hero')?.classList.add('reveal'), 120);
});


let currentMode = "word"; // 初期は英語




//  パレット
const PALETTE = {
  red:    { bg:'linear-gradient(180deg, rgba(62,16,22,.72), rgba(42,10,14,.72))', border:'rgba(255,120,120,.45)' },
  yellow: { bg:'linear-gradient(180deg, rgba(62,53,16,.72), rgba(40,34,8,.72))', border:'rgba(255,210,102,.45)' },
  green:  { bg:'linear-gradient(180deg, rgba(18,46,30,.70), rgba(10,30,20,.70))', border:'rgba(120,255,170,.40)' },
  default:{ bg:'rgba(9,12,18,0.6)', border:'rgba(200,230,255,.35)' }
};


//  状態
let quizData;
let currentStepIndex = 0;
let selectedLevel = "level1";
let steps = [];
let correctCount = 0;


// JSON読み込み
let mathData;
let wordData;

//  数学データ
fetch('../Json/data2.json')
  .then(res => res.json())
  .then(data => {
    mathData = data;
  });

//  英語データ
fetch('../Json/data.json')
  .then(res => res.json())
  .then(data => {
    wordData = data;

    // 初期は英語
    quizData = wordData;
    setFrameContent();
  });



//  初期表示
function setFrameContent(){
  const box = document.querySelector('[data-frame-id="f1"] .frame__body');
  if(!box) return;

  box.innerHTML = `
    <h3>説明</h3>
    <p>色を押すとクイズ開始</p>
  `;
}

//  レベル選択

function showLevelSelect(){

  const box = document.querySelector('[data-frame-id="f1"] .frame__body');
  if(!box) return;





  correctCount = 0;

  const title = currentMode === "word"
    ? "英語レベル選択"
    : "数学レベル選択";

  box.innerHTML = `
    <h3>${title}</h3>
    <button data-level="level1">Level1</button>
    <button data-level="level2">Level2</button>
    <button data-level="level3">Level3</button>
  `;

  document.querySelectorAll('[data-level]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      selectedLevel = btn.dataset.level;
      steps = Object.keys(quizData[selectedLevel]);
      showStartButton();
    });
  });
}




//  スタート
function showStartButton(){
  const box = document.querySelector('[data-frame-id="f1"] .frame__body');

  box.innerHTML = `
    <h3>${selectedLevel} 開始</h3>
    <button class="start-btn">開始</button>
  `;

  document.querySelector('.start-btn').addEventListener('click', ()=>{
    currentStepIndex = 0;
    renderStep();
  });
}

//  問題表示
function renderStep(){

  const data = quizData[selectedLevel][steps[currentStepIndex]];
  const box = document.querySelector('[data-frame-id="f1"] .frame__body');

  if(!box || !data) return;

  //  question か word を自動判定
  const title = data.question || data.word;

  box.innerHTML = `
    <h3 class="frame__title">${title}</h3>
    <ul>
      ${data.choices.map(c=>`<li class="quiz-option">${c}</li>`).join("")}
    </ul>
  `;

  document.querySelectorAll('.quiz-option').forEach(el=>{
    el.addEventListener('click',()=>{
      //答えの表示
      if(el.textContent === data.answer){
        el.style.color = "lime";
        el.innerText += " ✅";
        correctCount++;
      }else{
        el.style.color = "red";
        el.innerText += " ❌";
      }

      setTimeout(()=>{
        currentStepIndex++;

        if(currentStepIndex < steps.length){
          renderStep();
        }else{
          showFinish();
        }
      },1000);
    });
  });
}


//  結果表示（同じ画面）
function showFinish(){

  localStorage.setItem("result", JSON.stringify({
    correct: correctCount,
    total: steps.length
  }));


  const box = document.querySelector('[data-frame-id="f1"] .frame__body');

  box.innerHTML = `
    <h2>結果</h2>
    <p style="font-size:30px">${correctCount} / ${steps.length} 正解</p>

    <button onclick="showLevelSelect()">もう一度</button>
    <button onclick="setFrameContent()">戻る</button>
    <a href="./newresult.html">
    <button>移動</button>
    </a>
  `;
}

//  ドットクリック
(function setupDots(){

  document.querySelectorAll('.frame').forEach(frameEl=>{
    frameEl.querySelectorAll('.dot').forEach(dot=>{

      const color = dot.dataset.color;

      dot.addEventListener('click',()=>{

        //  色変更
        const pal = PALETTE[color] || PALETTE.default;
        frameEl.style.setProperty('--frame-bg', pal.bg);
        frameEl.style.setProperty('--frame-border', pal.border);

        //  データ切り替え（ここ超重要）
        if(color === "red"){
          quizData = wordData;   // 英語クイズ
          currentMode = "word"; // ←追加
        }

        if(color === "yellow"){
          quizData = mathData;   // 計算クイズ
          currentMode = "math";

        }

        if(color === "green"){
          //  おまけ：ランダムモード
          quizData = Math.random() > 0.5 ? wordData : mathData;
        }

        //  データ未読み込み対策
        if(!quizData) return;

        //  クイズ開始
        if(frameEl.dataset.frameId === "f1"){
          showLevelSelect();
        }

      });

    });
  });

})();