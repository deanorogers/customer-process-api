const express = require('express');
const https = require('http');

const app = express();

app.get('/health', (req, res) => {

    console.log ('Entering app GET /health ...');
    let result = '{"message":"Health OK"}';
    res.send(result);
});

app.get('/', (req, res) => {

    console.log ('Entering app GET ...');
    let result = '{"message":"Not yet implemented"}';

    // comment this line when not testing
    // res.send("Just not yet implemented!\n")

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

/*
    get("http://account-sapi.default-subdomain.default.svc.cluster.local:80/customer/1009/accounts", function (data) {
        console.log ('Setting data [' + data + ']');
        result = data;
        res.send(data);
    });
*/

    get("http://account-sapi-nodeport:80/customer/1009/accounts", function (data) {
        console.log ('Setting data using Service Name [' + data + ']');
        result = data;
        res.send(data);
    });

})

app.listen(8080);
module.exports.getApp = app;




