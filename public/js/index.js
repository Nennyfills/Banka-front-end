const logMeIn = async (e) => {
  e.preventDefault();
  const email = document.getElementById("username").value;
  const password = document.getElementById("userpassword").value;
  const content = document.getElementById("login-respond");

  const url = "http://localhost:8000/api/v1/auth/login"
  const payload = JSON.stringify({ email, password })
  
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

      content.style.display = 'block';
      content.innerText = json.message;
      return;      
    }
    
    const { token, user } = await response.json();
    localStorage.setItem('token', token);
    localStorage.setItem("user", JSON.stringify(permission));
    
    if (permission === 'ADMIN') {
      window.location.href = "user/dashboard-admin.html";
  
    } if (permission === 'STAFF') {
      window.location.href = "user/dashboard-staff.html";
      return false;
    } else {
      window.location.href = "user/profile.html";
      return false;
    }

  } catch (error) {
    hideSpinner();
    console.error(`Failed to retrieve user informations: (${error})`);
  }

  return false;
};
