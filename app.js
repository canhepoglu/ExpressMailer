const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path'); // Path modülünü dahil edin
const mailRoutes = require('./routes/mailRoutes');
const config = require('./config/env');

const app = express();

// Middleware'leri ayarla
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Statik dosyalar için public klasörünü kullan
app.use(express.static(path.join(__dirname, 'public')));

// EJS görünüm motorunu ayarla
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Anasayfa route'u
app.get('/', (req, res) => {
  res.render('index');
});

// Route'ları kullan
app.use('/', mailRoutes);

// Sunucuyu başlat
app.listen(config.port, () => {
  console.log(`Sunucu http://localhost:${config.port} adresinde çalışıyor`);
});
