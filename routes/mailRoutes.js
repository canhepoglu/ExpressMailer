const express = require('express');
const multer = require('multer');
const mailService = require('../services/mailService');
const path = require('path');
const router = express.Router();

// Dosya yükleme ayarları
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/'); // Dosyaların yükleneceği klasörü belirtin
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Dosya adını belirleyin
    }
});

// Dosya filtresi
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Desteklenmeyen dosya türü'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

router.post('/sendmail', upload.single('attachments'), async (req, res) => {
    const { toEmail, subject, message } = req.body;

    if (!toEmail || !subject || !message) {
        return res.status(400).json({
            status: 'error',
            message: 'Lütfen tüm alanları doldurun.'
        });
    }

    try {
        // Dosya varsa ve mail adresi, konu ve mesaj alanları doluysa, mail servisine gönder
        const attachments = req.file ? [{ filename: req.file.filename, path: req.file.path }] : []; // Dosya varsa ekler dizisine ekle
        await mailService.sendMail(toEmail, subject, message, attachments);
        res.json({ status: 'success', message: 'Email başarıyla gönderildi.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Email gönderimi sırasında bir hata oluştu.' });
    }
});

module.exports = router;
