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
const bintexture2 = "bin/cmptexture";

let udah = false;

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const folderStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join("public", "temp"));
  },
  filename: function (req, file, cb) {
    cb(null, "dataset");
  }
});

const imageStorage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, path.join("public", "images", "test"));
  },
  filename: function(req, file, cb){
    cb(null, file.originalname);
  }
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/upload/folder', multer({ storage: folderStorage }).single("zipFile"), async (req, res, next) => {
  // if there are no folder uploaded
  if (!req.file) return res.status(400).send('No folder uploaded.');
  const startTime = Date.now();
  udah = true;

  const zipFilePath = req.file.path;
  const extractionPath = path.join("..", "client", "public", "dataset");

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
  await Promise.all([
    execFileAsync(bincolor1),
    execFileAsync(bintexture1)
  ]);
  const endTime = Date.now();
  const executionTime = endTime - startTime;
  res.json({ executionTime: executionTime });
});

router.post('/upload/url', async (req, res, next) => {
  const startTime = Date.now();
  udah = true;
  const extractionPath = "./../client/public/dataset/";

  // delete the previous dataset images
  const filesInExtractionPath = await fs.promises.readdir(extractionPath);
  await Promise.all(filesInExtractionPath.map(async (file) => {
    const filePath = path.join(extractionPath, file);
    await fs.promises.unlink(filePath);
  }));

  // run python file
  const urlPath = req.body.urlPath;
  const numOfThread = "6";
  const webScrapper = "webscaper.py";
  const execArgs = [webScrapper, urlPath, extractionPath, numOfThread];
  await execFileAsync("python", execArgs);

  // run c++ bin
  await Promise.all([
    execFileAsync(bincolor1),
    execFileAsync(bintexture1)
  ]);

  const endTime = Date.now();
  const executionTime = endTime - startTime;
  res.json({executionTime: executionTime});
});

router.post('/upload/color', multer({ storage: imageStorage }).single("image"), async(req, res, next) => {
  if (!req.file) return res.status(500).send("No folder uploaded.");
  if (!udah) return res.status(400).send("TOLOL");
  const imagePath = req.file.path;
  const startTime = Date.now();
  await execFileAsync(bincolor2);
  const data = fs.readFileSync('colorresult.json', 'utf-8');
  const jsonData = JSON.parse(data);
  await fs.promises.unlink(imagePath);
  const endTime = Date.now();
  const executionTime = endTime - startTime;
  res.json(jsonData);
});

router.post('/upload/texture', multer({ storage: imageStorage}).single("image"), async(req, res, next) => {
  if (!req.file) return res.status(500).send("Gak ada bebi!");
  if (!udah) return res.status(400).send("TOLOL");
  const imagePath = req.file.path;
  const startTime = Date.now();
  await execFileAsync(bintexture2);
  const data = fs.readFileSync('textureresult.json', 'utf-8');
  const jsonData = JSON.parse(data);
  await fs.promises.unlink(imagePath);
  const endTime = Date.now();
  const executionTime = endTime - startTime;
  res.json(jsonData);
});

module.exports = router;
