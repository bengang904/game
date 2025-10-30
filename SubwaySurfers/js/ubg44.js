// --- Backlinks No-Restriction Version ---
const backlinksList = [
  { link: "https://ubg44.github.io/car-games.html", text: "CAR" },
  { link: "https://ubg44.github.io/jump-run-games.html", text: "JUMP & RUN" },
  { link: "https://ubg44.github.io/shooting-games.html", text: "SHOOTING" },
  { link: "https://ubg44.github.io/sports-games.html", text: "SPORTS" },
  { link: "https://ubg44.github.io/idle-games.html", text: "IDLE" },
];

// 关闭按钮
function closeBacklinks() {
  const el = document.getElementById("backlinksPlace");
  if (el) el.remove();
  return false;
}

// 插入顶部导航栏（无条件显示）
function insertBacklinks() {
  let backlinksHTML = "";
  backlinksHTML +=
    '<ul style="color:#ffffff; padding:0; margin:0; font-size:18px; list-style:none;">';

  // 首页图标
  backlinksHTML +=
    '<li style="padding:10px; display:inline-block; float:left;">' +
    '<a style="padding:5px; color:#ffffff; text-decoration:none;" ' +
    'onMouseOver="this.style.backgroundColor=\'#0C1E40\';" ' +
    'onMouseOut="this.style.backgroundColor=\'\';" ' +
    'href="//ubg44.github.io">' +
    decodeURIComponent(escape("\xF0\x9F\x8F\xA0")) +
    " ubg44</a>" +
    "</li>";

  // 分类列表
  for (let i = 0; i < backlinksList.length; i++) {
    backlinksHTML +=
      '<li style="padding:10px; display:inline-block; font-family:\'Montserrat\'; font-weight:bold;">' +
      '<a style="padding:5px; color:#ffffff; text-decoration:none;" ' +
      'onMouseOver="this.style.color=\'#ffffaa\'; this.style.backgroundColor=\'#18bc9c\';" ' +
      'onMouseOut="this.style.color=\'#ffffff\'; this.style.backgroundColor=\'\';" ' +
      'href="' +
      backlinksList[i].link +
      '">' +
      backlinksList[i].text +
      "</a>" +
      "</li>";
  }

  // 关闭按钮
  backlinksHTML +=
    '<li style="padding:10px; display:inline-block; float:right;">' +
    '<a onclick="return closeBacklinks();" style="padding:5px; color:#ffffff; text-decoration:none;" ' +
    'onMouseOver="this.style.backgroundColor=\'#ff6666\';" ' +
    'onMouseOut="this.style.backgroundColor=\'\';" href="#">' +
    decodeURIComponent(escape("\xE2\x9D\x8C")) +
    "</a>" +
    "</li>";

  backlinksHTML += "</ul>";

  const backlinksPlace = document.createElement("div");
  backlinksPlace.id = "backlinksPlace";
  backlinksPlace.style.cssText =
    "width:100%; text-align:center; position:absolute; top:0; left:0; z-index:999; background:#2C3E50; opacity:0.9;";
  backlinksPlace.innerHTML = backlinksHTML;

  // 插入页面顶部
  document.body.insertBefore(backlinksPlace, document.body.firstChild);
}

// 页面加载后立即显示
window.addEventListener("load", insertBacklinks);
