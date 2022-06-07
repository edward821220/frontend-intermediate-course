const api = "https://api.twitch.tv/helix/streams";
const clientID = "mrouzbnt8je6fkv7daq7zhg9roh9pk"; // Twitch 官網註冊帳號取得 ID
const accessToken = "9kpg0bru6np9gdan8vye623aps0ubq"; // 用 twitch CLI 取得 access token
const request = new XMLHttpRequest();

// 連接API取得資料
function getData(cb) {
  request.open("GET", api, true);
  request.setRequestHeader("Authorization", "Bearer " + accessToken);
  request.setRequestHeader("Client-Id", clientID);
  request.send();
  request.onload = function (e) {
    let results = JSON.parse(request.response).data;
    console.log(results);
    cb(results);
  };
}

// 拿到的資料丟到 callback function 處理
getData((datas) => {
  // 選取要添加的父元素
  const box = document.querySelector(".box");

  // 先將原本的內容清空
  box.innerHTML = "";
  // 再把取得的資料加進去
  for (let data of datas) {
    box.innerHTML += addHTML(data);
  }
});

//  添加資料到 HTML
function addHTML(data) {
  return `
    <div class="small-box">
      <img class="preview" src="/pic/camera.jpg" alt="畫面" />
      <div class="content">
        <img class="head" src="/pic/bear.jpg" alt="頭像" />
        <ul class="word">
          <li>${data.game_name}</li>
          <li>${data.user_name}</li>
        </ul>
      </div>
    </div>
  `;
}

// 也可以用 fetch api 寫法
// fetch(api, {
//   method: "GET", // or 'PUT'
//   headers: new Headers({
//     "Client-Id": clientID,
//     Authorization: "Bearer " + accessToken,
//   }),
// }).then(function (response) {
//   return response.json();
// });
