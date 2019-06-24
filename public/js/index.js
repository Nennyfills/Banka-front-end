const logMeIn = async (e) => {
  e.preventDefault();

  const email = document.getElementById("username").value;
  const password = document.getElementById("userpassword").value;
  const content = document.getElementById("login-respond");
  const url = "https://banka-nenny.herokuapp.com/api/v1/auth/login"
  const payload = JSON.stringify({ email, password });
  showSpinner();

  try {
    const response = await fetch(url,
      {
        method: 'POST',
        body: payload,
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
      });
    if (!response.ok) {
      hideSpinner();
      const json = await response.json()
      console.log(json, "hello")
      content.style.display = 'block';
      content.innerText = json.message;
      return;
    } 
    const {data} = await response.json();
    const { token, user} = data;
    const localData = { ...user, token }
    localStorage.setItem("user", JSON.stringify(localData))
    const { permission } = user;
    if (permission === 'ADMIN') {
      window.location.href = "user/dashboard-admin.html";
      return false;
    } if (permission === 'STAFF') {
      window.location.href = "user/dashboard-staff.html";
      return false;
    } else {
      window.location.href = "user/profile.html";
      return false;
    }
  } catch (error) {
    hideSpinner();
    content.innerText = `Failed to retrieve user informations: ${error}`;
  }

  return false;
};

const signMeUp = async (e) => {
  e.preventDefault();
  const firstname = document.getElementById("firstname").value;
  const surname = document.getElementById("surname").value;
  const email = document.getElementById("userEmail").value;
  const phonenumber = document.getElementById("phoneNumber").value;
  const password = document.getElementById("password").value;
  const confirm_password = document.getElementById("confirm-password").value;
  const content = document.getElementById("login-respond");
  console.log(firstname, surname, email, phoneNumber, password, confirm_password);

  const url = "https://banka-nenny.herokuapp.com/api/v1/auth/signup"
  const payload = JSON.stringify({ firstname, surname, email, phonenumber, password })
  console.log(payload);

  try {
    if (password !== confirm_password) {
      content.style.display = 'block';
      content.innerText = 'password does not match confirm password';
      return;
    }
    const response = await fetch(url,
      {
        method: 'POST',
        body: payload,
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
      });
    if (!response.ok) {
      const json = await response.json()

      content.style.display = 'block';
      content.innerText = json.message;
      return;
    }
    const { data } = await response.json();
    localStorage.setItem("user", JSON.stringify(data))
    const { permission } = data;
    if (permission === 'ADMIN') {
      window.location.href = "dashboard-admin.html";
      return false;
    } if (permission === 'STAFF') {
      window.location.href = "dashboard-staff.html";
      return false;
    } else {
      window.location.href = "profile.html";
      return false;
    }

  } catch (error) {
    console.error(`Failed to retrieve user informations: (${error})`);
  }

  return false;
};