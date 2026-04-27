const tabs = document.querySelectorAll(".tab");
const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const uploadForm = document.getElementById("uploadForm");
const logEl = document.getElementById("log");
const sessionInfo = document.getElementById("sessionInfo");

let activeUser = null;

function printLog(label, payload, isError = false) {
  const now = new Date().toLocaleTimeString();
  const serialized = JSON.stringify(payload, null, 2);
  const line = `[${now}] ${label}\n${serialized}\n\n`;
  logEl.textContent = line + logEl.textContent;
  logEl.className = isError ? "log-err" : "log-ok";
}

function setSessionText() {
  if (!activeUser) {
    sessionInfo.textContent = "Not logged in";
    return;
  }

  sessionInfo.textContent = `Logged in as ${activeUser.username} (${activeUser.role})`;
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");

    const target = tab.dataset.tab;
    registerForm.classList.toggle("active", target === "register");
    loginForm.classList.toggle("active", target === "login");
  });
});

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(registerForm);
  const body = {
    username: String(formData.get("username") || "").trim(),
    email: String(formData.get("email") || "").trim(),
    password: String(formData.get("password") || ""),
    role: String(formData.get("role") || "user"),
  };

  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    });

    const result = await response.json();

    if (!response.ok) {
      printLog("Register failed", result, true);
      return;
    }

    activeUser = result.user || null;
    setSessionText();
    printLog("Register success", result);
    registerForm.reset();
  } catch (error) {
    printLog("Register error", { message: error.message }, true);
  }
});

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(loginForm);
  const identifier = String(formData.get("identifier") || "").trim();

  const body = {
    password: String(formData.get("password") || ""),
  };

  if (identifier.includes("@")) {
    body.email = identifier;
  } else {
    body.username = identifier;
  }

  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    });

    const result = await response.json();

    if (!response.ok) {
      printLog("Login failed", result, true);
      return;
    }

    activeUser = result.user || null;
    setSessionText();
    printLog("Login success", result);
    loginForm.reset();
  } catch (error) {
    printLog("Login error", { message: error.message }, true);
  }
});

uploadForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(uploadForm);

  try {
    const response = await fetch("/api/music/upload", {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      printLog("Upload failed", result, true);
      return;
    }

    printLog("Upload success", result);
    uploadForm.reset();
  } catch (error) {
    printLog("Upload error", { message: error.message }, true);
  }
});

setSessionText();
