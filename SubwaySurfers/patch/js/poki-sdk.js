// --- Safe Local PokiSDK Emulator (No Redirect / No Ads) ---

// 防止网页被 Poki 或其他 SDK 检测
document.xURL = "https://localhost/";

if (typeof consoleLog === 'undefined') {
  consoleLog = console.log;
}

// --- 安全 eval 拦截 ---
(function() {
  const originalEval = eval;
  eval = function() {
    let code = arguments[0];
    // 移除外部站点访问
    code = code.replace(/aHR0cHM6Ly9wb2tpLmNvbS9zaXRlbG9jaw==/g, "");
    code = code.replace("'location'", "'xlocation'");
    return originalEval.apply(this, [code]);
  };
})();

// --- 拦截 sendBeacon / WebSocket ---
navigator.sendBeacon = function() {
  consoleLog("[PokiSDK-Emu] sendBeacon blocked:", arguments);
  return true;
};

WebSocket = function() {
  consoleLog("[PokiSDK-Emu] WebSocket blocked");
  return {};
};

// --- location 代理，防跳转 ---
xlocation = new Proxy(location, {
  get(target, property) {
    if (property === "href") return "https://localhost/";
    if (property === "origin") return "https://localhost/";
    if (property === "hostname" || property === "host") return "localhost";
    return target[property];
  },
  set(target, property, value) {
    consoleLog("[PokiSDK-Emu] Blocked location change:", property, value);
    return true;
  }
});

// --- window 代理，防止 SDK 获取真实 location ---
xwindow = new Proxy(window, {
  get(target, property) {
    if (property === "location") return xlocation;
    return target[property];
  }
});

// --- PokiSDK 模拟器 ---
class PokiSDK_Emu {
  constructor() {
    consoleLog("[PokiSDK-Emu] Loaded");
  }

  init() {
    consoleLog("[PokiSDK-Emu] init()");
    return Promise.resolve("InitDone");
  }

  initWithVideoHB() {
    consoleLog("[PokiSDK-Emu] initWithVideoHB()");
    return Promise.resolve("");
  }

  setDebug(debug) {
    consoleLog("[PokiSDK-Emu] setDebug:", debug);
  }

  setDebugTouchOverlayController(debug) {
    consoleLog("[PokiSDK-Emu] setDebugTouchOverlayController:", debug);
  }

  getURLParam(name) {
    return "";
  }

  isAdBlocked() {
    return false;
  }

  happyTime(scale) {
    consoleLog("[PokiSDK-Emu] happyTime:", scale);
  }

  // --- Loading 模拟 ---
  gameLoadingStart() {
    consoleLog("[PokiSDK-Emu] gameLoadingStart()");
  }
  gameLoadingProgress(progress) {
    consoleLog("[PokiSDK-Emu] gameLoadingProgress:", progress);
  }
  gameLoadingFinished() {
    consoleLog("[PokiSDK-Emu] gameLoadingFinished()");
  }

  // --- Gameplay 模拟 ---
  gameplayStart() {
    consoleLog("[PokiSDK-Emu] gameplayStart()");
  }
  gameplayStop() {
    consoleLog("[PokiSDK-Emu] gameplayStop()");
  }

  // --- 广告调用直接跳过 ---
  commercialBreak() {
    consoleLog("[PokiSDK-Emu] commercialBreak() skipped");
    return Promise.resolve();
  }
  rewardedBreak() {
    consoleLog("[PokiSDK-Emu] rewardedBreak() skipped");
    return Promise.resolve();
  }
  displayAd() {
    consoleLog("[PokiSDK-Emu] displayAd() skipped");
  }
  destroyAd() {
    consoleLog("[PokiSDK-Emu] destroyAd() skipped");
  }

  // --- 自定义事件 ---
  customEvent(eventName, data) {
    consoleLog("[PokiSDK-Emu] customEvent:", eventName, data);
  }
}

// 替换全局 PokiSDK
PokiSDK = new PokiSDK_Emu();
