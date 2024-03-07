document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();

    var toEmail = document.getElementById('toEmail').value;
    var subject = document.getElementById('subject').value;
    var message = document.getElementById('message').value;
    var attachments = document.getElementById('attachments').files;
    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.pdf|\.docx)$/i;

    // Ön uç (front-end) doğrulama
    if (!toEmail || !subject || !message) {
        Swal.fire({
            title: 'Hata!',
            text: 'Lütfen tüm alanları doldurun.',
            icon: 'error'
        });
        return;
    }

    for (let i = 0; i < attachments.length; i++) {
        if (!allowedExtensions.exec(attachments[i].name)) {
            Swal.fire({
                title: 'Hata!',
                text: 'Yalnızca JPG, PNG, PDF ve DOCX dosyalarına izin verilir.',
                icon: 'error'
            });
            return;
        }
    }

    var formData = new FormData(this);

    fetch('/sendmail', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                Swal.fire({
                    title: 'Başarılı!',
                    text: data.message,
                    icon: 'success'
                }).then((result) => {
                    if (result.value) {
                        window.location.reload();
                    }
                });
            } else {
                Swal.fire({
                    title: 'Hata!',
                    text: data.message,
                    icon: 'error'
                });
            }
        })
        .catch(error => {
            Swal.fire({
                title: 'Hata!',
                text: 'Bir hata oluştu',
                icon: 'error'
            });
        });
});

document.addEventListener('DOMContentLoaded', function () {
    const toggleDarkModeCheckbox = document.getElementById('toggleDarkMode');
    const bodyElement = document.body;

    toggleDarkModeCheckbox.addEventListener('change', function () {
        bodyElement.classList.toggle('dark-mode');
        const darkModeEnabled = bodyElement.classList.contains('dark-mode');

        // Dark mode açık veya kapalıysa, localStorage'a kaydedin
        localStorage.setItem('darkMode', darkModeEnabled);
    });

    // Sayfa yüklendiğinde, dark mode durumunu kontrol edin ve uygulayın
    const darkModeEnabled = localStorage.getItem('darkMode') === 'true';

    if (darkModeEnabled) {
        bodyElement.classList.add('dark-mode');
        toggleDarkModeCheckbox.checked = true;
    }
});
