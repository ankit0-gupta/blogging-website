const express = require('express');
const path = require('path');
const fileupload = require('express-fileupload');

let initial_path = path.join(__dirname, "public");

const app = express();
app.use(express.static(initial_path));
app.use(fileupload());

app.get('/', (_req, res) => {
    res.sendFile(path.join(initial_path, "index.html"));
})

app.get('/editor', (_req, res) => {
    res.sendFile(path.join(initial_path, "editor.html"));
})

// upload link
app.post('/upload', (req, res) => {
    let file = req.files.image;
    let date = new Date();
    // image name
    let imagename = date.getDate() + date.getTime() + file.name;
    // image upload path
    let path = 'uploads/' + imagename;

    // create upload
    file.mv(path, (err, _result) => {
        if (err) {
            throw err;
        } else {
            // our image upload path
            res.json(`uploads/${imagename}`)
        }
    })
})

// app.get("/admin", (_req, res) => {
//     res.sendFile(path.join(initial_path, "dashboard.html"));
// })

app.get("/:blog", (_req, res) => {
    res.sendFile(path.join(initial_path, "blog.html"));
})

app.use((_req, res) => {
    res.json("404");
})

app.listen("3000", () => {
    console.log('listening......');
})