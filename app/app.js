const express = require('express');
const https = require('http');

const app = express();

app.get('/', (req, res) => {

    console.log ('Entering app GET ...');
    let result = '{"title":"No books available","author":"Nobody"}';

    // comment this line when not testing
    res.send("No customers have been obtained yet.\n")

    function get(url, callback) {

        https.get(url, function (result) {
                var dataQueue = "";
                result.on("data", function (dataBuffer) {
                    dataQueue += dataBuffer;
                });
                result.on("end", function () {
                    callback(dataQueue);
                });
        });
    } // function
    req.on('error', (err) => {
       console.error(`Encountered an error trying to make a request: ${err.message}`);
    });

    get("http://10.98.162.188:80/books", function (data) {
        console.log ('Setting data [' + data + ']');
        result = data;
        res.send(data);
    });

    // res.send(result);

})

app.listen(8080);
module.exports.getApp = app;




