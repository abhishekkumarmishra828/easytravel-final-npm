
(function () {
  const userRaw = localStorage.getItem("easytravel_user");
  const token = localStorage.getItem("easytravel_token");
  const chip = document.getElementById("authStatusChip");
  const logoutBtn = document.getElementById("logoutBtn");

  if (chip) {
    if (token && userRaw) {
      try {
        const user = JSON.parse(userRaw);
        chip.textContent = `Logged in: ${user.name || user.email || 'User'}`;
      } catch {
        chip.textContent = "Logged in";
      }
    } else {
      chip.textContent = "Login required";
    }
  }

  if (logoutBtn) {
    logoutBtn.style.display = token ? "inline-block" : "none";
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("easytravel_token");
      localStorage.removeItem("easytravel_user");
      window.location.href = "/login.html";
    });
  }
})();
