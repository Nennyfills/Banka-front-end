const openModal = (current) => {
    const modal = document.getElementById(current);
    // let btn = document.getElementById('btn').value;
    modal.style.display = "block";
    // console.log(btn);
};
const closeModal = (current) => {
    const modal = document.getElementById(current);
    modal.style.display = "none";
};
const deleteBtn = () => {
    let btn = document.getElementById('btn').value;
    // btn.forEach(f=>console.log(t.accountnumber))
    console.log(btn);
    // window.location.href = "accounts.html";
};
const activateBtn = () => {
    window.location.href = "accounts.html";
};
const deactivateBtn = () => {
    window.location.href = "accounts.html";
};
const accounts = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    let information = document.getElementById('information');
    let table = document.getElementById('table');
    const url = "https://banka-nenny.herokuapp.com/api/v1/accounts";
    const token = user.token;
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', token);
    try {
        const response = await fetch(url,
            {
                method: 'GET',
                mode: "cors",
                cache: "no-cache",
                headers: myHeaders,
            });
        if (!response.ok) {
            const json = await response.json()
            return information.innerHTML = `<h3 class="profile-design info" style="width:50%; margin:2rem auto;">${json.message}.</h3>`;
        }
        const json = await response.json();
        const data = json.data;
        const accountBody = `
    <table class="table-content" id="insertRow">
        <thead class="accounts">
          <tr class="account-tr">
            <th class="account-th">
              ID
            </th>
            <th class="account-th">Owner ID</th>
            <th class="account-th">Account Number</th>
            <th class="account-th">Email</th>
            <th class="account-th">Balance</th>
            <th class="account-th">Type</th>
            <th class="account-th">Status</th>
            <th class="account-th">Date</th>
            <th class="account-th">Delete Accounts</th>
            <th class="account-th"> activate or deactivate Accounts</th>
          </tr>
        </thead>
    <tbody class="accounts-tbody">
    ${data.map((value) => `
          <tr class="account-tr">
            <td class="account-td">${value.id}</td>
            <td class="account-td">${value.ownerid}</td>
            <td class="account-td">${value.accountnumber}</td>
            <td class="account-td">${value.email}</td>
            <td class="account-td">${value.balance}</td>
            <td class="account-td">${value.type}</td>
            <td class="account-td">${value.status}</td>
            <td class="account-td">${value.createdat}</td>
            <td class="account-td"><button type="button" class="primary-btn delete-btn" id="btn" onclick="deleteAccount(${value.accountnumber})">
                Delete
            </button></td>
            <td class="account-td"><button type="button" class="primary-btn delete-btn" id="btn" onclick="toggleStatus(${value.accountnumber})">
            ${value.status === "active" ? "Deactivate" : "Activate"}
            </button></td>
      </tr>`).join('')}
          <tbody>
          </table>`;
        table.innerHTML = accountBody;
        if (json.data.length === 0) {
            return information.innerHTML = `<h3 class="profile-design info" style="width:50%; margin:2rem auto;">${json.message},
                                       you have no transaction on this account.</h3>`;
        }
    } catch (error) {
        information.innerText = `Failed to retrieve user informations: ${error}`;
    }
}

const searchByDate = async () =>{
    const user = JSON.parse(localStorage.getItem("user"));
    let startDate = document.getElementById('transactionSearch');
    let endDate = document.getElementById('transactionSearchTwo');
    let information = document.getElementById('information');
    console.log(startDate, endDate);
    let table = document.getElementById('table');
    const url = `https://banka-nenny.herokuapp.com/api/v1/accounts?${startDate}&${endDate}`;
    const token = user.token;
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', token);
    try {
        const response = await fetch(url,
            {
                method: 'GET',
                mode: "cors",
                cache: "no-cache",
                headers: myHeaders,
            });
        if (!response.ok) {
            const json = await response.json()
            return information.innerHTML = `<h3 class="profile-design info" style="width:50%; margin:2rem auto;">${json.message}.</h3>`;
        }
        const json = await response.json();
        const data = json.data;
        const accountBody = `
    <table class="table-content" id="insertRow">
        <thead class="accounts">
          <tr class="account-tr">
            <th class="account-th">
              ID
            </th>
            <th class="account-th">Owner ID</th>
            <th class="account-th">Account Number</th>
            <th class="account-th">Email</th>
            <th class="account-th">Balance</th>
            <th class="account-th">Type</th>
            <th class="account-th">Status</th>
            <th class="account-th">Date</th>
            <th class="account-th">Delete Accounts</th>
            <th class="account-th"> activate or deactivate Accounts</th>
          </tr>
        </thead>
    <tbody class="accounts-tbody">
    ${data.map((value) => `
          <tr class="account-tr">
            <td class="account-td">${value.id}</td>
            <td class="account-td">${value.ownerid}</td>
            <td class="account-td">${value.accountnumber}</td>
            <td class="account-td">${value.email}</td>
            <td class="account-td">${value.balance}</td>
            <td class="account-td">${value.type}</td>
            <td class="account-td">${value.status}</td>
            <td class="account-td">${value.createdat}</td>
            <td class="account-td"><button type="button" class="primary-btn delete-btn" id="btn" onclick="deleteAccount(${value.accountnumber})">
                Delete
            </button></td>
            <td class="account-td"><button type="button" class="primary-btn delete-btn" id="btn" onclick="toggleStatus(${value.accountnumber})">
            ${value.status === "active" ? "Deactivate" : "Activate"}
            </button></td>
      </tr>`).join('')}
          <tbody>
          </table>`;
        table.innerHTML = accountBody;
        if (json.data.length === 0) {
            return information.innerHTML = `<h3 class="profile-design info" style="width:50%; margin:2rem auto;">${json.message},
                                       you have no transaction on this account.</h3>`;
        }
    } catch (error) {
        information.innerText = `Failed to retrieve user informations: ${error}`;
    }
}

const deleteAccount = async(accountnumber) =>{
    console.log(accountnumber);
    const user = JSON.parse(localStorage.getItem("user"));
    let information = document.getElementById('information');
    const url = `https://banka-nenny.herokuapp.com/api/v1/accounts/${accountnumber}`;
    const token = user.token;
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', token);
    try {
        const response = await fetch(url,
            {
                method: 'DELETE',
                mode: "cors",
                cache: "no-cache",
                headers: myHeaders,
            });
        if (!response.ok) {
            const json = await response.json()
            return information.innerHTML = `<h3 class="profile-design info" style="width:50%; margin:2rem auto;">${json.message}.</h3>`;
        }
        const json = await response.json();
        console.log(json.message);
        information.innerHTML = `<h3 class="profile-design info" style="width:60%; backgroung:red; margin:2rem auto;">${json.message}.</h3>`;
        return window.location.href = "accounts.html";
    } catch (error) {
        content.innerHTML = `<h3 class="profile-design info" style = " color:black; width:60%; margin:2rem auto;" >Failed to retrieve user informations:(${error})</h3>`;
    }

    return false;
}
const toggleStatus = async (accountnumber) => {
    console.log(accountnumber);
    const user = JSON.parse(localStorage.getItem("user"));
    let information = document.getElementById('information');
    const url = `https://banka-nenny.herokuapp.com/api/v1/${accountnumber}`;
    const token = user.token;
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', token);
    try {
        const response = await fetch(url,
            {
                method: 'PATCH',
                mode: "cors",
                cache: "no-cache",
                headers: myHeaders,
            });
        if (!response.ok) {
            const json = await response.json()
            if (json.message === "Forbidden") { return information.innerHTML = `<h3 class="profile-design info" style="width:50%; margin:2rem auto;">Sorry this activity can only be done by an admin.</h3>`;}
            return information.innerHTML = `<h3 class="profile-design info" style="width:50%; margin:2rem auto;">${json.message}.</h3>`;
        }
        const json = await response.json();
        console.log(json.message);
        information.innerHTML = `<h3 class="profile-design info" style="width:60%; backgroung:red; margin:2rem auto;">${json.message}.</h3>`;
       return window.location.href = "accounts.html";
    } catch (error) {
        content.innerHTML = `<h3 class="profile-design info" style = " color:black; width:60%; margin:2rem auto;" >Failed to retrieve user informations:(${error})</h3>`;
    }

    return false;
}
const numsOfAccounts = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    let savings = document.getElementById('SavingsAccounts');
    let current = document.getElementById('currentAccounts');
    let active = document.getElementById('actvatedAccounts');
    let dormant = document.getElementById('deactvatedAccounts');
    let information = document.getElementById('information');
    const url = "https://banka-nenny.herokuapp.com/api/v1/accounts";
    const token = user.token;
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', token);
    try {
        const response = await fetch(url,
            {
                method: 'GET',
                mode: "cors",
                cache: "no-cache",
                headers: myHeaders,
            });
        if (!response.ok) {
            const json = await response.json()
            return information.innerHTML = `<h3 class="profile-design info" style="width:50%; margin:2rem auto;">${json.message}.</h3>`;
        }
        const json = await response.json();
        const data = json.data;
        const numsOfSavings = data.filter(val => {
            return val.type === "savings";
        });
        savings.innerText = numsOfSavings.length;
        const numsOfCurrent = data.filter(val =>{
           return val.type === "current";
        });
        current.innerText = numsOfCurrent.length;
        const numsOfActive = data.filter(val => {
            return val.status === "active";
        });
        active.innerText = numsOfActive.length;
        const numsOfDormant = data.filter(val => {
            return val.status === "dormant";
        });
        dormant.innerText = numsOfDormant.length;
    } catch (error) {
        information.innerText = `Failed to retrieve user informations: ${error}`;
    }
}

const createStaff = async (e) => {
    e.preventDefault();
    const firstname = document.getElementById("firstname").value;
    const surname = document.getElementById("surname").value;
    const email = document.getElementById("userEmail").value;
    const phonenumber = document.getElementById("phoneNumber").value;
    const password = document.getElementById("password").value;
    const confirm_password = document.getElementById("confirm-password").value;
    const content = document.getElementById("respond");
    const url = "https://banka-nenny.herokuapp.com/api/v1/auth/portal"
    const payload = JSON.stringify({ firstname, surname, email, phonenumber, password, type: "STAFF" })
    const token = user.token;
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', token);
    try {
        if (password !== confirm_password) {
            content.style.display = 'block';
            content.innerHTML = `<h3 class="profile-design info" style=" background:red; width:80%; margin:2rem auto;">password does not match confirm password</h3>`;
            return;
        }
        const response = await fetch(url,
            {
                method: 'POST',
                body: payload,
                mode: "cors",
                cache: "no-cache",
                headers:myHeaders
            });
        if (!response.ok) {
            const json = await response.json()
            content.innerHTML = `<h3 class="profile-design info" style = " background:red; width:80%; margin:2rem auto;" >${json.message}</h3>`;
            return;
        }
        const { message } = await response.json();
        content.innerHTML = `<h3 class="profile-design info" style = " background:white; color:black; width:80%; margin:2rem auto;" >Staff ${message}</h3>`;
    } catch (error) {
        content.innerHTML = `<h3 class="profile-design info" style = " background:red; width:80%; margin:2rem auto;" >Failed to retrieve user informations:(${error})</h3>`;
    }

    return false;
};

const createAdmin = async (e) => {
    e.preventDefault();
    const firstname = document.getElementById("firstname").value;
    const surname = document.getElementById("surname").value;
    const email = document.getElementById("userEmail").value;
    const phonenumber = document.getElementById("phoneNumber").value;
    const password = document.getElementById("password").value;
    const confirm_password = document.getElementById("confirm-password").value;
    const content = document.getElementById("respond");
    const url = "https://banka-nenny.herokuapp.com/api/v1/auth/portal"
    const payload = JSON.stringify({ firstname, surname, email, phonenumber, password, type: "ADMIN" })
    const token = user.token;
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', token);
    try {
        if (password !== confirm_password) {
            content.style.display = 'block';
            content.innerHTML = `<h3 class="profile-design info" style=" background:red; width:80%; margin:2rem auto;">password does not match confirm password</h3>`;
            return;
        }
        const response = await fetch(url,
            {
                method: 'POST',
                body: payload,
                mode: "cors",
                cache: "no-cache",
                headers: myHeaders
            });
        if (!response.ok) {
            const json = await response.json()
            content.innerHTML = `<h3 class="profile-design info" style = " background:red; width:80%; margin:2rem auto;" >${json.message}</h3>`;
            return;
        }
        const { message } = await response.json();
        content.innerHTML = `<h3 class="profile-design info" style = " background:white; color:black; width:80%; margin:2rem auto;" >Admin ${message}<h3>`;
    } catch (error) {
        content.innerHTML = `<h3 class="profile-design info" style = " background:red; width:80%; margin:2rem auto;" >Failed to retrieve user informations:(${error})</h3>`;
    }

    return false;
};
const debitAccount = async (e) => {
    e.preventDefault();
    const accountnumber = document.getElementById("accountnumber").value;
    const amount = document.getElementById("amount").value;
    const content = document.getElementById("respond");
    const url = `https://banka-nenny.herokuapp.com/api/v1/transactions/${accountnumber}/debit`
    const payload = JSON.stringify({ amount })
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
                headers: myHeaders
            });
        if (!response.ok) {
            const json = await response.json()
            content.innerHTML = `<h3 class="profile-design info" style = " background:red; width:60%; margin:2rem auto;" >${json.message}</h3>`;
            return;
        }
        const { message } = await response.json();
        content.innerHTML = `<h3 class="profile-design info" style = " background:white; color:black; width:60%; margin:2rem auto;" >${message}<h3>`;
    } catch (error) {
        content.innerHTML = `<h3 class="profile-design info" style = " background:red; width:60%; margin:2rem auto;" >Failed to retrieve user informations:(${error})</h3>`;
    }

    return false;
};

const creditAccount = async (e) => {
    e.preventDefault();
    const accountnumber = document.getElementById("accountnumber").value;
    const amount = document.getElementById("amount").value;
    const depositor = document.getElementById("depositor").value;
    const content = document.getElementById("respond");
    const url = `https://banka-nenny.herokuapp.com/api/v1/transactions/${accountnumber}/credit`
    const payload = JSON.stringify({ amount, depositor})    
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
                headers: myHeaders
            });
        if (!response.ok) {
            const json = await response.json()
            content.innerHTML = `<h3 class="profile-design info" style = " background:red; width:60%; margin:2rem auto;" >${json.message}</h3>`;
            return;
        }
        const { message } = await response.json();
        content.innerHTML = `<h3 class="profile-design info" style = " background:white; color:black; width:60%; margin:2rem auto;" >${message}<h3>`;
    } catch (error) {
        content.innerHTML = `<h3 class="profile-design info" style = " background:red; width:60%; margin:2rem auto;" >Failed to retrieve user informations:(${error})</h3>`;
    }

    return false;
};
const viewAccount = async ()=>{

}