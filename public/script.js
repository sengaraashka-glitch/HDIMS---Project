const API = "http://localhost:3000";

let chartInstance = null;

// SHOW AUTH PAGE
function showAuth() {
    document.getElementById("welcomePage").style.display = "none";
    document.getElementById("authPage").style.display = "flex";
}

// SIGNUP
function signup() {
    const username = document.getElementById("signupUsername").value;
    const password = document.getElementById("signupPassword").value;

    if (!username || !password) {
        alert("Please fill all fields");
        return;
    }

    localStorage.setItem("hdimsUser", username);
    localStorage.setItem("hdimsPass", password);

    alert("Signup Successful! Please Login");
}

// LOGIN
function login() {

    const username = document.getElementById("loginUsername").value;

    const password = document.getElementById("loginPassword").value;


    const savedUser = localStorage.getItem("hdimsUser");

    const savedPass = localStorage.getItem("hdimsPass");


    if (username === savedUser && password === savedPass) {

        alert("Login Successful!");

        alert("Welcome to HDIMS");


        document.getElementById("authPage").style.display = "none";

        document.getElementById("mainApp").style.display = "block";


        loadPatients();

    } 
    
    else {

        alert("Invalid Username or Password");

    }
}

// LOGOUT
// LOGOUT
function logout() {

    document.getElementById("mainApp").style.display = "none";

    document.getElementById("logoutPage").style.display = "flex";
}

// ADD PATIENT
function addPatient() {
    const patient = {
        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        disease: document.getElementById("disease").value,
        hospital: document.getElementById("hospital").value,
        district: document.getElementById("district").value,
        state: document.getElementById("state").value,
        scheme: document.getElementById("scheme").value
    };

    fetch(API + "/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(patient)
    })
    .then(() => {
        alert("Data Added Successfully!");
        loadPatients();
    });
}

// LOAD PATIENTS
function loadPatients() {

    const role = document.getElementById("role").value;
    const userHospital = document.getElementById("hospital").value;

    fetch(API + "/patients")
    .then(res => res.json())
    .then(data => {

        let table = document.getElementById("table");

        table.innerHTML = `
        <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Disease</th>
            <th>Hospital</th>
            <th>District</th>
            <th>State</th>
            <th>Scheme</th>
        </tr>
        `;

        let filteredData = [];

        data.forEach((p) => {

            if (role === "admin") {
                filteredData.push(p);
            } else {
                if (p.hospital === userHospital) {
                    filteredData.push(p);
                }
            }
        });

        if (filteredData.length === 0) {
            table.innerHTML += `<tr><td colspan="7">No Records Found</td></tr>`;
        }

        filteredData.forEach((p) => {
            table.innerHTML += `
            <tr>
                <td>${p.name}</td>
                <td>${p.age}</td>
                <td>${p.disease}</td>
                <td>${p.hospital}</td>
                <td>${p.district}</td>
                <td>${p.state}</td>
                <td>${p.scheme}</td>
            </tr>
            `;
        });

        loadChart(filteredData);
    });
}

// DASHBOARD CHART
function loadChart(data) {

    let districtCount = {};

    data.forEach(p => {
        if (p.district) {
            districtCount[p.district] = (districtCount[p.district] || 0) + 1;
        }
    });

    const labels = Object.keys(districtCount);
    const values = Object.values(districtCount);

    const canvas = document.getElementById("chart");

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (chartInstance) {
        chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Patients by District",
                data: values
            }]
        },
        options: {
            responsive: true
        }
    });
}
