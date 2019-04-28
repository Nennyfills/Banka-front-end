const previewImage = (e) => {
  uploadFile(e.files[0]);
};


const cloudName = "dlbwtma20";
const unsignedUploadPreset = "ylmhasme";

const fileSelect = document.getElementById("fileSelect");
// const fileElem = document.getElementById("fileElem");

// fileSelect.addEventListener("click", (e) => {
//   if (fileElem) {
//     fileElem.click();
//   }
//   e.preventDefault(); // prevent navigation to "#"
// }, false);


// *********** Upload file to Cloudinary ******************** //
function uploadFile(file) {
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload/`;
  const fd = new FormData();

  fd.append("upload_preset", unsignedUploadPreset);
  fd.append("tags", "browser_upload"); // Optional - add tag for image admin in Cloudinary
  fd.append("file", file);
  fd.append("public_id", "vvv");
  // fd.append("public_id", "user_id");


  fetch(url, {
    method: "POST",
    body: fd,
  })
    .then(res => res.text())
    .then((text) => {
      const response = JSON.parse(text);
      const url_s = response.secure_url;
      const tokens = url_s.split("/");
      tokens.splice(-2, 0, "w_150,c_scale");
      const img = document.getElementById("image");

      img.src = tokens.join("/");
      img.alt = response.public_id;
    });
}

// const uploadToServer = (avatarUrl) => {
//   fetch('v1/uploadProfile',
//     {
//       method: "POST",
//       body: {
//         photo: avatarUrl,
//       }
//     })

//   )
// }

// ///////////////////////////////////////////////////////

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
// eslint-disable-next-line no-unused-vars
const deactivateBtn = () => {
  window.location.href = "accounts.html";
};

document.onreadystatechange = () => {
  // eslint-disable-next-line no-empty
  if (document.readyState !== "complete") {
    return;
  }
  const img = document.getElementById("image");
  //https://res.cloudinary.com/${cloudName}/image/upload/${url}/{userId}.jpg`
  const url = `https://res.cloudinary.com/${cloudName}/image/upload/${url}/nenny1_ewjwmw.jpg`;
  img.src = url;
};

const dashboard = document.getElementById("side_dashboard").addEventListener("click", (e) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user.permission === "admin".toUpperCase()) {
    window.location.href = "dashboard-admin.html";
  } else if (user.permission === "staff".toUpperCase()) {
    window.location.href = "dashboard-staff.html";
  } else if (user.permission === "user".toUpperCase()) {
    window.location.href = "dashboard-user.html";
  }
});
const user = JSON.parse(localStorage.getItem("user"));
document.getElementById("username").innerHTML = user.name;
