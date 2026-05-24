const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// FILE PATH FIX
const filePath = path.join(__dirname, "data.json");

// READ DATA
function readData() {
    try {
        const data = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(data);
    } catch (err) {
        console.log("Read Error:", err);
        return [];
    }
}

// WRITE DATA
function writeData(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// ADD
app.post("/add", (req, res) => {
    let data = readData();
    data.push(req.body);
    writeData(data);
    res.send({ message: "Added" });
});

// GET
app.get("/patients", (req, res) => {
    res.json(readData());
});

// DELETE
app.delete("/delete/:index", (req, res) => {
    let data = readData();
    data.splice(req.params.index, 1);
    writeData(data);
    res.send({ message: "Deleted" });
});

// UPDATE
app.put("/update/:index", (req, res) => {
    let data = readData();
    data[req.params.index] = req.body;
    writeData(data);
    res.send({ message: "Updated" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

