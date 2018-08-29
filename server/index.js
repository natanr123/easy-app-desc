/* eslint consistent-return:0 */

const multer = require('multer');

const express = require('express');
const logger = require('./util//logger');

const argv = require('./util/argv');
const port = require('./util//port');
const setup = require('./middlewares/frontendMiddleware');
const { resolve } = require('path');
const sharp = require('sharp');

const app = express();


const storage = multer.diskStorage({
  destination: './temp',
  filename(req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});


const upload = multer({ storage });

const userUploadsFolder = 'user_uploads';
app.use(`/${userUploadsFolder}`, express.static(`${userUploadsFolder}`));

app.post('/uploads', upload.single('file'), (req, res) => {


  const file = req.file;
  const path = file.path;
  const filename = file.filename;
  console.log(`received file: ${filename}`);
  const outputFilename = `hi_res_icon_512x512_${filename}`;
  const outputPath = `./${userUploadsFolder}/${outputFilename}`;
  sharp(`./${path}`)
    .resize(512,512).png().toFile(outputPath)
    .then((data) => {
      console.log(data);
      const output = {convertedImage: `/${userUploadsFolder}/${outputFilename}` };
      res.send(output);
    });

});
// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// Start your app.
app.listen(port, host, (err) => {
  if (err) {
    return logger.error(err.message);
  }
  logger.appStarted(port, prettyHost);
});
