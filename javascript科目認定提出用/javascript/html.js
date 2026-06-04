// タイマー
let seconds = 0, minutes = 0, hours = 0;
let intervalId;

function updateTimer() {
seconds++;
if (seconds === 60) {
seconds = 0;
minutes++;
}
if (minutes === 60) {
minutes = 0;
hours++;
}
const formattedTime =
`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
document.getElementById("timer").innerText = formattedTime;
}

document.getElementById("start").addEventListener("click", () => {
if (!intervalId) {
intervalId = setInterval(updateTimer, 1000);
}
});

document.getElementById("stop").addEventListener("click", () => {
clearInterval(intervalId);
intervalId = null;
});

document.getElementById("reset").addEventListener("click", () => {
clearInterval(intervalId);
intervalId = null;
seconds = minutes = hours = 0;
document.getElementById("timer").innerText = "00:00:00";
});

//日時、時間
function updateDateTime() {
  const now = new Date();
  const days = ["日", "月", "火", "水", "木", "金", "土"];

  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const day = days[now.getDay()];

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  const formatted = `${year}年${month}月${date}日（${day}） ${hours}:${minutes}:${seconds}`;
  document.getElementById("dropdown-time").textContent = formatted;
}

// 初回表示と1秒ごとの更新
document.addEventListener("DOMContentLoaded", () => {
  updateDateTime();
  setInterval(updateDateTime, 1000);
});




