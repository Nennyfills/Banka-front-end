// const previewImage = (e) => {
//   uploadFile(e.files[0]);
// };


// const cloudName = "dlbwtma20";
// const unsignedUploadPreset = "ylmhasme";

// const fileSelect = document.getElementById("fileSelect");
// // const fileElem = document.getElementById("fileElem");

// // fileSelect.addEventListener("click", (e) => {
// //   if (fileElem) {
// //     fileElem.click();
// //   }
// //   e.preventDefault(); // prevent navigation to "#"
// // }, false);


// // *********** Upload file to Cloudinary ******************** //
// function uploadFile(file) {
//   const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload/`;
//   const fd = new FormData();

//   fd.append("upload_preset", unsignedUploadPreset);
//   fd.append("tags", "browser_upload"); // Optional - add tag for image admin in Cloudinary
//   fd.append("file", file);
//   fd.append("public_id", "vvv");
//   // fd.append("public_id", "user_id");


//   fetch(url, {
//     method: "POST",
//     body: fd,
//   })
//     .then(res => res.text())
//     .then((text) => {
//       const response = JSON.parse(text);
//       const url_s = response.secure_url;
//       const tokens = url_s.split("/");
//       tokens.splice(-2, 0, "w_150,c_scale");
//       const img = document.getElementById("image");

//       img.src = tokens.join("/");
//       img.alt = response.public_id;
//     });
// }

// let user = null;

// const localUser = localStorage.getItem('user');
// if (localUser) {
//   user = JSON.parse(localUser);
// }
// console.log(user, "main");

// const previewImage = (e) => {
//   uploadFile(e.files[0]);
// };


// const cloudName = "dlbwtma20";
// const unsignedUploadPreset = "ylmhasme";

// const fileSelect = document.getElementById("fileSelect");
// const fileElem = document.getElementById("fileElem");


// // const uploadToServer = (avatarUrl) => {
// //   fetch('v1/uploadProfile',
// //     {
// //       method: "POST",
// //       body: {
// //         photo: avatarUrl,
// //       }
// //     })

// //   )
// // }


// document.onreadystatechange = () => {
//   // eslint-disable-next-line no-empty
//   if (document.readyState !== "complete") {
//     return;
//   }
//   const img = document.getElementById("image");
//   //https://res.cloudinary.com/${cloudName}/image/upload/${url}/{userId}.jpg`
//   const url = `https://res.cloudinary.com/${cloudName}/image/upload/${url}/nenny1_ewjwmw.jpg`;
//   img.src = url;
// };
const goBack = () => {
  document.getElementById("side_dashboard").addEventListener("click", (e) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user.permission === "ADMIN".toUpperCase()) {
      window.location.href = "dashboard-admin.html";
    } else if (user.permission === "STAFF".toUpperCase()) {
      window.location.href = "dashboard-staff.html";
    } else {
      window.location.href = "profile.html";
    }
  });
}
const user = JSON.parse(localStorage.getItem("user"));
document.getElementById("userFirstname").innerText = user.firstname;

const getAccounts = async () => {
  let information = document.getElementById('information');
  const url = `https://banka-nenny.herokuapp.com/api/v1/user/accounts/${user.id}`;
  const token = user.token;
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', token);
  showSpinner();
  try {
    const response = await fetch(url,
      {
        method: 'GET',
        mode: "cors",
        cache: "no-cache",
        headers: myHeaders,
      });
    if (!response.ok) {
      hideSpinner();
      const json = await response.json()
      return information.innerHTML = `<h4 class="profile-design info">
                 ${json.message}, please open an account.
              </h4 >`;
    }
    const { data, message } = await response.json();
    account = data;
    let optionList = document.getElementById('getAccount').options;
    let select = document.querySelector('.select-account');
    data.forEach(option => optionList.add(new Option(option.accountnumber, option.id)))
    select.addEventListener('change', displaySelectedAccount);
  }
  catch (error) {
    hideSpinner();
    console.log(`Failed to retrieve user informations: ${error}`);
  }
}

const getAccountDetails = accountId => account.find(({ id }) => id == accountId);
const displaySelectedAccount = ({ target }) => {
  let accountType = document.getElementById('accountType');
  let accountEmail = document.getElementById('accountEmail');
  let accountBalance = document.getElementById('accountBalance');
  let accountStatus = document.getElementById('accountStatus');
  const account = getAccountDetails(target.value);
  const { email, balance, status, type } = account;
  accountType.innerHTML = `<h4 class="profile-design">
                Type of Account: ${type}
              </h4 >`;
  accountEmail.innerHTML = `<h4 class="profile-design">
                Account Email: ${email}
              </h4 >`;
  accountBalance.innerHTML = `<h4 class="profile-design">
                Balance: ${balance}
              </h4 >`;
  accountStatus.innerHTML = status === "active" ? `<h3 class="badge-success">${status}</h3>` : `<h3 class="badge-danger">${status}</h3>`;
return;
}

const openModal = (current) => {
  const modal = document.getElementById(current);
  modal.style.display = "block";
};
const closeModal = (current) => {
  const modal = document.getElementById(current);
  modal.style.display = "none";
};
const deleteBtn = () => {
  window.location.href = "accounts.html";
};
const activateBtn = () => {
  window.location.href = "accounts.html";
};
const deactivateBtn = () => {
  window.location.href = "accounts.html";
};

 const createAccount = async (e) =>{
  e.preventDefault();
   const openingbalance = document.getElementById("openingbalance").value;
   const type = document.getElementById("usertype").value;  
   const content = document.getElementById("login-respond");
   const url = "https://banka-nenny.herokuapp.com/api/v1/accounts"
   const payload = JSON.stringify({ openingbalance, type});
   const user = JSON.parse(localStorage.getItem("user"));
   const token = user.token;
   const myHeaders = new Headers();
   myHeaders.append('Content-Type', 'application/json');
   myHeaders.append('Authorization', token);
   try {
     const response = await fetch(url,
       {
         method: 'POST',
         body: payload,
         mode: "cors",
         cache: "no-cache",
         headers: myHeaders,
       });
     if (!response.ok) {
       const {message} = await response.json()
       content.style.display = 'block';
       content.innerHTML = `<h4 style="background: rgb(231, 37, 37)">${message.messag}</h4>`;
       return;
     }

     const {data, message} = await response.json();
     content.style.display = 'block';
     content.innerHTML = `<h4 style="color:black">${message}, here is your 
                      ${data.type} account number ${data.accountnumber}</h4>`;
                      
   } catch (error) {
     content.innerText = `Failed to retrieve user informations: ${error}`;
   }

   return false;
 };
