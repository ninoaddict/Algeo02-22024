var express = require('express');
const { start } = require('repl');
var router = express.Router();
const util = require('util');
const execFileAsync = util.promisify(require('child_process').execFile);
const { execFile} = require('child_process');
const fsp = require('fs').promises;
const fs = require('fs');
const multer = require('multer');
const path = require('path');
// const JSZip = require('jszip');
const AdmZip = require('adm-zip');
const { error } = require('console');
const { stdout, stderr } = require('process');

const bincolor1 = "bin/color.exe";
const bincolor2 = "bin/cmpcolor.exe";
const bintexture1 = "bin/texture.exe";

let udah = false;

const folderStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join("public", "temp"));
  },
  filename: function (req, file, cb) {
    cb(null, "dataset");
  }
})

const imageStorage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, path.join("public", "images", "test"));
  },
  filename: function(req, file, cb){
    cb(null, file.originalname);
  }
})

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/upload/folder', multer({ storage: folderStorage }).single("zipFile"), async (req, res, next) => {
  // if there are no folder uploaded
  if (!req.file) return res.status(400).send('No folder uploaded.');
  udah = true;

  const zipFilePath = req.file.path;
  const extractionPath = path.join("public", "images", "dataset");

  // delete the content of the previous dataset
  const filesInExtractionPath = await fs.promises.readdir(extractionPath);
  await Promise.all(filesInExtractionPath.map(async (file) => {
    const filePath = path.join(extractionPath, file);
    await fs.promises.unlink(filePath);
  }));

  try {
    const zip = new AdmZip(zipFilePath);
    zip.extractAllTo(extractionPath);
  } catch (error) {
    return res.status(500).send('Tolol');
  }
  await fs.promises.unlink(zipFilePath);
  const startTime = Date.now();
  await execFileAsync(bincolor1);
  // await execFileAsync(bintexture1);
  const endTime = Date.now();
  const executionTime = endTime - startTime;
  res.json({ executionTime: executionTime });
});

router.post('/upload/color', multer({ storage: imageStorage }).single("image"), async(req, res, next) => {
  if (!req.file) return res.status(500).send("No folder uploaded.");
  if (!udah) return res.status(400).send("TOLOL");
  const imagePath = req.file.path;
  const startTime = Date.now();
  await execFileAsync(bincolor2);
  const data = fs.readFileSync('result.json', 'utf-8');
  const jsonData = JSON.parse(data);
  await fs.promises.unlink(imagePath);
  const endTime = Date.now();
  const executionTime = endTime - startTime;
  res.json({img: jsonData, dataNum: jsonData.length, time: executionTime});
})

module.exports = router;
