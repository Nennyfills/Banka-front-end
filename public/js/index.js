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
    const { data, message } = await response.json();
    const { user, token } = data;
    const localData = {
      token,
      id : user.id,
      firstname : user.firstname,
      surname : user.surname,
      phonenumber: user.phonenumber,
      permission: user.permission,
      isadmin: user.isadmin,
      email: user.email,
      imgurl: user.imgurl,
    }    
    localStorage.setItem("user", JSON.stringify(localData))
        console.log(user);
    const { permission} = user;
    if (permission === 'ADMIN') {
      content.innerText = message;
      window.location.href = "user/dashboard-admin.html";

    } if (permission === 'STAFF') {
      content.innerText = message;
      window.location.href = "user/dashboard-staff.html";
      return false;
    } else {
      window.location.href = "user/profile.html";
      console.log(user.firstname)
      firstname.innerHTML = user.firstname;
      return false;
    }
  } catch (error) {
    hideSpinner();
    content.innerText = `Failed to retrieve user informations: ${error}`;
  }

  return false;
};
