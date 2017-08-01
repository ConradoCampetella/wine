var express = require('express');
var path = require('path');
var multer = require('multer');
var bodyParser = require('body-parser');
var fs = require('fs');


var app = express();

//app.use(bodyParser.json());

// Run the app by serving the static files
// in the dist directory

app.use(express.static(__dirname + '/dist'));

// Start the app by listening on the default
// Heroku port


var forceSSL = function () {
    return function (req, res, next) {
        if (req.headers['x-forwarded-proto'] !== 'https' && req.url !== '/upload') {
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

app.use(forceSSL());

var upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('img'), function (req, res, next) {
    console.log('originalname: ' + req.file.originalname);
    console.log('type: ' + req.file.mimetype);
    fs.createReadStream('./uploads/' + req.file.filename).pipe(fs.createWriteStream('./dist/assets/img/' + req.file.originalname));
    fs.createReadStream('./uploads/' + req.file.filename).pipe(fs.createWriteStream('./src/assets/img/' + req.file.originalname));
    res.send('success');
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    fs.unlink('./uploads/' + req.file.filename);
});


app.listen(process.env.PORT || 8080);