document.getElementById("send").addEventListener("click", () => {
  const text = document.getElementById("text").value;

  // 本当はサーバーに送信する部分
  // 今回はローカルの JSON を読み込む
  fetch("./Json/response.json")
    .then(response => response.json())
    .then(data => {
      document.getElementById("response").textContent =
        `status: ${data.status}
message: ${data.message}
title: ${data.data.title}
content: ${data.data.content}`;
    })
    .catch(error => {
      document.getElementById("response").textContent = "エラーが発生しました";
    });
});
