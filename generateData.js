const fs = require("fs");

const names = ["Rahul","Amit","Priya","Sneha","Ravi","Anita","Karan","Pooja"];
const diseases = ["Fever","TB","Diabetes","Cold","Malaria"];
const hospitals = ["District Hospital","AIIMS","City Hospital","Gov Hospital"];
const districts = ["Bhopal","Indore","Gwalior","Jabalpur","Ujjain"];
const state = "Madhya Pradesh";
const schemes = ["Vaccination","TB Program","Maternal Health"];

let data = [];

for (let i = 0; i < 200; i++) {
    let patient = {
        name: names[Math.floor(Math.random() * names.length)],
        age: Math.floor(Math.random() * 60) + 1,
        disease: diseases[Math.floor(Math.random() * diseases.length)],
        hospital: hospitals[Math.floor(Math.random() * hospitals.length)],
        district: districts[Math.floor(Math.random() * districts.length)],
        state: state,
        scheme: schemes[Math.floor(Math.random() * schemes.length)]
    };

    data.push(patient);
}

fs.writeFileSync("data.json", JSON.stringify(data, null, 2));

console.log("200 Records Generated Successfully!");

