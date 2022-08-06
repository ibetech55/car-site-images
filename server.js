require("dotenv/config");
const express = require("express");
const expressFileUploader = require("express-fileupload")
const { Blob, atob } = require('buffer');
const { exec } = require("node:child_process")
const fs = require("fs");
const path = require("path");
const { Authorization } = require("./Middleware/Authorization");

const app = express();

app.use(express.json())
app.use(expressFileUploader())

app.use(
    "/images",
    express.static(path.join(__dirname, "Images"))
);


app.post('/images', Authorization, (req, res) => {
    const { imageName } = req.body;
    let base64String = req.body.image;
    let base64Image = base64String.split(';base64,').pop();

    fs.writeFile(`Images/${imageName}`, base64Image, { encoding: 'base64' }, function (err) {

        if (err) {
            return res.json({ error: 'Error loading image', statusCode: 400 })
        }
        return res.status(200).json({ message: 'Image Saved', imageName, statusCode: 200 })
    });
})

app.listen(8001, console.log("Connected to image server"))