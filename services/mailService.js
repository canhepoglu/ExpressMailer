const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const config = require('../config/env');

const emailTemplatePath = path.join(__dirname, '..', 'views', 'emailTemplate.ejs');

// Mail gönderme işlevi
const sendMail = (toEmail, subject, message, attachments) => {
    // E-posta şablonunu yükle
    ejs.renderFile(emailTemplatePath, { subject: subject, message: message }, (err, data) => {
        if (err) {
            console.error('E-posta şablonu yüklenirken bir hata oluştu:', err);
            return;
        }

        // E-posta gönderme seçenekleri
        const mailOptions = {
            from: config.outlookUser,
            to: toEmail,
            subject: subject,
            html: data, // Şablonu HTML olarak ekle
            attachments: attachments // Ek dosyaları ekle
        };

        // E-posta gönderme işlemi
        let transporter = nodemailer.createTransport({
            host: 'smtp.office365.com',
            port: 587,
            secure: false,
            auth: {
                user: config.outlookUser,
                pass: config.outlookPass
            }
        });

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('E-posta gönderilirken bir hata oluştu:', error);
            } else {
                console.log('E-posta başarıyla gönderildi:', info.response);
            }
        });
    });
};

module.exports = { sendMail };
