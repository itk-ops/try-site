
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


