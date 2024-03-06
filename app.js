require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const app = express();
const crypto = require('crypto');
const port = 3000;

app.use(helmet());
//app.use(cors()); // CORS için basit yapılandırma (tüm kökenlere izin verir):

app.use(cors({
  origin: 'http://localhost:3000',// Sadece bu kökene izin ver
  methods: 'GET,POST', // Sadece bu HTTP metodlarına izin ver
  allowedHeaders: 'Content-Type,Authorization', // Sadece bu başlıklara izin ver
  credentials: true // Kimlik bilgilerini (örneğin çerezleri) izin ver
}));

app.use(helmet.contentSecurityPolicy({
  directives: {
      "script-src": ["'self'", "https://cdn.ckeditor.com"]
  }
}));

const nonce = crypto.randomBytes(16).toString('base64');
res.locals.nonce = nonce;
app.use(helmet.contentSecurityPolicy({
    directives: {
        "script-src": ["'self'", `'nonce-${nonce}'`]
    }
}));


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['.jpg', '.png', '.pdf', '.docx'];
  const extension = path.extname(file.originalname).toLowerCase();

  if (allowedTypes.includes(extension)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  dest: 'uploads/',
  fileFilter: fileFilter
});

let transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.OUTLOOK_USER,
    pass: process.env.OUTLOOK_PASS
  }
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/sendmail', upload.array('attachments'), (req, res) => {
  const { toEmail, subject, message } = req.body;

  if (!toEmail || !subject || !message) {
    return res.status(400).json({
      status: 'error',
      message: 'Lütfen tüm alanları doldurun.'
    });
  }

  let mailOptions = {
    from: process.env.OUTLOOK_USER,
    to: toEmail,
    subject: subject,
    text: message,
    attachments: req.files.map(file => ({ path: file.path }))
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.json({ status: 'error', message: 'Email gönderimi sırasında bir hata oluştu.' });
      console.error(error);
    } else {
      res.json({ status: 'success', message: 'Email başarıyla gönderildi.' });
      console.log(info);
    }
  });
});

app.listen(port, () => {
  console.log(`Sunucu http://localhost:${port} adresinde çalışıyor`);
});
