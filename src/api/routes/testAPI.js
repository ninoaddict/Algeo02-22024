var express = require("express");
var router = express.Router();
const { execFile} = require('child_process');
const {stderr, stdout} = require('process');
const util = require('util');
const execFileAsync = util.promisify(require('child_process').execFile);
const fs = require('fs').promises; 
const v8 = require('v8');

const bin1 = "bin/color.exe";
const bin2  = "bin/cmpcolor.exe";

router.get("/", async function(req, res, next) {
    const startTime = Date.now();
    await execFileAsync(bin1);
    const {stdout: stdout2, stderr: stderr2} = await execFileAsync(bin2);
    const data = await fs.readFile('result.json', 'utf-8');
    const jsonData = JSON.parse(data);
    const endTime = Date.now();
    const executionTime = endTime - startTime;
    res.json({img : jsonData, dataNum : jsonData.length, time: executionTime});
});

module.exports = router;