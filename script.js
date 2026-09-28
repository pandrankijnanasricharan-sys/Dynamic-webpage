// Demo credentials
const VALID_USERNAME = "admin";
const VALID_PASSWORD = "Admin@123";

/* ================= LOGIN PAGE ================= */
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const usernameError = document.getElementById("usernameError");
  const passwordError = document.getElementById("passwordError");
  const formError = document.getElementById("formError");

  function validateUsername() {
    const value = usernameInput.value.trim();
    let msg = "";

    if (value === "") msg = "Username is required";
    else if (value.length < 3) msg = "Username must be at least 3 characters";
    else if (/\s/.test(value)) msg = "Username cannot contain spaces";

    usernameError.textContent = msg;
    usernameInput.classList.toggle("invalid", msg !== "");
    return msg === "";
  }

  function validatePassword() {
    const value = passwordInput.value;
    let msg = "";

    if (value === "") msg = "Password is required";
    else if (value.length < 6) msg = "Password must be at least 6 characters";

    passwordError.textContent = msg;
    passwordInput.classList.toggle("invalid", msg !== "");
    return msg === "";
  }

  usernameInput.addEventListener("blur", validateUsername);
  passwordInput.addEventListener("blur", validatePassword);

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    formError.textContent = "";

    const userOk = validateUsername();
    const passOk = validatePassword();
    if (!userOk || !passOk) return;

    if (
      usernameInput.value.trim() === VALID_USERNAME &&
      passwordInput.value === VALID_PASSWORD
    ) {
      sessionStorage.setItem("loggedIn", "true");
      sessionStorage.setItem("loginTime", new Date().toLocaleString("en-IN"));
      window.location.href = "success.html";
    } else {
      formError.textContent = "Invalid username or password";
    }
  });
}

/* ================= SUCCESS PAGE ================= */
const loginTimeEl = document.getElementById("loginTime");

if (loginTimeEl) {
  // Block direct access without logging in
  if (sessionStorage.getItem("loggedIn") !== "true") {
    window.location.href = "index.html";
  }

  loginTimeEl.textContent = sessionStorage.getItem("loginTime");

  const hour = new Date().getHours();
  let greeting;
  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";
  else if (hour < 21) greeting = "Good Evening";
  else greeting = "Good Night";
  document.getElementById("greeting").textContent = greeting;

  document.getElementById("logoutLink").addEventListener("click", function (e) {
    e.preventDefault();
    sessionStorage.clear();
    window.location.href = "index.html";
  });
}
