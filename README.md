# Email Gönderme Uygulaması

Bu proje, Node.js ve Express kullanılarak oluşturulmuş bir email gönderme uygulamasıdır. Kullanıcıların web formu aracılığıyla email göndermelerine olanak tanır.

## Özellikler

- Email gönderme işlevselliği.
- EJS görünüm motoru ile dinamik sayfa render edilmesi.
- Dosya yüklemeleri için Multer kullanımı.
- Nodemailer ile SMTP üzerinden email gönderimi.
- Front-end'de JavaScript ve SweetAlert2 ile form doğrulama.
- Karanlık mod desteği.

## Kurulum

Bu projeyi kendi bilgisayarınızda çalıştırmak için aşağıdaki adımları izleyin:

1. Projeyi klonlayın:

    ```bash
    git clone https://github.com/canhepoglu/ExpressMailer
    cd youremailapp
    ```

2. Gerekli paketleri yükleyin:

      ## Gerekli Paketlerin Kurulumu
      
      Bu projeyi çalıştırmak için aşağıdaki Node.js paketlerinin yüklenmesi gerekmektedir. Projeyi klonladıktan sonra, aşağıdaki komutları terminalinizde çalıştırarak bu paketleri yükleyebilirsiniz:
      
      1. **Express**: Web sunucusu işlevselliği için.
      
          ```bash
          npm install express
          ```
      
      2. **Helmet**: Güvenlik önlemleri için.
      
          ```bash
          npm install helmet
          ```
      
      3. **CORS**: Cross-Origin Resource Sharing (Kaynaklar Arası Paylaşım) için.
      
          ```bash
          npm install cors
          ```
      
      4. **Multer**: Dosya yükleme işlevselliği için.
      
          ```bash
          npm install multer
          ```
      
      5. **Nodemailer**: E-posta gönderme işlevselliği için.
      
          ```bash
          npm install nodemailer
          ```
      
      6. **EJS**: Şablon motoru olarak.
      
          ```bash
          npm install ejs
          ```
      
      7. **Dotenv**: Ortam değişkenlerini yönetmek için.
      
          ```bash
          npm install dotenv
          ```
      
      Bu komutlar, `package.json` dosyanızda belirtilen tüm bağımlılıkları yükleyecektir. Alternatif olarak, tüm bağımlılıkları tek bir komutla yüklemek için:
      
      ```bash
      npm install


3. `.env` dosyasını oluşturun ve gerekli ayarları yapın:

    ```
    OUTLOOK_USER=your_email@example.com
    OUTLOOK_PASS=your_password
    PORT=3000
    ```

4. Uygulamayı başlatın:

    ```bash
    npm start
    ```

    Uygulama, `http://localhost:3000` adresinde çalışacaktır.

## Kullanım

Uygulamayı açtıktan sonra, ana sayfada bulunan formu doldurarak email gönderimi yapabilirsiniz.

- `Alıcı Email`: Gönderilecek emailin alıcısını girin.
- `Konu`: Email konusunu girin.
- `Mesaj`: Gönderilecek mesajı yazın.
- `Ekler`: Göndermek istediğiniz dosyaları ekleyin.
