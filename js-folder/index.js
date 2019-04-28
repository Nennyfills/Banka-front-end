const logMeIn = (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("userpassword").value;
  const content = document.getElementById("login-respond");

  if (username === "admin" && password === "admin") {
    localStorage.setItem(
      "user",
      JSON.stringify({ name: "ADMIN", permission: "ADMIN" }),
    );
    window.location.href = "UI/user/dashboard-admin.html";
    return false;
  } if (username === "staff" && password === "staff") {
    window.location.href = "UI/user/dashboard-staff.html";
    localStorage.setItem(
      "user",
      JSON.stringify({ name: "STAFF", permission: "STAFF" }),
    );
    return false;
  } if (username === "user" && password === "user") {
    window.location.href = "UI/user/profile.html";
    localStorage.setItem(
      "user",
      JSON.stringify({ name: "USER", permission: "USER" }),
    );
    return false;
  }
  content.style.display = "block";


  return false;
};
