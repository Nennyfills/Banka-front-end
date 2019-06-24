const info = JSON.parse(localStorage.getItem("user"));
document.getElementById("userName").innerText = `${info.firstname} ${info.surname}`;
document.getElementById("userEmail").innerText = info.email;
document.getElementById("userPhonenumber").innerText = info.phonenumber;