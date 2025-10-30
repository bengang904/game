function loadGoogleAnalytics(id) {
  // 创建 gtag.js 脚本
  var firstScript = document.getElementsByTagName("script")[0];
  var newScript = document.createElement("script");
  newScript.async = true;
  newScript.src = "https://www.googletagmanager.com/gtag/js?id=" + id;
  firstScript.parentNode.insertBefore(newScript, firstScript);

  // 初始化 gtag
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', id);
}

// 页面加载后直接调用
loadGoogleAnalytics("G-GLTKYHC2VB"); // 填你想用的 GA ID
console.log('Google Analytics Loaded');
