const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const cors = require('cors');



// Run the app by serving the static files
// in the dist directory

app.use(express.static(__dirname + '/dist'));

// Start the app by listening on the default
// Heroku port
app.use(cors());

app.listen(process.env.PORT || 8080);

const forceSSL = function () {
    return function (req, res, next) {
        if (req.headers['x-forwarded-proto'] !== 'https') {
            return res.redirect(
                ['https://', req.get('Host'), req.url].join('')
            );
        }
        next();
    }
}
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

//app.use(forceSSL());

//upload img into server
var upload = multer({ dest: './uploads/' });

var filename = '';
var originalname = '';
app.post('/upload', upload.single('img'), (req, res, err) => {
    res => {
        const name = req.file.filename;
        const type = req.file.mimetype;
        res.send({ name: req.file.filename, type: type });
    }, (err) => {
        res.sendStatus(400);
    }
})
